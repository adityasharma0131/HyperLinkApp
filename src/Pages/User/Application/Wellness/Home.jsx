import React, { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { FaTrophy, FaFire, FaWalking, FaShoePrints } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { GiKnifeFork } from "react-icons/gi";
import { FaBed } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { GiNightSleep } from "react-icons/gi";
import SleepIntro from "../../../../assets/SleepIntro.svg";

import PhysicalIntro from "../../../../assets/PhysicalIntro.svg";
import NutritionIntro from "../../../../assets/NutritionIntro.svg";
import SubscribBanner from "../../../../assets/subscribebanner.png";

import { MdGasMeter } from "react-icons/md";
import { RiTestTubeFill } from "react-icons/ri";
import { MdBloodtype } from "react-icons/md";
import { FaDna } from "react-icons/fa";
import { CiCirclePlus } from "react-icons/ci";

import HealthFeed1 from "../../../../assets/healthfeed1.png";
import HealthFeed2 from "../../../../assets/healthfeed2.png";

import AppButton from "../../../../Components/AppButton";
import HealthRecord from "../../../../assets/healthrecord.png";

import "./style.css";

const Home = () => {
  const navigate = useNavigate();
  const [hasGoalData, setHasGoalData] = useState(false);
  const [goalData, setGoalData] = useState(null);

  const goalCalories = hasGoalData && goalData ? goalData.calorieGoal : 1400;
  const intakeCalories = 650;
  const caloriesLeft = goalCalories - intakeCalories;

  // Circle progress
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const progress = (caloriesLeft / goalCalories) * circumference;

  // Nutrition breakdown
  const nutrients = {
    protein: { current: 8, total: 12, color: "protein" },
    carbs: { current: 10, total: 12, color: "carbs" },
    fats: { current: 6, total: 12, color: "fats" },
  };

  // Default placeholder data
  const defaultData = [
    {
      icon: <FaFire className="icon pink" />,
      label: "Calories",
      current: 450,
      max: 2400,
      colorClass: "pink",
    },
    {
      icon: <FaWalking className="icon green" />,
      label: "Distance",
      current: 5,
      max: 12,
      colorClass: "green",
    },
    {
      icon: <FaShoePrints className="icon blue" />,
      label: "Steps",
      current: 8000,
      max: 12000,
      colorClass: "blue",
    },
  ];

  // Goal data (fallback to default if no goalData available)
  const data =
    hasGoalData && goalData
      ? [
          {
            icon: <FaFire className="icon pink" />,
            label: "Calories",
            current: 1875,
            max: parseInt(goalData.calories) || 2400,
            colorClass: "pink",
          },
          {
            icon: <FaWalking className="icon green" />,
            label: "Distance",
            current: 180,
            max: parseInt(goalData.distance) || 12,
            colorClass: "green",
          },
          {
            icon: <FaShoePrints className="icon blue" />,
            label: "Steps",
            current: 22250,
            max: parseInt(goalData.steps) || 12000,
            colorClass: "blue",
          },
        ]
      : defaultData;

  return (
    <>
      <div className="wellness-dashboard-page">
        <div className="wellness-dashboard-hero">
          <div className="hero-top-bar">
            <button
              className="icon-button"
              onClick={() => window.history.back()}
              aria-label="Go back"
            >
              <FiArrowLeft className="hero-icon" />
            </button>
            <h1 className="hero-title">HEALTH WELLNESS</h1>
          </div>
        </div>

        {/* Subscribe Banner */}
        <div className="subscribe-banner">
          <div className="subscribe-text">
            <h1>
              A DIET <br />
              AS UNIQUE AS <br />
              <span className="gradient-text">YOUR DNA</span>
            </h1>
            <button className="start-btn">
              SUBSCRIBE NOW! <span className="arrow">➜</span>
            </button>
          </div>
          <div className="subscribe-image">
            <img src={SubscribBanner} alt="Subscribe banner" />
          </div>
        </div>

        {/* Nutrition Dashboard */}
        <div className="nutrition-dashboard">
          <div className="dashboard-header">
            <div className="dashboard-header-content">
              <h1 className="dashboard-title">Nutrition</h1>
              <p>Log your daily food intake to stay on top of your health</p>
            </div>
            <button
              className="next-btn"
              onClick={() => navigate("/app/nutrition/diet-dashboard")}
            >
              <IoIosArrowForward />
            </button>
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
              <img src={NutritionIntro} alt="Nutrition illustration" />
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
      </div>

      {/* Physical Dashboard */}
      <div className="physical-dashboard">
        <div className="physical-dashboard-header">
          <div className="physical-dashboard-header-content">
            <h1 className="physical-dashboard-title">Physical Fitness</h1>
            <p>
              Burning calories helps you become fitter, healthier, and lose
              weight
            </p>
          </div>
          <button
            className="next-btn"
            onClick={() => navigate("/app/nutrition/diet-dashboard")}
          >
            <IoIosArrowForward />
          </button>
        </div>

        <div className="physical-dashboard-content">
          {/* Left side image */}
          <div className="physical-dashboard-illustration">
            <img src={PhysicalIntro} alt="Physical fitness illustration" />
          </div>

          {/* Right side goals */}
          <div className="physical-dashboard-goals">
            {data.map((item, index) => {
              const percentage = Math.min((item.current / item.max) * 100, 100);

              return (
                <div className="goal-item" key={index}>
                  <div className="goal-info">
                    {item.icon}
                    <span className="label">{item.label}</span>
                  </div>

                  <div className="progress-container">
                    <div className={`progress-bar ${item.colorClass}`}>
                      <div
                        className="progress-fill"
                        style={{ width: `${percentage}%` }}
                      >
                        <span className="progress-value">
                          {item.current.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <span className="progress-max">
                      {item.max.toLocaleString()}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="sleep-dashboard">
        <div className="sleep-dashboard-header">
          <div className="sleep-dashboard-header-content">
            <h1 className="sleep-dashboard-title">Sleep</h1>
            <p>Try sticking to a sleep routine every day, including weekends</p>
          </div>
          <button
            className="next-btn"
            onClick={() => navigate("/app/nutrition/diet-dashboard")}
          >
            <IoIosArrowForward />
          </button>
        </div>

        <div className="sleep-dashboard-body">
          <div className="sleep-goals-container">
            <div className="sleep-goal-card">
              <h1>7 hr 14 min</h1>
              <p>
                <FaBed className="icon" />
                Sleep Goals
              </p>
            </div>

            <div className="sleep-goal-card">
              <h1>86%</h1>
              <p>
                <GiNightSleep className="icon" />
                Sleep Quality
              </p>
            </div>
          </div>

          <div className="sleep-dashboard-illustration">
            <img src={SleepIntro} alt="Sleep illustration" />
          </div>
        </div>
      </div>

      <div className="glucose-dashboard">
        <div className="glucose-dashboard-header">
          <div className="glucose-dashboard-header-content">
            <h1 className="glucose-dashboard-title">Glucose</h1>
            <p>Try sticking to a sleep routine everyday, including weekends.</p>
          </div>
        </div>

        <div className="glucose-cards-container">
          <div className="glucose-card">
            <div className="glucose-card-header">
              <MdGasMeter className="icon red-icon" />
              <p className="value">140 mg/dL</p>
            </div>
            <h1 className="title">Post Prandial Glucose</h1>
            <div className="glucose-card-update">
              <p>Last updated Yesterday</p>
              <CiCirclePlus className="icon action-icon" />
            </div>
          </div>

          <div className="glucose-card">
            <div className="glucose-card-header">
              <RiTestTubeFill className="icon green-icon" />
              <p className="value">5.5%</p>
            </div>
            <h1 className="title">Random Blood Glucose</h1>
            <div className="glucose-card-update">
              <p>Last updated Yesterday</p>
              <CiCirclePlus className="icon action-icon" />
            </div>
          </div>

          <div className="glucose-card">
            <div className="glucose-card-header">
              <MdBloodtype className="icon blue-icon" />
              <p className="value">99 mg/dL</p>
            </div>
            <h1 className="title">Fasting Blood Glucose</h1>
            <div className="glucose-card-update">
              <p>Last updated 22 May 2023</p>
              <CiCirclePlus className="icon action-icon" />
            </div>
          </div>

          <div className="glucose-card">
            <div className="glucose-card-header">
              <FaDna className="icon purple-icon" />
              <p className="value">6.5%</p>
            </div>
            <h1 className="title">HbA1c</h1>
            <div className="glucose-card-update">
              <p>Today 9:45 AM</p>
              <CiCirclePlus className="icon action-icon" />
            </div>
          </div>
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

      <div className="report-banner">
        <div className="report-text">
          <h2>
            <span className="highlight">YOUR HEALTH </span> <br />
            <span className="highlight">RECORDS</span>
          </h2>
          <p>
            Your results and insights have been saved in your Locker. Access
            anytime from your Profile tab.
          </p>
          <AppButton text="View Records" />
        </div>
        <div className="report-image">
          <img src={HealthRecord} alt="Health Record Secure" />
        </div>
      </div>

      <style>
        {`
        .wellness-dashboard-page {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

.wellness-dashboard-hero {
  background: linear-gradient(to bottom, #6ea6e7 0%, #daeffe 50%, #e0d3ff 80%);
  padding: 20px;
  border-radius: 0 0 32px 32px;
  color: white;
  position: relative;
  box-shadow: 0 10px 30px rgba(103, 108, 255, 0.2);
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
  color: #553fb5;
}

.hero-title {
  font-size: 16px;
  color: #553fb5;
  font-weight: 700;
  margin: 0;
  line-height: 1.2;
  text-align: left;
  letter-spacing: 1px;
}

.subscribe-banner {
  display: flex;
  flex-direction: row;
  align-items: flex-end; /* text bottom-align with image */
  justify-content: space-between;
  background: linear-gradient(to top, #1476a7, #3fbfff);
  border-radius: 16px;
  margin: 1rem;
  padding: 1rem;
  color: white;
  box-shadow: 0 6px 16px rgba(15, 58, 140, 0.25);
  position: relative;
  overflow: hidden;
}

/* --- Left Side Text --- */
.subscribe-text {
  flex: 1;
  text-align: left; /* ✅ aligned left */
}

.subscribe-text h1 {
  font-size: 1.2rem; /* ✅ smaller for mobile */
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 0.6rem;
}

.subscribe-text .gradient-text {
  background: linear-gradient(90deg, #ffe259, #ffa751);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* --- Right Side Image --- */
.subscribe-image {
  flex: 0 0 auto;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  height: 100%;
  position: relative;
}

.subscribe-image img {
  width: 185px;
  height: auto;
  object-fit: contain;
  position: absolute;
  right: 0;
  bottom: -16px;
}

/* --- Start Button --- */
.start-btn {
  margin-top: 20px;
  padding: 10px 5px;
  background: #fff;
  color: #1e73e6;
  font-size: 13px;
  font-weight: 600;
  border: none;
  border-radius: 6px;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  transition: background 0.3s ease;
}

.start-btn:hover {
  background: #f0f0f0; /* ✅ softer hover effect for white button */
}

.start-btn .arrow {
  margin-left: 6px;
  font-size: 14px;
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
  background: linear-gradient(to bottom, #02b614 0%, #004918 100%);
  border-radius: 12px;
  padding: 10px;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
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
  background: linear-gradient(to bottom, #02b614 0%, #004918 100%);
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

.physical-dashboard {
  padding: 20px;
  color: #1a1a1a;
}
/* Header */
.physical-dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.physical-dashboard-title {
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

/* Card wrapper */
.health-goal-card {
  max-width: 450px;
  margin: 1rem;
  padding: 25px;
  border-radius: 16px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  background: #ffffff;
}

.description {
  font-size: 15px;
  color: #444;
  margin-bottom: 25px;
  line-height: 1.5;
}

/* Goal items */
.goal-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 15px;
}

.goal-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  margin-bottom: 8px;
}

.icon {
  font-size: 22px;
}

.icon.pink {
  color: #ff80bf;
}

.icon.green {
  color: #4caf50;
}

.icon.blue {
  color: #2196f3;
}

.label {
  font-weight: 600;
  font-size: 17px;
}

/* Progress bars */
.progress-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.progress-bar {
  flex: 1;
  height: 12px;
  border-radius: 20px;
  background: #e0e0e0;
  position: relative;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  border-radius: 20px;
  transition: width 0.6s ease;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.progress-fill .progress-value {
  position: absolute;
  top: -22px; /* Shows value above bar */
  color: #000;
  font-size: 14px;
  font-weight: 600;
}

.progress-max {
  font-size: 14px;
  font-weight: 500;
  color: #555;
}

/* Colors for bars */
.progress-bar.pink .progress-fill {
  background: #e754ad;
}
.progress-bar.green .progress-fill {
  background: #2ecc71;
}
.progress-bar.blue .progress-fill {
  background: #3498db;
}

/* Layout */
.physical-dashboard-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.physical-dashboard-illustration {
  position: relative;
  background: linear-gradient(to bottom, #d35400, #f39c12);
  padding: 90px;
  border-radius: 10px;
  overflow: visible; /* allow image to pop out */
  display: flex;
  justify-content: center;
  align-items: flex-end; /* align image bottom to container bottom */
  height: 200px; /* fixed height for consistent layout */
}

.physical-dashboard-illustration img {
  position: absolute;
  bottom: 0;
  max-width: 150px;
  height: auto;
}

.physical-dashboard-goals {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.sleep-dashboard {
  padding: 20px;
  color: #1a1a1a;
  max-width: 800px;
  margin: auto;
}

/* Header */
.sleep-dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.sleep-dashboard-title {
  font-size: 20px;
  font-weight: 700;
}

.next-btn {
  font-size: 24px;
  border: none;
  background: none;
  cursor: pointer;
  color: #7d15b7;
}
/* Body Layout */
.sleep-dashboard-body {
  display: flex;
  gap: 16px;
  align-items: center;
  flex-wrap: wrap;
}

.sleep-goals-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
  min-width: 150px;
}

.sleep-goal-card {
  background-color: #a33eff;
  color: #fff;
  padding: 12px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
}

.sleep-goal-card h1 {
  font-size: 1rem;
  margin-bottom: 6px;
}

.sleep-goal-card p {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 1rem;
}

.sleep-goal-card .icon {
  font-size: 1.2rem;
}

/* Illustration */
.sleep-dashboard-illustration {
  position: relative;
  background: linear-gradient(to bottom, #15114b, #5c26a4, #7d15b7, #ad2ce2);
  padding: 0.5rem;
  border-radius: 10px;
  overflow: visible;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 170px;
  flex: 1;
  min-width: 150px;
}

.sleep-dashboard-illustration img {
  position: absolute;
  bottom: 0;
  max-width: 170px;
  height: auto;
  transform: translateY(-20px);
}

.glucose-dashboard {
  padding: 20px;
  color: #1a1a1a;
  max-width: 800px;
  margin: auto;
}

/* Header */
.glucose-dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.glucose-dashboard-title {
  font-size: 20px;
  font-weight: 700;
}

.glucose-cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 16px;
}

.glucose-card {
  background-color: #fff;
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.glucose-card-header {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  flex-direction: column;
}

.icon {
  font-size: 24px;
}

.red-icon {
  color: #ff6b6b;
  background: #ffcbcb;
  border-radius: 5px;
  padding: 2px;
}

.green-icon {
  color: #8fd14f;
  background: #d6ffad;
  border-radius: 5px;
  padding: 2px;
}

.blue-icon {
  color: #48c9b0;
  background: #b4fff0;
  border-radius: 5px;
  padding: 2px;
}

.purple-icon {
  color: #6a5acd;
  background: #cfc8ff;
  border-radius: 5px;
  padding: 2px;
}

.value {
  font-size: 1rem;
  font-weight: 700;
}

.title {
  font-size: 1.1rem;
  font-weight: 800;
  margin: 12px 0;
}

.glucose-card-update {
  display: flex;
  font-size: 12px;
  justify-content: space-between;
  align-items: center;
}

.action-icon {
  font-size: 20px;
  color: #333;
}

.health-feeds-wrapper {
  padding: 1rem;
}

.health-feeds-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.health-feeds-header h2 {
  font-size: 16px;
  font-weight: 700;
  color: #1e293b;
  text-align: left;
}

.see-all-link {
  font-size: 12px;
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
  max-width: 48%;
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
  height: 100px;
  object-fit: cover;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  display: block;
}

.tag {
  display: inline-block;
  font-size: 10px;
  font-weight: 600;
  padding: 0.2rem 0.5rem;
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
  font-size: 12px;
  font-weight: 600;
  color: #111827;
  margin: 0 1rem 0.4rem 1rem;
}

.feed-meta {
  font-size: 8px;
  color: #6b7280;
  margin: 0 1rem;
}

.report-banner {
  display: flex;
  flex-direction: row;
  align-items: center;
  background: linear-gradient(180deg, #f0f4ff 0%, #e9dfff 100%);
  border-radius: 20px;
  padding: 1.2rem 1rem;
  margin: 1rem;
  gap: 1rem;
}

.report-text {
  flex: 1;
}

.report-text h2 {
  font-size: 1.4rem;
  font-weight: 800;
  line-height: 1.3;
  margin-bottom: 0.6rem;
}

.highlight {
  color: #e11d48; /* Pink-red */
}

.report-text p {
  font-size: 10px;
  color: #374151;
  margin-bottom: 0.8rem;
}

.report-image {
  flex-shrink: 0;
  width: 40%;
  display: flex;
  justify-content: center;
}

.report-image img {
  width: 100%;
  max-width: 140px;
  height: auto;
}

/* Mobile responsiveness */
@media (max-width: 600px) {
  .report-text h2 {
    font-size: 1.3rem;
  }
}
`}
      </style>
    </>
  );
};

export default Home;
