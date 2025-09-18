import React, { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";

const GridInfoTray = ({ isOpen, onClose, content }) => {
  const [closing, setClosing] = useState(false);

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      onClose();
      setClosing(false);
    }, 300); // Matches CSS animation duration
  };

  // Prevent body scroll when tray is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen && !closing) return null;

  return (
    <div
      className={`bottom-tray-backdrop ${closing ? "fade-out" : ""}`}
      onClick={handleClose}
    >
      <div
        className={`bottom-tray-container ${closing ? "slide-down" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle */}
        <div className="bottom-tray-handle" onClick={handleClose}>
          <div className="bottom-tray-handle-bar" />
        </div>

        {/* Content */}
        <div className="bottom-tray-content">
          <div className="bottom-tray-header">
            <h1 className="bottom-tray-title">{content?.title || "Details"}</h1>
            <button
              type="button"
              className="bottom-tray-close-btn"
              onClick={handleClose}
              aria-label="Close tray"
            >
              <FiX className="bottom-tray-close-icon" />
            </button>
          </div>

          <div className="bottom-tray-body">
            {content?.body || "No additional information available."}
          </div>
        </div>
      </div>

      <style>
        {`
          /* Backdrop */
          .bottom-tray-backdrop {
            position: fixed;
            inset: 0;
            background-color: rgba(0, 0, 0, 0.45);
            display: flex;
            justify-content: center;
            align-items: flex-end;
            z-index: 1000;
            animation: fadeInBackdrop 0.3s forwards;
          }

          .bottom-tray-backdrop.fade-out {
            animation: fadeOutBackdrop 0.3s forwards;
          }

          /* Tray Container */
          .bottom-tray-container {
            background: #ffffff;
            border-radius: 16px 16px 0 0;
            width: 100%;
            max-width: 480px;
            max-height: 80vh;
            overflow-y: auto;
            box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.12);
            animation: slideUp 0.3s ease-out forwards;
          }

          .bottom-tray-container.slide-down {
            animation: slideDown 0.3s ease-in forwards;
          }

          /* Handle */
          .bottom-tray-handle {
            padding: 10px 0;
            display: flex;
            justify-content: center;
            cursor: pointer;
          }

          .bottom-tray-handle-bar {
            width: 40px;
            height: 4px;
            background: #e2e8f0;
            border-radius: 999px;
          }

          /* Header Row */
          .bottom-tray-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            margin-bottom: 12px;
            padding: 0 20px;
          }

          /* Title */
          .bottom-tray-title {
            font-size: 1.4rem;
            font-weight: 700;
            color: #1e293b;
            margin: 0;
          }

          /* Close Button */
          .bottom-tray-close-btn {
            background: none;
            border: none;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #64748b;
            cursor: pointer;
            transition: all 0.2s ease;
          }

          .bottom-tray-close-btn:hover {
            background: #f8fafc;
            color: #1e293b;
            transform: rotate(90deg);
          }

          .bottom-tray-close-icon {
            font-size: 20px;
          }

          /* Content */
          .bottom-tray-content {
            padding: 24px 20px;
          }

          .bottom-tray-body {
            font-size: 1rem;
            color: #64748b;
            line-height: 1.5;
          }

          /* Animations */
          @keyframes fadeInBackdrop {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          @keyframes fadeOutBackdrop {
            from {
              opacity: 1;
            }
            to {
              opacity: 0;
            }
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
        `}
      </style>
    </div>
  );
};

export default GridInfoTray;
