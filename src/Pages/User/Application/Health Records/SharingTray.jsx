import React, { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";
import HyperlinkIcon from "../../../../assets/hyperlinklogoicon.svg";
import { MdOutlineTextsms, MdEmail } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import { IoIosMore } from "react-icons/io";

const ShareReportTray = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState("1day");

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

  const handleShare = () => {
    alert(`Report shared for period: ${selectedPeriod}`);
    handleClose();
  };

  return (
    <>
      <button className="open-tray-btn" onClick={() => setIsOpen(true)}>
        Share Report
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

            <div className="share-container">
              <h2 className="share-title">Share report</h2>

              <div className="share-options">
                <div className="share-option">
                  <img src={HyperlinkIcon} alt="Hyperlink" />
                  <span>Hyperlink</span>
                </div>

                <div className="share-option">
                  <MdOutlineTextsms size={28} color="#553fb5" />
                  <span>Mobile Number</span>
                </div>

                <div className="share-option">
                  <FaWhatsapp size={28} color="#553fb5" />
                  <span>Whatsapp</span>
                </div>

                <div className="share-option">
                  <MdEmail size={28} color="#553fb5" />
                  <span>Email</span>
                </div>

                <div className="share-option">
                  <IoIosMore size={28} color="#553fb5" />
                  <span>Other apps</span>
                </div>
              </div>

              <p className="period-text">
                I am sharing report for following period
              </p>

              <div className="period-options">
                {[
                  { label: "1 Hr", value: "1hr" },
                  { label: "1 day", value: "1day" },
                  { label: "7 days", value: "7days" },
                  { label: "Custom", value: "custom" },
                ].map((option) => (
                  <label key={option.value} className="period-label">
                    <input
                      type="radio"
                      name="period"
                      value={option.value}
                      checked={selectedPeriod === option.value}
                      onChange={() => setSelectedPeriod(option.value)}
                    />
                    {option.label}
                  </label>
                ))}
              </div>

              <div className="action-buttons">
                <button className="cancel-btn" onClick={handleClose}>
                  Cancel
                </button>
                <button className="share-btn" onClick={handleShare}>
                  Share
                </button>
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

        .share-container {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding: 24px;
          text-align: left;
        }

        .share-title {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 16px;
        }

        .share-options {
          display: flex;
          flex-direction: row;
          gap: 12px;
          margin-bottom: 20px;
          width: 100%;
          flex-wrap: wrap;
          justify-content: space-between;
        }

        .share-option {
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
          flex-direction: column;
        }

        .share-option img {
          width: 28px;
          height: 28px;
        }

        .period-text {
          font-size: 14px;
          margin-bottom: 8px;
        }

        .period-options {
          display: flex;
          gap: 16px;
          margin-bottom: 20px;
        }

        .period-label {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 14px;
          cursor: pointer;
        }

        .action-buttons {
          display: flex;
          flex-direction: row;
          width: 100%;
          gap: 12px;
        }

        .cancel-btn,
        .share-btn {
          width: 100%;
          padding: 14px;
          border-radius: 8px;
          font-size: 16px;
          cursor: pointer;
        }

        .cancel-btn {
          border: 1px solid #553fb5;
          background: none;
          color: #553fb5;
        }

        .share-btn {
          background-color: #553fb5;
          color: #fff;
          border: none;
        }

        .cancel-btn:hover {
          background-color: #f4f4f4;
        }

        .share-btn:hover {
          background-color: #402d8c;
        }
      `}</style>
    </>
  );
};

export default ShareReportTray;
