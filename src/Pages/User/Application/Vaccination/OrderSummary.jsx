import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiEdit2,
  FiMapPin,
  FiPhone,
  FiUser,
} from "react-icons/fi";
import AppButton from "../../../../Components/AppButton";
import SchedulingTray from "./SchedulingTray"; // adjust path as needed

const OrderSummary = () => {
  const [dose] = useState("1st Dose"); // fixed dose
  const [qty, setQty] = useState(1);
  const navigate = useNavigate();

  // Location states
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [userAddresses, setUserAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);

  // Schedule states
  const [showSchedulingTray, setShowSchedulingTray] = useState(false);
  const [schedule, setSchedule] = useState(""); // empty by default

  useEffect(() => {
    // Load addresses from localStorage
    const storedAddresses = localStorage.getItem("userAddresses");
    if (storedAddresses) {
      try {
        const parsedAddresses = JSON.parse(storedAddresses);
        setUserAddresses(parsedAddresses);
        if (parsedAddresses.length > 0) {
          setSelectedAddress(parsedAddresses[0]);
        }
      } catch (e) {
        console.error("Error parsing addresses", e);
      }
    }
  }, []);

  const handleAddressSave = () => setIsEditingAddress(false);

  const formatAddress = (address) => {
    if (!address) return "";
    const { details, address: mainAddress } = address;
    return [
      details.houseBlockName,
      details.houseNoFloor,
      mainAddress,
      details.landmark && `Near ${details.landmark}`,
    ]
      .filter(Boolean)
      .join(", ");
  };

  const handleTimeSelected = (selectedTime) => {
    setSchedule(selectedTime);
    setShowSchedulingTray(false);
  };

  return (
    <div className="vaccination-summary-page">
      {/* Header */}
      <div className="vaccination-summary-hero">
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

      <div className="vaccination-container">
        {/* Vaccine Card */}
        <div className="vaccine-card">
          <div className="vaccine-badge">Recommended</div>
          <div className="vaccine-header">
            <h2 className="vaccine-name">HPV Vaccine (Gardasil 9)</h2>
            <div className="price-tag">₹449/dose</div>
          </div>
          <p className="vaccine-description">
            Gardasil 9 helps protect against 9 types of HPV that can cause
            cervical, vulvar, vaginal, and anal cancers, as well as genital
            warts.
          </p>

          {/* Options */}
          <div className="vaccine-options">
            <div className="form-group">
              <label className="detail-label">Dose</label>
              <div className="select-wrapper">
                <select
                  value={dose}
                  disabled
                  className="styled-select styled-select-disabled"
                >
                  <option>1st Dose</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="detail-label">Quantity</label>
              <div className="qty-selector">
                <button
                  className="qty-btn"
                  onClick={() => qty > 1 && setQty(qty - 1)}
                  disabled={qty <= 1}
                >
                  −
                </button>
                <span className="qty-value">{qty}</span>
                <button className="qty-btn" onClick={() => setQty(qty + 1)}>
                  +
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Info Sections */}
        <div className="info-sections-container">
          {/* Preparations */}
          <div className="details-section">
            <div className="section-header">
              <div className="section-icon">🛠️</div>
              <h3 className="section-title">Preparations</h3>
            </div>
            <ul className="custom-list">
              <li>
                <span className="list-icon">💧</span>
                <span>Stay hydrated before the appointment</span>
              </li>
              <li>
                <span className="list-icon">👕</span>
                <span>Wear loose clothing for easy access to the arm</span>
              </li>
              <li>
                <span className="list-icon">⚠️</span>
                <span>Inform the healthcare provider of any allergies</span>
              </li>
            </ul>
          </div>

          {/* Vaccine Specifications */}
          <div className="details-section">
            <div className="section-header">
              <div className="section-icon">🔬</div>
              <h3 className="section-title">Vaccine Specifications</h3>
            </div>
            <div className="spec-grid">
              <div className="spec-item">
                <div className="spec-label">Manufacturer</div>
                <div className="spec-value">Merck & Co.</div>
              </div>
              <div className="spec-item">
                <div className="spec-label">Type</div>
                <div className="spec-value">Recombinant, 9-valent</div>
              </div>
              <div className="spec-item">
                <div className="spec-label">Storage</div>
                <div className="spec-value">2°C to 8°C</div>
              </div>
              <div className="spec-item">
                <div className="spec-label">Route</div>
                <div className="spec-value">Intramuscular injection</div>
              </div>
            </div>
          </div>

          {/* Collector */}
          <div className="details-section">
            <div className="section-header">
              <div className="section-icon">👩‍⚕️</div>
              <h3 className="section-title">Who Will Collect Your Sample</h3>
            </div>
            <div className="collector-card">
              <div className="collector-icon">🏥</div>
              <div className="collector-details">
                <div className="collector-name">
                  Certified nurse from Hyperlink Health
                </div>
                <div className="collector-description">
                  Will visit your home at scheduled time
                </div>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="details-section">
            <div className="section-header">
              <div className="section-icon">📍</div>
              <div className="location-header">
                <h3 className="section-title">Location</h3>
                <button
                  className="edit-btn"
                  onClick={() => navigate("/app/user/add-location")}
                >
                  <FiEdit2 />
                  <span>Change</span>
                </button>
              </div>
            </div>

            {selectedAddress ? (
              <div className="address-card selected">
                <div className="address-icon">
                  <FiMapPin />
                </div>
                <div className="address-details">
                  <div className="address-label">
                    {selectedAddress.details.addressLabel}
                  </div>
                  <div className="address-text">
                    {formatAddress(selectedAddress)}
                  </div>

                  <div className="address-contact">
                    <div className="contact-item">
                      <FiUser className="contact-icon" />
                      <span>{selectedAddress.details.receiverName}</span>
                    </div>
                    <div className="contact-item">
                      <FiPhone className="contact-icon" />
                      <span>{selectedAddress.details.phoneNumber}</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div
                className="address-card empty"
                onClick={() => navigate("/app/user/add-location")}
              >
                <div className="address-icon empty-icon">🏠</div>
                <div className="add-address-content">
                  <div className="add-address-text">Add Delivery Address</div>
                  <div className="add-address-subtext">
                    Select where you want to receive the service
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Schedule */}
          <div className="details-section">
            <div className="section-header">
              <div className="section-icon">🗓️</div>
              <div className="schedule-header">
                <h3 className="section-title">Schedule</h3>
                <button
                  className="edit-btn"
                  onClick={() => setShowSchedulingTray(true)}
                >
                  <FiEdit2 />
                  <span>{schedule ? "Edit" : "Add"}</span>
                </button>
              </div>
            </div>
            <div
              className={`address-card ${!schedule ? "empty" : ""}`}
              onClick={() => setShowSchedulingTray(true)}
            >
              <div className="address-icon">⏰</div>
              <div className="address-text">
                {schedule || "Click to Add Schedule"}
              </div>
            </div>
          </div>
        </div>

        {/* Billing Summary */}
        <div className="billing-summary">
          <h3 className="billing-title">Amount Summary</h3>
          <div className="bill-items">
            <div className="bill-row">
              <span>HPV Vaccine x{qty}</span>
              <span>₹{qty * 449}</span>
            </div>
            <div className="bill-row">
              <span>Service Charge</span>
              <span>₹0</span>
            </div>
            <div className="bill-row discount">
              <span>Discount</span>
              <span>-₹0</span>
            </div>
          </div>
          <div className="bill-row total">
            <span>Total Payable</span>
            <span>₹{qty * 449}</span>
          </div>
        </div>
      </div>

      {/* Payment Section */}
      <div className="vaccination-payment-section">
        <div className="vaccination-payment-total">
          <span>Total Payable</span>
          <span className="amount">₹{qty * 449}</span>
        </div>
        <AppButton
          text={"Proceed to Payment"}
          disabled={!selectedAddress || !schedule}
          onClick={() => {
            if (!selectedAddress) {
              alert("Please add a delivery address");
              return;
            }
            if (!schedule) {
              alert("Please select a schedule");
              return;
            }
            // Proceed to payment
          }}
        />
      </div>

      {/* Scheduling Tray */}
      {showSchedulingTray && (
        <SchedulingTray
          onClose={() => setShowSchedulingTray(false)}
          onTimeSelected={handleTimeSelected}
        />
      )}
      <style>
        {`
        /* Modern CSS Styles */
.vaccination-summary-page {
  background-color: #f8fafc;
  min-height: 100vh;
  color: #1e293b;
  padding-bottom: 120px;
}

/* Hero section (unchanged) */
.vaccination-summary-hero {
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
.vaccination-container {
  padding: 20px;
  max-width: 900px;
  margin: 1rem 0 2rem;
}

/* Vaccine Card */
.vaccine-card {
  background: white;
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
  margin-bottom: 24px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  position: relative;
  border: 1px solid #f1f5f9;
}

.vaccine-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.08);
}

.vaccine-badge {
  position: absolute;
  top: -10px;
  right: 20px;
  background: #10b981;
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  box-shadow: 0 4px 8px rgba(16, 185, 129, 0.2);
}

.vaccine-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
}

.vaccine-name {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
  line-height: 1.3;
}

.price-tag {
  background: #f0f9ff;
  color: #0ea5e9;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
}

.vaccine-description {
  font-size: 0.95rem;
  color: #64748b;
  margin-top: 8px;
  line-height: 1.5;
}

/* Vaccine Options */
.vaccine-options {
  display: flex;
  gap: 20px;
  margin-top: 24px;
}

.form-group {
  flex: 1;
}

.detail-label {
  font-size: 0.85rem;
  color: #64748b;
  margin-bottom: 8px;
  display: block;
  font-weight: 500;
}

.select-wrapper {
  position: relative;
}

.styled-select {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  font-size: 0.95rem;
  outline: none;
  transition: all 0.2s ease;
  appearance: none;
  background-color: white;
  color: #1e293b;
}

.styled-select:focus {
  border-color: #60a5fa;
  box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.2);
}

.styled-select-disabled {
  background-color: #f1f5f9; /* light grey background */
  color: #475569; /* slightly muted text */
  cursor: not-allowed;
  border-color: #cbd5e1;
}

.qty-selector {
  display: flex;
  align-items: center;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  overflow: hidden;
  height: 44px;
}

.qty-btn {
  width: 40px;
  height: 100%;
  background: #f8fafc;
  border: none;
  font-size: 1.2rem;
  color: #475569;
  cursor: pointer;
  transition: background 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.qty-btn:hover {
  background: #f1f5f9;
}

.qty-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.qty-value {
  flex: 1;
  text-align: center;
  font-weight: 500;
}

/* Info Sections Container */
.info-sections-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* Details Sections */
.details-section {
  background: white;
  padding: 20px;
  border-radius: 14px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
  border: 1px solid #f1f5f9;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.section-icon {
  font-size: 1.2rem;
  background: #f0f9ff;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #0ea5e9;
}

.section-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
  color: #1e293b;
}

/* Custom List */
.custom-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.custom-list li {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.95rem;
  color: #475569;
  line-height: 1.5;
}

.list-icon {
  flex-shrink: 0;
}

/* Specifications Grid */
.spec-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.spec-item {
  background: #f8fafc;
  padding: 12px;
  border-radius: 8px;
}

.spec-label {
  font-size: 0.8rem;
  color: #64748b;
  margin-bottom: 4px;
}

.spec-value {
  font-size: 0.95rem;
  font-weight: 500;
  color: #1e293b;
}

/* Collector Card */
.collector-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: #f8fafc;
  border-radius: 10px;
}

.collector-icon {
  font-size: 1.5rem;
  background: #e0f2fe;
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #0ea5e9;
}

.collector-details {
  flex: 1;
}

.collector-name {
  font-weight: 500;
  color: #1e293b;
  margin-bottom: 2px;
}

.collector-description {
  font-size: 0.85rem;
  color: #64748b;
}

/* Location Section */
.location-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
}
/* Location Section */
.schedule-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
}

.edit-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
  color: #3b82f6;
  padding: 4px 8px;
  border-radius: 6px;
  transition: background 0.2s ease;
}

.edit-btn:hover {
  background: #eff6ff;
}

.edit-btn span {
  font-size: 0.85rem;
  font-weight: 500;
}

.edit-input {
  width: 100%;
  padding: 12px 16px;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
  font-size: 0.95rem;
  margin-top: 8px;
  transition: all 0.2s ease;
}

.edit-input:focus {
  border-color: #60a5fa;
  box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.2);
  outline: none;
}
.address-card {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 14px;
  background: #f8fafc;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
  transition: box-shadow 0.2s ease;
}
.address-card.selected:hover {
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.08);
}

.address-icon {
  font-size: 1.4rem;
  color: #64748b;
}

.address-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.address-label {
  font-size: 0.9rem;
  font-weight: 600;
  color: #0f172a;
}

.address-text {
  font-size: 0.95rem;
  line-height: 1.4;
  color: #334155;
}

.address-contact {    display: flex
;
    gap: .5rem;
    margin-top: 6px;
    flex-direction: column;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.9rem;
  color: #475569;
}

.contact-icon {
  color: #94a3b8;
  font-size: 1rem;
}

.delivery-instructions {
  margin-top: 6px;
  font-size: 0.85rem;
  color: #475569;
}

.address-card.empty {
  cursor: pointer;
  align-items: center;
  justify-content: center;
  text-align: center;
  border: 2px dashed #cbd5e1;
  background: #f1f5f9;
  transition: background 0.2s ease;
}
.address-card.empty:hover {
  background: #e2e8f0;
}

.empty-icon {
  font-size: 1.8rem;
}

.add-address-text {
  font-size: 1rem;
  font-weight: 500;
  color: #0f172a;
}

.add-address-subtext {
  font-size: 0.85rem;
  color: #64748b;
}

/* Billing Summary */
.billing-summary {
  background: white;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.05);
  margin: 24px 0;
  border: 1px solid #f1f5f9;
}

.billing-title {
  font-weight: 600;
  margin-bottom: 16px;
  font-size: 1.1rem;
  color: #1e293b;
}

.bill-items {
  margin-bottom: 12px;
}

.bill-row {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  font-size: 0.95rem;
  color: #475569;
}

.bill-row.discount {
  color: #10b981;
}

.bill-row.total {
  font-weight: 700;
  font-size: 1.1rem;
  color: #1e293b;
  padding: 12px 0;
  border-top: 1px solid #f1f5f9;
  margin-top: 8px;
}

/* FAQ Section */
.faq-section {
  background: white;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.05);
  border: 1px solid #f1f5f9;
}

.faq-item {
  padding: 16px 0;
  border-bottom: 1px solid #f1f5f9;
}

.faq-item:last-child {
  border-bottom: none;
}

.faq-question {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  font-weight: 500;
  color: #1e293b;
}

.faq-answer {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  color: #475569;
  font-size: 0.95rem;
  line-height: 1.5;
}

.faq-q,
.faq-a {
  font-weight: 600;
}

.faq-q {
  color: #3b82f6;
}

.faq-a {
  color: #10b981;
}

/* Payment section (unchanged) */
.vaccination-payment-section {
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

.vaccination-payment-total {
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

.empty-address {
  background-color: #f8fafc;
  border: 1px dashed #94a3b8;
  cursor: pointer;
  color: #64748b;
  display: flex;
  align-items: center;
}

.empty-address:hover {
  background-color: #f1f5f9;
}
`}
      </style>
    </div>
  );
};

export default OrderSummary;
