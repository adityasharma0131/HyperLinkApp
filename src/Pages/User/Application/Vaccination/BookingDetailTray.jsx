import React, { useEffect, useState } from "react";
import {
  FiX,
  FiMapPin,
  FiUser,
  FiCalendar,
  FiCreditCard,
} from "react-icons/fi";
import AppButton from "../../../../Components/AppButton";

const BookingDetailTray = ({ onClose }) => {
  const [closing, setClosing] = useState(false);

  const handleClose = () => {
    setClosing(true);
    setTimeout(onClose, 300); // Match animation duration
  };

  // Prevent body scroll when tray is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      className={`booking-tray-backdrop ${closing ? "fade-out" : ""}`}
      onClick={handleClose}
    >
      <div
        className={`booking-tray-container ${closing ? "slide-down" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle */}
        <div className="booking-tray-handle" onClick={handleClose}>
          <div className="booking-tray-handle-bar" />
        </div>

        {/* Header */}
        <div className="booking-tray-header">
          <h2 className="booking-tray-title">Booking Details</h2>
          <button
            type="button"
            className="booking-tray-close-btn"
            onClick={handleClose}
            aria-label="Close tray"
          >
            <FiX className="booking-tray-close-icon" />
          </button>
        </div>

        {/* Content */}
        <div className="booking-tray-content">
          {/* Address Section */}
          <div className="tray-item">
            <div className="tray-icon">
              <FiMapPin />
            </div>
            <div className="tray-info">
              <span className="tray-label">Sample Collection from</span>
              <p className="tray-value">473, Torana chs, Ramnagar b...</p>
            </div>
            <button className="change-btn">Change</button>
          </div>

          {/* Patient Section */}
          <div className="tray-item">
            <div className="tray-icon">
              <FiUser />
            </div>
            <div className="tray-info">
              <span className="tray-label">Patient(s)</span>
              <p className="tray-value">Sakshi</p>
            </div>
            <button className="change-btn">Change</button>
          </div>

          {/* Slot Section */}
          <div className="tray-item">
            <div className="tray-icon">
              <FiCalendar />
            </div>
            <div className="tray-info">
              <span className="tray-label">Vaccination slot</span>
              <p className="tray-value">28 Jun 2025, 11 am - 12 pm</p>
            </div>
            <button className="change-btn">Change</button>
          </div>

          {/* Payment Section */}
          <div className="tray-item payment">
            <div className="tray-icon">
              <FiCreditCard />
            </div>
            <div className="tray-info">
              <span className="tray-label">To be paid</span>
              <p className="tray-value">₹479</p>
            </div>
          </div>
        </div>

        {/* Sticky Footer */}
        <div className="booking-tray-footer">
          <button
            className="proceed-btn"
            onClick={() => setShowBookingTray(true)} // ✅ open BookingDetailTray
          >
            Proceed to Pay
          </button>
        </div>
      </div>

      {/* Inline Scoped Styles */}
      <style>
        {`
/* Backdrop */
.booking-tray-backdrop {
  position: fixed;
  inset: 0;
  background-color: rgba(0,0,0,0.45);
  display: flex;
  justify-content: center;
  align-items: flex-end;
  z-index: 1000;
  animation: fadeInBackdrop 0.3s forwards;
}

.booking-tray-backdrop.fade-out {
  animation: fadeOutBackdrop 0.3s forwards;
}

/* Tray Container */
.booking-tray-container {
  background: #ffffff;
  border-radius: 16px 16px 0 0;
  width: 100%;
  max-width: 480px;
  box-shadow: 0 -4px 20px rgba(0,0,0,0.12);
  display: flex;
  flex-direction: column;
  max-height: 90vh;
  animation: slideUp 0.3s ease-out forwards;
}

.booking-tray-container.slide-down {
  animation: slideDown 0.3s ease-in forwards;
}

/* Handle */
.booking-tray-handle {
  padding: 10px 0;
  display: flex;
  justify-content: center;
  cursor: pointer;
}

.booking-tray-handle-bar {
  width: 40px;
  height: 4px;
  background: #e2e8f0;
  border-radius: 999px;
}

/* Header */
.booking-tray-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  margin-bottom: 8px;
}

.booking-tray-title {
  font-size: 1.2rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
}

.booking-tray-close-btn {
  background: none;
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
  cursor: pointer;
  transition: all 0.2s ease;
}

.booking-tray-close-btn:hover {
  background: #f8fafc;
  color: #1e293b;
  transform: rotate(90deg);
}

.booking-tray-close-icon {
  font-size: 20px;
}

/* Content */
.booking-tray-content {
  flex: 1;
  overflow-y: auto;
  padding: 16px 20px 80px; /* leave space for sticky footer */
}

.tray-item {
  display: flex;
  align-items: center;
  background: #fff;
  border: 1px solid #eaeaea;
  border-radius: 10px;
  padding: 12px 15px;
  margin-bottom: 12px;
  transition: all 0.2s ease-in-out;
}

.tray-item:hover {
  border-color: #d0d0d0;
  transform: translateY(-2px);
}

.tray-icon {
  font-size: 20px;
  color: #7c3aed;
  margin-right: 12px;
}

.tray-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.tray-label {
  font-size: 13px;
  color: #777;
  margin-bottom: 3px;
}

.tray-value {
  font-size: 15px;
  font-weight: 500;
  color: #222;
}

.change-btn {
  background: none;
  border: none;
  color: #7c3aed;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: color 0.2s ease-in-out;
}

.change-btn:hover {
  color: #6c1ef3ff;
  text-decoration: underline;
}

.payment {
  background: #f8f1ffff;
  border: 1px solid #cfe2ff;
}

.payment .tray-value {
  font-weight: bold;
  font-size: 16px;
  color: #7c3aed;
}

/* Footer */
.booking-tray-footer {
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 12px 20px;
}

/* Animations */
@keyframes fadeInBackdrop {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fadeOutBackdrop {
  from { opacity: 1; }
  to { opacity: 0; }
}

@keyframes slideUp {
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
}

@keyframes slideDown {
  from { transform: translateY(0); }
  to { transform: translateY(100%); }
}

.proceed-btn {
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

export default BookingDetailTray;
