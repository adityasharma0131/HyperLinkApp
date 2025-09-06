import React from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import AppButton from "../../../../Components/AppButton"; // adjust path if needed
import PhysicalDashbaord from "../../../../assets/PhysicalDashbaord.svg";
import PhysicalSetGaolDashbaord from "../../../../assets/PhysicalSetGaolDashbaord.svg";
import PhysicalAddActivityDashbaord from "../../../../assets/PhysicalAddActivityDashbaord.svg";
import HealthFeed1 from "../../../../assets/healthfeed1.png";
import HealthFeed2 from "../../../../assets/healthfeed2.png";
import { GoTrophy } from "react-icons/go";
import "./style.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="physical-dash-page">
      {/* Hero Section */}
      <div className="physical-hero">
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

        {/* Goal card at bottom center */}
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
      </div>

      {/* Activity Section */}
      <div className="activity-section">
        <h1 className="activity-title">My Activity</h1>
        <p className="activity-subtitle">
          Log your today's activity tracked for your goals
        </p>

        <div className="activity-card">
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

      {/* Health Feeds Section */}
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
