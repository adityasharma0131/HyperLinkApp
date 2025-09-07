import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import "./style.css";

const SetGoal = () => {
  const navigate = useNavigate();
  const [distance, setDistance] = useState(0);
  const [steps, setSteps] = useState(0);
  const [calories, setCalories] = useState(0);
  const [active, setActive] = useState("7 days");

  const options = ["7 days", "14 days", "1 month"];

  const getRangeStyle = (type, value, max) => {
    const percent = (value / max) * 100;
    let color = "#4caf50"; // Default Green (Distance)

    if (type === "calories") color = "#ff80bf"; // Pink
    if (type === "steps") color = "#2196f3"; // Blue

    return {
      background: `linear-gradient(to right, ${color} ${percent}%, #ddd ${percent}%)`,
      "--thumb-color": color, // Custom CSS variable
    };
  };

  // ✅ Handle Submit
  const handleSubmit = () => {
    const goalData = {
      distance,
      steps,
      calories,
      duration: active,
      createdAt: new Date().toISOString(),
    };

    // Save to localStorage
    localStorage.setItem("physicalGoal", JSON.stringify(goalData));

    // Navigate
    navigate("/app/physical/");
  };

  return (
    <div className="physical-set-goal-page">
      {/* Hero Section */}
      <div className="physical-set-goal-hero">
        {/* Top Bar */}
        <div className="hero-top-bar">
          <button className="icon-button" onClick={() => navigate(-1)}>
            <FiArrowLeft className="hero-icon" />
          </button>
          <div className="hero-texts">
            <h1 className="hero-title">SET ACTIVITY GOAL</h1>
          </div>
        </div>

        {/* ✅ Floating Goal Wrapper */}
        <div className="goal-wrapper">
          {/* Distance */}
          {/* Distance */}
          <div className="goal-card">
            <div className="goal-header">
              <h3>Distance covered (in km)</h3>
              <input
                type="number"
                value={distance}
                onChange={(e) => setDistance(Math.min(e.target.value, 200))}
              />
            </div>
            <input
              type="range"
              min="0"
              max="200"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              style={getRangeStyle("distance", distance, 200)}
            />
            <div className="goal-footer">
              <span>0 km</span>
              <span>200 km</span>
            </div>
          </div>

          {/* Steps */}
          <div className="goal-card">
            <div className="goal-header">
              <h3>Steps</h3>
              <input
                type="number"
                value={steps}
                onChange={(e) => setSteps(Math.min(e.target.value, 50000))}
              />
            </div>
            <input
              type="range"
              min="0"
              max="50000"
              value={steps}
              onChange={(e) => setSteps(e.target.value)}
              style={getRangeStyle("steps", steps, 50000)}
            />
            <div className="goal-footer">
              <span>0 steps</span>
              <span>50,000 steps</span>
            </div>
          </div>

          {/* Calories */}
          <div className="goal-card">
            <div className="goal-header">
              <h3>Calories (to Burn)</h3>
              <input
                type="number"
                value={calories}
                onChange={(e) => setCalories(Math.min(e.target.value, 5000))}
              />
            </div>
            <input
              type="range"
              min="0"
              max="5000"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              style={getRangeStyle("calories", calories, 5000)}
            />
            <div className="goal-footer">
              <span>0 cal</span>
              <span>5,000 cal</span>
            </div>
          </div>
        </div>
      </div>

      {/* Duration Options */}
      <div className="diet-plan-container">
        <h1 className="diet-plan-title">Select your activity plan duration</h1>
        <div className="diet-plan-options">
          {options.map((option) => (
            <button
              key={option}
              className={`diet-option ${active === option ? "active" : ""}`}
              onClick={() => setActive(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <div className="submit-section">
        <button className="submit-btn" onClick={handleSubmit}>
          Set my Goal
        </button>
      </div>

      <style>
        {`
        .physical-set-goal-page {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  background-color: #f7fafc;
  min-height: 100vh;
}

/* Hero Section */
.physical-set-goal-hero {
  background: linear-gradient(to bottom, #d35400, #f39c12);
  border-radius: 0 0 32px 32px;
  color: white;
  position: relative; /* ✅ Needed for absolute goal-wrapper */
  box-shadow: 0 10px 30px rgba(0, 162, 91, 0.3);
  display: flex;
  flex-direction: column;
  padding: 20px;
  padding-bottom: 280px; /* Increased to accommodate the goal-wrapper */
  margin-bottom: 7rem;
}

/* Top Bar */
.hero-top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.hero-texts {
  flex: 1;
  text-align: center;
}

.hero-title {
  font-size: 16px;
  font-weight: 700;
  margin: 0;
  line-height: 1.2;
  text-align: left;
  letter-spacing: 1px;
  color: #fff;
}

/* Back Button */
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

/* ✅ Center-Bottom Goal Wrapper - Improved positioning */
.goal-wrapper {
  position: absolute;
  bottom: -90px; /* Adjusted to position at the bottom border */
  left: 50%;
  transform: translateX(-50%);
  background: #fff;
  border-radius: 16px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 420px;
  width: 90%;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  z-index: 10; /* Ensure it's above other content */
}

/* Goal Cards */
.goal-card {
  background: #fff2cd;
  border-radius: 12px;
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.goal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.goal-header h3 {
  font-size: 14px;
  font-weight: 600;
  margin: 0;
  color: #333;
}

.goal-header input[type="number"] {
  width: 80px;
  padding: 4px 6px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  text-align: right;
}

input[type="range"] {
  width: 100%;
  height: 6px;
  -webkit-appearance: none;
  border-radius: 4px;
  outline: none;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: var(--thumb-color, green); /* Fallback color */
  cursor: pointer;
  border: none;
}

input[type="range"]::-moz-range-thumb {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: var(--thumb-color, green); /* Fallback color */
  cursor: pointer;
  border: none;
}

.goal-footer {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #555;
}

/* Container */
.diet-plan-container {
  border-radius: 16px;
  margin: 20px;
  text-align: center;
}

/* Title */
.diet-plan-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #222;
}

/* Options */
.diet-plan-options {
  display: flex;
  justify-content: center;
  gap: 15px;
}

.diet-option {
  padding: 12px 22px;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  background-color: #fff;
  cursor: pointer;
  font-size: 15px;
  font-weight: 500;
  color: #374151;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px #ffa74326;
}

.diet-option:hover {
  border-color: #ffa743;
  background: #f9fff9;
  transform: translateY(-2px);
  box-shadow: 0 4px 10px #ffa74326;
}

.diet-option.active {
  background: #ff8a00;
  color: #fff;
  border-color: #ffa743;
  box-shadow: 0 4px 10px #ffa74326;
  transform: translateY(-2px);
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
  background: linear-gradient(135deg, #d35400, #f39c12);
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

export default SetGoal;
