import React, { useState } from "react";
import "./style.css";
import CounsellingBg from "../../../../assets/counsellingherobg.png";
import { FiArrowLeft } from "react-icons/fi";
import { IoIosSearch } from "react-icons/io";
import { FaMicrophone } from "react-icons/fa";

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

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="counselling-page">
      {/* Hero Section */}
      <div className="counselling-hero">
        <div className="hero-top-bar">
          <button className="icon-button" onClick={() => window.history.back()}>
            <FiArrowLeft className="hero-icon" />
          </button>
        </div>
        <div className="hero-content">
          <div className="hero-text">
            <h1>COUNSELLING</h1>
            <p className="hero-subtitle">
              Let's Begin <br />
              Your Personalized Health Journey{" "}
            </p>
          </div>
          <div className="hero-image">
            <span className="image-decoration" />
            <img src={CounsellingBg} alt="Child receiving vaccine" />
          </div>
        </div>
        <div className="search-bar hero-search">
          <IoIosSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search Tests..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FaMicrophone className="mic-icon" />
        </div>
      </div>

      <div className="self-checks-container">
        <h1 className="self-checks-title">Self Health Checks</h1>
        <p className="self-checks-subtitle">
          Start your journey toward smarter, DNA-guided care.
        </p>

        <div className="checks-grid">
          {[
            { icon: <MdBloodtype />, label: "Diabetes" },
            { icon: <FaHandHoldingHeart />, label: "Heart Health" },
            { icon: <FaRibbon />, label: "Cancer Care" },
            { icon: <GiBrain />, label: "Mental Health" },
            { icon: <FaLungs />, label: "Lung Function" },
            { icon: <GiKidneys />, label: "Kidney Health" },
            { icon: <GiStomach />, label: "Gut Health" },
            { icon: <FaHeartbeat />, label: "BP Check" },
            { icon: <GiMuscleUp />, label: "Muscle Mass" },
          ].map(({ icon, label }, idx) => (
            <div key={idx} className="check-card" role="button" tabIndex={0}>
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
    </div>
  );
};

export default Home;
