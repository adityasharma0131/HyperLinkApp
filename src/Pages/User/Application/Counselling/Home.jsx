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
