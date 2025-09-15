import React, { useState, useEffect } from "react";
import { FiX, FiCalendar } from "react-icons/fi";
import { GiLoveInjection } from "react-icons/gi";

const VaccInfo = ({ isOpen, onClose, vaccineData, handleScheduleClick }) => {
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
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const formatINR = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);

  if (!isOpen && !isVisible) return null;

  return (
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
        <div className="bottom-tray-content">
          {vaccineData ? (
            <>
              <div className="bottom-tray-header">
                <div className="vaccine-icon-container">
                  <GiLoveInjection className="vaccine-icon" />
                </div>
                <div className="bottom-tray-header-text">
                  <h2 className="bottom-tray-title">{vaccineData.name}</h2>
                  <p
                    className={`vaccine-tag ${vaccineData.tag?.toLowerCase()}`}
                  >
                    {vaccineData.tag}
                  </p>
                </div>
              </div>
              <div className="bottom-tray-description">
                <p className="bottom-tray-text">{vaccineData.description}</p>
              </div>
              <div className="bottom-tray-details-grid">
                <div className="bottom-tray-detail-item">
                  <p className="bottom-tray-detail-label">Doses</p>
                  <p className="bottom-tray-detail-value">
                    {vaccineData.doses}
                  </p>
                </div>
                <div className="bottom-tray-detail-item">
                  <p className="bottom-tray-detail-label">Price</p>
                  <p className="bottom-tray-detail-value">
                    {formatINR(vaccineData.price)}
                  </p>
                </div>
                <div className="bottom-tray-detail-item">
                  <p className="bottom-tray-detail-label">Schedule At</p>
                  <p className="bottom-tray-detail-value">
                    {vaccineData.scheduleAt}
                  </p>
                </div>
              </div>
              <div className="bottom-tray-actions">
                <button
                  onClick={() => handleScheduleClick(vaccineData.name)}
                  className="schedule-btn"
                >
                  <FiCalendar />
                  Schedule Now
                </button>
              </div>
            </>
          ) : (
            <div className="bottom-tray-error">
              <p>No vaccine data available</p>
            </div>
          )}
        </div>

        <style jsx>{`
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
            background-color: #ffffff;
            box-shadow: 0 -4px 32px rgba(0, 0, 0, 0.12);
            border-radius: 24px 24px 0 0;
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            transform: translateY(100%);
            max-width: 600px;
            margin: 0 auto;
            border: 1px solid rgba(0, 0, 0, 0.05);
            overflow: hidden;
          }

          .bottom-tray.visible {
            transform: translateY(0);
          }

          /* Handle bar */
          .bottom-tray-handle {
            display: flex;
            justify-content: center;
            padding: 16px 0 12px;
            cursor: pointer;
            touch-action: manipulation;
          }

          .bottom-tray-handle-bar {
            width: 56px;
            height: 4px;
            background-color: rgba(0, 0, 0, 0.08);
            border-radius: 9999px;
            transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
          }

          .bottom-tray-handle:hover .bottom-tray-handle-bar {
            background-color: rgba(0, 0, 0, 0.16);
            width: 64px;
          }

          /* Close button */
          .bottom-tray-close-btn {
            position: absolute;
            top: 16px;
            right: 20px;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
            background: rgba(0, 0, 0, 0.03);
            border: none;
            display: flex;
            align-items: center;
            justify-content: center;
            backdrop-filter: blur(4px);
          }

          .bottom-tray-close-btn:hover {
            background: rgba(0, 0, 0, 0.08);
            transform: rotate(90deg);
          }

          .bottom-tray-close-icon {
            width: 20px;
            height: 20px;
            color: #64748b;
          }

          /* Content area */
          .bottom-tray-content {
            padding: 8px 24px 28px;
          }

          /* Header section */
          .bottom-tray-header {
            display: flex;
            align-items: flex-start;
            gap: 16px;
            margin-bottom: 24px;
          }

          .vaccine-icon-container {
            width: 56px;
            height: 56px;
            background: linear-gradient(135deg, #f3f4ff, #e0e7ff);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            box-shadow: 0 2px 8px rgba(124, 58, 237, 0.12);
          }

          .vaccine-icon {
            color: #7c3aed;
            font-size: 24px;
          }

          .bottom-tray-header-text {
            flex: 1;
          }

          .bottom-tray-title {
            font-size: 22px;
            font-weight: 700;
            color: #1e293b;
            margin: 0 0 6px 0;
            line-height: 1.3;
            letter-spacing: -0.3px;
          }

          .vaccine-tag {
            display: inline-block;
            background: #e9f7ef;
            color: #2e7d32;
            padding: 4px 10px;
            border-radius: 6px;
            font-size: 11px;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }

          /* Description section */
          .bottom-tray-description {
            margin-bottom: 24px;
          }

          .bottom-tray-text {
            color: #475569;
            margin: 0;
            line-height: 1.6;
            font-size: 15px;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
            padding: 0 4px;
          }

          /* Details grid */
          .bottom-tray-details-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 16px;
            margin-bottom: 28px;
          }

          .bottom-tray-detail-item {
            background-color: #f8fafc;
            padding: 16px 12px;
            border-radius: 12px;
            text-align: center;
            transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
            border: 1px solid rgba(0, 0, 0, 0.03);
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.02);
          }

          .bottom-tray-detail-item:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.06);
          }

          .bottom-tray-detail-label {
            font-size: 13px;
            color: #64748b;
            margin: 0;
            font-weight: 500;
            letter-spacing: 0.2px;
          }

          .bottom-tray-detail-value {
            font-weight: 700;
            margin: 8px 0 0 0;
            color: #1e293b;
            font-size: 17px;
          }

          /* Action buttons */
          .bottom-tray-actions {
            display: flex;
            gap: 16px;
            padding: 0 4px;
          }

          /* Responsive adjustments */
          @media (max-width: 600px) {
            .bottom-tray {
              border-radius: 24px 24px 0 0;
              max-width: 100%;
            }

            .bottom-tray-content {
              padding: 8px 20px 24px;
            }

            .bottom-tray-title {
              font-size: 20px;
            }

            .bottom-tray-details-grid {
              gap: 12px;
            }
          }

          @media (max-width: 480px) {
            .bottom-tray-content {
              padding: 8px 16px 20px;
            }

            .bottom-tray-header {
              gap: 12px;
            }

            .vaccine-icon-container {
              width: 48px;
              height: 48px;
            }

            .vaccine-icon {
              font-size: 22px;
            }

            .bottom-tray-title {
              font-size: 18px;
            }

            .bottom-tray-text {
              font-size: 14px;
            }

            .bottom-tray-detail-value {
              font-size: 16px;
            }
          }

          .bottom-tray-loading,
          .bottom-tray-error {
            text-align: center;
            padding: 40px 0;
            color: #475569;
          }

          .vaccine-tag.essential {
            background: #e9f7ef;
            color: #2e7d32;
          }

          .vaccine-tag.recommended {
            background: #eef2ff;
            color: #4f46e5;
          }

          .vaccine-tag.optional {
            background: #fff4e5;
            color: #ed6c02;
          }

          .schedule-btn {
            background-color: #553fb5;
            color: #fff;
            border: none;
            display: flex;
            border-radius: 8px;
            padding: 10px 18px;
            font-size: 16px;
            font-weight: 500;
            cursor: pointer;
            width: 100%;
            font-family: "Outfit", sans-serif;
            gap: 5px;
            flex-direction: row;
            justify-content: center;
            align-items: center;
          }
        `}</style>
      </div>
    </>
  );
};

export default VaccInfo;
