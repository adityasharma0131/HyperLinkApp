import React from "react";
import AppButton from "../../../../Components/AppButton";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiBookOpen } from "react-icons/fi";
import NutritionSetGoal from "../../../../assets/NutritionSetGoal.svg";
import NutritionAddFood from "../../../../assets/NutritionAddFood.svg";
import Mealimg from "../../../../assets/Mealimg.png";

import HealthFeed1 from "../../../../assets/healthfeed1.png";
import HealthFeed2 from "../../../../assets/healthfeed2.png";
import { IoIosAddCircle } from "react-icons/io";
import { FaCamera } from "react-icons/fa";

import { FaTrophy } from "react-icons/fa";
import { IoFastFood } from "react-icons/io5";
import { IoIosBarcode } from "react-icons/io";

import "./style.css";

const Home = () => {
  const navigate = useNavigate();
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

        {/* Features Section */}
        <div className="features-container">
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card"
              onClick={() => navigate(feature.path)} // ✅ navigate on click
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
      </div>
      {/* Scan Options */}
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
  min-height: 50vh;
  margin-bottom: 5rem;
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
    width: 160px;
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
  padding: 10px 20px;
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
  margin: 25px auto;
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
