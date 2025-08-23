import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
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
import { GiLoveInjection } from "react-icons/gi";
import { CiCirclePlus } from "react-icons/ci";

import AppButton from "../../../../Components/AppButton";
import SchedulingTray from "../Vaccination/SchedulingTray";
import BookingDetailTray from "../LabTest/BookingDetailTray";

const LabtestCart = () => {
  const navigate = useNavigate();
  const trayRef = useRef();

  // States
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [schedule, setSchedule] = useState(null);
  const [showSchedulingTray, setShowSchedulingTray] = useState(false);
  const [showBookingTray, setShowBookingTray] = useState(false); // ✅ new state
  const [userAddresses, setUserAddresses] = useState([]);
  const [cartItems, setCartItems] = useState([
    {
      title: "Comprehensive Silver Full Body Checkup with Smart Report",
      time: "15 hrs",
      price: 1999,
      original: 3798,
      offer: "48% off",
      qty: 1,
    },
  ]);

  // Bundles data
  const bundles = [
    {
      title: "Vitamin D & B12 Profile",
      time: "24 hrs",
      price: 999,
      original: 1899,
      offer: "47% off",
    },
    {
      title: "Diabetes Screening",
      time: "12 hrs",
      price: 799,
      original: 1499,
      offer: "47% off",
    },
    {
      title: "Thyroid Profile",
      time: "10 hrs",
      price: 599,
      original: 1099,
      offer: "45% off",
    },
  ];

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

    // Load saved cart
    const storedCart = localStorage.getItem("labtestCart");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    // Save cart to localStorage
    localStorage.setItem("labtestCart", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate(-1);
    }
  }, [cartItems, navigate]);

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

  const handleTimeSelected = (selectedTime) => {
    setSchedule(selectedTime);
    setShowSchedulingTray(false);
  };

  const handleIncrement = (idx) => {
    setCartItems((prev) =>
      prev.map((item, i) =>
        i === idx ? { ...item, qty: Math.min(item.qty + 1, 5) } : item
      )
    );
  };

  const handleDecrement = (idx) => {
    setCartItems((prev) => {
      const updated = [...prev];
      if (updated[idx].qty > 1) {
        updated[idx].qty -= 1;
      } else {
        updated.splice(idx, 1);
      }
      return updated;
    });
  };

  const handleAddBundle = (bundle) => {
    setCartItems((prev) => [...prev, { ...bundle, qty: 1 }]);
  };

  // Calculate totals
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
    <div className="labtest-cart-page">
      {/* Hero Section */}
      <div className="labtest-cart-hero">
        <div className="hero-top-bar">
          <div className="hero-left">
            <button
              className="icon-button"
              onClick={() => navigate(-1)}
              aria-label="Go back"
            >
              <FiArrowLeft className="hero-icon" />
            </button>
            <h2 className="hero-title">Cart</h2>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="labtest-content-container">
        {/* Test Card Section */}
        <div className="test-card-section">
          <div className="section-header">
            <h2 className="section-heading">Test added ({cartItems.length})</h2>
            <button className="info-button">
              <FiInfo />
            </button>
          </div>

          <div className="test-card-container">
            {cartItems.map((item, idx) => (
              <div className="test-card" key={idx}>
                {/* Left Icon */}
                <div className="labtest-icon-container">
                  <div className="test-icon-bg">
                    <GiLoveInjection className="test-icon" />
                  </div>
                </div>

                {/* Center Details */}
                <div className="test-details">
                  <h3 className="test-title">{item.title}</h3>
                  <div className="test-meta">
                    <span className="test-report-time">
                      Report within {item.time}
                    </span>
                    <span className="test-fasting">Fasting Required</span>
                  </div>
                  <div className="price-container">
                    <div className="price-section">
                      <span className="discounted-price">₹{item.price}</span>
                      <span className="original-price">₹{item.original}</span>
                      <span className="offer">{item.offer}</span>
                    </div>
                  </div>
                </div>

                {/* Right Qty Selector */}
                <div className="patient-selector">
                  <div className="quantity-controls">
                    <button
                      className="quantity-btn"
                      onClick={() => handleDecrement(idx)}
                      aria-label="Decrease patient count"
                    >
                      <FiMinus />
                    </button>
                    <span className="quantity-display">{item.qty}</span>
                    <button
                      className="quantity-btn"
                      onClick={() => handleIncrement(idx)}
                      aria-label="Increase patient count"
                    >
                      <FiPlus />
                    </button>
                  </div>
                  <span className="patient-label">Patient(s)</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bundle Section */}
        <div className="bundle-section">
          <div className="bundle-header">
            <h2 className="bundle-heading">Book Together</h2>
          </div>

          <div className="bundle-scroll">
            {bundles.map((bundle, idx) => (
              <div className="bundle-card" key={idx}>
                <div className="bundle-card-inner">
                  <div className="bundle-icon">
                    <div className="icon-bg">
                      <GiLoveInjection className="icon" />
                    </div>
                  </div>

                  <div className="bundle-details">
                    <h3 className="bundle-title">{bundle.title}</h3>
                    <div className="bundle-meta">
                      <span className="bundle-report">⏱ {bundle.time}</span>
                    </div>
                    <div className="bundle-price">
                      <span className="price-discounted">₹{bundle.price}</span>
                      <span className="price-original">₹{bundle.original}</span>
                      <span className="bundle-offer">{bundle.offer}</span>
                    </div>
                  </div>
                  <div className="bundle-add">
                    <AppButton
                      icon={CiCirclePlus}
                      onClick={() => handleAddBundle(bundle)}
                    />
                  </div>
                </div>
              </div>
            ))}
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
                onClick={() => navigate("/app/user/lab-test/add-location")}
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
              onClick={() => navigate("/app/user/lab-test/add-location")}
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

        {/* Render SchedulingTray */}
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

        {/* Billing Summary */}
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

      {/* Payment Section */}
      {!showSchedulingTray && (
        <div className="labtest-payment-section">
          <div className="labtest-payment-total">
            <span>Total Payable</span>
            <span className="amount">₹{subtotal}</span>
          </div>
          <AppButton
            text={"Continue"}
            onClick={() => setShowBookingTray(true)} // ✅ open BookingDetailTray
          />
        </div>
      )}

      {/* Render BookingDetailTray */}
      {showBookingTray && (
        <BookingDetailTray onClose={() => setShowBookingTray(false)} />
      )}

      <style>
        {`
        .labtest-cart-page {
          min-height: 100vh;
          background: #f8fafc;
          display: flex;
          flex-direction: column;
        }

        /* -------- Hero Section -------- */
        .labtest-cart-hero {
          background: linear-gradient(to bottom right, #4a90e2, #8c60e2);
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
          color: white;
        }
        .hero-title {
          font-size: 1.1rem;
          font-weight: 600;
          margin: 0;
          line-height: 1.2;
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
    display: flex
;
    flex-direction: column;
    align-items: center;
    gap: 2rem;        }

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
          background: linear-gradient(135deg, #f3f4ff, #e0e7ff);
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .test-icon {
          color: #7c3aed;
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
          flex-wrap: wrap;
        }

        .test-report-time, .test-fasting {
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
          color: #16AA16;
          background: #f2fef9;
          padding: 2px 8px;
          border-radius: 6px;
        }

        /* Quantity Selector */
        .patient-selector {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }

        .quantity-controls {
          display: flex;
          align-items: center;
          gap: 12px;
          background: #f8fafc;
          border-radius: 12px;
          padding: 6px;
          border: 1px solid #e2e8f0;
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
          padding: 16px;
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
          background: linear-gradient(135deg, #f3f4ff, #e0e7ff);
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .bundle-icon .icon {
          color: #7c3aed;
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
          font-size: 15px;
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
          color: #16AA16;
          background: #f2fef9;
          padding: 2px 6px;
          border-radius: 4px;
        }

        .bundle-add {
          display: flex;
          align-items: center;
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
        .location-header {
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
          padding: 1.5rem 2rem;
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
        `}
      </style>
    </div>
  );
};

export default LabtestCart;
