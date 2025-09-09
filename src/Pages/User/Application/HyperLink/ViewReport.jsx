import React from "react";
import { FiArrowLeft } from "react-icons/fi";
import { PiTestTubeFill } from "react-icons/pi";
import { IoIosAdd } from "react-icons/io";
import { LuChartSpline } from "react-icons/lu";
import { IoAlertCircleOutline } from "react-icons/io5";
import "./style.css";

const ViewReport = () => {
  return (
    <>
      {/* Hero Section */}
      <div className="diet-dashboard-page">
        <div className="diet-dashboard-hero">
          <div className="hero-top-bar">
            <button
              className="icon-button"
              onClick={() => window.history.back()}
              aria-label="Go back"
            >
              <FiArrowLeft className="hero-icon" />
            </button>
            <h1 className="hero-title">HEART</h1>
          </div>
        </div>
      </div>

      {/* Status Summary */}
      <div className="health-status-container">
        <div className="status-card concerning">
          <div className="status-label">Concerning</div>
          <h1>02</h1>
          <p>Physical Health</p>
        </div>

        <div className="status-card abnormal">
          <div className="status-label">Abnormal</div>
          <h1>01</h1>
          <p>Physical Health</p>
        </div>

        <div className="status-card normal">
          <div className="status-label">Normal</div>
          <h1>05</h1>
          <p>Physical Health</p>
        </div>
      </div>

      {/* Concerning Section */}
      <div className="health-section concerning">
        <h1 className="section-title">Concerning</h1>

        <div className="card-container">
          {/* Card 1 */}
          <div className="card-group">
            <div className="card">
              <div className="card-header">
                <h2>Total Cholesterol</h2>
                <IoAlertCircleOutline className="alert-icon" />
              </div>

              <div className="card-content">
                <PiTestTubeFill className="main-icon" />
                <div>
                  <p className="value concerning">200</p>
                  <p className="unit">total</p>
                </div>
              </div>
            </div>

            <div className="card-actions">
              <div className="footer-btn">
                <IoIosAdd /> Add Data
              </div>
              <div className="footer-btn">
                <LuChartSpline /> Insights
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="card-group">
            <div className="card">
              <div className="card-header">
                <h2>Triglycerides</h2>
                <IoAlertCircleOutline className="alert-icon" />
              </div>

              <div className="card-content">
                <PiTestTubeFill className="main-icon" />
                <div>
                  <p className="value concerning">111</p>
                  <p className="unit">mg/dl</p>
                </div>
              </div>
            </div>

            <div className="card-actions">
              <div className="footer-btn">
                <IoIosAdd /> Add Data
              </div>
              <div className="footer-btn">
                <LuChartSpline /> Insights
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Abnormal Section */}
      <div className="health-section abnormal">
        <h1 className="section-title">Abnormal</h1>

        <div className="card-container">
          {/* HDL */}
          <div className="card-group">
            <div className="card">
              <div className="card-header">
                <h2>HDL</h2>
                <IoAlertCircleOutline className="alert-icon" />
              </div>
              <div className="card-content">
                <PiTestTubeFill className="main-icon" />
                <div>
                  <p className="value abnormal">200</p>
                  <p className="unit">total</p>
                </div>
              </div>
            </div>
            <div className="card-actions">
              <div className="footer-btn">
                <IoIosAdd /> Add Data
              </div>
              <div className="footer-btn">
                <LuChartSpline /> Insights
              </div>
            </div>
          </div>

          {/* Homocysteine */}
          <div className="card-group">
            <div className="card">
              <div className="card-header">
                <h2>Homocysteine</h2>
                <IoAlertCircleOutline className="alert-icon" />
              </div>
              <div className="card-content">
                <PiTestTubeFill className="main-icon" />
                <div>
                  <p className="value abnormal">111</p>
                  <p className="unit">mg/dl</p>
                </div>
              </div>
            </div>
            <div className="card-actions">
              <div className="footer-btn">
                <IoIosAdd /> Add Data
              </div>
              <div className="footer-btn">
                <LuChartSpline /> Insights
              </div>
            </div>
          </div>

          {/* Total Cholesterol */}
          <div className="card-group">
            <div className="card">
              <div className="card-header">
                <h2>Total Cholesterol</h2>
                <IoAlertCircleOutline className="alert-icon" />
              </div>
              <div className="card-content">
                <PiTestTubeFill className="main-icon" />
                <div>
                  <p className="value">200</p>
                  <p className="unit">total</p>
                </div>
              </div>
            </div>
            <div className="card-actions">
              <div className="footer-btn">
                <IoIosAdd /> Add Data
              </div>
              <div className="footer-btn">
                <LuChartSpline /> Insights
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Normal Section */}
      <div className="health-section normal">
        <h1 className="section-title">Normal</h1>

        <div className="card-container">
          {/* Apolipoprotein A-1 */}
          <div className="card-group">
            <div className="card">
              <div className="card-header">
                <h2>Apolipoprotein A-1</h2>
                <IoAlertCircleOutline className="alert-icon" />
              </div>
              <div className="card-content">
                <PiTestTubeFill className="main-icon" />
                <div>
                  <p className="value normal">200</p>
                  <p className="unit">total</p>
                </div>
              </div>
            </div>
            <div className="card-actions">
              <div className="footer-btn">
                <IoIosAdd /> Add Data
              </div>
              <div className="footer-btn">
                <LuChartSpline /> Insights
              </div>
            </div>
          </div>

          {/* Triglycerides */}
          <div className="card-group">
            <div className="card">
              <div className="card-header">
                <h2>Triglycerides</h2>
                <IoAlertCircleOutline className="alert-icon" />
              </div>
              <div className="card-content">
                <PiTestTubeFill className="main-icon" />
                <div>
                  <p className="value normal">111</p>
                  <p className="unit">mg/dl</p>
                </div>
              </div>
            </div>
            <div className="card-actions">
              <div className="footer-btn">
                <IoIosAdd /> Add Data
              </div>
              <div className="footer-btn">
                <LuChartSpline /> Insights
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
        /* General */
