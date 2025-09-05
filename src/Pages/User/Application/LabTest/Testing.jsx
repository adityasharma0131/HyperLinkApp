import React, { useState, useEffect } from "react";
import AppButton from "../../../../Components/AppButton";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiBookOpen } from "react-icons/fi";
import NutritionIntro from "../../../../assets/NutritionIntro.svg";
import { FaTrophy } from "react-icons/fa";
import { GiKnifeFork } from "react-icons/gi";

import HealthFeed1 from "../../../../assets/healthfeed1.png";
import HealthFeed2 from "../../../../assets/healthfeed2.png";
import { IoIosAddCircle } from "react-icons/io";

const Home = () => {
  const navigate = useNavigate();

  const foodItems = [
    { title: "Breakfast", img: Mealimg },
    { title: "Lunch", img: Mealimg },
    { title: "Snacks", img: Mealimg },
    { title: "Dinner", img: Mealimg },
  ];
  const [activeTab, setActiveTab] = useState("7 days");

  const tabs = ["7 days", "14 days", "1 month"];

  const goalCalories = 1400;
  const intakeCalories = 650; // dummy data
  const caloriesLeft = goalCalories - intakeCalories;

  const nutrients = {
    protein: { current: 8, total: 12, color: "protein" },
    carbs: { current: 10, total: 12, color: "carbs" },
    fats: { current: 6, total: 12, color: "fats" },
  };

  // Circle Progress
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const progress = (caloriesLeft / goalCalories) * circumference;

  return (
    <div className="nutrition-dash-page">
      <div className="nutrition-hero">
        {/* Top Bar */}
        <div className="hero-top-bar">
          <button className="icon-button" onClick={() => navigate(-1)}>
            <FiArrowLeft className="hero-icon" />
          </button>
          <div className="hero-texts">
            <h1 className="hero-title">NUTRITION TRACKER</h1>
          </div>
          <button className="icon-button">
            <FiBookOpen className="hero-icon" />
          </button>
        </div>

        {/* Center Content */}
        <div className="hero-content">
          <h1 className="hero-heading">
            CREATE YOUR <br /> PERSONALIZED DIET PLAN
          </h1>

          <div className="hero-button">
            <AppButton
              text="Consult Dietitian"
              variant="secondary"
              onClick={() => navigate("/consult")}
            />
          </div>
        </div>

        {/* Tabs at bottom */}
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

      <div className="nutrition-dashboard">
        {/* Header */}
        <div className="dashboard-header">
          <h1 className="dashboard-title">Update your diet plan daily</h1>
          <button className="next-btn">›</button>
        </div>

        {/* Top Section */}
        <div className="dashboard-top">
          {/* Left Side: Goal + Intake */}
          <div className="left-cards">
            <div className="card goal-card">
              <h2>{goalCalories} cals</h2>
              <p>
                <FaTrophy /> Your Goals
              </p>
            </div>

            <div className="card intake-card">
              <h2>{intakeCalories} cals</h2>
              <p>
                <GiKnifeFork /> Food Intake
              </p>
            </div>
          </div>

          {/* Right Side: Illustration */}
          <div className="card illustration-card">
            <img src={NutritionIntro} alt="Nutrition Illustration" />
          </div>
        </div>

        {/* Stats Section */}
        <div className="stats-card">
          <h2>Statistics</h2>
          <div className="stats-content">
            {/* Circle Progress */}
            <div className="circle-progress">
              <svg viewBox="0 0 120 120" className="progress-ring">
                <circle
                  className="progress-ring-bg"
                  cx="60"
                  cy="60"
                  r={radius}
                />
                <circle
                  className="progress-ring-fill"
                  cx="60"
                  cy="60"
                  r={radius}
                  style={{
                    strokeDasharray: circumference,
                    strokeDashoffset: circumference - progress,
                  }}
                />
              </svg>
              <div className="circle-inner">
                <h1>{caloriesLeft}</h1>
                <p>calories left</p>
              </div>
            </div>

            {/* Nutrient Bars */}
            <div className="nutrients">
              {Object.entries(nutrients).map(
                ([name, { current, total, color }]) => {
                  const percent = (current / total) * 100;
                  return (
                    <div className="nutrient" key={name}>
                      <div className="nutrient-header">
                        <span>
                          {name.charAt(0).toUpperCase() + name.slice(1)}
                        </span>
                        <span>
                          {current}/{total}g
                        </span>
                      </div>
                      <div className="bar">
                        <div
                          className={`fill ${color}`}
                          style={{ width: `${percent}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Food Intake Section */}
      <div className="food-section">
        <h1 className="food-heading">Add daily food intake</h1>

        <div className="food-container">
          {foodItems.map((item, index) => (
            <div key={index} className="food-card">
              <img src={item.img} alt={item.title} className="food-img" />

              <div className="food-content">
                <div className="food-title">{item.title}</div>
              </div>
              <div className="add-data">
                <IoIosAddCircle className="add-icon" />
                <span>Add Data</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="health-feeds-wrapper">
        <div className="health-feeds-header">
          <h2>Recent Health Feeds</h2>
          <a href="#" className="see-all-link">
            See All
          </a>
        </div>

        <div className="health-feeds-scroll">
          <div className="health-card">
            <img
              src={HealthFeed1}
              alt="Diabetes Check"
              className="feed-image"
            />
            <span className="tag blue">#GeneticInsights</span>
            <h3 className="feed-title">
              Understanding Your Genetic Predisposition to Diabetes
            </h3>
            <p className="feed-meta">5 min read · Dr. Kavita Madhuri</p>
          </div>

          <div className="health-card">
            <img src={HealthFeed2} alt="Heart Health" className="feed-image" />
            <span className="tag green">#HeartHealth</span>
            <h3 className="feed-title">
              Understanding Your Genetic Predisposition to Diabetes
            </h3>
            <p className="feed-meta">5 min read · Dr. Kavita Madhuri</p>
          </div>
          <div className="health-card">
            <img
              src={HealthFeed1}
              alt="Diabetes Check"
              className="feed-image"
            />
            <span className="tag blue">#GeneticInsights</span>
            <h3 className="feed-title">
              Understanding Your Genetic Predisposition to Diabetes
            </h3>
            <p className="feed-meta">5 min read · Dr. Kavita Madhuri</p>
          </div>

          <div className="health-card">
            <img src={HealthFeed2} alt="Heart Health" className="feed-image" />
            <span className="tag green">#HeartHealth</span>
            <h3 className="feed-title">
              Understanding Your Genetic Predisposition to Diabetes
            </h3>
            <p className="feed-meta">5 min read · Dr. Kavita Madhuri</p>
          </div>
        </div>
      </div>
      <style>
        {`        
.nutrition-dash-page {
  box-sizing: border-box;
  padding: 0;
  background-color: #f7fafc;
  margin: 0;
}

.nutrition-hero {
  background: linear-gradient(to bottom, #004918 0%, #02b614 100%);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  padding: 20px;
  border-radius: 0 0 32px 32px;
  color: white;
  position: relative;
  box-shadow: 0 10px 30px rgba(0, 162, 91, 0.3);
  display: flex;
  flex-direction: column;
  min-height: 37vh;
  margin-bottom: 2rem;
}

/* Top Bar */
.hero-top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  position: relative;
  z-index: 2;
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
}

/* Back & Book icons */
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
  z-index: 2;
}

.icon-button:hover {
  background: rgba(255, 255, 255, 0.35);
  transform: translateY(-2px);
}

.hero-icon {
  font-size: 18px;
  color: white;
}

/* Center Content */
.hero-content {
  text-align: center;
  margin-top: 1rem;
  z-index: 2;
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.hero-heading {
  font-size: 24px;
  font-weight: 600;
  line-height: 1.4;
  margin-bottom: 20px;
}

.hero-button {
  width: 50%;
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
  bottom: -20px;          /* floats slightly outside hero */
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
  background: #16aa16;  /* vibrant green */
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

/* Header */
.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.dashboard-title {
  font-size: 18px;
  font-weight: 700;
}

.next-btn {
  font-size: 22px;
  font-weight: bold;
  border: none;
  background: none;
  cursor: pointer;
}

/* Top Section */
.dashboard-top {
  display: grid;
  grid-template-columns: 1fr 2fr; /* left cards + right image */
  gap: 15px;
  margin-bottom: 20px;
}

.left-cards {
  display: flex;
  flex-direction: column;
  gap: 15px;
  justify-content: space-between;
}

.card {
  background: linear-gradient(to bottom, #02b614  0%, #004918 100%);
  border-radius: 12px;
  padding: 10px;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align:center;
}

.goal-card h2,
.intake-card h2 {
  font-size: 15px;
  margin: 0 0 5px 0;
  font-weight: 800;
}

.goal-card p,
.intake-card p {
  font-size: 15px;
  margin: 0;
  
    white-space: nowrap;
}

.illustration-card {
  background: linear-gradient(to bottom, #02b614  0%, #004918 100%);
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.illustration-card img {
    width: 45%;
    height: auto;
    object-fit: contain;
    position: absolute;
    right: 20px;
    bottom: 178px;
}

/* Stats Section */
.stats-card {
  background: linear-gradient(to bottom, #02b614  0%, #004918 100%);
  border-radius: 12px;
  padding: 20px;
  color: white;
}

.stats-card h2 {
  font-size: 16px;
}

.stats-content {
  display: flex;
  align-items: center;
}

/* Circle Progress */
.circle-progress {
  position: relative;
  width: 120px;
  height: 120px;
}

.progress-ring {
  transform: rotate(-90deg);
  width: 120px;
  height: 120px;
}

.progress-ring-bg {
  fill: none;
  stroke: rgba(255, 255, 255, 0.3);
  stroke-width: 10;
}

.progress-ring-fill {
  fill: none;
  stroke: white;
  stroke-width: 10;
  stroke-linecap: round;
  transition: stroke-dashoffset 0.5s ease;
}

.circle-inner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.circle-inner h1 {
  margin: 0;
  font-size: 22px;
  font-weight: 700;
}

.circle-inner p {
  margin: 0;
  font-size: 12px;
}

/* Nutrients */
.nutrients {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.nutrient-header {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
}

.bar {
  height: 10px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 6px;
  overflow: hidden;
}

.fill {
  height: 100%;
}

.fill.protein {
  background: #0071e3;
}

.fill.carbs {
  background: #00c896;
}

.fill.fats {
  background: #ff6b35;
}


.food-section {
  max-width: 600px;
  padding: 16px;
}

.food-heading {
  font-size: 16px;
  font-weight: 500;
  color: #1e293b;
  margin-bottom: 16px;
  text-align: left;
}

.food-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.food-card {
  background: #fff;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  position: relative;
  overflow: visible; /* let image overflow */
  transition: transform 0.2s ease;
}

.food-card:hover {
  transform: translateY(-3px);
}

.food-img {
      width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
    position: absolute;
    top: -10px;
    left: -10px;
}

.food-content {
  margin-left: 30px; /* push text away from image */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.food-title {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 6px;
  color: #000;
}

.add-data {
  display: flex;
  align-items: center;
  font-size: 13px;
  font-weight: 500;
  color: #555;
  cursor: pointer;
  gap: 4px;
}

.add-data:hover {
  color: #007bff;
}

.add-icon {
  color: #007bff;
  font-size: 18px;
}

.health-feeds-wrapper {
  padding: 1.25rem 1rem;
}

.health-feeds-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.health-feeds-header h2 {
  font-size: 1rem;
  font-weight: 500;
  color: #1f2937;
  margin: 0;
}

.see-all-link {
  font-size: 0.95rem;
  font-weight: 600;
  color: #2563eb;
  text-decoration: none;
}
.health-feeds-scroll {
  display: flex;
  overflow-x: auto;
  gap: 1rem;
  padding-bottom: 0.5rem;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;

  /* Hide scrollbar for WebKit (Chrome, Safari) */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}

.health-feeds-scroll::-webkit-scrollbar {
  display: none; /* Chrome, Safari */
}

.health-card {
  flex: 0 0 80%;
  max-width: 55%;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  scroll-snap-align: start;
  overflow: hidden; /* Important: clips rounded image corners */
  padding-bottom: 1rem; /* Padding only at bottom now */
}

.feed-image {
  width: 100%;
  height: 140px;
  object-fit: cover;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  display: block;
}

.tag {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.3rem 0.6rem;
  border-radius: 9999px;
  margin: 0.75rem 1rem 0.5rem 1rem;
  width: fit-content;
}

.tag.blue {
  background-color: #e0f2fe;
  color: #0284c7;
}

.tag.green {
  background-color: #dcfce7;
  color: #16a34a;
}

.feed-title {
  font-size: 13px;
  font-weight: 600;
  color: #111827;
  margin: 0 1rem 0.4rem 1rem;
}

.feed-meta {
  font-size: 10px;
  color: #6b7280;
  margin: 0 1rem;
}

`}
      </style>
    </div>
  );
};

export default Home;
