import React, { useState } from "react";
import { FiArrowLeft, FiUpload } from "react-icons/fi";
import healthrecordsaddrecords from "../../../../assets/healthrecordsaddrecords.svg";
import healthrecordlockrecords from "../../../../assets/healthrecordslockrecords.svg";
import healthrecordwellness from "../../../../assets/healthrecordswellness.svg";
import "./style.css";

const Home = () => {
  return (
    <>
      <div className="health-record-page">
        <div className="health-record-hero">
          <div className="hero-top-bar">
            <button
              className="icon-button"
              onClick={() => window.history.back()}
              aria-label="Go back"
            >
              <FiArrowLeft className="hero-icon" />
            </button>
            <h1 className="hero-title">HEALTH RECORDS</h1>
          </div>
        </div>
        <div className="quick-access">
          <h2 className="quick-access-title">QUICK ACCESS</h2>

          <div className="quick-access-cards">
            <div className="quick-access-item">
              <div className="quick-access-card">
                <img src={healthrecordsaddrecords} alt="Add Records" />
              </div>
              <p>Add Records</p>
            </div>

            <div className="quick-access-item">
              <div className="quick-access-card">
                <img src={healthrecordlockrecords} alt="Lock Records" />
              </div>
              <p>Lock Records</p>
            </div>

            <div className="quick-access-item">
              <div className="quick-access-card">
                <img src={healthrecordwellness} alt="Wellness" />
              </div>
              <p>Wellness</p>
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
        .health-record-page {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

.health-record-hero {
  background: linear-gradient(to bottom, #6ea6e7 0%, #daeffe 50%, #e0d3ff 80%);
  padding: 20px;
  border-radius: 0 0 32px 32px;
  color: white;
  position: relative;
  box-shadow: 0 10px 30px rgba(103, 108, 255, 0.2);
}

.hero-top-bar {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  text-align: left;
  gap: 1rem;
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
  color: #553fb5;
}

.hero-title {
  font-size: 16px;
  color: #553fb5;
  font-weight: 700;
  margin: 0;
  line-height: 1.2;
  text-align: left;
  letter-spacing: 1px;
}

.quick-access {
  padding: 20px;
  font-family: Arial, sans-serif;
}

.quick-access-title {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 15px;
  color: #000;
}

.quick-access-cards {
  display: flex;
  gap: 20px;
  align-items: flex-end;
}

.quick-access-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 120px;
}

.quick-access-card {
  background: #fff;
  border-radius: 15px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  padding: 20px 15px;
  width: 100%;
  text-align: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
}

.quick-access-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.quick-access-card img {
  max-width: 60px;
}

.quick-access-item p {
  margin-top: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #333;
  text-align: center;
}
`}
      </style>
    </>
  );
};

export default Home;
