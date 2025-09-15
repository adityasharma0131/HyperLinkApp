import React, { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";

const LockerTray = ({ onClose, onUnlockSuccess }) => {
  const [isOpen, setIsOpen] = useState(true); // Open on mount
  const [isVisible, setIsVisible] = useState(false);
  const [pin, setPin] = useState(["", "", "", ""]);
  const [errorMessage, setErrorMessage] = useState("");

  const storedPin = localStorage.getItem("lockerPin");

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => setIsOpen(false), 300);
  };

  const handleChange = (value, index) => {
    if (/^\d?$/.test(value)) {
      const newPin = [...pin];
      newPin[index] = value;
      setPin(newPin);

      if (value && index < 3) {
        document.getElementById(`pin-${index + 1}`).focus();
      }
    }
  };

  const handleSubmit = () => {
    const enteredPin = pin.join("");
    if (enteredPin.length === 4) {
      if (enteredPin === storedPin) {
        alert("✅ Locker Unlocked");
        onUnlockSuccess();
        handleClose();
      } else {
        setErrorMessage("❌ Incorrect PIN. Please try again.");
      }
    } else {
      setErrorMessage("⚠️ Please enter a 4-digit PIN.");
    }
  };

  return (
    <>
      {(isOpen || isVisible) && (
        <>
          <div
            className={`bottom-tray-backdrop ${isVisible ? "visible" : ""}`}
            onClick={() => {}}
          />

          <div className={`bottom-tray ${isVisible ? "visible" : ""}`}>
            <div className="bottom-tray-handle">
              <div className="bottom-tray-handle-bar"></div>
            </div>

            <div className="locker-container">
              <h2 className="locker-title">Enter Locker PIN</h2>
              <p className="locker-subtitle">
                Only you can unlock this health data
              </p>

              <div className="pin-inputs">
                {pin.map((digit, index) => (
                  <input
                    key={index}
                    id={`pin-${index}`}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleChange(e.target.value, index)}
                    className="pin-box"
                  />
                ))}
              </div>

              {errorMessage && <p className="error-text">{errorMessage}</p>}

              <button className="unlock-btn" onClick={handleSubmit}>
                Unlock
              </button>

              <div className="locker-links">
                <button className="link-btn">Forgot pin</button>
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
          background-color: #452fa0;
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
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 6px;
          color: #000;
        }
        .locker-subtitle {
          font-size: 14px;
          color: #555;
          margin-bottom: 24px;
        }
        .pin-inputs {
          display: flex;
          gap: 12px;
          margin-bottom: 20px;
        }
        .pin-box {
          width: 50px;
          height: 50px;
          border: 2px solid #553fb5;
          border-radius: 8px;
          font-size: 22px;
          text-align: center;
          outline: none;
        }
        .pin-box:focus {
          border-color: #452fa0;
          box-shadow: 0 0 0 2px rgba(85, 63, 181, 0.2);
        }
        .unlock-btn {
          width: 100%;
          max-width: 300px;
          background: #553fb5;
          color: #fff;
          padding: 14px;
          font-size: 16px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          margin-bottom: 20px;
        }
        .unlock-btn:hover {
          background: #452fa0;
        }
        .locker-links {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
        }
        .link-btn {
          background: none;
          border: none;
          color: #553fb5;
          cursor: pointer;
          font-weight: 500;
        }
        .or-text {
          color: #555;
        }
      `}</style>
    </>
  );
};

export default LockerTray;
