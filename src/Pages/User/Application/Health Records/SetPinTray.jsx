import React, { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";

const LockerPinTray = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [pin, setPin] = useState(["", "", "", ""]);
  const [confirmPin, setConfirmPin] = useState(["", "", "", ""]);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = "hidden";
    } else {
      setIsVisible(false);
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => setIsOpen(false), 300);
  };

  const handleChange = (value, index, type) => {
    if (/^\d?$/.test(value)) {
      if (type === "pin") {
        const newPin = [...pin];
        newPin[index] = value;
        setPin(newPin);
        if (value && index < 3)
          document.getElementById(`pin-${index + 1}`).focus();
      } else {
        const newConfirm = [...confirmPin];
        newConfirm[index] = value;
        setConfirmPin(newConfirm);
        if (value && index < 3)
          document.getElementById(`confirm-${index + 1}`).focus();
      }
    }
  };

  const handleSubmit = () => {
    const enteredPin = pin.join("");
    const enteredConfirm = confirmPin.join("");

    if (enteredPin.length === 4 && enteredConfirm.length === 4) {
      if (enteredPin === enteredConfirm) {
        alert("PIN Set Successfully: " + enteredPin);
      } else {
        alert("PINs do not match. Please try again.");
      }
    } else {
      alert("Please enter and confirm a 4-digit PIN.");
    }
  };

  return (
    <>
      {/* Open Button */}
      <button className="open-tray-btn" onClick={() => setIsOpen(true)}>
        Set Locker PIN
      </button>

      {(isOpen || isVisible) && (
        <>
          {/* Backdrop */}
          <div
            className={`bottom-tray-backdrop ${isVisible ? "visible" : ""}`}
            onClick={handleClose}
          />

          {/* Bottom Tray */}
          <div className={`bottom-tray ${isVisible ? "visible" : ""}`}>
            {/* Handle bar */}
            <div className="bottom-tray-handle">
              <div className="bottom-tray-handle-bar"></div>
            </div>

            {/* Close Button */}
            <button
              onClick={handleClose}
              className="bottom-tray-close-btn"
              aria-label="Close tray"
            >
              <FiX className="bottom-tray-close-icon" />
            </button>

            {/* Locker Content */}
            <div className="locker-container">
              <h2 className="locker-title">Secure Your Health Locker</h2>
              <p className="locker-subtitle">
                Add a 4-digit PIN to keep your health data private.
              </p>

              {/* Enter PIN */}
              <label className="pin-label">Enter 4-digit pin here</label>
              <div className="pin-inputs">
                {pin.map((digit, index) => (
                  <input
                    key={index}
                    id={`pin-${index}`}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleChange(e.target.value, index, "pin")}
                    className="pin-box"
                  />
                ))}
              </div>

              {/* Confirm PIN */}
              <label className="pin-label">Confirm Pin</label>
              <div className="pin-inputs">
                {confirmPin.map((digit, index) => (
                  <input
                    key={index}
                    id={`confirm-${index}`}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) =>
                      handleChange(e.target.value, index, "confirm")
                    }
                    className="pin-box"
                  />
                ))}
              </div>

              {/* Submit */}
              <button className="unlock-btn" onClick={handleSubmit}>
                Set Pin & Lock
              </button>

              {/* OR + Biometrics */}
              <div className="locker-links">
                <span className="or-text">or</span>
                <button className="link-btn">Use Biometrics</button>
              </div>
            </div>
          </div>
        </>
      )}

      <style jsx>{`
        .open-tray-btn {
          padding: 10px 16px;
          background-color: #553fb5;
          color: #fff;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 14px;
          margin: 20px;
          transition: background 0.2s ease;
        }
        .open-tray-btn:hover {
          background-color: #0055aa;
        }

        .bottom-tray-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 999;
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }
        .bottom-tray-backdrop.visible {
          opacity: 1;
          pointer-events: auto;
        }

        .bottom-tray {
          position: fixed;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 1000;
          background: #ffffff;
          box-shadow: 0 -4px 32px rgba(0, 0, 0, 0.12);
          border-radius: 24px 24px 0 0;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          transform: translateY(100%);
          max-width: 600px;
          margin: 0 auto;
          border: 1px solid rgba(0, 0, 0, 0.05);
        }
        .bottom-tray.visible {
          transform: translateY(0);
        }

        .bottom-tray-handle {
          display: flex;
          justify-content: center;
          padding: 14px 0 10px;
        }
        .bottom-tray-handle-bar {
          width: 50px;
          height: 4px;
          background-color: rgba(0, 0, 0, 0.08);
          border-radius: 9999px;
        }

        .bottom-tray-close-btn {
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
        }
        .bottom-tray-close-icon {
          width: 20px;
          height: 20px;
          color: #64748b;
        }

        .locker-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 24px;
          text-align: center;
        }
        .locker-title {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 6px;
          color: #000;
        }
        .locker-subtitle {
          font-size: 14px;
          color: #555;
          margin-bottom: 20px;
        }
        .pin-label {
          font-size: 13px;
          color: #333;
          margin: 12px 0 8px;
          align-self: center;
        }
        .pin-inputs {
          display: flex;
          gap: 12px;
          margin-bottom: 12px;
        }
        .pin-box {
          width: 48px;
          height: 48px;
          border: 2px solid #553fb5;
          border-radius: 8px;
          font-size: 20px;
          text-align: center;
          outline: none;
        }
        .pin-box:focus {
          border-color: #0055aa;
          box-shadow: 0 0 0 2px rgba(0, 102, 204, 0.2);
        }
        .unlock-btn {
          width: 100%;
          max-width: 320px;
          background: #553fb5;
          color: #fff;
          padding: 14px;
          font-size: 16px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          margin: 16px 0;
        }
        .unlock-btn:hover {
          background: #0055aa;
        }
        .locker-links {
          font-size: 14px;
          color: #555;
        }
        .or-text {
          margin-right: 4px;
        }
        .link-btn {
          background: none;
          border: none;
          color: #553fb5;
          cursor: pointer;
          font-weight: 500;
        }
      `}</style>
    </>
  );
};

export default LockerPinTray;
