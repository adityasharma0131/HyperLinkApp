import React, { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { IoIosSearch } from "react-icons/io";
import { FaMicrophone } from "react-icons/fa";

import { MdBloodtype } from "react-icons/md";
import {
  FaHandHoldingHeart,
  FaRibbon,
  FaHeartbeat,
  FaLungs,
} from "react-icons/fa";
import { GiBrain, GiKidneys, GiStomach, GiMuscleUp } from "react-icons/gi";

import ConsultationBg from "../../../../assets/consultationherobg.png";
const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const doctorSpecialities = [
    { icon: <MdBloodtype />, label: "Diabetologist" },
    { icon: <FaHandHoldingHeart />, label: "Cardiologist" },
    { icon: <FaRibbon />, label: "Oncologist" },
    { icon: <GiBrain />, label: "Psychiatrist" },
    { icon: <FaLungs />, label: "Pulmonologist" },
    { icon: <GiKidneys />, label: "Nephrologist" },
    { icon: <GiStomach />, label: "Gastroentero-logist" },
    { icon: <FaHeartbeat />, label: "General Physician" },
    { icon: <GiMuscleUp />, label: "Orthopedist" },
  ];

  const steps = [
    {
      number: 1,
      title: "Select a Specialist",
      description: "",
    },
    {
      number: 2,
      title: "Book Your Appointment",
      description:
        "Choose a convenient time, select how you'd like to consult (online or in-person), and make your payment.",
    },
    {
      number: 3,
      title: "Attend Your Consultation",
      description:
        "Get clear answers to all your questions regarding lab tests or general health. Receive tailored advice on your diet, lifestyle, and supplements to boost your well-being.",
    },
    {
      number: 4,
      title: "Receive a Prescription",
      description:
        "The doctor will share a complete prescription and customized health guidance based on your consultation.",
    },
  ];

  return (
    <>
      <div className="counselling-page">
        {/* Hero Section */}
        <div className="counselling-hero">
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
              <h1>CONSULTATION</h1>
              <p className="hero-subtitle">
                Your Care,
                <br />
                Personalized
              </p>
            </div>
            <div className="hero-image">
              <span className="image-decoration" />
              <img src={ConsultationBg} alt="Child receiving vaccine" />
            </div>
          </div>
          <div className="search-bar hero-search">
            <IoIosSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search Specialities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FaMicrophone className="mic-icon" />
          </div>
        </div>

        <div className="consultation-category-container">
          <h1 className="consultation-category-title">Categories</h1>

          <div className="consultation-category-grid">
            {doctorSpecialities.map(({ icon, label }, idx) => (
              <div
                key={idx}
                className="consultation-category-card"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleCardClick(label);
                }}
              >
                <div className="icon-wrapper">{icon}</div>
                <p className="consultation-category-label">{label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="how-it-works-container">
          <h2 className="how-it-works-title">
            <span className="title-decoration"></span>
            How Our Genetic Assessment Works
            <span className="title-decoration"></span>
          </h2>
          <div className="steps-wrapper">
            {steps.map((step) => (
              <div key={step.number} className="step-box">
                <div className="step-number-container">
                  <div className="step-number">{step.number}</div>
                  {step.number < steps.length && (
                    <div className="step-connector"></div>
                  )}
                </div>
                <div className="step-content">
                  <h3 className="step-title">{step.title}</h3>
                  {step.description && (
                    <p className="step-description">{step.description}</p>
                  )}
                  {step.details && (
                    <div className="step-details">
                      {step.details.map((detail, i) => (
                        <div key={i} className="detail-item">
                          <span className="detail-icon">•</span>
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>
        {` .counselling-page {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

.counselling-hero {
  background: linear-gradient(to bottom, #4a90e2, #8c60e2);
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
  align-items: flex-end; /* Changed from center to flex-end */
  position: relative;
  z-index: 2;
  height: 100%; /* Added to take full height */
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
  margin-bottom: 24px;
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
  width: 115px;
  height: auto;
  position: relative;
  z-index: 2;
  right: 20px;
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
  width: 160px;
  height: 160px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 50%;
  top: 55%;
  left: 39%;
  transform: translate(-50%, -50%);
  z-index: 1;
}

.consultation-category-container {
  padding: 0 16px;

  margin: 28px 0;
  max-width: 1100px;
  text-align: center;
}

.consultation-category-title {
  font-size: 20px;
  font-weight: 700;
  color: #1e293b;
  text-align: left;
  margin-top: 3rem;
}

.consultation-category-subtitle {
  font-size: 10px;
  font-weight: 400;
  color: #64748b;
  text-align: left;
  margin-bottom: 18px;
} /* Mobile-optimized CSS */
.consultation-category-grid {
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

.consultation-category-card {
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

.consultation-category-card:active {
  transform: translateY(-3px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}

.consultation-category-card:focus-visible,
.consultation-category-card:active {
  outline: none;
}

.consultation-category-card:focus-visible::after,
.consultation-category-card:active::after {
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

.consultation-category-label {
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

  .consultation-category-label {
    font-size: 0.9rem;
  }
}

/* Modern How It Works Section */
.how-it-works-container {
  background: linear-gradient(145deg, #f8faff, #ffffff);
  border-radius: 24px;
  padding: 40px;
  max-width: 800px;
  margin: 60px auto;
  box-shadow: 0 10px 30px rgba(0, 46, 109, 0.1);
  position: relative;
  overflow: hidden;
}

.how-it-works-container::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 8px;
  background: linear-gradient(90deg, #4361ee, #3a0ca3);
}

.how-it-works-title {
  font-size: 32px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 40px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

.title-decoration {
  width: 40px;
  height: 4px;
  background: linear-gradient(90deg, #4361ee, #3a0ca3);
  border-radius: 2px;
  opacity: 0.7;
}

.steps-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: relative;
}

.step-box {
  display: flex;
  gap: 24px;
  align-items: flex-start;
  position: relative;
  z-index: 1;
}

.step-number-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.step-number {
  background: linear-gradient(135deg, #4361ee, #3a0ca3);
  color: white;
  font-weight: 700;
  font-size: 18px;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(67, 97, 238, 0.3);
  position: relative;
  z-index: 2;
  border: 3px solid white;
}

.step-connector {
  flex: 1;
  width: 2px;
  background: linear-gradient(to bottom, #4361ee, #7209b7);
  margin: 8px 0;
  opacity: 0.3;
}

.step-content {
  background: white;
  border-radius: 16px;
  padding: 24px;
  flex: 1;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.step-content:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.step-title {
  font-size: 20px;
  font-weight: 600;
  color: #1a1a1a;
  display: flex;
  align-items: center;
  gap: 10px;
}

.step-title::before {
  content: "";
  display: inline-block;
  width: 8px;
  height: 8px;
  background: #4361ee;
  border-radius: 50%;
}

.step-description {
  font-size: 16px;
  color: #4a4a4a;
  line-height: 1.6;
  margin: 0 0 16px 0;
}

.step-details {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px dashed #e0e0e0;
}

.detail-item {
  display: flex;
  gap: 8px;
  align-items: flex-start;
  margin-bottom: 8px;
  font-size: 15px;
  color: #555;
}

.detail-icon {
  color: #4361ee;
  font-weight: bold;
  flex-shrink: 0;
  margin-top: 2px;
}

/* Responsive Design */
@media (max-width: 768px) {
  .how-it-works-container {
    padding: 30px 20px;
    margin: 40px 20px;
    border-radius: 16px;
  }

  .how-it-works-title {
    font-size: 24px;
    flex-direction: column;
    gap: 10px;
  }

  .title-decoration {
    width: 60px;
  }

  .step-box {
    gap: 16px;
  }

  .step-number {
    width: 36px;
    height: 36px;
    font-size: 16px;
  }

  .step-content {
    padding: 18px;
  }

  .step-title {
    font-size: 18px;
  }

  .step-description {
    font-size: 15px;
  }
}
`}
      </style>
    </>
  );
};

export default Home;
