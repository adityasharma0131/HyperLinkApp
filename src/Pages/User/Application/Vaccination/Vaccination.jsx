import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { FaMicrophone } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { FiArrowLeft } from "react-icons/fi";
import Vaccinationbg from "../../../../assets/vaccinationhero.png";
import AppButton from "../../../../Components/AppButton";

import ChildVacc from "../../../../assets/catchildhoodvaccines.svg";
import AdultVacc from "../../../../assets/catadultvaccines.svg";
import TravelVacc from "../../../../assets/cattravelvaccines.svg";
import PrescriptionBG from "../../../../assets/PrescriptionBG.svg";
import HealthRecord from "../../../../assets/healthrecord.png";

import { FaHome } from "react-icons/fa";
import { FaRibbon } from "react-icons/fa6";
import { FaUserCheck } from "react-icons/fa";

const Vaccination = () => {
  const navigate = useNavigate();

  return (
    <div className="vaccination-page">
      <div className="vaccination-hero">
        <div className="vaccination-header">
          <div className="header-left">
            <button className="icon-button">
              <FiArrowLeft
                className="hero-icon"
                onClick={() => window.history.back()}
              />
            </button>
            <div className="text-block">
              <h1>VACCINATION</h1>
              <p>Your Care, Personalized</p>
              <button
                className="talk-btn"
                onClick={() => navigate("/app/consultation")}
              >
                Talk to an Expert
              </button>
            </div>
          </div>

          <div className="header-right">
            <div className="image-wrapper">
              <img src={Vaccinationbg} alt="Vaccination" />
            </div>
          </div>
        </div>

        <div className="search-bar hero-search">
          <IoIosSearch className="search-icon" />
          <input type="text" placeholder="Search" />
          <FaMicrophone className="mic-icon" />
        </div>
      </div>

      <div className="categories-section">
        <h2 className="categories-title">Categories</h2>
        <div className="categories-cards">
          <Link to="/app/vaccination/child" className="category-card pink">
            <h3>
              Childhood <br /> Vaccines
            </h3>
            <img src={ChildVacc} alt="Childhood Vaccines" />
            <span className="ripple" />
          </Link>

          <Link to="/app/vaccination/adult" className="category-card orange">
            <h3>
              Adult <br /> Vaccines
            </h3>
            <img src={AdultVacc} alt="Adult Vaccines" />
            <span className="ripple" />
          </Link>

          <Link to="/app/vaccination/travel" className="category-card blue">
            <h3>
              Travel <br /> Vaccines
            </h3>
            <img src={TravelVacc} alt="Travel Vaccines" />
            <span className="ripple" />
          </Link>
        </div>
      </div>
      <div className="prescription-container">
        <div className="prescription-card">
          <div className="prescription-content">
            <h2 className="prescription-heading">Upload Your Prescription</h2>
            <p className="prescription-subtext">
              We'll suggest the best test for you.
            </p>
            <button
              className="upload-prescription-button"
              onClick={() => navigate("/app/prescription/upload-prescription")}
            >
              Upload Prescription
            </button>
          </div>

          <img src={PrescriptionBG} alt="Upload Illustration" />
        </div>
      </div>

      <div className="vaccine-benefits">
        <div className="benefit-card">
          <FaHome className="benefit-icon" />
          <p>Home vaccination support with certified nurses</p>
        </div>
        <div className="benefit-card">
          <FaRibbon className="benefit-icon" />
          <p>Special focus on cancer prevention & women’s wellness</p>
        </div>
        <div className="benefit-card">
          <FaUserCheck className="benefit-icon" />
          <p>Personalized vaccine suggestions based on health profile</p>
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
          <AppButton
            text="View Records"
            onClick={() => navigate("/app/health-record")}
          />
        </div>
        <div className="report-image">
          <img src={HealthRecord} alt="Health Record Secure" />
        </div>
      </div>

      <style>
        {`
.vaccination-page {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

.vaccination-hero {
  background: linear-gradient(to bottom, #058ebf, #abf1ff);
  padding: 20px;
  border-radius: 0 0 30px 30px;
  position: relative;
  box-shadow: 0 10px 30px rgba(103, 108, 255, 0.2);
}

.vaccination-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.header-left {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  color: white;
  flex: 1;
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

.text-block h1 {
  margin: 0;
  font-size: 20px;
  font-weight: 700;
  color: #fff;
}

.text-block p {
  font-size: 12px;

  margin-bottom: 10px;
  color: rgba(255, 255, 255, 0.9);
}

.header-right {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
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


.image-wrapper {
  position: relative;
  width: 150px;
  height: 150px;
}

.image-wrapper img {
  width: 100%;
  height: auto;
  object-fit: cover;
}

/* Search Bar */
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
.categories-section {
  padding: 30px 12px 12px;
}

.categories-title {
  font-size: 1rem;
  font-weight: 500;
  color: #1f2937;
  margin-bottom: 10px;
}

.categories-cards {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.category-card {
  position: relative;
  flex: 0 0 280px;
  border-radius: 16px;
  padding: 12px;
  text-align: left;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  overflow: hidden;
  transition: transform 0.35s ease, box-shadow 0.35s ease;
  text-decoration: none;
  color: inherit;
}

.category-card h3 {
  font-size: 12px;
  font-weight: 500;
  color: white;
  margin-bottom: 14px;
  font-style: normal;
  text-decoration: none;
  transition: transform 0.35s ease;
}


.category-card img {
  width: 100%;
  height: auto;
  max-height: 180px;
  object-fit: contain;
  transition: transform 0.35s ease;
}

/* Hover Effects */
.category-card:hover {
  transform: translateY(-6px) scale(1.03);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}

.category-card:hover h3 {
  transform: translateY(-4px);
}

.category-card:hover img {
  transform: perspective(800px) rotateX(6deg) rotateY(-6deg);
}

/* Ripple Animation */
.ripple {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  width: 0;
  height: 0;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  animation: ripple-animation 0.6s linear;
}

@keyframes ripple-animation {
  0% {
    width: 0;
    height: 0;
    opacity: 0.6;
  }
  100% {
    width: 300%;
    height: 300%;
    opacity: 0;
  }
}

/* Gradient background classes */
.pink {
  background: linear-gradient(135deg, #6e8efb, #a777e3);
}

.orange {
  background: linear-gradient(135deg, #ffcc3d, #ff8a00);
}

.blue {
  background: linear-gradient(135deg, #2aa4f4, #78cdff);
}

/* Responsive */
@media (max-width: 768px) {
  .category-card {
    flex: 1 1 100%;
  }
}

.prescription-container {
  padding: 16px;
}

.section-title {
  font-size: 1rem;
  font-weight: 500;
  color: #1f2937;
  margin-bottom: 10px;
}
.prescription-container {
  padding: 16px;
}

.prescription-card {
  background-color: #5a0b83;
  border-radius: 18px;
  display: flex;
  padding: 10px;
  color: white;
  overflow: visible;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  align-items: center;

  justify-content: space-around;
  position: relative;
}

.prescription-card::before,
.prescription-card::after {
  content: "";
  position: absolute;
  background-color: rgba(255, 255, 255, 0.1);
}

.prescription-card::before {
  width: 60px;
  height: 60px;
  top: -15px;
  left: -15px;
  border-radius: 0 0 100% 0;
}

.prescription-card::after {
  width: 90px;
  height: 90px;
  bottom: -20px;
  right: -5px;
  border-radius: 100% 0 0 0;
  border: 2px solid rgba(255, 255, 255, 0.2);
}

.prescription-content {
  max-width: 50%;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.prescription-heading {
  font-size: 17px;
  font-weight: 700;
  line-height: 1.4;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.prescription-subtext {
  font-size: 12px;
  white-space: nowrap;
  opacity: 0.95;
}

.prescription-image img {
  height: 144px;
  max-width: 93%;
  object-fit: contain;
  border-radius: 12px;
  position: absolute;
  top: 2px;
}

.upload-prescription-button {
  background-color: #e83f93;
  color: white;
  font-size: 14px;
  font-weight: 600;
  padding: 8px 14px;
  white-space: nowrap;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.upload-prescription-button:hover {
  background-color: #ff4b3a;
  transform: translateY(-2px);
}


.vaccine-benefits {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  padding: 20px 10px;
}

.benefit-card {
  flex: 1 1 30%;
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 10px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: default;
}

.benefit-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.benefit-icon {
  font-size: 28px;
  color: #8b5cf6;
  margin-bottom: 12px;
}

.benefit-card p {
  font-size: 10px;
  color: #374151;
  line-height: 1.6;
  margin: 0;
}

.report-banner {
  display: flex;
  flex-direction: row;
  align-items: center;
  background: linear-gradient(180deg, #f0f4ff 0%, #e9dfff 100%);
  border-radius: 20px;
  padding: 1.2rem 1rem;
  margin:  1rem;
        gap: 1rem;

}

.report-text {
  flex: 1;
}

.report-text h2 {
  font-size: 1.4rem;
  font-weight: 800;
  line-height: 1.3;
  margin-bottom: 0.6rem;
}

.highlight {
  color: #e11d48; /* Pink-red */
}

.report-text p {
  font-size: 10px;
  color: #374151;
  margin-bottom: 0.8rem;
}

.report-image {
  flex-shrink: 0;
  width: 40%;
  display: flex;
  justify-content: center;
}

.report-image img {
  width: 100%;
  max-width: 140px;
  height: auto;
}

/* Mobile responsiveness */
@media (max-width: 600px) {
  .report-text h2 {
    font-size: 1.3rem;
  }
}
.talk-btn {
  background-color: #553fb5;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 6px 12px;          /* smaller padding */
  font-size: 14px;             /* slightly smaller text */
  font-weight: 500;
  cursor: pointer;
  width: auto;                 /* remove full width */
  font-family: "Outfit", sans-serif;
  transition: background 0.2s ease;
}

`}
      </style>
    </div>
  );
};

export default Vaccination;
