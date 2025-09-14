import React, { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";
import fingerprintIcon from "../../../../assets/fignerprintbg.svg";

const LockerPinTray = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

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

  const handleFingerprintScan = async () => {
    try {
      if (!window.PublicKeyCredential) {
        alert("Your device does not support WebAuthn API.");
        return;
      }

      const publicKeyCredentialRequestOptions = {
        challenge: new Uint8Array([
          /* Normally a random server-generated challenge */
        ]),
        allowCredentials: [],
        timeout: 60000,
        userVerification: "preferred",
      };

      const credential = await navigator.credentials.get({
        publicKey: publicKeyCredentialRequestOptions,
      });

      if (credential) {
        alert("Fingerprint scanned successfully!");
        handleClose();
      } else {
        alert("Fingerprint scan failed or cancelled.");
      }
    } catch (error) {
      console.error(error);
      alert("Error during fingerprint scan: " + error.message);
    }
  };

  return (
    <>
      <button className="open-tray-btn" onClick={() => setIsOpen(true)}>
        Secure Health Locker
      </button>

      {(isOpen || isVisible) && (
        <>
          <div
            className={`bottom-tray-backdrop ${isVisible ? "visible" : ""}`}
            onClick={handleClose}
          />

          <div className={`bottom-tray ${isVisible ? "visible" : ""}`}>
            <div className="bottom-tray-handle">
              <div className="bottom-tray-handle-bar"></div>
            </div>

            <button
              onClick={handleClose}
              className="bottom-tray-close-btn"
              aria-label="Close tray"
            >
              <FiX className="bottom-tray-close-icon" />
            </button>

            <div className="locker-container">
              <h2 className="locker-title">Secure Your Health Locker</h2>
              <p className="locker-subtitle">
                Add biometrics to keep your health data private.
              </p>

              <div
                className="fingerprint-section"
                onClick={handleFingerprintScan}
              >
                <img
                  src={fingerprintIcon}
                  alt="Fingerprint Icon"
                  className="fingerprint-icon"
                />
                <p className="fingerprint-text">Touch the fingerprint sensor</p>
                <span className="or-text">or</span>
                <button className="use-pin-btn">Use Pin</button>
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
        }
        .open-tray-btn:hover {
          background-color: #0056b3;
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
          margin-bottom: 24px;
        }

        .fingerprint-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
        }

        .fingerprint-icon {
          width: 80px;
          height: 80px;
          margin-bottom: 12px;
        }

        .fingerprint-text {
          font-size: 14px;
          color: #555;
          margin-bottom: 8px;
        }

        .or-text {
          font-size: 14px;
          color: #555;
          margin-bottom: 8px;
        }

        .use-pin-btn {
          background: none;
          border: none;
          color: #553fb5;
          cursor: pointer;
          font-weight: 500;
          font-size: 14px;
        }

        .use-pin-btn:hover {
          text-decoration: underline;
        }
      `}</style>
    </>
  );
};

export default LockerPinTray;
