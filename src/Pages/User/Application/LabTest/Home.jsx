import React, { useState } from "react";
import "./style.css";
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
    { icon: <FaSyringe />, label: "Diabetes (HbA1c)" },
    { icon: <GiBrain />, label: "Vitamin Deficiency" },
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
          </div>
          <div className="hero-content">
            <div className="hero-text">
              <h1>LAB TEST</h1>
              <p className="hero-subtitle">
                Your Care,
                <br />
                Personalized
              </p>

              <AppButton text={"Book a Test"} />
            </div>
            <div className="hero-image">
              <span className="image-decoration" />
              <img src={Vaccinationbg} alt="Child receiving vaccine" />
            </div>
          </div>
          <div className="search-bar hero-search">
            <IoIosSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search By Test..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FaMicrophone className="mic-icon" />
          </div>
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
          <h2 className="section-title">Upload Your Prescription</h2>

          <div className="prescription-card">
            <div className="prescription-content">
              <p className="prescription-subtext">
                Let us handle the rest. Upload your prescription and we’ll check
                for vaccines.
              </p>
              <AppButton text="Click to Upload" />
            </div>

            <div className="prescription-image">
              <img src={PrescriptionBG} alt="Upload Illustration" />
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
          .labtest-page {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

.labtest-hero {
  background: linear-gradient(to bottom, #4a90e2, #8c60e2);
  /* background: linear-gradient(to bottom, #4a90e2 0%, #d6efff 80%, #8c60e2 100%); */

  padding: 20px;
  border-radius: 0 0 32px 32px;
  color: white;
  position: relative;
  box-shadow: 0 10px 30px rgba(103, 108, 255, 0.2);
  min-height: 250px; /* Added to ensure minimum height */
}

.hero-top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.hero-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  font-size: 14px;
}

.title-icon {
  font-size: 18px;
  color: #fff;
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
  color: white;
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
  font-size: 23px;
  font-weight: 800;
  line-height: 1.2;
  margin: 0 0 12px 0;
  letter-spacing: -0.5px;
}

.hero-subtitle {
  font-size: 14px;
  opacity: 0.9;
  margin-bottom: 8px;
  max-width: 200px;
  line-height: 1.5;
}

.hero-image {
  position: relative;
  height: 100%; /* Added to take full height */
  display: flex;
  align-items: flex-end; /* Align image to bottom */
}

.hero-image img {
  width: 164px;
  height: auto;
  position: relative;
  z-index: 2;
  right: 10px;
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
  width: 190px;
  height: 190px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 50%;
  top: 55%;
  left: 45%;
  transform: translate(-50%, -50%);
  z-index: 1;
}

.labtest-category-container {
  padding: 0 16px;

  margin: 28px 0;
  max-width: 1100px;
  text-align: center;
}

.labtest-category-title {
  font-size: 20px;
  font-weight: 700;
  color: #1e293b;
  text-align: left;
  margin-top: 3rem;
}

.labtest-category-subtitle {
  font-size: 10px;
  font-weight: 400;
  color: #64748b;
  text-align: left;
  margin-bottom: 18px;
} /* Mobile-optimized CSS */
.labtest-category-grid {
  display: grid;
  grid-template-columns: repeat(
    4,
    1fr
  ); /* Default: 4 columns on desktop/tablet */
  gap: 1rem;
  padding: 1rem;
  width: 100%;
  box-sizing: border-box;
}

@media (max-width: 768px) {
  .consultation-category-grid {
    grid-template-columns: repeat(
      3,
      1fr
    ); /* 3x3 on tablets and larger mobiles */
  }
}

@media (max-width: 480px) {
  .consultation-category-grid {
    grid-template-columns: repeat(
      3,
      1fr
    ); /* Ensure 3 columns on smaller mobiles */
  }
}

@media (max-width: 360px) {
  .consultation-category-grid {
    grid-template-columns: repeat(
      2,
      1fr
    ); /* Fallback to 2 columns on very narrow screens */
  }
}

.labtest-category-card {
  background: linear-gradient(145deg, #f1f3fc, #ffffff);
  border-radius: 1rem;
  padding: 1.2rem 0.8rem;
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

.labtest-category-card:active {
  transform: translateY(-3px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}

.labtest-category-card:focus-visible,
.labtest-category-card:active {
  outline: none;
}

.labtest-category-card:focus-visible::after,
.labtest-category-card:active::after {
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
  color: #6c63ff;
  margin-bottom: 0.6rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.labtest-category-label {
  font-size: 10px;
  font-weight: 500;
  color: #1f1f1f;
  margin: 0;
  line-height: 1.3;
}

/* Adjust for very small screens */
@media (max-width: 360px) {
  .icon-wrapper {
    font-size: 2rem;
  }

  .labtest-category-label {
    font-size: 0.9rem;
  }
}
.prescription-container {
  padding: 12px;
}

.section-title {
  font-size: 1rem;
  font-weight: 500;
  color: #1f2937;
  margin-bottom: 10px;
}

.prescription-card {
  background-color: #5a0b83;
  border-radius: 18px;
  display: flex;
  padding: 10px;
  color: white;
  overflow: visible;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  align-items: center;
  justify-content: space-evenly;
  position: relative;
}

/* Decorative objects */
.prescription-card::before,
.prescription-card::after {
  content: "";
  position: absolute;
  background-color: rgba(255, 255, 255, 0.1); /* subtle overlay */
}

/* Top-left object */
.prescription-card::before {
  width: 50px;
  height: 50px;
  top: -10px;
  left: -10px;
  border-radius: 0 0 100% 0;
}

/* Bottom-right object */
.prescription-card::after {
  width: 80px;
  height: 80px;
  bottom: -15px;
  right: -1px;
  border-radius: 100% 0 0 0;
  border: 2px solid rgba(255, 255, 255, 0.2); /* adds curved line effect */
}

.prescription-content {
  max-width: 50%;
}

.prescription-heading {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  line-height: 1.3;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.prescription-subtext {
  font-size: 14px;
  margin-bottom: 18px;
  opacity: 0.95;
}

.upload-button {
  background-color: #ff5e9e;
  color: white;
  padding: 10px 18px;
  border-radius: 10px;
  font-size: 14px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.upload-button:hover {
  background-color: #ff3b89;
  transform: scale(1.05);
}

.prescription-image {
  position: relative;
  z-index: 2;
}

.prescription-image img {
  height: 160px;
  max-width: 100%;
  object-fit: cover;
  border-radius: 12px;
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
    </>
  );
};

export default Home;
