import React, { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";

const UploadFileTray = ({ uploadType, onClose }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [testName, setTestName] = useState("");
  const [file, setFile] = useState(null);
  const [testDate, setTestDate] = useState("");
  const [newFolderName, setNewFolderName] = useState("");
  const [folderOption, setFolderOption] = useState("./");
  const [validationError, setValidationError] = useState("");

  const testSuggestions = ["Blood Test", "X-Ray", "MRI"];
  const availableFolders = [
    "./",
    "./test-reports",
    "./test-reports/blood",
    "./test-reports/xray",
    "./test-reports/mri",
    "create-new-folder",
  ];

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setTestDate(today);
  }, []);

  useEffect(() => {
    setIsVisible(true);
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose(), 300);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      const nameWithoutExt = selectedFile.name.replace(/\.[^/.]+$/, "");
      setTestName(nameWithoutExt);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (folderOption === "./") {
      setValidationError(
        "❗ Cannot upload to root folder. Please select or create a folder."
      );
      return;
    }

    const finalPath =
      folderOption === "create-new-folder"
        ? `./test-reports/${newFolderName}`
        : folderOption;

    console.log({
      uploadType,
      testName,
      file,
      testDate,
      finalPath,
    });

    setValidationError("");
    handleClose();
  };

  return (
    <>
      <div
        className={`bottom-tray-backdrop ${isVisible ? "visible" : ""}`}
        onClick={handleClose}
      />

      <div className={`bottom-tray ${isVisible ? "visible" : ""}`}>
        <div className="bottom-tray-handle">
          <div className="bottom-tray-handle-bar"></div>
        </div>

        <button
          onClick={handleClose}
          className="bottom-tray-close-btn"
          aria-label="Close tray"
        >
          <FiX className="bottom-tray-close-icon" />
        </button>

        <div className="upload-container">
          <div className="upload-header">
            <h2>Upload {uploadType}</h2>
          </div>

          <form className="upload-form" onSubmit={handleSubmit}>
            <label className="form-label">Test name</label>
            <input
              type="text"
              value={testName}
              onChange={(e) => setTestName(e.target.value)}
              className="form-input"
              placeholder="Enter or select test name"
              list="test-suggestions"
            />
            <datalist id="test-suggestions">
              {testSuggestions.map((suggestion, idx) => (
                <option key={idx} value={suggestion} />
              ))}
            </datalist>

            <label className="form-label">Save to</label>
            <select
              value={folderOption}
              onChange={(e) => setFolderOption(e.target.value)}
              className="form-input"
            >
              {availableFolders.map((folder, idx) => (
                <option key={idx} value={folder}>
                  {folder === "create-new-folder"
                    ? "➕ Create New Folder"
                    : folder}
                </option>
              ))}
            </select>

            {folderOption === "create-new-folder" && (
              <>
                <label className="form-label">
                  New Folder Name (e.g., 'ultrasound')
                </label>
                <input
                  type="text"
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  className="form-input"
                  placeholder="Enter new folder name"
                  required
                />
              </>
            )}

            {validationError && (
              <p style={{ color: "red", fontSize: "14px" }}>
                {validationError}
              </p>
            )}

            <label className="file-label">Choose file</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="form-input"
              required
            />

            <label className="form-label">Select test date</label>
            <input
              type="date"
              value={testDate}
              onChange={(e) => setTestDate(e.target.value)}
              className="form-input"
            />

            <button type="submit" className="upload-btn">
              Upload {uploadType}
            </button>
          </form>
        </div>
      </div>

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

        .upload-container {
          padding: 20px 24px;
        }
        .upload-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 20px;
        }
        .upload-header h2 {
          font-size: 18px;
          font-weight: 600;
          margin: 0;
        }
        .upload-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .form-label {
          font-size: 14px;
          font-weight: 500;
          color: #1e293b;
        }
        .file-label {
          font-size: 14px;
          font-weight: 500;
          color: #2563eb;
          cursor: pointer;
        }
        .form-input {
          padding: 10px;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 14px;
          outline: none;
        }
        .form-input:focus {
          border-color: #553fb5;
        }
        .upload-btn {
          background: #553fb5;
          color: #fff;
          padding: 12px;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          cursor: pointer;
        }
        .upload-btn:hover {
          background: #005fa3;
        }
      `}</style>
    </>
  );
};

export default UploadFileTray;
