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
      className={`adddata-tray-overlay ${
        isOpen ? "adddata-tray-fade-in" : "adddata-tray-fade-out"
      }`}
      onClick={onClose}
    >
      <div
        className={`adddata-tray-container ${
          isOpen ? "adddata-tray-slide-up" : "adddata-tray-slide-down"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="adddata-tray-handle">
          <div className="adddata-tray-handle-bar"></div>
        </div>
        <div className="adddata-tray-header">
          <h2>Add Cholesterol Data</h2>
          <button
            onClick={onClose}
            className="adddata-tray-close-btn"
            aria-label="Close tray"
          >
            <FiX className="adddata-tray-close-icon" />
          </button>
        </div>

        <div className="adddata-tray-content">
          {/* Cholesterol Input */}
          <div className="adddata-tray-form-group">
            <label>Cholesterol Value (mg/dL)</label>
            <input
              type="number"
              placeholder="Enter cholesterol value"
              value={cholesterol}
              onChange={(e) => setCholesterol(e.target.value)}
            />
          </div>

          {/* Date */}
          <div className="adddata-tray-form-group">
            <label>Date</label>
            <input type="text" value={formattedDate} readOnly />
          </div>

          {/* Time */}
          <div className="adddata-tray-form-group">
            <label>Time</label>
            <input type="text" value={formattedTime} readOnly />
          </div>

          {/* Notes */}
          <div className="adddata-tray-form-group">
            <label>Custom Notes</label>
            <textarea
              placeholder="Enter notes or observations"
              value={customValue}
              onChange={(e) => setCustomValue(e.target.value)}
            />
          </div>

          {/* Buttons */}
          <div className="adddata-tray-action-buttons">
            <button className="adddata-tray-cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button className="adddata-tray-add-btn" onClick={handleAddData}>
              Save Data
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Overlay */
        .adddata-tray-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 9;
          display: flex;
          justify-content: center;
          align-items: flex-end;
        }

        /* Container */
        .adddata-tray-container {
          position: relative;
          width: 100%;
          max-width: 500px;
          background: #fff;
          border-radius: 20px 20px 0 0;
          box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.15);
          max-height: 75vh;
          overflow-y: auto;
        }

        /* Header */
        .adddata-tray-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 20px;
          border-bottom: 1px solid #e5e7eb;
        }

        .adddata-tray-header h2 {
          margin: 0;
          font-size: 18px;
          font-weight: 600;
          color: #111827;
        }

        /* Handle */
        .adddata-tray-handle {
          display: flex;
          justify-content: center;
          padding: 16px 0 12px;
        }

        .adddata-tray-handle-bar {
          width: 56px;
          height: 4px;
          background-color: rgba(0, 0, 0, 0.08);
          border-radius: 9999px;
          transition: all 0.3s;
        }

        .adddata-tray-handle:hover .adddata-tray-handle-bar {
          background-color: rgba(0, 0, 0, 0.16);
          width: 64px;
        }

        /* Close button */
        .adddata-tray-close-btn {
          position: absolute;
          top: 16px;
          right: 20px;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.03);
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s;
        }

        .adddata-tray-close-btn:hover {
          background: rgba(0, 0, 0, 0.08);
          transform: rotate(90deg);
        }

        .adddata-tray-close-icon {
          width: 20px;
          height: 20px;
          color: #64748b;
        }

        /* Content */
        .adddata-tray-content {
          padding: 20px;
        }

        .adddata-tray-form-group {
          margin-bottom: 18px;
          display: flex;
          flex-direction: column;
        }

        .adddata-tray-form-group label {
          font-size: 14px;
          margin-bottom: 6px;
          color: #374151;
          font-weight: 500;
        }

        .adddata-tray-form-group input,
        .adddata-tray-form-group textarea {
          padding: 12px;
          border: 1px solid #d1d5db;
          border-radius: 10px;
          font-size: 14px;
          transition: border 0.2s, box-shadow 0.2s;
        }

        .adddata-tray-form-group input:focus,
        .adddata-tray-form-group textarea:focus {
          border: 1px solid #6366f1;
          box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
          outline: none;
        }

        .adddata-tray-form-group input[readonly] {
          background: #f9fafb;
          color: #6b7280;
        }

        .adddata-tray-form-group textarea {
          resize: none;
          min-height: 60px;
        }

        /* Buttons */
        .adddata-tray-action-buttons {
          display: flex;
          justify-content: space-between;
          margin-top: 24px;
        }

        .adddata-tray-cancel-btn,
        .adddata-tray-add-btn {
          flex: 1;
          padding: 14px;
          border-radius: 10px;
          font-size: 15px;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.3s;
        }

        .adddata-tray-cancel-btn {
          margin-right: 8px;
          border: 1px solid #d1d5db;
          background: #fff;
          color: #374151;
        }

        .adddata-tray-cancel-btn:hover {
          background: #f3f4f6;
        }

        .adddata-tray-add-btn {
          margin-left: 8px;
          border: none;
          background: linear-gradient(135deg, #4f46e5, #6366f1);
          color: white;
          box-shadow: 0 2px 8px rgba(79, 70, 229, 0.4);
        }

        .adddata-tray-add-btn:hover {
          background: linear-gradient(135deg, #4338ca, #4f46e5);
          box-shadow: 0 4px 12px rgba(79, 70, 229, 0.5);
        }

        /* Animations */
        .adddata-tray-fade-in {
          animation: fadeIn 0.3s forwards;
        }
        .adddata-tray-fade-out {
          animation: fadeOut 0.3s forwards;
        }
        .adddata-tray-slide-up {
          animation: slideUp 0.3s forwards;
        }
        .adddata-tray-slide-down {
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
