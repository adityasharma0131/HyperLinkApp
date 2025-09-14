import React, { useState } from "react";
import CounsellingBg from "../../../../assets/counsellingherobg.png";
import { FiArrowLeft } from "react-icons/fi";
import { IoIosSearch } from "react-icons/io";
import { FaMicrophone } from "react-icons/fa";
import { Link } from "react-router-dom";
import HealthFeed1 from "../../../../assets/healthfeed1.png";
import HealthFeed2 from "../../../../assets/healthfeed2.png";
import { MdBloodtype } from "react-icons/md";
import {
  FaHandHoldingHeart,
  FaRibbon,
  FaHeartbeat,
  FaLungs,
} from "react-icons/fa";
import { GiBrain, GiKidneys, GiStomach, GiMuscleUp } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

import "./style.css";
const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  const checks = [
    { icon: <MdBloodtype />, label: "Diabetes" },
    { icon: <FaHandHoldingHeart />, label: "Heart Health" },
    { icon: <FaRibbon />, label: "Cancer Care" },
    { icon: <GiBrain />, label: "Mental Health" },
    { icon: <FaLungs />, label: "Lung Function" },
    { icon: <GiKidneys />, label: "Kidney Health" },
    { icon: <GiStomach />, label: "Gut Health" },
    { icon: <FaHeartbeat />, label: "BP Check" },
    { icon: <GiMuscleUp />, label: "Muscle Mass" },
  ];
  const handleCardClick = (label) => {
    navigate("/app/counselling/details", {
      state: { topic: label }, // optional: pass label as state
    });
  };
  return (
    <div className="counselling-page">
      {/* Hero Section */}
      <div className="counselling-hero">
        <div className="hero-top-bar">
          <button className="icon-button" onClick={() => window.history.back()}>
            <FiArrowLeft className="hero-icon" />
          </button>
          <div className="hero-texts">
            <h1 className="hero-title">COUNSELLING</h1>
            <p className="hero-subtitle">
              Let's Begin Your Personalized Health Journey
            </p>
          </div>
        </div>
        <div className="hero-content">
          <div className="hero-text">
            <h1>
              CHOOSE <br />
              YOUR HEALTH
              <br /> FOCUS
            </h1>
          </div>
          <div className="hero-image">
            <span className="image-decoration" />
            <img src={CounsellingBg} alt="Child receiving vaccine" />
          </div>
        </div>
      </div>

      <div className="self-checks-container">
        <h1 className="self-checks-title">Self Health Checks</h1>
        <p className="self-checks-subtitle">
          Start your journey toward smarter, DNA-guided care.
        </p>

        <div className="checks-grid">
          {checks.map(({ icon, label }, idx) => (
            <div
              key={idx}
              className="check-card"
              role="button"
              tabIndex={0}
              onClick={() => handleCardClick(label)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleCardClick(label);
              }}
            >
              <div className="icon-wrapper">{icon}</div>
              <p className="check-label">{label}</p>
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
       .counselling-page {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

.counselling-hero {
  background: linear-gradient(to bottom, #6ea6e7 0%, #daeffe 50%, #e0d3ff 80%);
  padding: 20px 20px 0;
  border-radius: 0 0 32px 32px;
  color: white;
  position: relative;
  box-shadow: 0 10px 30px rgba(103, 108, 255, 0.2);
  min-height: 250px;
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
  font-size: 18px;
  font-weight: 700;
  color: #553fb5;
  margin: 0;
  line-height: 1.2;
}

.hero-subtitle {
  font-size: 12px;
  font-weight: 600;
  color: #000;
  opacity: 0.9;
}

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
  color: #553fb5;
}

.hero-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 2;
  height: 100%;
}

.hero-text h1 {
  font-size: 20px;
  font-weight: 800;
  color: #e83f93;
  line-height: 1.2;
  margin: 0 0 12px 0;
}

.hero-image {
  position: relative;
  height: 100%; /* Added to take full height */
  display: flex;
  align-items: flex-end; /* Align image to bottom */
}

.hero-image img {
  bottom: -23px;
  width: 180px;
  height: auto;
  position: relative;
  z-index: 2;
  right: 5px;
  filter: drop-shadow(0 10px 15px rgba(0, 0, 0, 0.1));
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
.image-decoration {
  position: absolute;
  width: 180px;
  height: 180px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 50%;
  top: 65%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
}
.self-checks-container {
  padding: 0 16px;

  margin: 25px 0;
  max-width: 1100px;
  text-align: center;
}

.self-checks-title {
  font-size: 17px;
  font-weight: 700;
  color: #1e293b;
  text-align: left;
}

.self-checks-subtitle {
  font-size: 13px;
  font-weight: 500;
  color: #64748b;
  text-align: left;
}
/* Mobile-optimized CSS */
.checks-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  padding: 1rem 0 0;
  width: 100%;
  box-sizing: border-box;
}

.check-card {
  background: linear-gradient(to bottom, #daeffe 10%, #e0d3ff 80%);
  border-radius: 1rem;
  padding: 1rem 0.1rem;
  text-align: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  -webkit-tap-highlight-color: transparent;
  user-select: none;
  display: flex;
  touch-action: manipulation;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.check-card:active {
  transform: translateY(-3px); /* Smaller transform for mobile */
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1); /* Smaller shadow */
}

/* Replace hover with active/focus states for mobile */
.check-card:focus-visible,
.check-card:active {
  outline: none;
}

.check-card:focus-visible::after,
.check-card:active::after {
  content: "";
  position: absolute;
  top: 0;
  left: -75%;
  width: 50%;
  height: 100%;
  background: rgba(255, 255, 255, 0.15);
  transform: skewX(-20deg);
  animation: shine 0.75s ease;
}

@keyframes shine {
  100% {
    left: 125%;
  }
}

.icon-wrapper {
  font-size: 2.2rem;
  color: #553fb5;
  margin-bottom: 0.6rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.check-label {
  font-size: 13px;
  font-weight: 500;
  color: #1f1f1f;
  margin: 0;
  line-height: 1.3;
}

/* Responsive adjustments for very small screens */
@media (max-width: 360px) {
  .checks-grid {
    grid-template-columns: 1fr; /* Single column for very small screens */
  }

  .icon-wrapper {
    font-size: 2rem;
  }

  .check-label {
    font-size: 0.9rem;
  }
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

`}
      </style>
    </div>
  );
};

export default Home;
