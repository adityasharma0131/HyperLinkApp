import React, { useState } from "react";
import { FaMicrophone } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import {
  FaVials,
  FaMicroscope,
  FaHeartbeat,
  FaSyringe,
  FaLungs,
} from "react-icons/fa";
import { GiKidneys, GiStomach, GiBrain } from "react-icons/gi";
import { MdBloodtype } from "react-icons/md";

import Vaccinationbg from "../../../../assets/labtestherobg.png";
import PrescriptionBG from "../../../../assets/PrescriptionBG.svg";

import HealthFeed1 from "../../../../assets/healthfeed1.png";
import HealthFeed2 from "../../../../assets/healthfeed2.png";
import AppButton from "../../../../Components/AppButton";

import "./style.css";
const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/app/lab-test/test-list");
  };

  const labTestCategories = [
    { icon: <MdBloodtype />, label: "Blood Test" },
    { icon: <FaVials />, label: "Urine Test" },
    { icon: <FaMicroscope />, label: "Thyroid Test" },
    { icon: <FaHeartbeat />, label: "Lipid Profile" },
    { icon: <GiKidneys />, label: "Kidney Function" },
    { icon: <FaLungs />, label: "Lung Test" },
    { icon: <GiStomach />, label: "Liver Function" },
    { icon: <FaSyringe />, label: "Diabetes" },
  ];

  const steps = [
    {
      number: 1,
      title: "Select a Lab Test",
      description:
        "Choose from a wide range of tests such as blood work, thyroid, diabetes, vitamin checks, and more.",
    },
    {
      number: 2,
      title: "Book Your Slot",
      description:
        "Pick a convenient date and time for your sample collection, either at home or at the lab.",
    },
    {
      number: 3,
      title: "Sample Collection",
      description:
        "A trained professional will collect your sample safely with all hygienic measures.",
    },
    {
      number: 4,
      title: "Get Reports Online",
      description:
        "Access your detailed test reports digitally. Doctors may also guide you on next steps for better health.",
    },
  ];
  return (
    <>
      <div className="labtest-page">
        {/* Hero Section */}
        <div className="labtest-hero">
          <div className="hero-top-bar">
            <button
              className="icon-button"
              onClick={() => window.history.back()}
            >
              <FiArrowLeft className="hero-icon" />
            </button>
            <div className="hero-texts">
              <h1 className="hero-title">LAB TEST</h1>
              <p className="hero-subtitle">Your Care, Personalized</p>
            </div>
          </div>
          <div className="hero-content">
            <div className="hero-text">
              <h1>
                LAB TEST'S <br />
                MADE SIMPLE,
                <br /> SAFE & SMART
              </h1>

              <AppButton text={"Book a Test"} variant="secondary" />
            </div>
            <div className="hero-image">
              <span className="image-decoration" />
              <img src={Vaccinationbg} alt="Child receiving vaccine" />
            </div>
          </div>
        </div>
        <div className="search-bar-container">
          <div className="search-bar hero-search">
            <IoIosSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search by Test..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FaMicrophone className="mic-icon" />
          </div>

          <p>e.g., “HbA1c”, “Thyroid Panel”, “Cancer Markers”</p>
        </div>

        <div className="labtest-category-container">
          <h1 className="labtest-category-title">Categories</h1>
          <div className="labtest-category-grid">
            {labTestCategories.map(({ icon, label }, idx) => (
              <div
                key={idx}
                className="labtest-category-card"
                role="button"
                tabIndex={0}
                onClick={handleNavigation}
                onKeyPress={(e) => e.key === "Enter" && handleNavigation()}
              >
                <div className="icon-wrapper">{icon}</div>
                <p className="labtest-category-label">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="prescription-container">
          <div className="prescription-card">
            <div className="prescription-content">
              <h2 className="prescription-heading">Upload Your Prescription</h2>
              <p className="prescription-subtext">
                We'll suggest the best test for you.
              </p>
              <button className="upload-prescription-button">
                Upload Prescription
              </button>
            </div>

            <img src={PrescriptionBG} alt="Upload Illustration" />
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

        <style>
          {`
          /* Google Fonts Import */
@import url("https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Poppins:wght@300;400;500;600;700&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Poppins", "Outfit", sans-serif;
}

/* Center the loader on the screen */
.loader-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 97vh; /* full screen height */
  background-color: #ffffff; /* optional: background color */
}

/* Logo animation */
.logo-loader {
  width: 100px;
  height: 100px;
  animation: pulse 1.5s infinite ease-in-out;
}

/* Pulse keyframes */
@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 0.9;
  }
  50% {
    transform: scale(1.1);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0.9;
  }
}
/* Button Base Styles */
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.875rem 1.5rem;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  outline: none;
  position: relative;
  overflow: hidden;
}

.button-icon {
  display: flex;
  align-items: center;
}

.button-icon svg {
  width: 18px;
  height: 18px;
}

/* Primary Button */
.primary-button {
  background: linear-gradient(90deg, #6d28d9, #8b5cf6);
  color: white;
  box-shadow: 0 4px 15px rgba(109, 40, 217, 0.2);
}

.primary-button:hover:not(.disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(109, 40, 217, 0.3);
}

.primary-button::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  transition: all 0.5s ease;
}

.primary-button:hover:not(.disabled)::before {
  left: 100%;
}

/* Secondary Button */
.secondary-button {
  background: transparent;
  color: #1e293b;
  border: 1px solid #e2e8f0;
}

.secondary-button:hover:not(.disabled) {
  background-color: rgba(0, 0, 0, 0.02);
  border-color: #94a3b8;
}

/* Disabled State */
.button.disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none !important;
}

.primary-button.disabled {
  background: #e2e8f0;
}

.secondary-button.disabled {
  border-color: #e2e8f0;
  color: #94a3b8;
}
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 0px 16px 20px;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-top: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 -10px 30px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  z-index: 1000;
  border-radius: 24px 24px 0 0;
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
  gap: 12px;
}

.nav-item {
  background: none;
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  cursor: pointer;
  padding: 0;
  position: relative;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.icon-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-icon {
  font-size: 35px;
  color: #6b7280;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  padding: 8px;
}

/* Active Styles */
.nav-item.active .nav-icon {
  color: #6d28d9;

  transform: translateY(-6px);
  animation: bounce 0.5s cubic-bezier(0.18, 0.89, 0.32, 1.28);
}

.nav-label {
  font-size: 11px;
  font-weight: 500;
  color: #6b7280;
  transition: color 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.nav-item.active .nav-label {
  color: #6366f1;
  font-weight: 600;
}

/* Primary Action Button */
.nav-item.primary {
  margin-top: -16px;
}

.nav-item.primary .icon-container {
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  width: 56px;
  height: 56px;
  border-radius: 50%;
  box-shadow: 0 8px 24px rgba(99, 102, 241, 0.3);
  margin-bottom: 8px;
}

.nav-item.primary .nav-icon {
  color: white;
  font-size: 24px;
  padding: 0;
  transform: none;
  background: none;
  -webkit-background-clip: unset;
  -webkit-text-fill-color: unset;
}

.nav-item.primary.active .nav-icon {
  transform: translateY(-2px);
}

.nav-item.primary .nav-label {
  margin-top: 4px;
}

/* Animation */
@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
}

/* Mobile Adjustments */
@media (max-width: 480px) {
  .bottom-nav {
    border-radius: 0;
    padding-bottom: 16px;
  }

  .nav-label {
    font-size: 9px;
  }

  .nav-item.primary .icon-container {
    width: 50px;
    height: 50px;
  }
}
.app-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 20px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s ease;
  transform: translateY(0);
  outline: none;
  width: 77%;
}

.app-btn-primary {
  background: #553fb5;
  color: white;
  border: none;
  box-shadow: 0 2px 8px rgba(124, 58, 237, 0.2);
}

.app-btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(124, 58, 237, 0.4);
}

.app-btn-secondary {
  background: #fff;
  color: #553fb5;
  border: 1.5px solid #d1d5db;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.03);
}

.app-btn-secondary:hover {
  background: #f1f5f9;
  transform: translateY(-2px);
  border-color: #cbd5e1;
}

.app-btn-icon {
  font-size: 18px;
}

.app-btn-full {
  width: 100%;
}

@media (max-width: 480px) {
  .app-btn {
    padding: 8px 15px;
    white-space: nowrap;
    font-size: 14px;
  }
}
`}
        </style>
      </div>
    </>
  );
};

export default Home;
