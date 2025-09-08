import React from "react";
import { FiArrowLeft } from "react-icons/fi"; // Added import
import UserNavigation from "../../../../Components/UserNavigation";
import AppButton from "../../../../Components/AppButton"; // Assuming your button component path
import Health360bg from "../../../../assets/Health360bg.png";
import hyperlink360s1 from "../../../../assets/hyperlink360s1.svg";
import hyperlink360s2 from "../../../../assets/hyperlink360s2.svg";
import hyperlink360s3 from "../../../../assets/hyperlink360s3.svg";
import hyperlink360s4 from "../../../../assets/hyperlink360s4.svg";
import hyperlink360s5 from "../../../../assets/hyperlink360s5.svg";
import Health360Insightsbg from "../../../../assets/Health360Insightsbg.svg";
import ConsultDoctorBg from "../../../../assets/ConsultDoctorBg.svg";
import HealthRecord from "../../../../assets/healthrecord.png";

import "./style.css";
const HyperLink = () => {
  const cards = [
    { title: "Physical Health", img: hyperlink360s1 },
    { title: "Key Vitals", img: hyperlink360s2 },
    { title: "Lifestyle", img: hyperlink360s3 },
    { title: "Genome Patri", img: hyperlink360s4 },
    { title: "Conditions", img: hyperlink360s5 },
  ];
  return (
    <>
      <div className="hyperlink-page">
        {/* Hero Section */}
        <div className="hyperlink-hero">
          <div className="hero-top-bar">
            <button
              className="icon-button"
              onClick={() => window.history.back()}
            >
              <FiArrowLeft className="hero-icon" />
            </button>
            <div className="hero-texts">
              <h1 className="hero-title">HYPERLINK 360</h1>
              {/* <p className="hero-subtitle">Ghatkopar, Mumbai </p> */}
            </div>
          </div>

          <div className="hero-content">
            <div className="hero-text">
              <h1>
                WELCOME TO
                <br />
                HEALTH 360
              </h1>

              <AppButton text="Get Tested " variant="secondary" />
            </div>
            <div className="hero-image">
              <span className="image-decoration" />
              <img src={Health360bg} alt="Child receiving vaccine" />
            </div>
          </div>
        </div>

        <div className="track-health">
          <h1 className="track-title">Track Your Health</h1>
          <p className="track-subtitle">
            Monitor your & family’s medical history & health patterns for
            insights.
          </p>

          <div className="card-grid">
            {cards.map((card, index) => (
              <div key={index} className="health-card">
                <h2 className="card-title">{card.title}</h2>
                <img src={card.img} alt={card.title} className="card-image" />
                <p className="card-date">Updated on 20th June 2025</p>
              </div>
            ))}
          </div>
        </div>
        <div className="insights-container">
          <div className="insights-text">
            <h1 className="insights-title">View Realtime Insights</h1>
            <p className="insights-desc">
              Upload your diagnostic reports, <br />
              Sync your fitness bands, <br />
              Add values for parameters manually
            </p>
          </div>
          <div className="insights-image">
            <img src={Health360Insightsbg} alt="Realtime Insights" />
          </div>
        </div>
        <div className="consult-doctor-card">
          <div className="consult-doctor-image">
            <img src={ConsultDoctorBg} alt="Doctor Illustration" />
          </div>
          <div className="consult-doctor-content">
            <h1>CONSULT A DOCTOR</h1>
            <p>Preventive consultations with our specialist doctors</p>
            <AppButton text="Consult Now" />
          </div>
        </div>

        <div className="report-banner">
          <div className="report-text">
            <h2>
              <span className="highlight">YOUR HEALTH </span> <br />
              <span className="highlight">RECORDS</span>
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

      <style>
        {`
        .hyperlink-page {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  margin-bottom: 5rem;
}

.hyperlink-hero {
  background: linear-gradient(to bottom, #6ea6e7 0%, #daeffe 50%, #e0d3ff 80%);
  padding: 20px 20px 0;
  border-radius: 0 0 32px 32px;
  color: white;
  position: relative;
  box-shadow: 0 10px 30px rgba(103, 108, 255, 0.2);
  min-height: 225px;
}

.hero-top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
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
  width: 200px;
  height: auto;
  position: relative;
  z-index: 2;
  bottom: -29px;
  filter: drop-shadow(0 10px 15px rgba(0, 0, 0, 0.1));
}

.image-decoration {
  position: absolute;
  width: 180px;
  height: 180px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 50%;
  top: 65%;
  left: 52%;
  transform: translate(-50%, -50%);
  z-index: 1;
}

.track-health {
  text-align: center;
  padding: 20px 10px;
}

.track-title {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 8px;
  color: #111;
}

.track-subtitle {
  font-size: 14px;
  color: #555;
  margin-bottom: 20px;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 cards in first row */
  gap: 12px;
  justify-content: center;
}

.health-card {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.08);
  padding: 12px;
  text-align: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.health-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 12px rgba(0, 0, 0, 0.12);
}

.card-image {
  width: 60px;
  height: 60px;
  object-fit: contain;
}

.card-title {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 5px;
  color: #222;
}

.card-date {
  font-size: 11px;
  color: #777;
}

.insights-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
}

.insights-text {
  flex: 1;
}

.insights-title {
  font-size: 20px;
  font-weight: 700;
  color: #111;
  margin-bottom: 12px;
}

.insights-desc {
  font-size: 10px;
  color: #444;
  line-height: 1.6;
}

.insights-image {
  flex: 1;
  display: flex;
  justify-content: flex-end;
}

.insights-image img {
  max-width: 220px;
  height: auto;
}

/* Mobile view */
@media (max-width: 768px) {
  .insights-text {
    margin-bottom: 20px;
  }

  .insights-image {
    justify-content: center;
  }

  .insights-image img {
    max-width: 180px;
  }
}
.consult-doctor-card {
  position: relative;
  display: flex;
  align-items: center;
  background: linear-gradient(to bottom, #6ea6e7 0%, #e0d3ff 60%);
  padding: 20px 12px 12px 12px; /* Extra top padding for image pop-out */
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  max-width: 100%;
  margin: 1rem;
}

.consult-doctor-image {
  position: absolute;
  top: 2px; /* Image pops out from the top */
  left: 12px;
}

.consult-doctor-image img {
  width: 120px; /* Slightly larger for pop-out effect */
  height: auto;
}

.consult-doctor-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 120px; /* Enough space for the popped-out image */
}

.consult-doctor-content h1 {
  font-size: 1.2rem;
  margin-bottom: 6px;
  color: #1e3a8a;
}

.consult-doctor-content p {
  font-size: 0.85rem;
  color: #334155;
  margin-bottom: 10px;
}

.consult-button {
  background-color: #2563eb;
  color: white;
  border: none;
  padding: 8px 16px;
  font-size: 0.9rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.consult-button:hover {
  background-color: #1e40af;
}

.report-banner {
  display: flex;
  flex-direction: row;
  align-items: center;
  background: linear-gradient(180deg, #f0f4ff 0%, #e9dfff 100%);
  border-radius: 20px;
  padding: 1.2rem 1rem;
  margin: 1rem 1rem 7rem 1rem;
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
`}
      </style>
    </>
  );
};

export default HyperLink;
