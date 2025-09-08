import React, { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { FaCamera } from "react-icons/fa";
import { RiGalleryFill } from "react-icons/ri";
import { HiOutlineDocumentReport } from "react-icons/hi";

const UploadReports = () => {
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleCameraClick = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*,application/pdf"; // Accept image or PDF
    input.capture = "environment"; // Opens camera on mobile
    input.onchange = (e) => {
      const file = e.target.files[0];
      console.log("Captured from camera:", file);
      setUploadedFile(file);
      // Further processing of the file
    };
    input.click();
  };

  const handleGalleryClick = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*,application/pdf"; // Accept image or PDF
    input.onchange = (e) => {
      const file = e.target.files[0];
      console.log("Selected from gallery:", file);
      setUploadedFile(file);
      // Further processing of the file
    };
    input.click();
  };

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
        <h1>Have a prescription? Upload here</h1>

        <div className="upload-options">
          <div className="upload-option" onClick={handleCameraClick}>
            <FaCamera className="upload-icon" />
            <p>Camera</p>
          </div>

          <div className="divider"></div>

          <div className="upload-option" onClick={handleGalleryClick}>
            <RiGalleryFill className="upload-icon" />
            <p>Gallery</p>
          </div>

          <div className="divider"></div>

          <div className="upload-option">
            <HiOutlineDocumentReport className="upload-icon" />
            <p>My Prescription</p>
          </div>
        </div>

        {uploadedFile && (
          <div className="file-preview">
            <h2>Uploaded File:</h2>
            <p>{uploadedFile.name}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadReports;
