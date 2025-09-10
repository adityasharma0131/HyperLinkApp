import React, { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";

const AddData = ({ isOpen, onClose }) => {
  const [isVisible, setIsVisible] = useState(false); // for animation control
  const [cholesterol, setCholesterol] = useState("");
  const [customValue, setCustomValue] = useState("");

  // Handle open/close animations
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timeout = setTimeout(() => setIsVisible(false), 300); // wait for animation
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  // Get today's date and time
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-GB");
  const formattedTime = today.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const handleAddData = () => {
    console.log("Cholesterol:", cholesterol);
    console.log("Custom Value:", customValue);
    console.log("Date:", formattedDate);
    console.log("Time:", formattedTime);
    onClose();
  };

  if (!isVisible) return null; // hide fully when animation is done

  return (
    <div
      className={`overlay ${isOpen ? "fade-in" : "fade-out"}`}
      onClick={onClose} // close when clicking outside
    >
      <div
        className={`bottom-tray ${isOpen ? "slide-up" : "slide-down"}`}
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
      >
        <div className="bottom-tray-handle">
          <div className="bottom-tray-handle-bar"></div>
        </div>
        <div className="tray-header">
          <h2>Add Cholesterol Data</h2>
          <button
            onClick={onClose}
            className="bottom-tray-close-btn"
            aria-label="Close tray"
          >
            <FiX className="bottom-tray-close-icon" />
          </button>
        </div>

        <div className="tray-content">
          {/* Cholesterol Input */}
          <div className="form-group">
            <label>Cholesterol Value (mg/dL)</label>
            <input
              type="number"
              placeholder="Enter cholesterol value"
              value={cholesterol}
              onChange={(e) => setCholesterol(e.target.value)}
            />
          </div>

          {/* Date */}
          <div className="form-group">
            <label>Date</label>
            <input type="text" value={formattedDate} readOnly />
          </div>

          {/* Time */}
          <div className="form-group">
            <label>Time</label>
            <input type="text" value={formattedTime} readOnly />
          </div>

          {/* Notes */}
          <div className="form-group">
            <label>Custom Notes</label>
            <textarea
              placeholder="Enter notes or observations"
              value={customValue}
              onChange={(e) => setCustomValue(e.target.value)}
            />
          </div>

          {/* Buttons */}
          <div className="action-buttons">
            <button className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button className="add-btn" onClick={handleAddData}>
              Save Data
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Overlay */
        .overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 9;
          display: flex;
          justify-content: center;
          align-items: flex-end;
        }

        /* Bottom Tray */
        .bottom-tray {
          position: relative;
          width: 100%;
          max-width: 500px;
          background: #fff;
          border-radius: 20px 20px 0 0;
          box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.15);
          max-height: 75vh;
          overflow-y: auto;
        }

        /* Tray header */
        .tray-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 20px;
          border-bottom: 1px solid #e5e7eb;
        }

        .tray-header h2 {
          margin: 0;
          font-size: 18px;
          font-weight: 600;
          color: #111827;
        }

        /* Handle bar */
        .bottom-tray-handle {
          display: flex;
          justify-content: center;
          padding: 16px 0 12px;
          cursor: pointer;
          touch-action: manipulation;
        }

        .bottom-tray-handle-bar {
          width: 56px;
          height: 4px;
          background-color: rgba(0, 0, 0, 0.08);
          border-radius: 9999px;
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        }

        .bottom-tray-handle:hover .bottom-tray-handle-bar {
          background-color: rgba(0, 0, 0, 0.16);
          width: 64px;
        }
        /* Close button */
        .bottom-tray-close-btn {
          position: absolute;
          top: 16px;
          right: 20px;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
          background: rgba(0, 0, 0, 0.03);
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(4px);
        }

        .bottom-tray-close-btn:hover {
          background: rgba(0, 0, 0, 0.08);
          transform: rotate(90deg);
        }

        .bottom-tray-close-icon {
          width: 20px;
          height: 20px;
          color: #64748b;
        }
        .tray-content {
          padding: 20px;
        }

        .form-group {
          margin-bottom: 18px;
          display: flex;
          flex-direction: column;
        }

        .form-group label {
          font-size: 14px;
          margin-bottom: 6px;
          color: #374151;
          font-weight: 500;
        }

        .form-group input,
        .form-group textarea {
          padding: 12px;
          border: 1px solid #d1d5db;
          border-radius: 10px;
          font-size: 14px;
          transition: border 0.2s, box-shadow 0.2s;
        }

        .form-group input:focus,
        .form-group textarea:focus {
          border: 1px solid #6366f1;
          box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
          outline: none;
        }

        .form-group input[readonly] {
          background: #f9fafb;
          color: #6b7280;
        }

        .form-group textarea {
          resize: none;
          min-height: 60px;
        }

        .action-buttons {
          display: flex;
          justify-content: space-between;
          margin-top: 24px;
        }

        .cancel-btn,
        .add-btn {
          flex: 1;
          padding: 14px;
          border-radius: 10px;
          font-size: 15px;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.3s;
        }

        .cancel-btn {
          margin-right: 8px;
          border: 1px solid #d1d5db;
          background: #fff;
          color: #374151;
        }

        .cancel-btn:hover {
          background: #f3f4f6;
        }

        .add-btn {
          margin-left: 8px;
          border: none;
          background: linear-gradient(135deg, #4f46e5, #6366f1);
          color: white;
          box-shadow: 0 2px 8px rgba(79, 70, 229, 0.4);
        }

        .add-btn:hover {
          background: linear-gradient(135deg, #4338ca, #4f46e5);
          box-shadow: 0 4px 12px rgba(79, 70, 229, 0.5);
        }

        /* Animations */
        .fade-in {
          animation: fadeIn 0.3s forwards;
        }
        .fade-out {
          animation: fadeOut 0.3s forwards;
        }
        .slide-up {
          animation: slideUp 0.3s forwards;
        }
        .slide-down {
          animation: slideDown 0.3s forwards;
        }

        @keyframes slideUp {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }

        @keyframes slideDown {
          from {
            transform: translateY(0);
          }
          to {
            transform: translateY(100%);
          }
        }

        @keyframes fadeIn {
          from {
            background: rgba(0, 0, 0, 0);
          }
          to {
            background: rgba(0, 0, 0, 0.5);
          }
        }

        @keyframes fadeOut {
          from {
            background: rgba(0, 0, 0, 0.5);
          }
          to {
            background: rgba(0, 0, 0, 0);
          }
        }
      `}</style>
    </div>
  );
};

export default AddData;
