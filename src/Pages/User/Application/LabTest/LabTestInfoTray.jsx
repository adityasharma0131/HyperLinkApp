import React, { useState, useEffect } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FiX, FiCalendar } from "react-icons/fi";
import { GiLoveInjection } from "react-icons/gi";
import AppButton from "../../../../Components/AppButton";
import "./style.css";

const LabTestInfoTray = ({ test, onClose }) => {
  const [expanded, setExpanded] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (test) {
      setIsVisible(true); // trigger open animation
    }
  }, [test]);

  if (!test) return null;

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose(), 300); // wait for animation before unmount
  };

  return (
    <>
      <div
        className={`test-info-backdrop ${isVisible ? "visible" : ""}`}
        onClick={handleClose}
      />
      <div className={`test-info-tray ${isVisible ? "visible" : ""}`}>
        {/* Handle bar */}
        <div className="tray-handle">
          <div className="tray-handle-bar"></div>
        </div>

        {/* Close button */}
        <button className="close-btn" onClick={handleClose} aria-label="Close">
          <FiX className="close-icon" />
        </button>

        <div className="tray-content">
          {/* Header */}
          <div className="tray-header">
            <div className="test-icon-container">
              <div className="test-icon-bg">
                <GiLoveInjection className="test-icon" />
              </div>
            </div>
            <h2 className="tray-title">{test.name}</h2>
          </div>

          {/* Purpose */}
          <div className="tray-section">
            <h3>Purpose</h3>
            <p className="tray-purpose">{test.ainfo.purpose}</p>
          </div>

          {/* Report Time */}
          <div className="tray-section">
            <h3>Report Time</h3>
            <p className="highlight-text">{test.reportTime}</p>
          </div>

          {/* Parameters */}
          <div className="tray-section">
            <div
              className="parameters-header clickable"
              onClick={() => setExpanded(!expanded)}
            >
              <h3>Parameters Included ({test.tests})</h3>
              {expanded ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </div>

            {expanded && (
              <div className="test-parameters">
                <ul>
                  {test.ainfo.parameters.map((param, idx) => (
                    <li key={idx}>{param}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Pricing + Button */}
          <div className="tray-section pricing-section">
            <div className="price-details">
              <span className="original-price">₹{test.originalPrice}</span>
              <span className="final-price">₹{test.price}</span>
              <span className="discount">{test.discount}</span>
            </div>
            <AppButton
              icon={FiCalendar}
              text="Book This Test"
              fullWidth
              onClick={() => {
                alert(`Booking ${test.name} for ₹${test.price}`);
                handleClose();
              }}
            />
          </div>
        </div>
      </div>
      <style>
        {`
        /* Backdrop */
.test-info-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(17, 24, 39, 0.5);
  z-index: 999;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}
.test-info-backdrop.visible {
  opacity: 1;
  pointer-events: auto;
}

/* Tray Container */
.test-info-tray {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  background: #fff;
  border-radius: 20px 20px 0 0;
  box-shadow: 0 -4px 32px rgba(0, 0, 0, 0.15);
  transform: translateY(100%);
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  overflow: hidden;
}
.test-info-tray.visible {
  transform: translateY(0);
}

/* Handle bar */
.tray-handle {
  display: flex;
  justify-content: center;
  padding: 16px 0 12px;
}
.tray-handle-bar {
  width: 56px;
  height: 4px;
  background-color: rgba(0, 0, 0, 0.08);
  border-radius: 9999px;
  transition: all 0.3s ease;
}
.tray-handle:hover .tray-handle-bar {
  background-color: rgba(0, 0, 0, 0.16);
  width: 64px;
}

/* Close button */
.close-btn {
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
  transition: all 0.3s ease;
}
.close-btn:hover {
  background: rgba(0, 0, 0, 0.08);
  transform: rotate(90deg);
}
.close-icon {
  width: 20px;
  height: 20px;
  color: #64748b;
}

/* Content */
.tray-content {
  padding: 8px 24px 28px;
}

/* Header */
.tray-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
}
.test-icon-container {
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg, #f3f4ff, #e0e7ff);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(124, 58, 237, 0.12);
}
.test-icon {
  color: #7c3aed;
  font-size: 24px;
}
.tray-title {
  font-size: 22px;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
}

/* Sections */
.tray-section {
  margin-bottom: 18px;
}
.tray-section h3 {
  font-size: 15px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 6px;
}
.tray-purpose,
.highlight-text {
  font-size: 14px;
  color: #4b5563;
  line-height: 1.6;
}
.highlight-text {
  font-weight: 600;
  color: #111827;
}

/* Parameters */
.parameters-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}
.parameters-header:hover {
  color: #2563eb;
}
.test-parameters {
  margin-top: 10px;
  padding: 12px 16px;
  background: #f8fafc;
  border-radius: 12px;
  font-size: 14px;
  color: #374151;
  animation: fadeIn 0.3s ease-in-out;
}
.test-parameters ul {
  margin: 0;
  padding: 0;
  list-style: disc inside;
}
.test-parameters li {
  margin: 4px 0;
}

/* Pricing */
.pricing-section {
  margin-top: 24px;
}
.price-details {
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 10px;
}
.original-price {
  font-size: 14px;
  color: #9ca3af;
  text-decoration: line-through;
}
.final-price {
  font-size: 18px;
  font-weight: 700;
  color: #10b981;
}
.discount {
 font-size: 13px;
  color: #16a34a;
  font-weight: 600;
  background: #e9f7ef;
  padding: 2px 6px;
  border-radius: 6px;
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
`}
      </style>
    </>
  );
};

export default LabTestInfoTray;
