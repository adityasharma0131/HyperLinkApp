import React, { useState, useEffect } from "react";
import { FiX, FiChevronRight } from "react-icons/fi";

const UploadOptionsTray = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = "hidden";
    } else {
      setIsVisible(false);
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => setIsOpen(false), 300);
  };

  const options = [
    "Test Reports",
    "Prescription",
    "Vaccination Certificates",
    "Doctor Consultations",
  ];

  return (
    <>
      {/* Toggle Button */}
      <button className="open-tray-btn" onClick={() => setIsOpen(true)}>
        Upload Files
      </button>

      {isOpen || isVisible ? (
        <>
          {/* Backdrop */}
          <div
            className={`bottom-tray-backdrop ${isVisible ? "visible" : ""}`}
            onClick={handleClose}
          />

          {/* Tray */}
          <div className={`bottom-tray ${isVisible ? "visible" : ""}`}>
            <div className="bottom-tray-handle">
              <div className="bottom-tray-handle-bar"></div>
            </div>

            {/* Close Button */}
            <button
              onClick={handleClose}
              className="bottom-tray-close-btn"
              aria-label="Close tray"
            >
              <FiX className="bottom-tray-close-icon" />
            </button>

            {/* Content */}
            <div className="bottom-tray-content">
              <h2 className="bottom-tray-title">What do you want to upload?</h2>

              <ul className="upload-options-list">
                {options.map((item, idx) => (
                  <li key={idx} className="upload-option">
                    <span>{item}</span>
                    <FiChevronRight className="arrow-icon" />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      ) : null}

      <style jsx>{`
        .open-tray-btn {
          padding: 10px 16px;
          background-color: #553fb5;
          color: #fff;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 14px;
          margin: 20px;
          transition: background 0.2s ease;
        }
        .open-tray-btn:hover {
          background-color: #452fa0;
        }

        .bottom-tray-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 999;
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }
        .bottom-tray-backdrop.visible {
          opacity: 1;
          pointer-events: auto;
        }

        .bottom-tray {
          position: fixed;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 1000;
          background: #ffffff;
          box-shadow: 0 -4px 32px rgba(0, 0, 0, 0.12);
          border-radius: 24px 24px 0 0;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          transform: translateY(100%);
          max-width: 600px;
          margin: 0 auto;
          border: 1px solid rgba(0, 0, 0, 0.05);
        }
        .bottom-tray.visible {
          transform: translateY(0);
        }

        .bottom-tray-handle {
          display: flex;
          justify-content: center;
          padding: 14px 0 10px;
        }
        .bottom-tray-handle-bar {
          width: 50px;
          height: 4px;
          background-color: rgba(0, 0, 0, 0.08);
          border-radius: 9999px;
        }

        .bottom-tray-close-btn {
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
          backdrop-filter: blur(4px);
        }
        .bottom-tray-close-icon {
          width: 20px;
          height: 20px;
          color: #64748b;
        }

        .bottom-tray-content {
          padding: 20px 24px 32px;
          text-align: left;
        }
        .bottom-tray-title {
          font-size: 18px;
          font-weight: 600;
          margin: 0 0 20px 0;
          color: #1e293b;
        }

        .upload-options-list {
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .upload-option {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px 0;
          font-size: 16px;
          color: #1e293b;
          border-bottom: 1px solid #e5e7eb;
          cursor: pointer;
        }
        .upload-option:last-child {
          border-bottom: none;
        }
        .arrow-icon {
          color: #2563eb;
          width: 18px;
          height: 18px;
        }
      `}</style>
    </>
  );
};

export default UploadOptionsTray;
