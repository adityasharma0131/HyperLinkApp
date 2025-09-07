import React from "react";
import UserNavigation from "../../../../Components/UserNavigation";
import AppButton from "../../../../Components/AppButton";
import { useNavigate } from "react-router-dom";
import { FaWalking, FaBed, FaFireAlt, FaTint } from "react-icons/fa";
import { FaPlus, FaBell, FaMicrophone } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { MdOutlineDateRange } from "react-icons/md";
import { FaRobot } from "react-icons/fa";
import { TbVaccine } from "react-icons/tb";
import { GiFruitBowl } from "react-icons/gi";

import { Link } from "react-router-dom";

import ChildVacc from "../../../../assets/catchildhoodvaccines.svg";
import AdultVacc from "../../../../assets/catadultvaccines.svg";
import TravelVacc from "../../../../assets/cattravelvaccines.svg";
import PrescriptionBG from "../../../../assets/PrescriptionBG.svg";
import DnaHome from "../../../../assets/dnahome.png";
import ModelHome from "../../../../assets/modelhome.png";
import SubscribBanner from "../../../../assets/subscribebanner.png";
import HealthFeed1 from "../../../../assets/healthfeed1.png";
import HealthFeed2 from "../../../../assets/healthfeed2.png";
import HealthRecord from "../../../../assets/healthrecord.png";

import "./style.css";

