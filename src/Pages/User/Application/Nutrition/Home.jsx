import React, { useState, useEffect } from "react";
import AppButton from "../../../../Components/AppButton";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiBookOpen } from "react-icons/fi";
import Mealimg from "../../../../assets/Mealimg.png";
import NutritionIntro from "../../../../assets/NutritionIntro.svg";
import NutritionSetGoal from "../../../../assets/NutritionSetGoal.svg";
import NutritionAddFood from "../../../../assets/NutritionAddFood.svg";
import { FaTrophy } from "react-icons/fa";
import { GiKnifeFork } from "react-icons/gi";
import { IoFastFood } from "react-icons/io5";
import { IoIosBarcode, IoIosAddCircle } from "react-icons/io";
import { FaCamera } from "react-icons/fa";

import HealthFeed1 from "../../../../assets/healthfeed1.png";
import HealthFeed2 from "../../../../assets/healthfeed2.png";

const Home = () => {
  const navigate = useNavigate();
  const [hasGoalData, setHasGoalData] = useState(false);
  const [goalData, setGoalData] = useState(null);

  useEffect(() => {
    const storedGoalData = localStorage.getItem("calorieGoalData");
    if (storedGoalData) {
      try {
        const parsedData = JSON.parse(storedGoalData);
        setGoalData(parsedData);
        setHasGoalData(true);
      } catch (error) {
        console.error("Error parsing calorieGoalData:", error);
        setHasGoalData(false);
      }
    } else {
      setHasGoalData(false);
    }
  }, []);

  const features = [
    {
      img: NutritionSetGoal,
      icon: <FaTrophy />,
      title: "Set Goal",
      path: "/app/nutrition/set-goal",
    },
    {
      img: NutritionAddFood,
      icon: <IoFastFood />,
      title: "Add your food",
      path: "/app/nutrition/diet-dashboard",
    },
  ];

  const foodItems = [
    { title: "Breakfast", img: Mealimg },
    { title: "Lunch", img: Mealimg },
    { title: "Snacks", img: Mealimg },
    { title: "Dinner", img: Mealimg },
  ];

  const [activeTab, setActiveTab] = useState("7 days");
  const tabs = ["7 days", "14 days", "1 month"];

  const goalCalories = hasGoalData && goalData ? goalData.calorieGoal : 1400;
  const intakeCalories = 650;
  const caloriesLeft = goalCalories - intakeCalories;

  const nutrients = {
    protein: { current: 8, total: 12, color: "protein" },
    carbs: { current: 10, total: 12, color: "carbs" },
    fats: { current: 6, total: 12, color: "fats" },
  };

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

        {hasGoalData ? (
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
        ) : (
          <div className="features-container">
            {features.map((feature, index) => (
              <div
                key={index}
                className="feature-card"
                onClick={() => navigate(feature.path)}
              >
                <img
                  src={feature.img}
                  alt={feature.title}
                  className="feature-img"
                />
                <div className="feature-footer">
                  <span className="feature-icon">{feature.icon}</span>
                  <p className="feature-title">{feature.title}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {hasGoalData ? (
        <div className="nutrition-dashboard">
          <div className="dashboard-header">
            <h1 className="dashboard-title">Update your diet plan daily</h1>
            <button className="next-btn">›</button>
          </div>

          <div className="dashboard-top">
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

            <div className="card illustration-card">
              <img src={NutritionIntro} alt="Nutrition Illustration" />
            </div>
          </div>

          <div className="stats-card">
            <h2>Statistics</h2>
            <div className="stats-content">
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
      ) : (
        <div className="scan-options">
          <div className="scan-card">
            <FaCamera className="scan-icon" />
            <p className="scan-text">Scan a Meal</p>
          </div>

          <div className="scan-card">
            <IoIosBarcode className="scan-icon" />
            <p className="scan-text">Scan a Barcode</p>
          </div>
        </div>
      )}

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
          {[HealthFeed1, HealthFeed2, HealthFeed1, HealthFeed2].map(
            (img, idx) => (
              <div key={idx} className="health-card">
                <img src={img} alt="Feed" className="feed-image" />
                <span className={`tag ${idx % 2 === 0 ? "blue" : "green"}`}>
                  {idx % 2 === 0 ? "#GeneticInsights" : "#HeartHealth"}
                </span>
                <h3 className="feed-title">
                  Understanding Your Genetic Predisposition to Diabetes
                </h3>
                <p className="feed-meta">5 min read · Dr. Kavita Madhuri</p>
              </div>
            )
          )}
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
  padding-bottom: ${hasGoalData ? "60px" : "110px"};
  
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
  background: linear-gradient(to bottom, #02b614 0%, #004918 100%);
  border-radius: 12px;
  position: relative; /* anchor for absolute child */
  overflow: visible; /* allow image pop-out */
  display: flex;
  justify-content: center;
  align-items: flex-end;
}

.illustration-card img {
  width: 77%;
  height: auto;
  object-fit: contain;
  position: absolute;
  left: 45px;
  bottom: 11px;
  transition: all 0.3s ease-in-out; /* smooth resize */
}

/* Responsiveness */
@media (max-width: 1024px) {
  .illustration-card img {
    width: 70%;
    left: 35px;
    bottom: 8px;
  }
}

@media (max-width: 768px) {
  .illustration-card img {
    width: 65%;
    left: 25px;
    bottom: 6px;
  }
}

@media (max-width: 480px) {

  .illustration-card img {
          width: 70%;
        left: 58px;
        bottom: 15px;
  }
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

/* Features Container at bottom border */
.features-container {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 50%); /* docks cards on the bottom border */
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: auto;
  z-index: 5;
}
.feature-card {
  background: #fff;
  backdrop-filter: blur(8px);
  border-radius: 24px;
  padding: 24px 20px;
  width: 180px;
  height: 210px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border: 1px solid rgba(255, 255, 255, 0.4);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  cursor: pointer;
}

.feature-card:hover {
  transform: translateY(-8px) scale(1.03);
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.15);
}

/* Image wrapper with soft circular background */
.feature-img {
  width: 100px;
  height: 100px;
}

/* Footer section */
.feature-footer {
  display: flex;
  flex-direction: row;
  gap: 6px;
  align-items: center;
}

.feature-icon {
  font-size: 22px;
  color: #02b614;
}

.feature-title {
  font-size: 15px;
  font-weight: 600;
  color: #004918;
  text-align: center;
  letter-spacing: 0.3px;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .features-container {
    transform: translate(-50%, 40%);
  }

  .feature-card {
 width: 145px;
        height: 170px;
        padding: 18px;
  }

  .feature-title {
    font-size: 13px;
  }
}

.scan-options {
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;
  padding: 10px 30px;
  margin: 5rem 0 1rem
}

.scan-card {
  background: #fff;
  border-radius: 12px;
  width: 180px;
  height: 140px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
}

.scan-card:hover {
  transform: translateY(-5px);
  box-shadow: 0px 6px 14px rgba(0, 0, 0, 0.15);
}

.scan-icon {
  font-size: 40px;
  color: #333;
  margin-bottom: 12px;
}

.scan-text {
  font-size: 16px;
  font-weight: 500;
  color: #222;
}

.food-section {
  max-width: 600px;
  padding: 16px;
  margin: 0 auto;
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
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  position: absolute;
  top: -20px;
  left: -20px;
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
