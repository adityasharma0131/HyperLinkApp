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
    </div>
  );
};

export default NewUserTray;