const Home = () => {
  const data = [
    {
      label: "Steps",
      value: "7304",
      total: "10,000",
      unit: "",
      percent: 73,
      icon: <FaWalking />,
      color: "pink",
    },
    {
      label: "Sleep",
      value: "6.5",
      total: "hrs",
      unit: "hrs",
      percent: 65,
      icon: <FaBed />,
      color: "purple",
    },
    {
      label: "Calories",
      value: "1,245",
      total: "kcal",
      unit: "kcal",
      percent: 85,
      icon: <FaFireAlt />,
      color: "green",
    },
    {
      label: "Water",
      value: "5",
      total: "10 glasses",
      unit: "glasses",
      percent: 50,
      icon: <FaTint />,
      color: "blue",
    },
  ];

  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate("/app/vaccination");
  };

  const steps = [
    { id: 1, label: "About yourself" },
    { id: 2, label: "Physical Activity" },
    { id: 3, label: "Nutrition" },
    { id: 4, label: "Sleep" },
    { id: 5, label: "Medical condition" },
  ];

  return (
    <>
      <div className="home-page">
        <div className="home-container">
          {/* Header */}
          <div className="home-header">
            <div className="user-info">
              <h1>Hi, Sakshi</h1>
              <p>Ghatkopar, Mumbai</p>
            </div>
            <div className="icons">
              <div className="icon-wrapper">
                <FaPlus className="icon" />
              </div>
              <div className="icon-wrapper">
                <FaBell className="icon" />
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="search-bar">
            <IoIosSearch className="search-icon" />
            <input type="text" placeholder="Search" />
            <FaMicrophone className="mic-icon" />
          </div>

          {/* Hero Section */}
          <div className="hero-section">
            <div className="hero-text">
              <h2>
                <span className="gradient-text">HYPERLINK 360</span>
              </h2>
              <p>One App. Infinite Health Possibilities.</p>
              <AppButton
                text="Chat with HELIX"
                onClick={() => navigate("/app/counselling/home")}
              />
            </div>
            <div className="hero-image">
              <img className="dna" src={DnaHome} alt="DNA Strand" />
              <img className="doctor" src={ModelHome} alt="Doctor" />
            </div>
          </div>
        </div>

        <div className="quick-actions-section">
          <div className="section-header">
            <h2 className="section-title">Quick Actions</h2>
          </div>

          <div className="quick-actions-grid">
            {/* DNA Test Card */}
            <div className="action-card blue">
              <div className="card-content">
                <div className="icon-wrapper">
                  <MdOutlineDateRange className="action-icon" />
                </div>
                <div className="text-content">
                  <h3>Heath Wellness</h3>
                  <p> resources for healthier lifestyle</p>
                </div>
                <div className="hover-effect"></div>
                <div className="corner-decoration"></div>
              </div>
              <div className="card-bg-pattern"></div>
            </div>

            {/* Helix Consultation Card */}

            {/* Vaccines Card */}
            <div
              className="action-card green"
              onClick={handleCardClick}
              style={{ cursor: "pointer" }}
            >
              <div className="card-content">
                <div className="icon-wrapper">
                  <TbVaccine className="action-icon" />
                </div>
                <div className="text-content">
                  <h3>Lab Test</h3>
                  <p>Get regular checkups and lab tests</p>
                </div>
                <div className="hover-effect"></div>
                <div className="corner-decoration"></div>
              </div>
              <div className="card-bg-pattern"></div>
            </div>
            <div className="action-card pink">
              <div className="card-content">
                <div className="icon-wrapper">
                  <FaRobot className="action-icon" />
                </div>
                <div className="text-content">
                  <h3>Doctors Consultation</h3>
                  <p>Consult with Experts</p>
                </div>
                <div className="hover-effect"></div>
                <div className="corner-decoration"></div>
              </div>
              <div className="card-bg-pattern"></div>
            </div>
          </div>

          <div className="vaccination-container">
            {/* Left Content */}
            <div className="vaccination-info">
              <TbVaccine className="vaccination-icon" />
              <h1>Protect yourself & others</h1>
              <p>Stay up-to-date with your vaccinations</p>
            </div>

            {/* Right Content - Cards */}
            <div className="categories-cards">
              <Link to="/app/vaccination/child" className="category-card pink">
                <h3>Childhood Vaccines</h3>
                <img src={ChildVacc} alt="Childhood Vaccines" />
                <span className="ripple" />
              </Link>

              <Link
                to="/app/vaccination/adult"
                className="category-card orange"
              >
                <h3>Adult Vaccines</h3>
                <img src={AdultVacc} alt="Adult Vaccines" />
                <span className="ripple" />
              </Link>

              <Link to="/app/vaccination/travel" className="category-card blue">
                <h3>Travel Vaccines</h3>
                <img src={TravelVacc} alt="Travel Vaccines" />
                <span className="ripple" />
              </Link>
            </div>
          </div>
        </div>

        <div className="persona-container">
          <h1 className="persona-title">Build Your Health Persona</h1>

          <div className="persona-card">
            <h2 className="persona-subtitle">
              Let’s Personalize Your Health Experience
            </h2>
            <p className="persona-description">
              Complete your health persona to unlock tailored tips, diet plans,
              and care reminders
            </p>

            <div className="steps-wrapper">
              {steps.map((step, index) => (
                <div key={step.id} className="step-item">
                  <div
                    className={`step-circle ${
                      index === 0 ? "active" : "disabled"
                    }`}
                  >
                    {step.id}
                  </div>
                  <p
                    className={`step-text ${
                      index === 0 ? "active-text" : "disabled-text"
                    }`}
                  >
                    {step.label}
                  </p>
                  {index < steps.length - 1 && (
                    <div className="step-line"></div>
                  )}
                </div>
              ))}
            </div>

            <button className="start-btn">
              Start Now <span className="arrow">➜</span>
            </button>
          </div>
        </div>

        <div className="summary-section">
          <h2 className="summary-title">Today’s Summary</h2>

          <div className="summary-grid">
            {data.map((item, index) => (
              <div key={index} className="summary-card">
                <div className="summary-header">
                  <div className={`summary-icon icon-${item.color}`}>
                    {item.icon}
                  </div>
                  <h3>{item.label}</h3>
                </div>
                <p className="summary-value">
                  <strong>{item.value}</strong>{" "}
                  <span className="summary-unit">/ {item.total}</span>
                </p>
                <div className="progress-bar">
                  <div
                    className={`progress-fill fill-${item.color}`}
                    style={{ width: `${item.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
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
            <img src={SubscribBanner} alt="Doctor holding apple" />
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
              <img
                src={HealthFeed2}
                alt="Heart Health"
                className="feed-image"
              />
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
              <img
                src={HealthFeed2}
                alt="Heart Health"
                className="feed-image"
              />
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
              <span className="highlight">YOUR REPORT</span> <br />
              <span className="highlight">IS SECURE</span>
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
      </div>

      <UserNavigation />
      <style>{``}</style>
    </>
  );
};

export default Home;
