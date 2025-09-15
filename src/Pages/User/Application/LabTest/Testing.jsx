import React, { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";

const UploadFileTray = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [testName, setTestName] = useState("");
  const [labName, setLabName] = useState("");
  const [file, setFile] = useState(null);
  const [testDate, setTestDate] = useState("");
  const [path, setPath] = useState("./");

  // Suggestions for test names
  const testSuggestions = ["Blood Test", "X-Ray", "MRI"];

  useEffect(() => {
    // Default date = today
    const today = new Date().toISOString().split("T")[0];
    setTestDate(today);
  }, []);

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

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      const nameWithoutExt = selectedFile.name.replace(/\.[^/.]+$/, "");
      // Default test name = file name (without extension)
      setTestName(nameWithoutExt);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ testName, labName, file, testDate, path });
    handleClose();
  };

  return (
    <>
      {/* Toggle Button */}
      <button className="open-tray-btn" onClick={() => setIsOpen(true)}>
        Upload Test Report
      </button>

      {(isOpen || isVisible) && (
        <>
          {/* Backdrop */}
          <div
            className={`bottom-tray-backdrop ${isVisible ? "visible" : ""}`}
            onClick={handleClose}
          />

          {/* Bottom Tray */}
          <div className={`bottom-tray ${isVisible ? "visible" : ""}`}>
            {/* Handle bar */}
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
            <div className="upload-container">
              <div className="upload-header">
                <h2>Upload test report</h2>
              </div>

              <form className="upload-form" onSubmit={handleSubmit}>
                {/* Test Name */}
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

                {/* Lab Name */}
                <label className="form-label">Lab name</label>
                <input
                  type="text"
                  value={labName}
                  onChange={(e) => setLabName(e.target.value)}
                  className="form-input"
                  placeholder="Enter lab name"
                />

                {/* Path Selection */}
                <label className="form-label">Save to</label>
                <select
                  value={path}
                  onChange={(e) => setPath(e.target.value)}
                  className="form-input"
                >
                  <option value="./">Root ( ./ )</option>
                  <option value="./test-reports">./test-reports</option>
                  <option value="./test-reports/blood">
                    ./test-reports/blood
                  </option>
                  <option value="./test-reports/xray">
                    ./test-reports/xray
                  </option>
                  <option value="./test-reports/mri">./test-reports/mri</option>
                </select>

                {/* File Upload */}
                <label className="file-label">Choose file</label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="form-input"
                />

                {/* Test Date */}
                <label className="form-label">Select test date</label>
                <input
                  type="date"
                  value={testDate}
                  onChange={(e) => setTestDate(e.target.value)}
                  className="form-input"
                />

                {/* Submit Button */}
                <button type="submit" className="upload-btn">
                  Upload test
                </button>
              </form>
            </div>
          </div>
        </>
      )}

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
