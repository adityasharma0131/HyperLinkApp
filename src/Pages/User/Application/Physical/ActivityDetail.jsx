import React, { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { IoIosSearch } from "react-icons/io";
import { FaMicrophone, FaRegCalendarAlt } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

const ActivityDetail = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const activityType = location.state?.activityType || "ACTIVITY";

  const speedOptions = [
    { label: "Slow", value: "Slow", speed: "8.0 km/h" },
    { label: "Moderate", value: "Moderate", speed: "12.0 km/h" },
    { label: "Fast", value: "Fast", speed: "17.0 km/h" },
  ];

  const [selectedSpeed, setSelectedSpeed] = useState("Slow");
  const [customSpeed, setCustomSpeed] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [distance, setDistance] = useState("");
  const [calories, setCalories] = useState("");

  const handleSubmit = () => {
    if (!date || (!time && !distance && !calories)) {
      alert("Please fill in date and either time/distance or calories.");
      return;
    }

    const activityData = {
      activityType,
      speed: customSpeed || selectedSpeed,
      date,
      time,
      distance,
      calories,
    };

    console.log("Submitted Activity:", activityData);
    alert("Activity submitted successfully!");

    // Navigate to /app/physical after successful submit
    navigate("/app/physical");
  };

  return (
    <div className="add-activity-dashboard-page">
      <div className="add-activity-dashboard-hero">
        <div className="hero-top-bar">
          <button
            className="icon-button"
            onClick={() => window.history.back()}
            aria-label="Go back"
          >
            <FiArrowLeft className="hero-icon" />
          </button>
          <h1 className="hero-title">{activityType}</h1>
        </div>

        <div className="search-bar hero-search">
          <IoIosSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search Activities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FaMicrophone className="mic-icon" />
        </div>
      </div>

      <div className="speed-form-wrapper">
        <div className="speed-form">
          <h1 className="form-title">Speed</h1>

          <div className="speed-options">
            {speedOptions.map((option) => (
              <div
                key={option.value}
                className={`speed-card ${
                  selectedSpeed === option.value ? "active" : ""
                }`}
                onClick={() => setSelectedSpeed(option.value)}
              >
                <p>{option.label}</p>
                <p>({option.speed})</p>
              </div>
            ))}
          </div>

          <div className="form-fields">
            <input
              type="number"
              placeholder="Custom Speed (km/h)"
              value={customSpeed}
              onChange={(e) => setCustomSpeed(e.target.value)}
            />

            <div className="input-group">
              <label>Date</label>
              <div className="date-input">
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
            </div>

            <div className="input-group">
              <label>Total Time (min)</label>
              <input
                type="number"
                placeholder="Enter your time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label>Distance Covered (km)</label>
              <input
                type="number"
                placeholder="Enter your distance"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
              />
            </div>

            <div className="or-separator">or</div>

            <div className="input-group">
              <label>Calories</label>
              <input
                type="number"
                placeholder="Enter calories burnt directly"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
              />
            </div>

            <div className="submit-section">
              <button className="submit-btn" onClick={handleSubmit}>
                Add
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
  .add-activity-dashboard-page {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

.add-activity-dashboard-hero {
  background: linear-gradient(to bottom, #d35400, #f39c12);
  padding: 20px;
  border-radius: 0 0 32px 32px;
  color: white;
  position: relative;
  box-shadow: 0 10px 30px rgba(103, 108, 255, 0.2);
  margin-bottom: 2rem;
  padding-bottom: 2rem;
}

.hero-top-bar {
  display: flex;
  align-items: center;
  justify-content: flex-start;
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
  font-size: 16px;
  font-weight: 700;
  margin: 0;
  letter-spacing: 1px;
}

.search-bar {
  display: flex;
  align-items: center;
  background: #ffffff;
  border-radius: 999px;
  padding: 10px 16px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
}

.search-bar input {
  flex: 1;
  border: none;
  outline: none;
  padding: 6px 10px;
  font-size: 14px;
  background: transparent;
}

.search-icon,
.mic-icon {
  color: #6b7280;
  font-size: 16px;
}

.hero-search {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 50%);
  width: calc(100% - 40px);
  max-width: 500px;
}

.speed-form-wrapper {
  max-width: 500px;
  margin: 0 auto;
  border-radius: 12px;
}

.speed-form {
  max-width: 500px;
  margin: 0 auto;
  padding: 24px;
  padding-bottom: 6rem;
  border-radius: 12px;
}

.form-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: left;
}

.speed-options {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  overflow-x: auto;
}

.speed-card {
  min-width: 100px;
  text-align: center;
  padding: 16px;
  font-size: 12px;
  border-radius: 12px;
  background-color: #f0f0f0;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

.speed-card.active {
  background-color: #f39c12;
  color: white;
  font-weight: bold;
}

.speed-card:hover {
  background-color: #f39c12;
}

.form-fields {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.input-group label {
  font-weight: 500;
  font-size: 14px;
}

input[type="number"],
input[type="date"] {
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 14px;
  width: 100%;
}

.date-input {
  position: relative;
}

.date-input input {
  width: 100%;
}

.calendar-icon {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 18px;
  color: #6b7280;
}

.or-separator {
  text-align: center;
  font-weight: bold;
  color: #888;
  margin: 20px 0;
}

/* Submit Section */
.submit-section {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px;
  background: white;
  box-shadow: 0 -2px 12px rgba(0, 0, 0, 0.08);
  z-index: 100;
  display: flex;
  justify-content: center;
}

.submit-btn {
  width: 100%;
  max-width: 400px;
  padding: 14px 0;
  font-size: 16px;
  font-weight: 600;
  color: white;
  background: linear-gradient(to right, #d35400, #f39c12);
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 6px 16px rgba(22, 170, 22, 0.25);
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(22, 170, 22, 0.35);
}
`}
      </style>
    </div>
  );
};

export default ActivityDetail;
