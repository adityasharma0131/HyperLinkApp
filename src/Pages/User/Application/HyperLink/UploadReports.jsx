import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiUpload } from "react-icons/fi";
import { FaCamera, FaShieldAlt } from "react-icons/fa";
import { RiGalleryFill } from "react-icons/ri";
import { HiOutlineDocumentReport } from "react-icons/hi";

import { LuBone } from "react-icons/lu";
import { GrTest } from "react-icons/gr";
import { GiHeartBeats, GiKidneys, GiLiver } from "react-icons/gi";
import { MdBloodtype } from "react-icons/md";

const UploadReports = () => {
  const navigate = useNavigate();
  const [uploadedFile, setUploadedFile] = useState(null);
  const [testName, setTestName] = useState("");
  const [isTrayVisible, setIsTrayVisible] = useState(false);
  const [reportUploaded, setReportUploaded] = useState(false);

  const handleFileUpload = (source) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*,application/pdf";
    if (source === "camera") input.capture = "environment";

    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setUploadedFile(file);
        setIsTrayVisible(true);
      }
    };

    input.click();
  };

  const handleUploadReport = () => {
    console.log("Uploading report:", {
      testName,
      fileName: uploadedFile?.name,
    });

    setReportUploaded(true);
    setTestName("");
    setUploadedFile(null);
    setIsTrayVisible(false);
  };

  const handleTrayClose = () => {
    setIsTrayVisible(false);
  };

  const handleCategoryNavigation = () => {
    navigate("/app/hyperlink360/view-report");
  };

  const labTestCategories = [
    { icon: <LuBone />, label: "Bone" },
    { icon: <GrTest />, label: "Blood Sugar" },
    { icon: <GiHeartBeats />, label: "Heart" },
    { icon: <GiKidneys />, label: "Kidney" },
    { icon: <MdBloodtype />, label: "Blood Picture" },
    { icon: <GiLiver />, label: "Liver" },
  ];

  return (
    <div className="diet-dashboard-page">
      <div className="diet-dashboard-hero">
        <div className="hero-top-bar">
          <button
            className="icon-button"
            onClick={() => window.history.back()}
            aria-label="Go back"
          >
            <FiArrowLeft className="hero-icon" />
          </button>
          <h1 className="hero-title">PHYSICAL HEALTH</h1>
        </div>
      </div>

      <div className="upload-prescription-section">
        <h1>Have a Report? Upload here</h1>

        <div className="upload-options">
          <div
            className="upload-option"
            onClick={() => handleFileUpload("camera")}
          >
            <FaCamera className="upload-icon" />
            <p>Camera</p>
          </div>

          <div className="divider"></div>

          <div
            className="upload-option"
            onClick={() => handleFileUpload("gallery")}
          >
            <RiGalleryFill className="upload-icon" />
            <p>Gallery</p>
          </div>

          <div className="divider"></div>

          <div className="upload-option">
            <HiOutlineDocumentReport className="upload-icon" />
            <p>My Reports</p>
          </div>
        </div>
      </div>

      {!reportUploaded ? (
        <div className="prescription-mobile-container">
          <div className="secure-section">
            <div className="security-info">
              <FaShieldAlt className="shield-icon" />
              <h1>Your prescription will be secure and private.</h1>
            </div>
          </div>
        </div>
      ) : (
        <div className="labtest-category-container">
          <h1 className="labtest-category-title">Categories</h1>
          <div className="labtest-category-grid">
            {labTestCategories.map(({ icon, label }, idx) => (
              <div
                key={idx}
                className="labtest-category-card"
                role="button"
                tabIndex={0}
                onClick={handleCategoryNavigation}
                onKeyPress={(e) =>
                  e.key === "Enter" && handleCategoryNavigation()
                }
              >
                <div className="icon-wrapper">{icon}</div>
                <p className="labtest-category-label">{label}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {isTrayVisible && (
        <>
          <div className="bottom-tray-backdrop" onClick={handleTrayClose}></div>
          <div className="bottom-tray visible">
            <div className="bottom-tray-handle">
              <div className="bottom-tray-handle-bar"></div>
            </div>

            <div className="bottom-tray-content">
              <h2>Upload Prescription Report</h2>

              <p>
                <strong>Selected file:</strong>{" "}
                {uploadedFile?.name || "No file selected"}
              </p>

              <input
                type="text"
                placeholder="Enter Test Name"
                value={testName}
                onChange={(e) => setTestName(e.target.value)}
                className="test-name-input"
              />

              <button
                className="upload-report-button"
                onClick={handleUploadReport}
                disabled={!testName || !uploadedFile}
              >
                <FiUpload className="upload-icon" /> Upload Report
              </button>
            </div>
          </div>
        </>
      )}

      <style jsx>{`
        .diet-dashboard-page {
          box-sizing: border-box;
          padding: 0;
          margin: 0;
        }

        .diet-dashboard-hero {
          background: linear-gradient(
            to bottom,
            #6ea6e7 0%,
            #daeffe 50%,
            #e0d3ff 80%
          );
          padding: 20px;
          border-radius: 0 0 32px 32px;
          color: white;
          position: relative;
          box-shadow: 0 10px 30px rgba(103, 108, 255, 0.2);
        }

        .hero-top-bar {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          text-align: left;
          gap: 1rem;
        }

        .icon-button {
          background: rgba(255, 255, 255, 0.2);
          border: none;
          width: 36px;
          height: 36px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(5px);
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .icon-button:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateY(-2px);
        }

        .hero-icon {
          font-size: 18px;
          color: #553fb5;
        }

        .hero-title {
          font-size: 16px;
          color: #553fb5;
          font-weight: 700;
          margin: 0;
          line-height: 1.2;
          text-align: left;
          letter-spacing: 1px;
        }

        .upload-prescription-section {
          padding: 20px;
          text-align: center;
        }

        .upload-prescription-section h1 {
          font-size: 1.2rem;
          font-weight: 600;
          margin-bottom: 20px;
          text-align: left;
          color: #333;
        }

        .upload-options {
          display: flex;
          align-items: center;
          background: #f9e5f7;
          padding: 5px;
          border-radius: 12px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
        }

        .upload-option {
          display: flex;
          flex-direction: column;
          align-items: center;
          flex: 1;
          padding: 10px;
          cursor: pointer;
        }

        .upload-option:hover {
          background-color: #e6d0f0;
          border-radius: 8px;
        }

        .upload-option p {
          margin-top: 8px;
          font-size: 0.9rem;
          color: #555;
        }

        .upload-icon {
          font-size: 28px;
          color: #553fb5;
        }

        .divider {
          width: 1px;
          background-color: #ccc;
          height: 40px;
        }
        .prescription-mobile-container {
          padding: 16px;
          max-width: 100%;
          background-color: #fff;
          box-sizing: border-box;
        }

        .secure-section {
          padding: 16px;
          background: #f5f5f5;
          border-radius: 12px;
          display: flex;
          justify-content: center;
        }

        .security-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .shield-icon {
          font-size: 32px;
          color: #0172d0;
        }

        .security-info h1 {
          font-size: 1rem;
          font-weight: 600;
          color: #333;
        }

        .bottom-tray-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 999;
        }

        .bottom-tray {
          position: fixed;
          left: 0;
          right: 0;
          bottom: 0;
          background: #fff;
          border-radius: 24px 24px 0 0;
          box-shadow: 0 -4px 32px rgba(0, 0, 0, 0.12);
          padding: 24px;
          transition: transform 0.3s ease;
          z-index: 1000;
        }

        .bottom-tray-handle {
          display: flex;
          justify-content: center;
          padding: 12px;
        }

        .bottom-tray-handle-bar {
          width: 56px;
          height: 4px;
          background-color: rgba(0, 0, 0, 0.15);
          border-radius: 9999px;
        }

        .bottom-tray-content {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .bottom-tray-content h2 {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 12px;
          color: #1e3a8a;
        }

        .test-name-input {
          width: 100%;
          padding: 12px;
          font-size: 1rem;
          border: 1px solid #ccc;
          border-radius: 10px;
          box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
          transition: border-color 0.3s ease;
        }

        .test-name-input:focus {
          outline: none;
          border-color: #553fb5;
          box-shadow: 0 0 0 3px rgba(85, 63, 181, 0.2);
        }

        .upload-report-button {
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #553fb5;
          color: #fff;
          border: none;
          padding: 14px;
          font-size: 1rem;
          font-weight: 600;
          border-radius: 12px;
          cursor: pointer;
          transition: background-color 0.3s ease, transform 0.2s ease;
        }

        .upload-report-button:hover {
          background-color: #442f9c;
          transform: translateY(-2px);
        }

        .upload-icon {
          margin-right: 8px;
          font-size: 1.2rem;
        }

        .labtest-category-container {
          padding: 0 16px;

          margin: 10px 0;
          max-width: 1100px;
          text-align: center;
        }

        .labtest-category-title {
          font-size: 16px;
          font-weight: 700;
          color: #1e293b;
          text-align: left;
        }

        .labtest-category-subtitle {
          font-size: 10px;
          font-weight: 400;
          color: #64748b;
          text-align: left;
          margin-bottom: 18px;
        } /* Mobile-optimized CSS */
        .labtest-category-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);

          gap: 1rem;
          padding: 1rem 0 0;
          width: 100%;
          box-sizing: border-box;
        }

        @media (max-width: 768px) {
          .consultation-category-grid {
            grid-template-columns: repeat(
              3,
              1fr
            ); /* 3x3 on tablets and larger mobiles */
          }
        }

        @media (max-width: 480px) {
          .consultation-category-grid {
            grid-template-columns: repeat(
              3,
              1fr
            ); /* Ensure 3 columns on smaller mobiles */
          }
        }

        @media (max-width: 360px) {
          .consultation-category-grid {
            grid-template-columns: repeat(
              2,
              1fr
            ); /* Fallback to 2 columns on very narrow screens */
          }
        }

        .labtest-category-card {
          background: linear-gradient(to bottom, #daeffe 10%, #e0d3ff 80%);
          border-radius: 1rem;
          padding: 1rem 0.1rem;
          text-align: center;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          -webkit-tap-highlight-color: transparent;
          user-select: none;
          display: flex;
          touch-action: manipulation;
          align-items: center;
          justify-content: center;
          flex-direction: column;
        }

        .labtest-category-card:active {
          transform: translateY(-3px);
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
        }

        .labtest-category-card:focus-visible,
        .labtest-category-card:active {
          outline: none;
        }

        .labtest-category-card:focus-visible::after,
        .labtest-category-card:active::after {
          content: "";
          position: absolute;
          top: 0;
          left: -75%;
          width: 50%;
          height: 100%;
          background: rgba(255, 255, 255, 0.15);
          transform: skewX(-20deg);
          animation: shine 0.75s ease;
        }

        @keyframes shine {
          100% {
            left: 125%;
          }
        }

        .icon-wrapper {
          font-size: 2.2rem;
          color: #553fb5;
          margin-bottom: 0.6rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .labtest-category-label {
          font-size: 12px;
          font-weight: 500;
          color: #1f1f1f;
          margin: 0;
          line-height: 1.3;
        }

        /* Adjust for very small screens */
        @media (max-width: 360px) {
          .icon-wrapper {
            font-size: 2rem;
          }

          .labtest-category-label {
            font-size: 0.9rem;
          }
        }
      `}</style>
    </div>
  );
};

export default UploadReports;
