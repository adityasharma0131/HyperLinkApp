import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiEdit2 } from "react-icons/fi";
import AppButton from "../../../../Components/AppButton";
import PhysicalDashbaord from "../../../../assets/PhysicalDashbaord.svg";
import PhysicalSetGaolDashbaord from "../../../../assets/PhysicalSetGaolDashbaord.svg";
import PhysicalAddActivityDashbaord from "../../../../assets/PhysicalAddActivityDashbaord.svg";

import HealthFeed1 from "../../../../assets/healthfeed1.png";
import HealthFeed2 from "../../../../assets/healthfeed2.png";
import {
  FaFire,
  FaPauseCircle,
  FaCheckCircle,
  FaRunning,
  FaBicycle,
  FaSwimmer,
  FaWalking,
  FaShoePrints,
} from "react-icons/fa";
import { GoTrophy } from "react-icons/go";

const Home = () => {
  const navigate = useNavigate();
  const [hasPhysicalGoal, setHasPhysicalGoal] = useState(false);
  const [goalData, setGoalData] = useState(null);
  const [activeTab, setActiveTab] = useState("Day");
  const tabs = ["Day", "Week", "Month", "Year"];

  useEffect(() => {
    // Check if physicalGoal exists in localStorage
    const storedGoal = localStorage.getItem("physicalGoal");
    if (storedGoal) {
      setHasPhysicalGoal(true);
      setGoalData(JSON.parse(storedGoal));
    }
  }, []);

  // Default data if no goal is set
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

  // Use goalData from localStorage if available, otherwise use default data
  const data =
    hasPhysicalGoal && goalData
      ? [
          {
            icon: <FaFire className="icon pink" />,
            label: "Calories",
            current: 1875, // You might want to calculate this based on user activity
            max: parseInt(goalData.calories),
            colorClass: "pink",
          },
          {
            icon: <FaWalking className="icon green" />,
            label: "Distance",
            current: 180, // You might want to calculate this based on user activity
            max: parseInt(goalData.distance),
            colorClass: "green",
          },
          {
            icon: <FaShoePrints className="icon blue" />,
            label: "Steps",
            current: 22250, // You might want to calculate this based on user activity
            max: parseInt(goalData.steps),
            colorClass: "blue",
          },
        ]
      : defaultData;

  const activities = [
    {
      time: "08:10 AM",
      calories: 238.2,
      distance: "5.00 / 5.00 miles",
      type: "Jogging",
      icon: <FaRunning className="activity-type-icon" />,
      completed: true,
    },
    {
      time: "10:45 AM",
      calories: 180.7,
      distance: "12.0 / 20.0 miles",
      type: "Cycling",
      icon: <FaBicycle className="activity-type-icon" />,
      completed: false,
    },
    {
      time: "12:15 PM",
      calories: 220.1,
      distance: "0.50 / 1.00 miles",
      type: "Swimming",
      icon: <FaSwimmer className="activity-type-icon" />,
      completed: false,
    },
  ];

  const getProgressPercent = (distance) => {
    const [done, total] = distance.split("/").map((x) => parseFloat(x.trim()));
    return Math.min((done / total) * 100, 100);
  };

  return (
    <div className="physical-dash-page">
      {/* Hero Section */}
      <div className={`physical-hero ${hasPhysicalGoal ? "goal-active" : ""}`}>
        {/* Top Bar */}
        <div className="hero-top-bar">
          <button className="icon-button" onClick={() => navigate(-1)}>
            <FiArrowLeft className="hero-icon" />
          </button>
          <div className="hero-texts">
            <h1 className="hero-title">PHYSICAL TRACKER</h1>
          </div>
        </div>

        {/* Center Content */}
        <div className="hero-content">
          {/* Left Side */}
          <div className="hero-left">
            <h1 className="hero-heading">Get your Physical Activity tracked</h1>
            <div className="hero-button">
              <AppButton
                text="Consult Physio"
                variant="secondary"
                onClick={() => navigate("/consult")}
              />
            </div>
          </div>

          {/* Right Side: Image */}
          <div className="hero-right">
            <img src={PhysicalDashbaord} alt="Physical Dashboard" />
          </div>
        </div>

        {/* Tabs - Only show if goal exists */}
        {hasPhysicalGoal && (
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
        )}

        {/* Goal card positioned at the center bottom of the hero section */}
        {!hasPhysicalGoal && (
          <div className="goal-card">
            <div className="goal-image">
              <img src={PhysicalSetGaolDashbaord} alt="Set Goal" />
            </div>
            <div className="goal-content">
              <h1 className="goal-title">
                Set your goal for Physical Fitness Activity
              </h1>
              <button
                className="goal-button"
                onClick={() => navigate("/app/physical/set-goal")}
              >
                <GoTrophy className="goal-icon" />
                Set Goal
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Conditional rendering based on whether goal exists */}
      {hasPhysicalGoal && (
        <div className="health-goal-card">
          <p className="description">
            🔥 Track your health goals effortlessly! Get fitter, healthier &
            lose weight. Set your goal from the health locker.
          </p>

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
                    ></div>
                  </div>
                </div>
                <div className="progress-text">
                  {item.current.toLocaleString()}/{item.max.toLocaleString()}
                </div>
              </div>
            );
          })}

          <button
            className="edit-button"
            onClick={() => navigate("/app/physical/set-goal")}
          >
            <FiEdit2 /> Edit Goal
          </button>
        </div>
      )}

      {/* Activity Section - Only show if goal exists */}
      {hasPhysicalGoal && (
        <div className="activity-card">
          <div className="activity-header">
            <h2>My Activity</h2>
            <span className="see-all">See All</span>
          </div>

          <p className="activity-subtitle">
            Track your daily activities to meet your fitness goals
          </p>

          <div className="activity-info">
            {activities.map((activity, index) => (
              <div className="activity-entry" key={index}>
                <div className="activity-meta">
                  <span>Today, {activity.time}</span>
                  <span className="calories">
                    <FaFire className="fire-icon" /> {activity.calories} cal
                  </span>
                </div>

                <div className="activity-detail">
                  <div className="activity-icon-wrapper">{activity.icon}</div>

                  <div className="activity-stats">
                    <h3>{activity.distance}</h3>
                    <p>{activity.type}</p>

                    <div className="progress-bar">
                      <div
                        className="activity-progress-fill"
                        style={{
                          width: `${getProgressPercent(activity.distance)}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  {activity.completed ? (
                    <button className="complete-button">
                      <FaCheckCircle />
                    </button>
                  ) : (
                    <button className="pause-button">
                      <FaPauseCircle />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Activity Section */}
      <div className="activity-section">
        <h1 className="activity-title">My Activity</h1>
        <p className="activity-subtitle">
          Log your today's activity tracked for your goals
        </p>

        <div className="new-activity-card">
          <div className="activity-image">
            <img src={PhysicalAddActivityDashbaord} alt="Add Activity" />
          </div>

          <div className="activity-content">
            <h2 className="activity-card-title">Add Your Activity</h2>
            <p className="activity-card-text">
              By adding activities daily will help you to track your fitness
              goals
            </p>

            <button
              className="activity-button"
              onClick={() => navigate("/app/physical/add-activity")}
            >
              <GoTrophy className="activity-icon" />
              Add Activity
            </button>
          </div>
        </div>
      </div>
      {/* Health Feeds Section - Always visible regardless of goal status */}
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
        .physical-dash-page {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  background-color: #f7fafc;
}

.physical-hero {
  background: linear-gradient(to bottom, #d35400, #f39c12);
  border-radius: 0 0 32px 32px;
  color: white;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.14);
  position: relative; /* for goal card */
  display: flex;
  flex-direction: column;
  padding: 20px;
  padding-bottom: 90px; /* Default padding */
  margin-bottom: 2rem;
}

.physical-hero.goal-active {
  padding-bottom: 10px !important; /* Override padding when goal exists */
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

/* Center Content */
.hero-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.hero-left {
  flex: 1;
  text-align: left;
}

.hero-heading {
  font-size: 20px;
  font-weight: 700;
  line-height: 1.4;
  margin-bottom: 20px;
  color: #fff;
}

.hero-button {
  width: fit-content;
}

.hero-right {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.hero-right img {
  max-width: 100%;
  height: auto;
}

.health-goal-card {
  max-width: 450px;
  margin: 1rem ;
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

.goal-item {
  margin-bottom: 10px;
}

.goal-info {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.icon {
  font-size: 22px;
  margin-right: 10px;
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

.progress-container {
  display: flex;
  align-items: center;
}

.progress-bar {
  flex-grow: 1;
  height: 12px;
  background: #f0f0f0;
  border-radius: 10px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  border-radius: 10px;
  transition: width 0.6s ease;
}

.pink .progress-fill {
  background-color: #ff80bf;
}

.green .progress-fill {
  background-color: #4caf50;
}

.blue .progress-fill {
  background-color: #2196f3;
}

.progress-text {
  min-width: 70px;
  text-align: right;
  font-size: 14px;
  color: #333;
  font-weight: 500;
  margin-top:.5rem;
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
  background: #FF8A00;  /* vibrant green */
  color: #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

.tab:not(.active):hover {
  background: #f3f3f3;
}

.edit-button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: transparent;
  border: 2px solid #f39c12;
  color: #e67e22;
  font-size: 14px;
  font-weight: 600;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  width: fit-content;
}

.edit-button:hover {
  background: #fdf2e9;
  transform: translateY(-2px);
}

.edit-icon {
  font-size: 16px;
  color: #e67e22;
}

.activity-card {
    max-width: 450px;
    margin: 1rem;
    padding: 25px;
    border-radius: 16px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
    background: #ffffff;
}

.activity-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.activity-header h2 {
  font-size: 26px;
  font-weight: 700;
  color: #333;
}

.see-all {
  font-size: 16px;
  color: #1e88e5;
  cursor: pointer;
  transition: color 0.3s;
}

.see-all:hover {
  color: #1565c0;
}

.activity-subtitle {
  font-size: 18px;
  color: #555;
  margin-bottom: 30px;
}

.activity-info {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.activity-entry {
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 15px;
  border-radius: 15px;
  background: #fff;
}

.activity-meta {
  display: flex;
  align-items: center;
  gap: 20px;
  font-size: 14px;
  color: #777;
}

.calories {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #f44336;
  font-weight: 500;
}

.fire-icon {
  font-size: 18px;
}

.activity-detail {
  display: flex;
  align-items: center;
}

.activity-icon-wrapper {
  font-size: 48px;
  color: #FF8A00;
  margin-right: 20px;
}

.activity-stats h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
}

.activity-stats p {
  margin: 8px 0;
  font-size: 16px;
  color: #555;
}

.progress-bar {
  width: 180px;
  height: 10px;
  background: #eee;
  border-radius: 10px;
  margin-top: 8px;
  overflow: hidden;
}

.activity-progress-fill {
  height: 100%;
  background: linear-gradient(to left, #d35400, #f39c12);
  border-radius: 10px;
  transition: width 0.5s ease;
}

.complete-button {
  margin-left: auto;
  color: #4caf50;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 24px;
}

.pause-button {
  margin-left: auto;
  color: #f44336;
   margin-left: auto;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 24px;
}

/* Goal card positioned at the center bottom of the hero section */
.goal-card {
  position: absolute;
  bottom: -35px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 16px;
  background: #fff;
  border: 1px solid #f0f0f0;
  border-radius: 12px;
  padding: 16px 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  max-width: 480px;
  width: 90%;
  z-index: 10;
}

.goal-image img {
  width: 80px;
  height: auto;
  object-fit: contain;
}

.goal-content {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.goal-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0;
  line-height: 1.4;
}

.goal-button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: transparent;
  border: 2px solid #f39c12;
  color: #e67e22;
  font-size: 14px;
  font-weight: 600;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  width: fit-content;
}

.goal-button:hover {
  background: #fdf2e9;
  transform: translateY(-2px);
}

.goal-icon {
  font-size: 16px;
  color: #e67e22;
}



/* Activity Section */
.activity-section {
  padding: 20px;
}

.activity-title {
  font-size: 20px;
  font-weight: 700;
  color: #111;
  margin: 0;
}

.activity-subtitle {
  font-size: 14px;
  color: #555;
  margin: 4px 0 16px;
}

.new-activity-card {
  display: flex;
  align-items: center;
  gap: 16px;
  background: #fff;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.activity-image img {
  width: 100px;
  height: auto;
  object-fit: contain;
}

.activity-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.activity-card-title {
  font-size: 16px;
  font-weight: 700;
  color: #111;
  margin: 0;
}

.activity-card-text {
  font-size: 14px;
  color: #666;
  margin: 0;
  line-height: 1.4;
}

.activity-button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: transparent;
  border: 2px solid #f39c12;
  color: #e67e22;
  font-size: 14px;
  font-weight: 600;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  width: fit-content;
}

.activity-button:hover {
  background: #fdf2e9;
  transform: translateY(-2px);
}

.activity-icon {
  font-size: 16px;
  color: #e67e22;
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
