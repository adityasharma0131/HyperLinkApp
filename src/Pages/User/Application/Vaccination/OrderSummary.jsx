import React, { useState } from "react";
import { FiArrowLeft, FiEdit2 } from "react-icons/fi";
import AppButton from "../../../../Components/AppButton";

const OrderSummary = () => {
  const [dose] = useState("1st Dose"); // fixed dose
  const [qty, setQty] = useState(1);

  // Location states
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [address, setAddress] = useState(""); // empty by default

  // Schedule states
  const [isEditingSchedule, setIsEditingSchedule] = useState(false);
  const [schedule, setSchedule] = useState(""); // empty by default

  const handleAddressSave = () => setIsEditingAddress(false);
  const handleScheduleSave = () => setIsEditingSchedule(false);

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
                  onClick={() => setIsEditingAddress(!isEditingAddress)}
                >
                  <FiEdit2 />
                  <span>Change</span>
                </button>
              </div>
            </div>
            {isEditingAddress ? (
              <input
                type="text"
                placeholder="Enter your address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                onBlur={handleAddressSave}
                className="edit-input"
                autoFocus
              />
            ) : (
              <div
                className={`address-card ${!address ? "empty-address" : ""}`}
                onClick={() => !address && setIsEditingAddress(true)}
              >
                <div className="address-icon">🏠</div>
                <div className="address-text">
                  {address || "Click to Add Address"}
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
                  onClick={() => setIsEditingSchedule(!isEditingSchedule)}
                >
                  <FiEdit2 />
                  <span>{schedule ? "Edit" : "Add"}</span>
                </button>
              </div>
            </div>
            {isEditingSchedule ? (
              <input
                type="datetime-local"
                value={schedule}
                onChange={(e) => setSchedule(e.target.value)}
                onBlur={handleScheduleSave}
                className="edit-input"
                autoFocus
              />
            ) : (
              <div
                className={`address-card ${!schedule ? "empty-address" : ""}`}
                onClick={() => !schedule && setIsEditingSchedule(true)}
              >
                <div className="address-icon">⏰</div>
                <div className="address-text">
                  {schedule
                    ? new Date(schedule).toLocaleString()
                    : "Click to Add Schedule"}
                </div>
              </div>
            )}
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
        <AppButton text={"Proceed to Payment"} />
      </div>
    </div>
  );
};

export default OrderSummary;
