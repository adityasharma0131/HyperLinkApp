// SleepGoal.jsx
import React, { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import "./style.css";

const SleepGoal = () => {
  const [sleepTime, setSleepTime] = useState(22); // 10 PM
  const [wakeTime, setWakeTime] = useState(6); // 6 AM
  const [isEditing, setIsEditing] = useState(false);
  const [editSleepTime, setEditSleepTime] = useState(22);
  const [editWakeTime, setEditWakeTime] = useState(6);

  const radius = 120;
  const duration = (wakeTime - sleepTime + 24) % 24;

  const formatTime = (hour) => {
    const period = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    return `${displayHour}:00 ${period}`;
  };

  const hourToRadians = (hour) =>
    ((hour % 24) / 24) * 2 * Math.PI - Math.PI / 2;

  // Angles
  const sleepAngle = hourToRadians(sleepTime);
  const wakeAngle = hourToRadians(wakeTime);

  const sleepPos = {
    x: 150 + Math.cos(sleepAngle) * radius,
    y: 150 + Math.sin(sleepAngle) * radius,
  };
  const wakePos = {
    x: 150 + Math.cos(wakeAngle) * radius,
    y: 150 + Math.sin(wakeAngle) * radius,
  };

  const largeArcFlag = duration > 12 ? 1 : 0;
  const arcPath = `
    M ${sleepPos.x} ${sleepPos.y}
    A ${radius} ${radius} 0 ${largeArcFlag} 1 ${wakePos.x} ${wakePos.y}
  `;

  /** Editing Handlers **/
  const handleEditClick = () => {
    setEditSleepTime(sleepTime);
    setEditWakeTime(wakeTime);
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setSleepTime(editSleepTime);
    setWakeTime(editWakeTime);
    setIsEditing(false);
  };

  const incrementTime = (type) => {
    if (type === "sleep") setEditSleepTime((prev) => (prev + 1) % 24);
    else setEditWakeTime((prev) => (prev + 1) % 24);
  };

  const decrementTime = (type) => {
    if (type === "sleep") setEditSleepTime((prev) => (prev - 1 + 24) % 24);
    else setEditWakeTime((prev) => (prev - 1 + 24) % 24);
  };

  return (
    <div className="sleep-goal-page">
      <div className="sleep-goal-hero">
        <div className="hero-top-bar">
          <button className="icon-button" onClick={() => window.history.back()}>
            <FiArrowLeft className="hero-icon" />
          </button>

          <div className="hero-texts">
            <h1 className="hero-title">Sleep Goals</h1>
            <p className="hero-subtitle">
              Customize your bedtime and wake time
            </p>
          </div>

          {/* Empty div to maintain spacing */}
          <div style={{ width: "36px" }}></div>
        </div>

        {/* CLOCK */}
        <div className="clock-card">
          <div className="clock-container">
            <svg className="clock-svg" viewBox="0 0 300 300">
              <defs>
                <linearGradient
                  id="arcGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#4A90E2" />
                  <stop offset="100%" stopColor="#8C60E2" />
                </linearGradient>
              </defs>

              {/* Background circle */}
              <circle
                cx="150"
                cy="150"
                r={radius}
                fill="none"
                stroke="#e2e8f0"
                strokeWidth="18"
              />

              {/* Arc */}
              <path
                d={arcPath}
                fill="none"
                stroke="url(#arcGradient)"
                strokeWidth="18"
                strokeLinecap="round"
                className="arc-path"
              />

              {/* Hour markers (12, 3, 6, 9) */}
              {[0, 6, 12, 18].map((i) => {
                const angle = hourToRadians(i);
                return (
                  <text
                    key={i}
                    x={150 + Math.cos(angle) * (radius - 25)}
                    y={150 + Math.sin(angle) * (radius - 25) + 6}
                    textAnchor="middle"
                    fontSize="18"
                    fontWeight="700"
                    fill="#334155"
                  >
                    {i === 0 ? 12 : i}
                  </text>
                );
              })}

              {/* Sleep Handle */}
              <circle
                cx={sleepPos.x}
                cy={sleepPos.y}
                r={15}
                className="sleep-handle"
              />
              <text
                x={sleepPos.x}
                y={sleepPos.y + 5}
                textAnchor="middle"
                fontSize="14"
                fill="white"
              >
                🌙
              </text>

              {/* Wake Handle */}
              <circle
                cx={wakePos.x}
                cy={wakePos.y}
                r={15}
                className="wake-handle"
              />
              <text
                x={wakePos.x}
                y={wakePos.y + 5}
                textAnchor="middle"
                fontSize="14"
                fill="white"
              >
                🔔
              </text>
            </svg>

            <div className="clock-center">
              <h2 className="sleep-duration">{duration}h</h2>
              <div className="sleep-details">
                <p>
                  <span className="sleep-label">Sleep:</span>{" "}
                  {formatTime(sleepTime)}
                </p>
                <p>
                  <span className="wake-label">Wake:</span>{" "}
                  {formatTime(wakeTime)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Below */}
      <div className="content-below-hero">
        <div className="days-selector">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
            <div key={d} className="day-pill">
              {d}
            </div>
          ))}
        </div>

        {isEditing ? (
          <div className="time-controls">
            <div className="time-edit-container">
              <div className="time-edit-group">
                <label>Sleep Time:</label>
                <div className="time-adjust">
                  <button onClick={() => decrementTime("sleep")}>-</button>
                  <span>{formatTime(editSleepTime)}</span>
                  <button onClick={() => incrementTime("sleep")}>+</button>
                </div>
              </div>

              <div className="time-edit-group">
                <label>Wake Time:</label>
                <div className="time-adjust">
                  <button onClick={() => decrementTime("wake")}>-</button>
                  <span>{formatTime(editWakeTime)}</span>
                  <button onClick={() => incrementTime("wake")}>+</button>
                </div>
              </div>

              <div className="duration-preview">
                Sleep Duration: {(editWakeTime - editSleepTime + 24) % 24}h
              </div>

              <button className="save-button" onClick={handleSaveClick}>
                Save Changes
              </button>
            </div>
          </div>
        ) : (
          <div className="summary-card">
            <div>
              <h3>Bed Time</h3>
              <p>{formatTime(sleepTime)}</p>
            </div>
            <div>
              <h3>Wake Time</h3>
              <p>{formatTime(wakeTime)}</p>
            </div>
            <button className="edit-button" onClick={handleEditClick}>
              Edit
            </button>
          </div>
        )}
      </div>

      <style>
        {`
        /* style.css */
.sleep-goal-page {
  background: #f1f5f9;
  min-height: 100vh;
  color: #1e293b;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Hero */
.sleep-goal-hero {
  background: linear-gradient(to bottom, #4a90e2, #8c60e2);
  padding: 20px;
  padding-bottom: 175px; /* space for overlapping clock */
  border-radius: 0 0 32px 32px;
  color: white;
  position: relative;
  width: 100%;
  max-width: 480px;
  box-shadow: 0 10px 30px rgba(74, 144, 226, 0.3);
  margin-bottom: 120px;
}

.hero-top-bar {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 20px;
}

.hero-texts {
  flex: 1;
  text-align: left;
}

.hero-title {
  font-size: 22px;
  font-weight: 700;
  margin: 0;
  line-height: 1.2;
}

.hero-subtitle {
  font-size: 13px;
  font-weight: 400;
  opacity: 0.9;
  margin-top: 4px;
}

/* Clock Card */
.clock-card {
  position: absolute;
  bottom: -120px;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  border-radius: 50%;
  width: 320px;
  height: 320px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Clock */
.clock-container {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.clock-svg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.clock-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  width: 100%;
}

.sleep-duration {
  font-size: 2.6rem;
  font-weight: 800;
  color: #0172d0;
  margin: 0;
}

.sleep-details {
  margin-top: 10px;
  font-size: 1rem;
  color: #475569;
}

.sleep-label {
  color: #3b82f6;
  font-weight: 600;
}

.wake-label {
  color: #10b981;
  font-weight: 600;
}

/* Content below hero */
.content-below-hero {
  width: 100%;
  max-width: 480px;
  padding: 0 20px;
}

/* Time controls */
.time-controls {
  margin-top: 24px;
  background: white;
  padding: 18px;
  border-radius: 16px;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.06);
  width: 100%;
}

.time-edit-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  text-align: center;
}

.time-edit-group {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.time-edit-group label {
  font-weight: 600;
  color: #334155;
  margin-bottom: 8px;
}

.time-adjust {
  display: flex;
  align-items: center;
  gap: 12px;
}

.time-adjust button {
  background: #4a90e2;
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  color: white;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: 0.25s;
}

.time-adjust button:hover {
  background: #2563eb;
}

.time-adjust span {
  font-weight: 600;
  font-size: 1rem;
  color: #1e293b;
  min-width: 100px;
  display: inline-block;
}

.duration-preview {
  margin-top: 12px;
  font-weight: 600;
  color: #334155;
}

.save-button {
  background: #4a90e2;
  border: none;
  padding: 12px 24px;
  border-radius: 12px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: 0.25s;
  margin-top: 16px;
  width: 100%;
}

.save-button:hover {
  background: #2563eb;
}

/* Buttons */
.icon-button {
  background: rgba(255, 255, 255, 0.25);
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
  background: rgba(255, 255, 255, 0.35);
  transform: translateY(-2px);
}

.hero-icon {
  font-size: 18px;
  color: white;
}

.handle {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;
}

.sleep-handle {
  background-color: #4a90e2;
}

.wake-handle {
  background-color: #8c60e2;
}
.arc-path {
  transition: all 0.6s ease-in-out;
}

.days-selector {
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
  gap: 8px;
}

.day-pill {
  flex: 1;
  text-align: center;
  background: #f8fafc;
  border-radius: 12px;
  padding: 8px 0;
  font-weight: 600;
  color: #334155;
  cursor: pointer;
  transition: 0.3s;
}

.day-pill:hover {
  background: #e2e8f0;
}

.summary-card {
  display: flex;
  justify-content: space-between;
  background: white;
  padding: 18px;
  border-radius: 16px;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.06);
  text-align: center;
  position: relative;
}

.summary-card h3 {
  font-size: 14px;
  font-weight: 600;
  color: #475569;
  margin: 0;
}

.summary-card p {
  font-size: 18px;
  font-weight: 700;
  color: #1e293b;
  margin: 4px 0 0 0;
}

.edit-button {
  position: absolute;
  bottom: -16px;
  left: 50%;
  transform: translateX(-50%);
  background: #4a90e2;
  border: none;
  padding: 8px 24px;
  border-radius: 20px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: 0.25s;
  box-shadow: 0 4px 10px rgba(74, 144, 226, 0.3);
}

.edit-button:hover {
  background: #2563eb;
  transform: translateX(-50%) translateY(-2px);
}
`}
      </style>
    </div>
  );
};

export default SleepGoal;
