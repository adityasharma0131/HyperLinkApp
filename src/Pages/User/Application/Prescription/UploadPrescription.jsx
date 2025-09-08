import React, { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { FaCamera, FaShieldAlt } from "react-icons/fa";
import { RiGalleryFill } from "react-icons/ri";
import { HiOutlineDocumentReport } from "react-icons/hi";
import ConsultDoctorBg from "../../../../assets/ConsultDoctorBg.svg";
import AppButton from "../../../../Components/AppButton";

const UploadPrescription = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [showBackdrop, setShowBackdrop] = useState(false);

  const handleFileUpload = (source) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*,application/pdf";
    if (source === "camera") input.capture = "environment"; // Opens camera on mobile

    input.onchange = (e) => {
      const file = e.target.files[0];
      console.log(
        `${source === "camera" ? "Captured" : "Selected"} file:`,
        file
      );
      setUploadedFile(file);

      // Show success backdrop
      setShowBackdrop(true);

      // Hide backdrop after 3 seconds
      setTimeout(() => {
        setShowBackdrop(false);
      }, 3000);
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
          <h1 className="hero-title">UPLOAD PRESCRIPTION</h1>
        </div>
      </div>

      <div className="upload-prescription-section">
        <h1>Have a prescription? Upload here</h1>

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

      <div className="prescription-mobile-container">
        <div className="secure-section">
          <div className="security-info">
            <FaShieldAlt className="shield-icon" />
            <h1>Your prescription will be secure and private.</h1>
          </div>
        </div>

        <div className="prescription-info-section">
          <div className="why-upload">
            <h2>Why upload a prescription?</h2>
            <p>
              Our team will verify your prescription and call back to confirm
              your lab test order.
            </p>
            <p>
              Your prescription will always be available in your account so that
              you can access it anytime anywhere.
            </p>
            <p>
              Details from your prescription are only visible to our team of
              specialists.
            </p>
          </div>
        </div>
      </div>

      <div className="prescription-mobile-container">
        <div className="no-prescription">
          <h2>Don’t have Prescription?</h2>
        </div>

        <div className="consult-doctor-card">
          <div className="consult-doctor-image">
            <img src={ConsultDoctorBg} alt="Doctor Illustration" />
          </div>
          <div className="consult-doctor-content">
            <h1>CONSULT A DOCTOR</h1>
            <p>Preventive consultations with our specialist doctors</p>
            <AppButton text="Consult Now" />
          </div>
        </div>
      </div>
      {showBackdrop && (
        <div className="backdrop-panel">
          <div className="backdrop-content">
            <div className="success-icon">✔️</div>
            <h2>Prescription submitted successfully</h2>
            <p>Our team will connect with you shortly.</p>
          </div>
        </div>
      )}

      <style>
        {`
        .diet-dashboard-page {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

.diet-dashboard-hero {
  background: linear-gradient(to bottom, #6ea6e7 0%, #daeffe 50%, #e0d3ff 80%);
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

.prescription-info-section {
  padding: 16px;
}

.why-upload h2 {
  font-size: 1rem;
  font-weight: 700;
  color: #0172d0;
  margin-bottom: 12px;
}

.why-upload p {
  font-size: 0.9rem;
  color: #555;
  margin-bottom: 10px;
  line-height: 1.4;
}

.no-prescription {
  text-align: center;
}

.no-prescription h2 {
  font-size: 1rem;
  font-weight: 600;
  color: #0172d0;
  text-align: left;
}

.consult-doctor-card {
  position: relative;
  display: flex;
  align-items: center;
  background: linear-gradient(to bottom, #6ea6e7 0%, #e0d3ff 60%);
  padding: 20px 12px 12px 12px; /* Extra top padding for image pop-out */
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  max-width: 100%;
  margin-top: 1rem;
}

.consult-doctor-image {
  position: absolute;
  top: 2px; /* Image pops out from the top */
  left: 12px;
}

.consult-doctor-image img {
  width: 115px; /* Slightly larger for pop-out effect */
  height: auto;
}

.consult-doctor-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 120px; /* Enough space for the popped-out image */
}

.consult-doctor-content h1 {
  font-size: 1.2rem;
  margin-bottom: 6px;
  color: #1e3a8a;
}

.consult-doctor-content p {
  font-size: 0.85rem;
  color: #334155;
  margin-bottom: 10px;
}

.consult-button {
  background-color: #2563eb;
  color: white;
  border: none;
  padding: 8px 16px;
  font-size: 0.9rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.consult-button:hover {
  background-color: #1e40af;
}

.backdrop-panel {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  animation: fadeIn 0.3s ease forwards;
}

.backdrop-content {
  background: #fff;
  padding: 32px 24px;
  border-radius: 16px;
  text-align: center;
  max-width: 90%;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  animation: slideUp 0.4s ease forwards;
}

.success-icon {
  font-size: 48px;
  color: #34d399; /* Green success color */
  margin-bottom: 16px;
}

.backdrop-content h2 {
  font-size: 1.2rem;
  font-weight: 700;
  color: #1e3a8a;
  margin-bottom: 12px;
}

.backdrop-content p {
  font-size: 1rem;
  color: #555;
  line-height: 1.5;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
`}
      </style>
    </div>
  );
};

export default UploadPrescription;
