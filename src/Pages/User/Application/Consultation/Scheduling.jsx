import React from "react";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import AppButton from "../../../../Components/AppButton";

const Scheduling = () => {
  const navigate = useNavigate();
  const days = [
    { name: "Today", date: "Jun 12", slots: 6 },
    { name: "Tomorrow", date: "Jun 13", slots: 4 },
    { name: "Wed", date: "Jun 14", slots: 8 },
    { name: "Thu", date: "Jun 15", slots: 5 },
    { name: "Fri", date: "Jun 16", slots: 3 },
    { name: "Sat", date: "Jun 17", slots: 0 },
    { name: "Sun", date: "Jun 18", slots: 0 },
  ];

  const timeSlots = {
    Morning: [
      "08:00 am - 09:00 am",
      "09:00 am - 10:00 am",
      "10:00 am - 11:00 am",
      "11:00 am - 12:00 pm",
      "12:00 pm - 01:00 pm",
      "01:00 pm - 02:00 pm",
    ],
    Afternoon: [
      "02:00 pm - 03:00 pm",
      "03:00 pm - 04:00 pm",
      "04:00 pm - 05:00 pm",
      "05:00 pm - 06:00 pm",
      "06:00 pm - 07:00 pm",
      "07:00 pm - 08:00 pm",
    ],
    Evening: [
      "08:00 pm - 09:00 pm",
      "09:00 pm - 10:00 pm",
      "10:00 pm - 11:00 pm",
      "11:00 pm - 12:00 am",
      "12:00 am - 01:00 am",
      "01:00 am - 02:00 am",
    ],
  };

  const [selectedDay, setSelectedDay] = React.useState(0);
  const [selectedTime, setSelectedTime] = React.useState(null);

  return (
    <div className="consultation-scheduling-page">
      {/* Hero Section (unchanged as requested) */}
      <div className="consultation-scheduling-hero">
        <div className="hero-top-bar">
          <button
            className="icon-button"
            onClick={() => window.history.back()}
            aria-label="Go back"
          >
            <FiArrowLeft className="hero-icon" />
          </button>
          <h1 className="hero-title">Book Slot</h1>
        </div>
      </div>

      <div className="booking-container">
        <div className="day-section">
          <h2 className="section-title">Select a Day</h2>
          <div className="day-grid">
            {days.map((day, i) => (
              <div
                className={`day-card ${selectedDay === i ? "selected" : ""} ${
                  day.slots === 0 ? "disabled" : ""
                }`}
                key={i}
                onClick={() => day.slots > 0 && setSelectedDay(i)}
              >
                <h3>{day.name}</h3>
                <p className="date">{day.date}</p>
                <div className="slot-indicator">
                  <span className="slot-count">{day.slots}</span>
                  <span>slot{day.slots !== 1 ? "s" : ""} available</span>
                </div>
                {day.slots === 0 && (
                  <div className="unavailable-label">Unavailable</div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="booking-container">
          <div className="timing-section">
            <h2 className="section-title">Select a Time</h2>
            {Object.entries(timeSlots).map(([session, slots], idx) => (
              <div className="time-block" key={idx}>
                <h3 className="session-title">{session}</h3>
                <div className="time-options">
                  {slots.map((slot, i) => (
                    <label
                      className={`time-option ${
                        selectedTime === `${session}-${i}` ? "selected" : ""
                      }`}
                      key={i}
                    >
                      <input
                        type="radio"
                        name="appointment-time"
                        value={`${session}-${i}`}
                        checked={selectedTime === `${session}-${i}`}
                        onChange={() => setSelectedTime(`${session}-${i}`)}
                      />
                      <span className="radio-visible"></span>
                      <span className="time-slot">{slot}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="book-btn">
          <AppButton
            text={"Confirm Booking"}
            disabled={!selectedTime}
            onClick={() => navigate("/app/consultation/order-summary")}
          />
        </div>
      </div>
      <style>
        {`
        /* Updated CSS with modern styling */
.consultation-scheduling-page {
  box-sizing: border-box;
  background-color: #f8fafc;
  padding: 0;
  margin: 0;
  min-height: 100vh;
}

/* Hero section remains unchanged as requested */
.consultation-scheduling-hero {
  background: linear-gradient(to bottom, #4a90e2, #8c60e2);
  padding: 20px;
  border-radius: 0 0 32px 32px;
  color: white;
  position: relative;
  box-shadow: 0 10px 30px rgba(74, 144, 226, 0.2);
}

.hero-top-bar {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  text-align: left;
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
  font-size: 1rem;
  font-weight: 500;
  margin: 0;
  flex: 1;
  line-height: 1.2;
}

/* Modernized booking container */
.booking-container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 0 24px;
}

.section-title {
  font-size: 1.25rem;
  margin-bottom: 1.5rem;
  color: #1e293b;
  font-weight: 600;
  letter-spacing: -0.5px;
}

/* Day section styling */
.day-section {
  margin-bottom: 2.5rem;
}

.day-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 12px;
}

.day-card {
  background-color: white;
  padding: 1rem;
  border-radius: 12px;
  text-align: center;
  border: 1px solid #e2e8f0;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.day-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-color: #c7d2fe;
}

.day-card h3 {
  font-size: 1rem;
  margin: 0 0 4px 0;
  color: #1e293b;
  font-weight: 600;
}

.day-card .date {
  font-size: 0.75rem;
  color: #64748b;
  margin: 0 0 8px 0;
}

.day-card .slot-indicator {
  font-size: 0.7rem;
  color: #64748b;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.day-card .slot-count {
  font-weight: 700;
  color: #4f46e5;
  font-size: 0.9rem;
}

.day-card.selected {
  background-color: #eef2ff;
  border-color: #a5b4fc;
  box-shadow: 0 0 0 2px #c7d2fe;
}

.day-card.disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background-color: #f1f5f9;
}

.day-card.disabled:hover {
  transform: none;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.unavailable-label {
  position: absolute;
  top: 4px;
  right: 4px;
  background-color: #fecaca;
  color: #b91c1c;
  font-size: 0.6rem;
  padding: 2px 4px;
  border-radius: 4px;
  font-weight: 600;
}
.booking-container {
  max-width: 800px;
  margin: auto;
  padding: 20px;
}

/* Section titles */
.section-title {
  font-size: 1.5rem;
  margin: 15px 0;
  color: #333;
}

.session-title {
  font-size: 0.95rem;
  color: #475569;
  margin-bottom: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Time section */
.timing-section {
  margin-bottom: 2rem;
}

.time-block {
  margin-bottom: 2rem;
}

.time-options {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: auto;
  gap: 12px;
}

.time-option {
  display: flex;
  align-items: center;
  gap: 12px;
  background-color: white;
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
}

/* Custom radio circle */
.radio-visible {
  width: 16px;
  height: 16px;
  border: 1px solid #94a3b8;
  border-radius: 50%;
  display: inline-block;
  position: relative;
  flex-shrink: 0;
}

.time-option input[type="radio"] {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.time-option input[type="radio"]:checked + .radio-visible::after {
  content: "";
  position: absolute;
  top: 3px;
  left: 3px;
  width: 8px;
  height: 8px;
  background-color: #4f46e5;
  border-radius: 50%;
}

.time-slot {
  font-size: 0.85rem;
  color: #334155;
  font-weight: 500;
}

.time-option.selected {
  background-color: #eef2ff;
  border-color: #818cf8;
  box-shadow: 0 0 0 1px #818cf8;
}

.time-option.selected .time-slot {
  color: #4f46e5;
  font-weight: 600;
}

/* Book button section */
.book-btn {
  position: sticky;
  bottom: 0;
  padding: 16px 0;
  background: linear-gradient(to top, #f8fafc, rgba(248, 250, 252, 0.9));
  margin-top: 2rem;
  text-align: center;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .booking-container {
    padding: 0 16px;
  }
}
`}
      </style>
    </div>
  );
};

export default Scheduling;
