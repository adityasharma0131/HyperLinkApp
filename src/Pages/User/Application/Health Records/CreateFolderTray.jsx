import React, { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";

const CreateFolderTray = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [folderName, setFolderName] = useState("");

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

  const handleCreate = () => {
    if (folderName.trim()) {
      console.log("📂 Folder Created:", folderName); // you can replace with API/logic
      setFolderName("");
      handleClose();
    }
  };

  return (
    <>
      {/* Toggle Button (opens tray) */}
      <button className="open-tray-btn" onClick={() => setIsOpen(true)}>
        + Create Folder
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
              <h2 className="bottom-tray-title">Create Folder</h2>

              <label className="input-label" htmlFor="folderName">
                Folder name
              </label>
              <input
                id="folderName"
                type="text"
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
                className="input-field"
                placeholder="Enter folder name"
              />

              <div className="bottom-tray-actions">
                <button className="create-btn" onClick={handleCreate}>
                  Create
                </button>
              </div>
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
          margin: 0 0 16px 0;
          color: #1e293b;
        }

        .input-label {
          display: block;
          font-size: 14px;
          color: #475569;
          margin-bottom: 6px;
        }
        .input-field {
          width: 100%;
          padding: 12px 14px;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 15px;
          margin-bottom: 24px;
          outline: none;
          transition: border-color 0.2s ease;
        }
        .input-field:focus {
          border-color: #2563eb;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
        }

        .bottom-tray-actions {
          display: flex;
          justify-content: flex-end;
        }
        .create-btn {
          background-color: #553fb5;
          color: #fff;
          border: none;
          padding: 10px 20px;
          border-radius: 8px;
          font-size: 15px;
          cursor: pointer;
          transition: background 0.2s ease;
        }
        .create-btn:hover {
          background-color: #452fa0;
        }
      `}</style>
    </>
  );
};

export default CreateFolderTray;
