import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FiArrowLeft,
  FiInfo,
  FiPlus,
  FiMinus,
  FiEdit2,
  FiMapPin,
  FiUser,
  FiPhone,
} from "react-icons/fi";
import { FaSyringe } from "react-icons/fa";

import SchedulingTray from "../Vaccination/SchedulingTray";
import BookingDetailTray from "../LabTest/BookingDetailTray";

const VaccinationCart = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const trayRef = useRef();

  const passedData = location.state; // vaccineName, price, doses, tag

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [schedule, setSchedule] = useState(null);
  const [showSchedulingTray, setShowSchedulingTray] = useState(false);
  const [showBookingTray, setShowBookingTray] = useState(false);
  const [userAddresses, setUserAddresses] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [cartLoaded, setCartLoaded] = useState(false);

  // Load addresses + cart
  useEffect(() => {
    const storedAddresses = localStorage.getItem("userAddresses");
    if (storedAddresses) {
      try {
        const parsed = JSON.parse(storedAddresses);
        setUserAddresses(parsed);
        if (parsed.length > 0) setSelectedAddress(parsed[0]);
      } catch (e) {
        console.error("Error parsing addresses", e);
      }
    }

    const storedCart = localStorage.getItem("vaccineCart");
    let updatedCart = [];

    if (storedCart) {
      updatedCart = JSON.parse(storedCart);
    }

    if (passedData) {
      const newItem = {
        title: `${passedData.vaccineName} Vaccine`,
        doseInfo: `${passedData.doses} dose(s)`,
        protection: passedData.tag || "General Protection",
        price: passedData.price,
        original: passedData.price,
        offer: "Best Price",
        qty: 1,
      };

      // Only add if it's not already present
      const exists = updatedCart.some((item) => item.title === newItem.title);
      if (!exists) {
        updatedCart.push(newItem);
      }
    }

    setCartItems(updatedCart);
    setCartLoaded(true);
  }, [passedData]);

  // Persist cart
  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem("vaccineCart", JSON.stringify(cartItems));
    } else {
      localStorage.removeItem("vaccineCart");
    }
  }, [cartItems]);

  // Go back if cart is empty after loading
  useEffect(() => {
    if (cartLoaded && cartItems.length === 0) {
      navigate(-1);
    }
  }, [cartLoaded, cartItems, navigate]);

  const formatAddress = (address) => {
    if (!address || !address.details) return "";
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

  const handleTimeSelected = (time) => {
    setSchedule(time);
    setShowSchedulingTray(false);
  };
  const handleIncrement = (idx) => {
    setCartItems((prev) =>
      prev.map((item, i) =>
        i === idx ? { ...item, qty: Math.min(Number(item.qty) + 1, 5) } : item
      )
    );
  };

  const handleDecrement = (idx) => {
    setCartItems((prev) => {
      const updated = [...prev];
      const currentQty = Number(updated[idx].qty) || 1;

      if (currentQty > 1) {
        updated[idx] = { ...updated[idx], qty: currentQty - 1 };
      } else {
        updated.splice(idx, 1);
      }

      return updated;
    });
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );
  const originalTotal = cartItems.reduce(
    (acc, item) => acc + item.original * item.qty,
    0
  );
  const discount = originalTotal - subtotal;

  return (
    <div className="vaccine-cart-page">
      {/* Hero */}
      <div className="vaccine-cart-hero">
        <div className="hero-top-bar">
          <div className="hero-left">
            <button className="icon-button" onClick={() => navigate(-1)}>
              <FiArrowLeft className="hero-icon" />
            </button>
            <h2 className="hero-title">
              {cartItems[0]?.title?.toUpperCase() || "VACCINE CART"}
            </h2>
          </div>
        </div>
      </div>

      <div className="vaccine-content-container">
        {/* Vaccine Card */}
        <div className="test-card-section">
          <div className="section-header">
            <h2 className="section-heading">
              Vaccine Selected ({cartItems.length})
            </h2>
            <button className="info-button">
              <FiInfo />
            </button>
          </div>

          <div className="test-card-container">
            {cartItems.map((item, idx) => (
              <div className="test-card" key={idx}>
                <div className="vaccine-icon-container">
                  <div className="test-icon-bg">
                    <FaSyringe className="test-icon" />
                  </div>
                </div>

                <div className="test-details">
                  <h3 className="test-title">{item.title}</h3>
                  <div className="test-meta">
                    <div className="test-meta-content">
                      <span className="test-report-time">{item.doseInfo}</span>
                      <span className="test-fasting">{item.protection}</span>

                      <div className="price-container">
                        <div className="price-section">
                          <span className="discounted-price">
                            ₹{item.price}
                          </span>
                          <span className="original-price">
                            ₹{item.original}
                          </span>
                          <span className="offer">{item.offer}</span>
                        </div>
                      </div>
                    </div>

                    <div className="patient-selector">
                      <div className="quantity-controls">
                        <button
                          className="quantity-btn"
                          onClick={() => handleDecrement(idx)}
                        >
                          <FiMinus />
                        </button>
                        <span className="quantity-display">{item.qty}</span>
                        <button
                          className="quantity-btn"
                          onClick={() => handleIncrement(idx)}
                        >
                          <FiPlus />
                        </button>
                      </div>
                      <span className="patient-label">Recipient(s)</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Address */}
        <div className="details-section">
          <div className="section-header">
            <div className="section-icon">📍</div>
            <div className="cart-location-header">
              <h3 className="section-title">Vaccination Location</h3>
              <button
                className="edit-btn"
                onClick={() => navigate("/app/vaccination/add-location")}
              >
                <FiEdit2 />
                <span>{selectedAddress ? "Change" : "Add"}</span>
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
              onClick={() => navigate("/app/vaccination/add-location")}
            >
              <div className="address-icon empty-icon">🏠</div>
              <div className="add-address-content">
                <div className="add-address-text">Add Vaccination Address</div>
                <div className="add-address-subtext">
                  Select where you want to get vaccinated
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

        {showSchedulingTray && (
          <div
            className="scheduling-tray-overlay"
            onClick={(e) =>
              e.target.classList.contains("scheduling-tray-overlay") &&
              setShowSchedulingTray(false)
            }
            ref={trayRef}
          >
            <SchedulingTray
              onClose={() => setShowSchedulingTray(false)}
              onTimeSelected={handleTimeSelected}
            />
          </div>
        )}

        {/* Billing */}
        <div className="billing-summary">
          <h3 className="billing-title">Bill Summary</h3>
          <div className="bill-row">
            <span>Original Price</span>
            <span>₹{originalTotal}</span>
          </div>
          <div className="bill-row discount">
            <span>Discount</span>
            <span>-₹{discount}</span>
          </div>
          <div className="bill-row total">
            <span>Total Amount</span>
            <span>₹{subtotal}</span>
          </div>
        </div>
      </div>

      {!showSchedulingTray && (
        <div className="vaccine-payment-section">
          <div className="vaccine-payment-total">
            <span>Total Payable</span>
            <span className="amount">₹{subtotal}</span>
          </div>
          <button
            className="continue-btn"
            onClick={() => setShowBookingTray(true)}
          >
            Continue
          </button>
        </div>
      )}

      {showBookingTray && (
        <BookingDetailTray onClose={() => setShowBookingTray(false)} />
      )}

      <style>
        {`


         /* === Updated CSS === */
        .vaccine-cart-page {
          min-height: 100vh;
          background: #f8fafc;
          display: flex;
          flex-direction: column;
        }

        .vaccine-cart-hero {
          background: linear-gradient(to bottom, #6ea6e7 0%, #daeffe 50%, #e0d3ff 80%);
          padding: 20px;
          border-radius: 0 0 32px 32px;
          color: white;
          box-shadow: 0 10px 30px rgba(74, 144, 226, 0.2);
        }

        .vaccine-content-container {
          flex: 1;
          padding: 24px 16px 140px;
          max-width: 600px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        /* rest of your CSS stays same as before... just replace .labtest-* with .vaccine-* */
        .vaccine-payment-section {
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;
          background: white;
          border-top: 1px solid #e0e0e0;
          border-radius: 16px 16px 0 0;
          padding: 1rem;
          box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.08);
          z-index: 1000;
          text-align: center;
        }

        .vaccine-payment-total {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          font-size: 1.1rem;
          font-weight: 600;
        }


      .labtest-cart-page {
  min-height: 100vh;
  background: #f8fafc;
  display: flex;
  flex-direction: column;
}

/* -------- Hero Section -------- */
.labtest-cart-hero {
  background: linear-gradient(to bottom, #6ea6e7 0%, #daeffe 50%, #e0d3ff 80%);
  padding: 20px;
  border-radius: 0 0 32px 32px;
  color: white;
  box-shadow: 0 10px 30px rgba(74, 144, 226, 0.2);
}
.hero-top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.hero-left {
  display: flex;
  align-items: center;
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
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  line-height: 1.2;
  color: #553fb5;
}

/* Content Container */
.labtest-content-container {
  flex: 1;
  padding: 24px 16px 140px;
  max-width: 600px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* Test Card Section */
.test-card-section {
  background: #ffffff;
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #f1f5f9;
}

.section-heading {
  font-size: 18px;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
}

.info-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: none;
  background: #f1f5f9;
  color: #64748b;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.info-button:hover {
  background: #e2e8f0;
  transform: scale(1.05);
}

.test-card-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

/* Test Card */
.test-card {
  display: flex;
  align-items: flex-start;
  background: #fff;
  border-radius: 16px;
  padding: 0;
  gap: 12px;
  justify-content: space-between;
}

.labtest-icon-container {
  display: flex;
  align-items: flex-start;
}

.test-icon-bg {
  width: 56px;
  height: 56px;
  background: linear-gradient(to bottom, #f9d9ea, #e9def7);
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.test-icon {
  color: #553fb5;
  font-size: 24px;
}

.test-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.test-title {
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
  line-height: 1.4;
  margin: 0;
}

.test-meta {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.test-meta-content {
  display: flex;
  flex-direction: column;
}
.test-report-time,
.test-fasting {
  font-size: 13px;
  color: #64748b;
  display: flex;
  align-items: center;
  gap: 4px;
}

.meta-icon {
  font-size: 12px;
}

.test-fasting {
  color: #059669;
}

.price-container {
  margin-top: 8px;
}

.price-section {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.discounted-price {
  font-size: 18px;
  font-weight: 700;
  color: #1e293b;
}

.original-price {
  font-size: 14px;
  text-decoration: line-through;
  color: #94a3b8;
}

.offer {
  font-size: 14px;
  font-weight: 600;
  color: #16aa16;
  background: #f2fef9;
  padding: 2px 8px;
  border-radius: 6px;
}

/* Quantity Selector */
.patient-selector {
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: center;
  justify-content: center;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 5px;
  border-radius: 12px;
  padding: 2px;
}

.quantity-btn {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  width: 32px;
  height: 32px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #475569;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.quantity-btn:hover {
  background: #f1f5f9;
  border-color: #cbd5e1;
}

.quantity-display {
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
  min-width: 20px;
  text-align: center;
}

.patient-label {
  font-size: 12px;
  color: #64748b;
  font-weight: 500;
}

/* Bundle Section */
.bundle-section {
  background: #ffffff;
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
}

.bundle-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.bundle-heading {
  font-size: 18px;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
}

.bundle-scroll {
  display: flex;
  gap: 16px;
  overflow-x: auto;
  padding-bottom: 8px;
  scrollbar-width: thin;
}

.bundle-scroll::-webkit-scrollbar {
  height: 4px;
}

.bundle-scroll::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 10px;
}

.bundle-scroll::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}

.bundle-card {
  flex: 0 0 280px;
  background: #f8fafc;
  border-radius: 16px;
  padding: 12px;
  scroll-snap-align: start;
}

.bundle-card-inner {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.bundle-icon .icon-bg {
  width: 56px;
  height: 56px;
  background: linear-gradient(to bottom, #f9d9ea, #e9def7);
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.bundle-icon .icon {
  color: #553fb5;
  font-size: 24px;
}

.bundle-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.bundle-title {
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
  line-height: 1.3;
  margin: 0;
}

.bundle-meta {
  margin: 2px 0;
}

.bundle-report {
  font-size: 12px;
  color: #64748b;
  display: flex;
  align-items: center;
  gap: 4px;
}

.bundle-price {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
  margin-top: 4px;
}

.price-discounted {
  font-size: 20px;
  font-weight: 700;
  color: #1e293b;
}

.price-original {
  font-size: 13px;
  text-decoration: line-through;
  color: #94a3b8;
}

.bundle-offer {
  font-size: 12px;
  font-weight: 600;
  color: #16aa16;
  background: #f2fef9;
  padding: 2px 6px;
  border-radius: 4px;
}

.bundle-add {
  display: flex;
  align-items: center;
}

.bundle-add-btn {
  background-color: #553fb5;
  border: none;
  border-radius: 8px;
  padding: 8px 12px;
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
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

/* Location Section */
.cart-location-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
}

/* Schedule Section */
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

.address-contact {
  display: flex;
  gap: 12px;
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

.address-card.empty {
  cursor: pointer;
  align-items: center;
  justify-content: center;
  text-align: center;
  border: 2px dashed #cbd5e1;
  background: #f1f5f9;
  transition: background 0.2s ease;
  padding: 20px;
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
  border-radius: 16px;
  padding: 1.5rem;
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

/* Payment Section */
.labtest-payment-section {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: white;
  border-top: 1px solid #e0e0e0;
  border-radius: 16px 16px 0 0;
  padding: 1rem;
  box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.08);
  z-index: 1000;
  text-align: center;
}

.labtest-payment-total {
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

@media (max-width: 480px) {
  .labtest-content-container {
    padding: 16px 12px 160px;
    gap: 16px;
  }

  .test-card-section,
  .bundle-section,
  .details-section,
  .billing-summary {
    padding: 16px;
    border-radius: 16px;
  }

  .bundle-card {
    flex: 0 0 260px;
  }
}

.continue-btn {
  background-color: #553fb5;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 10px 18px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  width: 100%;
  font-family: "Outfit", sans-serif;

  transition: background 0.2s ease;
}
`}
      </style>
    </div>
  );
};

export default VaccinationCart;
