import React, { useState, useEffect } from "react";
import { FiX, FiChevronRight } from "react-icons/fi";

const UploadOptionsTray = ({ isOpen, onClose, onSelectOption }) => {
  const [isVisible, setIsVisible] = useState(false);

  const options = [
    "Test Reports",
    "Prescription",
    "Vaccination Certificates",
    "Doctor Consultations",
  ];

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
    setTimeout(() => onClose(), 300);
  };

  const handleOptionSelect = (option) => {
    handleClose();
    onSelectOption(option);
  };

  return (
    <>
      {isOpen || isVisible ? (
        <>
          <div
            className={`upload-option-backdrop ${
              isVisible ? "upload-option-visible" : ""
            }`}
            onClick={handleClose}
          />

          <div
            className={`upload-option-tray ${
              isVisible ? "upload-option-visible" : ""
            }`}
          >
            <div className="upload-option-handle">
              <div className="upload-option-handle-bar"></div>
            </div>

            <button
              onClick={handleClose}
              className="upload-option-close-btn"
              aria-label="Close tray"
            >
              <FiX className="upload-option-close-icon" />
            </button>

            <div className="upload-option-content">
              <h2 className="upload-option-title">
                What do you want to upload?
              </h2>

              <ul className="upload-option-list">
                {options.map((item, idx) => (
                  <li
                    key={idx}
                    className="upload-option-item"
                    onClick={() => handleOptionSelect(item)}
                  >
                    <span>{item}</span>
                    <FiChevronRight className="upload-option-arrow-icon" />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      ) : null}

      <style jsx>{`
        .upload-option-backdrop {
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
        .upload-option-backdrop.upload-option-visible {
          opacity: 1;
          pointer-events: auto;
        }

        .upload-option-tray {
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
        .upload-option-tray.upload-option-visible {
          transform: translateY(0);
        }

        .upload-option-handle {
          display: flex;
          justify-content: center;
          padding: 14px 0 10px;
        }
        .upload-option-handle-bar {
          width: 50px;
          height: 4px;
          background-color: rgba(0, 0, 0, 0.08);
          border-radius: 9999px;
        }

        .upload-option-close-btn {
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
        .upload-option-close-icon {
          width: 20px;
          height: 20px;
          color: #64748b;
        }

        .upload-option-content {
          padding: 20px 24px 32px;
          text-align: left;
        }
        .upload-option-title {
          font-size: 18px;
          font-weight: 600;
          margin: 0 0 20px 0;
          color: #1e293b;
        }

        .upload-option-list {
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .upload-option-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px 0;
          font-size: 16px;
          color: #1e293b;
          border-bottom: 1px solid #e5e7eb;
          cursor: pointer;
        }
        .upload-option-item:last-child {
          border-bottom: none;
        }

        .upload-option-arrow-icon {
          color: #2563eb;
          width: 18px;
          height: 18px;
        }
      `}</style>
    </>
  );
};

export default UploadOptionsTray;
