import React, { useState, useEffect } from "react";
import { FiX, FiChevronRight, FiCheck } from "react-icons/fi";

const SchedulingTray = ({ onClose = () => {}, onTimeSelected = () => {} }) => {
  const generateNext7Days = () => {
    const today = new Date();
    return Array.from({ length: 7 }, (_, i) => {
      const dateObj = new Date(today);
      dateObj.setDate(today.getDate() + i);

      const dayName =
        i === 0
          ? "Today"
          : i === 1
          ? "Tomorrow"
          : dateObj.toLocaleDateString("en-US", { weekday: "short" });

      return {
        name: dayName,
        date: dateObj.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        fullDate: dateObj.toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
        }),
        slots: Math.floor(Math.random() * 9), // demo random slots
        dateObj,
      };
    });
  };

  const [days, setDays] = useState(generateNext7Days);
  const [activeDay, setActiveDay] = useState(0);
  const [selectedTime, setSelectedTime] = useState(null);
  const [closing, setClosing] = useState(false);

  const timeSlots = {
    Morning: [
      "08:00 - 09:00",
      "09:00 - 10:00",
      "10:00 - 11:00",
      "11:00 - 12:00",
    ],
    Afternoon: [
      "12:00 - 13:00",
      "13:00 - 14:00",
      "14:00 - 15:00",
      "15:00 - 16:00",
    ],
    Evening: ["16:00 - 17:00", "17:00 - 18:00", "18:00 - 19:00"],
  };

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => onClose(), 300);
  };

  const handleConfirm = () => {
    if (selectedTime && typeof onTimeSelected === "function") {
      const selectedDate = days[activeDay].fullDate;
      onTimeSelected(`${selectedDate} at ${selectedTime}`);
      handleClose();
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (e.target.classList.contains("scheduling-tray-backdrop")) {
        handleClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowRight") {
        setActiveDay((prev) => Math.min(prev + 1, days.length - 1));
      } else if (e.key === "ArrowLeft") {
        setActiveDay((prev) => Math.max(prev - 1, 0));
      } else if (e.key === "Enter") {
        handleConfirm();
      } else if (e.key === "Escape") {
        handleClose();
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [activeDay, selectedTime, days]);

  const isSlotDisabled = (slot) => {
    if (activeDay !== 0) return false;
    const [startHour] = slot.split(":");
    const currentHour = new Date().getHours();
    return parseInt(startHour) <= currentHour;
  };

  return (
    <div className={`scheduling-tray-backdrop ${closing ? "fade-out" : ""}`}>
      <div
        className={`scheduling-tray-container ${closing ? "slide-down" : ""}`}
      >
        <div className="scheduling-tray-handle" onClick={handleClose}>
          <div className="scheduling-tray-handle-bar"></div>
        </div>

        <div className="scheduling-header">
          <h3 className="scheduling-title">Select Time Slot</h3>
          <button className="scheduling-close-btn" onClick={handleClose}>
            <FiX className="scheduling-close-icon" />
          </button>
        </div>

        <div className="scheduling-tray-content">
          {selectedTime && (
            <div className="selected-time-preview">
              <div className="selected-time-text">
                <span className="selected-date">
                  {days[activeDay].fullDate}
                </span>
                <span className="selected-time">{selectedTime}</span>
              </div>
              <button className="confirm-button" onClick={handleConfirm}>
                Confirm <FiChevronRight />
              </button>
            </div>
          )}

          <div className="day-tabs-container">
            <div className="day-tabs-scroll">
              {days.map((day, index) => (
                <div
                  key={index}
                  className={`day-card ${activeDay === index ? "active" : ""} ${
                    day.slots === 0 ? "disabled" : ""
                  }`}
                  onClick={() => day.slots > 0 && setActiveDay(index)}
                >
                  <div className="day-name">{day.name}</div>
                  <div className="day-date">{day.date}</div>
                  <div className="day-slots">
                    {day.slots > 0 ? (
                      <>
                        <span className="slot-indicator"></span>
                        {day.slots} slots
                      </>
                    ) : (
                      "Unavailable"
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="time-section-wrapper">
            {Object.entries(timeSlots).map(([period, slots], idx) => (
              <div key={idx} className="time-section">
                <h4 className="time-section-title">{period}</h4>
                <div className="time-slots-grid">
                  {slots.map((slot, i) => {
                    const disabled = isSlotDisabled(slot);
                    return (
                      <button
                        key={i}
                        className={`time-slot ${
                          selectedTime === slot ? "selected" : ""
                        }`}
                        onClick={() => !disabled && setSelectedTime(slot)}
                        disabled={disabled}
                        style={{
                          opacity: disabled ? 0.5 : 1,
                          cursor: disabled ? "not-allowed" : "pointer",
                        }}
                      >
                        {slot}
                        {selectedTime === slot && (
                          <FiCheck className="check-icon" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Backdrop */
        .scheduling-tray-backdrop {
          position: fixed;
          inset: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: flex-end;
          z-index: 1000;
        }

        .scheduling-tray-backdrop.fade-out {
          animation: fadeOutBackdrop 0.3s forwards;
        }
        /* Tray Container */
        .scheduling-tray-container {
          background: #ffffff;
          border-radius: 24px 24px 0 0;
          width: 100%;
          max-width: 480px;
          max-height: 80vh;
          box-shadow: 0 -8px 32px rgba(0, 0, 0, 0.16);
          animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        .scheduling-tray-container.slide-down {
          animation: slideDown 0.3s cubic-bezier(0.7, 0, 0.84, 0) forwards;
        }

        /* Handle */
        .scheduling-tray-handle {
          padding: 16px 0 8px;
          display: flex;
          justify-content: center;
          cursor: pointer;
        }

        .scheduling-tray-handle-bar {
          width: 48px;
          height: 5px;
          background: #e5e7eb;
          border-radius: 999px;
          transition: all 0.2s ease;
        }
        .scheduling-tray-handle:hover .scheduling-tray-handle-bar {
          background: #d1d5db;
        }
        /* Header */
        .scheduling-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 24px 16px;
          position: relative;
        }
        .scheduling-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: #111827;
          margin: 0;
          flex: 1;
          text-align: center;
        }
        .scheduling-close-btn {
          background: none;
          border: none;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #6b7280;
          cursor: pointer;
          transition: all 0.2s ease;
          position: absolute;
          right: 16px;
        }

        .scheduling-close-btn:hover {
          background: #f3f4f6;
          color: #111827;
        }
        .scheduling-close-icon {
          font-size: 20px;
        }

        /* Content */
        .scheduling-tray-content {
          padding: 0 20px 24px;
          overflow-y: auto;
          flex: 1;
        }

        /* Selected Time Preview */
        .selected-time-preview {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #f9fafb;
          border-radius: 12px;
          padding: 16px;
          margin-bottom: 20px;
          border: 1px solid #e5e7eb;
        }
        .selected-time-text {
          display: flex;
          flex-direction: column;
        }
        .selected-date {
          font-size: 0.875rem;
          color: #4b5563;
          margin-bottom: 4px;
        }

        .selected-time {
          font-size: 1rem;
          font-weight: 600;
          color: #111827;
        }
        .confirm-button {
          display: flex;
          align-items: center;
          gap: 4px;
          background: #7c3aed;
          color: white;
          border: none;
          border-radius: 8px;
          padding: 8px 12px;
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .confirm-button:hover {
          background: #6d28d9;
        }

        /* Day Tabs */
        .day-tabs-container {
          position: relative;
          margin-bottom: 24px;
        }
        .day-tabs-scroll {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          padding-bottom: 8px;
          scrollbar-width: none;
        }
        .day-tabs-scroll::-webkit-scrollbar {
          display: none;
        }
        .day-card {
          min-width: 80px;
          background: #ffffff;
          border-radius: 12px;
          padding: 12px;
          text-align: center;
          cursor: pointer;
          border: 1px solid #e5e7eb;
          transition: all 0.2s ease;
          flex-shrink: 0;
        }
        .day-card:hover {
          background: #f9fafb;
        }

        .day-card.active {
          background: #ede9fe;
          border-color: #7c3aed;
          box-shadow: 0 0 0 1px #7c3aed;
        }

        .day-card.disabled {
          opacity: 0.5;
          cursor: not-allowed;
          background: #f3f4f6;
        }

        .day-name {
          font-weight: 600;
          font-size: 0.875rem;
          color: #111827;
          margin-bottom: 4px;
        }
        .day-date {
          font-size: 0.75rem;
          color: #6b7280;
          margin-bottom: 6px;
        }

        .day-slots {
          font-size: 0.6875rem;
          color: #4b5563;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
        }

        .slot-indicator {
          display: inline-block;
          width: 6px;
          height: 6px;
          background: #7c3aed;
          border-radius: 50%;
        }

        /* Time Section */
        .time-section {
          margin-bottom: 24px;
        }

        .time-section-title {
          font-weight: 500;
          font-size: 0.875rem;
          margin-bottom: 12px;
          color: #1e293b;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .time-slots-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 8px;
        }

        .time-slot {
          position: relative;
          padding: 12px 8px;
          background: #ffffff;
          border-radius: 8px;
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          border: 1px solid #e5e7eb;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .time-slot:hover {
          background: #f3f0ff;
          border-color: #c4b5fd;
        }

        .time-slot.selected {
          background: #7c3aed;
          color: white;
          border-color: #6d28d9;
        }

        .check-icon {
          position: absolute;
          right: 8px;
          font-size: 14px;
        }

        /* Animations */
        @keyframes fadeInBackdrop {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fadeOutBackdrop {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }

        @keyframes slideUp {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }

        @keyframes slideDown {
          from {
            transform: translateY(0);
          }
          to {
            transform: translateY(100%);
          }
        }
      `}</style>
    </div>
  );
};

export default SchedulingTray;