body {
  font-family: Arial, sans-serif;
}

/* Hero */
.diet-dashboard-page {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.diet-dashboard-hero {
  background: linear-gradient(to bottom, #6ea6e7 0%, #daeffe 50%, #e0d3ff 80%);
  padding: 20px;
  border-radius: 0 0 32px 32px;
  color: white;
  position: relative;
  margin-bottom: 1rem;
  box-shadow: 0 10px 30px rgba(103, 108, 255, 0.2);
}

.hero-top-bar {
  display: flex;
  align-items: center;
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
  cursor: pointer;
  transition: all 0.3s ease;
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
  font-weight: 700;
  color: #553fb5;
  margin: 0;
  letter-spacing: 1px;
}

/* Status Cards */
.health-status-container {
  display: flex;
  gap: 12px;
  padding: 16px;
  overflow-x: auto;
  justify-content: space-around;
}

.status-card {
  position: relative;
  background: #fff;
  border-radius: 12px;
  padding: 16px 12px;
  text-align: left;
  width: 90px;
  min-width: 90px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  flex-shrink: 0;
}

.status-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
}

.status-label {
  position: absolute;
  top: -8px;
  right: -8px;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 4px 8px;
  border-radius: 16px;
  color: #fff;
}

.status-card.concerning .status-label {
  background-color: #ef4444;
}

.status-card.abnormal .status-label {
  background-color: #f59e0b;
}

.status-card.normal .status-label {
  background-color: #10b981;
}

.status-card h1 {
  font-size: 1.8rem;
  font-weight: bold;
  color: #111827;
  margin-bottom: 8px;
}

.status-card p {
  font-size: 0.85rem;
  color: #4b5563;
  margin: 0;
}
/* Concerning Section */
.concerning .section-title {
  color: #ff4d4d;
}
.concerning .value {
  color: #ff4d4d;
}

/* Abnormal Section */
.abnormal .section-title {
  color: #ffa235;
}
.abnormal .value {
  color: #ffa235;
}

/* Normal Section */
.normal .section-title {
  color: #0dcf0d;
}
.normal .value {
  color: #0dcf0d;
}

/* General Health Section */
.health-section {
  padding: 12px;
}

/* Section Titles */
.section-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 14px;
}

.concerning .section-title {
  color: #ff4d4d;
}
.abnormal .section-title {
  color: #ffa235;
}
.normal .section-title {
  color: #0dcf0d;
}

/* Card Container - no scroll, wrap instead */
.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: space-between;
  padding-bottom: 10px;
}

/* Card group keeps card + footer together */
.card-group {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 8px;
}

/* Card */
.card {
  background: #fff;
  border-radius: 12px;
  padding: 14px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12);
  width: 160px; /* bigger card size */
  min-height: 100px; /* taller for breathing room */
  flex-shrink: 0;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.18);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-header h2 {
  font-size: 13px;
  margin: 0;
  color: #333;
}

.alert-icon {
  color: #fbbf24;
  font-size: 16px;
}

.card-content {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 10px 0;
}

.main-icon {
  font-size: 26px;
  color: #2196f3;
}

.value {
  font-size: 20px;
  font-weight: bold;
  margin: 0;
}

.unit {
  font-size: 11px;
  margin: 0;
  color: #555;
}

/* Actions (footer outside card) */
.card-actions {
  display: flex;
  justify-content: space-between;
  width: 160px; /* match bigger card width */
}

.footer-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  padding: 6px 8px;
  border-radius: 8px;
  color: #555;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease;
}

.footer-btn:hover {
  background: #f9fafb;
  color: #000;
}
`}
      </style>
    </>
  );
};

export default ViewReport;
