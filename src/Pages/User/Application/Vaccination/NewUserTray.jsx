import React, { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import "./style.css";
import AppButton from "../../../../Components/AppButton";

const NewUserTray = ({ onClose }) => {
  const [closing, setClosing] = useState(false);

  const handleClose = () => {
    setClosing(true);
    setTimeout(onClose, 300); // Matches animation duration
  };

  // Prevent body scroll when tray is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      className={`new-user-tray-backdrop ${closing ? "fade-out" : ""}`}
      onClick={handleClose}
    >
      <div
        className={`new-user-tray-container ${closing ? "slide-down" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle */}
        <div className="new-user-tray-handle" onClick={handleClose}>
          <div className="new-user-tray-handle-bar" />
        </div>

        {/* Content */}
        <div className="new-user-tray-content">
          <div className="new-user-header">
            <h1 className="new-user-title">
              It seems you're new to Hyperlink!
            </h1>
            <button
              type="button"
              className="new-user-close-btn"
              onClick={handleClose}
              aria-label="Close tray"
            >
              <FiX className="new-user-close-icon" />
            </button>
          </div>

          <p className="new-user-text">
            Before scheduling your vaccination, we’ll need a quick health
            assessment to ensure this vaccine is right for you. This only takes
            a minute.
          </p>

          <AppButton text="Continue" />
        </div>
      </div>
      <style>
        {`
          /* Backdrop */
.new-user-tray-backdrop {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.45);
  display: flex;
  justify-content: center;
  align-items: flex-end;
  z-index: 1000;
  animation: fadeInBackdrop 0.3s forwards;
}

.new-user-tray-backdrop.fade-out {
  animation: fadeOutBackdrop 0.3s forwards;
}

/* Tray Container */
.new-user-tray-container {
  background: #ffffff;
  border-radius: 16px 16px 0 0;
  width: 100%;
  max-width: 480px;
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.12);
  animation: slideUp 0.3s ease-out forwards;
}

.new-user-tray-container.slide-down {
  animation: slideDown 0.3s ease-in forwards;
}

/* Handle */
.new-user-tray-handle {
  padding: 10px 0;
  display: flex;
  justify-content: center;
  cursor: pointer;
}

.new-user-tray-handle-bar {
  width: 40px;
  height: 4px;
  background: #e2e8f0;
  border-radius: 999px;
}

/* Header Row */
.new-user-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
}

/* Title */
.new-user-title {
  font-size: 1.4rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
}

/* Close Button */
.new-user-close-btn {
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

.new-user-close-btn:hover {
  background: #f8fafc;
  color: #1e293b;
  transform: rotate(90deg);
}

.new-user-close-icon {
  font-size: 20px;
}

/* Content */
.new-user-tray-content {
  padding: 24px 20px;
  text-align: center;
}

.new-user-text {
  font-size: 1rem;
  color: #64748b;
  margin-bottom: 20px;
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

export default NewUserTray;
