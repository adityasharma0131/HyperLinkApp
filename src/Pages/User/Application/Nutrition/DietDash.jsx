import React, { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { FiPlus } from "react-icons/fi";

import BreakFastMeal from "../../../../assets/BreakFastMeal.png";
import LunchMeal from "../../../../assets/LunchMeal.png";
import SnackMeal from "../../../../assets/SnackMeal.png";
import DinnerMeal from "../../../../assets/DinnerMeal.png";

const DietDash = () => {
  const [activeTab, setActiveTab] = useState("7 days");
  const tabs = ["7 days", "14 days", "1 month"];
  return (
    <>
      <div className="diet-dashboard-page">
        <div className="diet-dashboard-hero">
          <div className="hero-top-bar">
            <button
              className="icon-button"
              onClick={() => window.history.back()}
              aria-label="Go back"
            >
              <FiArrowLeft className="hero-icon" />
            </button>

            <h1 className="hero-title">MY DIET PLAN</h1>
          </div>
          <div>
            <div className="tab-container">
              {tabs.map((tab) => (
                <div
                  key={tab}
                  className={`tab ${activeTab === tab ? "active" : ""}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="meal-card-container">
          <div className="meal-card">
            {/* Meal Image */}
            <img src={BreakFastMeal} alt="Breakfast" className="meal-image" />

            {/* Meal Content */}
            <div className="meal-content">
              <div className="meal-header">
                <h2 className="meal-title">Breakfast</h2>
                <button className="add-btn">
                  <FiPlus className="add-icon" /> Add
                </button>
              </div>
              <p className="meal-subtext">No food item(s) added</p>

              {/* Suggested Items */}
              <div className="suggested">
                <span className="suggested-label">Suggested :</span>
                <div className="suggested-list">
                  <span className="suggested-item">Milk</span>
                  <span className="suggested-item">Eggs</span>
                  <span className="suggested-item">Apple</span>
                </div>
              </div>
            </div>
          </div>
          <div className="meal-card">
            {/* Meal Image */}
            <img src={LunchMeal} alt="Breakfast" className="meal-image" />

            {/* Meal Content */}
            <div className="meal-content">
              <div className="meal-header">
                <h2 className="meal-title">Lunch</h2>
                <button className="add-btn">
                  <FiPlus className="add-icon" /> Add
                </button>
              </div>
              <p className="meal-subtext">No food item(s) added</p>

              {/* Suggested Items */}
              <div className="suggested">
                <span className="suggested-label">Suggested :</span>
                <div className="suggested-list">
                  <span className="suggested-item">Milk</span>
                  <span className="suggested-item">Eggs</span>
                  <span className="suggested-item">Apple</span>
                </div>
              </div>
            </div>
          </div>
          <div className="meal-card">
            {/* Meal Image */}
            <img src={SnackMeal} alt="Breakfast" className="meal-image" />

            {/* Meal Content */}
            <div className="meal-content">
              <div className="meal-header">
                <h2 className="meal-title">Snacks</h2>
                <button className="add-btn">
                  <FiPlus className="add-icon" /> Add
                </button>
              </div>
              <p className="meal-subtext">No food item(s) added</p>

              {/* Suggested Items */}
              <div className="suggested">
                <span className="suggested-label">Suggested :</span>
                <div className="suggested-list">
                  <span className="suggested-item">Milk</span>
                  <span className="suggested-item">Eggs</span>
                  <span className="suggested-item">Apple</span>
                </div>
              </div>
            </div>
          </div>
          <div className="meal-card">
            {/* Meal Image */}
            <img src={DinnerMeal} alt="Breakfast" className="meal-image" />

            {/* Meal Content */}
            <div className="meal-content">
              <div className="meal-header">
                <h2 className="meal-title">Dinner</h2>
                <button className="add-btn">
                  <FiPlus className="add-icon" /> Add
                </button>
              </div>
              <p className="meal-subtext">No food item(s) added</p>

              {/* Suggested Items */}
              <div className="suggested">
                <span className="suggested-label">Suggested :</span>
                <div className="suggested-list">
                  <span className="suggested-item">Milk</span>
                  <span className="suggested-item">Eggs</span>
                  <span className="suggested-item">Apple</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style>
          {`
          .diet-dashboard-page {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

.diet-dashboard-hero {
  background: linear-gradient(to bottom, #004918 0%, #02b614 100%);
  padding: 20px;
  border-radius: 0 0 32px 32px;
  color: white;
  position: relative;
  box-shadow: 0 10px 30px rgba(103, 108, 255, 0.2);
  margin-bottom: 2rem;
}

.hero-top-bar {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  text-align: left;
  margin-bottom: 2rem;
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
  line-height: 1.2;
  text-align: left;
  letter-spacing: 1px;
}

.tab-container {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  border-radius: 10px;
  padding: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  width: fit-content;

  position: absolute;
  bottom: -20px; /* floats slightly outside hero */
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
}

.tab {
  padding: 10px 25px;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #000;
  border-radius: 10px;

  /* ✅ Prevent text wrapping */
  white-space: nowrap;
}

.tab.active {
  background: #16aa16; /* vibrant green */
  color: #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

.tab:not(.active):hover {
  background: #f3f3f3;
}

.nutrition-dashboard {
  padding: 20px;
  color: #1a1a1a;
}
.meal-card-container {
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;
  padding: 20px;
  flex-direction: column;
}

.meal-card {
  position: relative; /* needed for absolute image positioning */
  background: #fff;
  border-radius: 16px;
  padding: 20px 18px 18px 100px; /* leave space for floating image */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  max-width: 400px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.meal-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
}

.meal-image {
  position: absolute;
  top: -5px;
  left: -5px;
  width: 90px;
  height: 90px;
  border-radius: 50%;
  object-fit: cover;
}

.meal-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.meal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.meal-title {
  font-size: 18px;
  font-weight: 700;
  margin: 0;
  color: #1a1a1a;
}

.add-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  background: none;
  border: none;
  color: #16aa16;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  transition: color 0.3s ease;
}
.add-btn:hover {
  color: #0e7c0e;
}
.add-icon {
  font-size: 16px;
}

.meal-subtext {
  font-size: 14px;
  color: #888;
  margin: 4px 0 12px;
}

.suggested {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}

.suggested-label {
  font-size: 14px;
  font-weight: 500;
  color: #444;
}

.suggested-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.suggested-item {
  background: #f5f5f5;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
  color: #333;
  cursor: default;
  transition: background 0.2s ease;
}
.suggested-item:hover {
  background: #eaeaea;
}

          `}
        </style>
      </div>
    </>
  );
};

export default DietDash;
