import React, { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { IoIosSearch } from "react-icons/io";
import { FaMicrophone } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { MdBloodtype } from "react-icons/md";
import {
  FaHandHoldingHeart,
  FaRibbon,
  FaHeartbeat,
  FaLungs,
} from "react-icons/fa";
import { GiMuscleUp } from "react-icons/gi";

import ConsultationBg from "../../../../assets/consultationherobg.png";
import consultationwhy1 from "../../../../assets/consultationwhy1.png";
import consultationwhy2 from "../../../../assets/consultationwhy2.png";
import consultationwhy3 from "../../../../assets/consultationwhy3.png";
import consultationwhy4 from "../../../../assets/consultationwhy4.png";
const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  const handleCardClick = (categoryName) => {
    navigate("/app/consultation/doctors-list", {
      state: { category: categoryName }, // Pass category in route state
    });
  };
  const doctorSpecialities = [
    { icon: <MdBloodtype />, label: "Diabetologist" },
    { icon: <FaHandHoldingHeart />, label: "Genetic Counselor" },
    { icon: <FaRibbon />, label: "Nutrigenomist" },
    { icon: <FaHeartbeat />, label: "General Physician" },
    { icon: <GiMuscleUp />, label: "Physiotherapist" },
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
  const stats = [
    { img: consultationwhy1, number: "150+", label: "Qualified Doctors" },
    { img: consultationwhy2, number: "20+", label: "Specialties" },
    {
      img: consultationwhy3,
      number: "1000+",
      label: "Successful Consultations",
    },
    { img: consultationwhy4, number: "24/7", label: "Available Support" },
  ];
  return (
    <>
      <div className="consultation-page">
        {/* Hero Section */}
        <div className="consultation-hero">
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
                onClick={() => handleCardClick(label)}
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

        <div className="howitworks-container">
          <h1 className="howitworks-title">How it works</h1>
          <div className="steps-list">
            {steps.map((step) => (
              <div key={step.number} className="step-item">
                <div className="step-number">{step.number}</div>
                <div className="step-content">
                  <h2 className="step-title">{step.title}</h2>
                  {step.description && (
                    <p className="step-description">{step.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="whyconsult-container">
          <h1 className="whyconsult-title">Why consult on Hyperlink?</h1>

          <div className="whyconsult-grid">
            {stats.map((item, idx) => (
              <div key={idx} className="whyconsult-card">
                <div className="whyconsult-icon">
                  <img src={item.img} alt={item.label} />
                </div>
                <div className="whyconsult-info">
                  <h2>{item.number}</h2>
                  <p>{item.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>
        {` .consultation-page {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

.consultation-hero {
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
display: flex
;
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

.howitworks-container {
  max-width: 600px;
  margin: 1rem;
  padding: 24px;
  border-radius: 16px;
background: linear-gradient(180deg, #d6efff 20%, #8c60e2 150%);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.06);
}

.howitworks-title {
  font-size: 22px;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 1px solid #fff;
}

.steps-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.step-item {
  display: flex;
  align-items: flex-start;
  gap: 16px;
}

.step-number {
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  background-color: #3b82f6; /* blue */
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 14px;
}

.step-content {
  flex: 1;
}

.step-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.step-description {
  margin-top: 4px;
  font-size: 14px;
  color: #666;
  line-height: 1.5;
}
.whyconsult-container {
  max-width: 700px; /* smaller overall width */
  margin: 60px auto;
  padding: 0 20px;
  text-align: center;
}

.whyconsult-title {
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin-bottom: 30px;
}

.whyconsult-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* Force 2x2 grid */
  gap: 20px;
  justify-items: center;
}

.whyconsult-card {
  position: relative;
    background: #ffffff;
    border-radius: 14px;
    padding: 10px ;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.05);
    display: flex
;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.whyconsult-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.08);
}

.whyconsult-icon {
  display: flex;
  justify-content: center;
  width: 100%;
}

.whyconsult-icon img {
  width: 50px;
  height: 50px;
  object-fit: contain;
}

.whyconsult-info {
  text-align: center;
  margin-top: 12px;
}

.whyconsult-info h2 {
  font-size: 18px;
  font-weight: 600;
  color: #3b82f6;
  margin: 0;
}

.whyconsult-info p {
  font-size: 12px;
  color: #666;
  margin-top: 3px;
}

`}
      </style>
    </>
  );
};

export default Home;
