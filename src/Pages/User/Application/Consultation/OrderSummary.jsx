import React, { useState } from "react";
import {
  FiArrowLeft,
  FiUpload,
  FiLock,
  FiTag,
  FiEdit,
  FiCheck,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import DoctorProf from "../../../../assets/doctorlist1.png";
import AppButton from "../../../../Components/AppButton";

const OrderSummary = () => {
  const [patientName, setPatientName] = useState("Sakshi Nishad");
  const [patientPhone, setPatientPhone] = useState("8169928844");
  const [patientEmail, setPatientEmail] = useState("sample@example.com");
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingContact, setIsEditingContact] = useState(false);
  const [consultationMode, setConsultationMode] = useState("online");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLockerShared, setIsLockerShared] = useState(false);
  const [couponCode, setCouponCode] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleConsultationModeChange = (mode) => {
    setConsultationMode(mode);
  };

  const handleCouponApply = () => {
    // Coupon application logic would go here
    console.log("Applying coupon:", couponCode);
  };

  return (
    <div className="consultation-summary-page">
      {/* Hero section remains unchanged */}
      <div className="consultation-summary-hero">
        <div className="hero-top-bar">
          <button
            className="icon-button"
            onClick={() => window.history.back()}
            aria-label="Go back"
          >
            <FiArrowLeft className="hero-icon" />
          </button>
          <h1 className="hero-title">Order Summary</h1>
        </div>
      </div>

      <div className="appointment-container">
        {/* Doctor Info */}
        <div className="doctor-card">
          <img src={DoctorProf} alt="Doctor" className="doctor-avatar" />
          <div className="doctor-info">
            <h2 className="doctor-name">Dr. Kavita Madhuri</h2>
            <p className="doctor-qualification">MBBS, MD</p>
            <div className="doctor-meta">
              <span className="badge">Reg No. 7992</span>
              <span className="badge">10 years exp</span>
            </div>
          </div>
        </div>

        {/* Appointment Details */}
        <div className="details-section">
          <div className="detail-card">
            <div className="detail-icon">📅</div>
            <div className="detail-content">
              <h4 className="detail-label">Booked On</h4>
              <p className="detail-value">Saturday, 28th Jun 09:00 am</p>
            </div>
          </div>

          {/* Editable Patient Name */}
          <div className="detail-card">
            <div className="detail-icon">👤</div>
            <div className="detail-content">
              <div className="detail-header">
                <h4 className="detail-label">Patient Name</h4>
                <button
                  className="edit-btn"
                  onClick={() => setIsEditingName(!isEditingName)}
                >
                  {isEditingName ? <FiCheck /> : <FiEdit />}
                </button>
              </div>
              {isEditingName ? (
                <input
                  type="text"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="edit-input"
                />
              ) : (
                <p className="detail-value">{patientName}</p>
              )}
            </div>
          </div>

          {/* Editable Patient Contact */}
          <div className="detail-card">
            <div className="detail-icon">📱</div>
            <div className="detail-content">
              <div className="detail-header">
                <h4 className="detail-label">Patient Contact</h4>
                <button
                  className="edit-btn"
                  onClick={() => setIsEditingContact(!isEditingContact)}
                >
                  {isEditingContact ? <FiCheck /> : <FiEdit />}
                </button>
              </div>
              {isEditingContact ? (
                <>
                  <input
                    type="tel"
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                    className="edit-input"
                    placeholder="Phone number"
                  />
                  <input
                    type="email"
                    value={patientEmail}
                    onChange={(e) => setPatientEmail(e.target.value)}
                    className="edit-input"
                    placeholder="Email"
                  />
                </>
              ) : (
                <>
                  <p className="detail-value">{patientPhone}</p>
                  <p className="detail-value">{patientEmail}</p>
                </>
              )}
            </div>
          </div>

          {/* Consultation Mode */}
          <div className="detail-card">
            <div className="detail-icon">💻</div>
            <div className="detail-content">
              <h4 className="detail-label">Mode of Consultation</h4>
              <div className="mode-selector">
                <button
                  className={`mode-option ${
                    consultationMode === "online" ? "active" : ""
                  }`}
                  onClick={() => handleConsultationModeChange("online")}
                >
                  Online
                </button>
                <button
                  className={`mode-option ${
                    consultationMode === "clinic" ? "active" : ""
                  }`}
                  onClick={() => handleConsultationModeChange("clinic")}
                >
                  In Clinic
                </button>
              </div>
            </div>
          </div>

          {/* Attachments */}
          <div className="detail-card">
            <div className="detail-icon">
              <FiUpload />
            </div>
            <div className="detail-content">
              <h4 className="detail-label">Attach Reports</h4>
              <div className="file-uploader">
                <label className="upload-btn">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept=".pdf,.jpg,.jpeg,.png"
                    style={{ display: "none" }}
                  />
                  <FiUpload />{" "}
                  {selectedFile ? selectedFile.name : "Choose File"}
                </label>
                <span className="file-hint">PDF, JPG, PNG up to 5MB</span>
              </div>
            </div>
          </div>

          {/* Locker Access */}
          <div className="detail-card">
            <div className="detail-icon">
              <FiLock />
            </div>
            <div className="detail-content">
              <h4 className="detail-label">Share Locker Access</h4>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={isLockerShared}
                  onChange={() => setIsLockerShared(!isLockerShared)}
                />
                <span className="slider"></span>
              </label>
            </div>
          </div>

          {/* Coupon */}
          <div className="detail-card">
            <div className="detail-icon">
              <FiTag />
            </div>
            <div className="detail-content">
              <h4 className="detail-label">Apply Coupon</h4>
              <div className="coupon-input">
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />
                <button className="apply-btn" onClick={handleCouponApply}>
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Billing Summary */}
        <div className="billing-summary">
          <h3 className="billing-title">Bill Summary</h3>
          <div className="bill-row">
            <span>Consultation Fee</span>
            <span>₹599</span>
          </div>
          <div className="bill-row discount">
            <span>Price Discount</span>
            <span>-₹150</span>
          </div>
          <div className="bill-row total">
            <span>Total Amount</span>
            <span>₹449</span>
          </div>
        </div>

        {/* Payment Section */}
        <div className="payment-section">
          <div className="payment-total">
            <span>Total Payable</span>
            <span className="amount">₹449</span>
          </div>
          <AppButton text={"Proceed to Payment"} />
        </div>
      </div>

      <style>
        {`/* Modern CSS Styles */
.consultation-summary-page {
  background-color: #f5f7fa;
  min-height: 100vh;
  color: #2d3748;
}

/* Hero section remains unchanged */
.consultation-summary-hero {
  background: linear-gradient(to bottom, #4a90e2, #8c60e2);
  padding: 20px;
  border-radius: 0 0 32px 32px;
  color: white;
  position: relative;
  box-shadow: 0 10px 30px rgba(74, 144, 226, 0.2);
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
  color: white;
}

.hero-title {
  font-size: 1rem;
  font-weight: 500;
  margin: 0;
  flex: 1;
  line-height: 1.2;
}

/* Main container */
.appointment-container {
  max-width: 500px;
  margin: 2rem 0 10rem;
  padding: 0 1rem;
}

/* Doctor card */
.doctor-card {
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  gap: 1.25rem;
}

.doctor-avatar {
  width: 80px;
  height: 80px;
  border-radius: 12px;
  object-fit: cover;
  border: 2px solid #e2e8f0;
}

.doctor-name {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 0.25rem;
  color: #1a202c;
}

.doctor-qualification {
  color: #4a5568;
  margin: 0 0 0.75rem;
  font-size: 0.9rem;
}

.doctor-meta {
  display: flex;
  gap: 0.5rem;
}

.badge {
  background: #edf2f7;
  color: #4a5568;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 500;
}

/* Details section */
.details-section {
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.detail-card {
  display: flex;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid #edf2f7;
}

.detail-card:last-child {
  border-bottom: none;
}

.detail-icon {
  width: 40px;
  height: 40px;
  background: #f8fafc;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4a90e2;
  font-size: 1.1rem;
  flex-shrink: 0;
}

.detail-content {
  flex-grow: 1;
  width: calc(100% - 56px);
}

.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.edit-btn {
  background: transparent;
  border: none;
  color: #8c60e2;
  cursor: pointer;
  font-size: 1rem;
  padding: 0.25rem;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.edit-btn:hover {
  background: rgba(140, 96, 226, 0.1);
}

.edit-input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.edit-input:focus {
  outline: none;
  border-color: #8c60e2;
  box-shadow: 0 0 0 2px rgba(140, 96, 226, 0.2);
}

.detail-label {
  font-size: 0.85rem;
  font-weight: 500;
  color: #718096;
  margin: 0 0 0.25rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.detail-value {
  font-size: 1rem;
  font-weight: 500;
  color: #2d3748;
  margin: 0;
}

/* Mode selector */
.mode-selector {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.mode-option {
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  background: white;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  flex: 1;
}

.mode-option.active {
  background: linear-gradient(to right, #4a90e2, #8c60e2);
  color: white;
  border-color: transparent;
  box-shadow: 0 2px 8px rgba(74, 144, 226, 0.3);
}

/* File uploader */
.file-uploader {
  margin-top: 0.5rem;
}

.upload-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: #f8fafc;
  border: 1px dashed #cbd5e0;
  border-radius: 8px;
  color: #4a5568;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;
  justify-content: center;
}

.upload-btn:hover {
  background: #edf2f7;
  border-color: #8c60e2;
  color: #8c60e2;
}

.file-hint {
  display: block;
  font-size: 0.75rem;
  color: #718096;
  margin-top: 0.25rem;
}

/* Toggle switch */
.toggle-switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
  margin-top: 0.5rem;
}

.toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #e2e8f0;
  transition: 0.4s;
  border-radius: 24px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #8c60e2;
}

input:checked + .slider:before {
  transform: translateX(26px);
}

/* Coupon input */
.coupon-input {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.coupon-input input {
  flex-grow: 1;
  padding: 5px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 13px;
}

.coupon-input input:focus {
  outline: none;
  border-color: #8c60e2;
}

.apply-btn {
  padding: 0.5rem 1rem;
  background: linear-gradient(to right, #4a90e2, #8c60e2);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.apply-btn:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

/* Billing summary */
.billing-summary {
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.billing-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 1rem;
  color: #1a202c;
}

.bill-row {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  font-size: 0.95rem;
}

.bill-row.discount {
  color: #38a169;
}

.bill-row.total {
  font-weight: 600;
  font-size: 1.1rem;
  border-top: 1px solid #edf2f7;
  padding-top: 1rem;
  margin-top: 0.5rem;
}

/* Payment section */
.payment-section {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: white;
  border-top: 1px solid #e0e0e0;
  border-radius: 16px 16px 0 0;
  padding: 1.5rem 2rem;
  box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.08);
  z-index: 1000;
  text-align: center;
}

.payment-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
  font-weight: 600;
}

.amount {
  font-size: 1.4rem;
  background: linear-gradient(to right, #4a90e2, #8c60e2);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.secure-payment {
  text-align: center;
  font-size: 0.8rem;
  color: #718096;
  margin-top: 1rem;
}
`}
      </style>
    </div>
  );
};

export default OrderSummary;
