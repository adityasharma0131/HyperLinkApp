import React, { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { FiCheck } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { CiCircleInfo } from "react-icons/ci";

import { FiArrowUpRight } from "react-icons/fi";

import Child1 from "../../../../assets/Child1.svg";
import Child2 from "../../../../assets/Child2.svg";
import Child3 from "../../../../assets/Child3.svg";
import Child4 from "../../../../assets/Child4.svg";
import Child5 from "../../../../assets/Child5.svg";
const ChildVaccinationTracker = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("CHILDHOOD VACCINES");
  const navigate = useNavigate();

  const handleSelect = (option, path) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
    navigate(path);
  };

  const completed = 56;
  const total = 100;
  const percent = Math.round((completed / total) * 100);

  const vaccineData = [
    {
      age: "0–2 Weeks",
      childImg: Child1,
      vaccines: [
        { name: "BCG / OPV", date: "Due: Jan 15, 2025", status: "Completed" },
        {
          name: "Hep B - 1st Dose",
          date: "Due: Jan 15, 2025",
          status: "Completed",
        },
      ],
    },
    {
      age: "6 Weeks",
      childImg: Child2,
      vaccines: [
        {
          name: "Hexaxim - 1st Dose",
          date: "Due: Feb 28, 2025",
          status: "Completed",
        },
        {
          name: "Rotavirus - 1st Dose",
          date: "Due: Feb 28, 2025",
          status: "Completed",
        },
      ],
    },
    {
      age: "10 Weeks",
      childImg: Child3,
      vaccines: [
        {
          name: "Hexaxim - 2nd Dose",
          date: "Due: Mar 28, 2025",
          status: "Due",
        },
        {
          name: "Rotavirus - 2nd Dose",
          date: "Due: Mar 28, 2025",
          status: "Due",
        },
      ],
    },
    {
      age: "14 Weeks",
      childImg: Child4,
      vaccines: [
        {
          name: "Hexaxim - 3rd Dose",
          date: "Due: Apr 28, 2025",
          status: "Due",
        },
        {
          name: "Rotavirus - 3rd Dose",
          date: "Due: Apr 28, 2025",
          status: "Due",
        },
      ],
    },
    {
      age: "6 Months",
      childImg: Child5,
      vaccines: [
        {
          name: "Influenza - 1st Dose",
          date: "Due: Jun 15, 2025",
          status: "Due",
        },
      ],
    },
  ];
  return (
    <div className="child-vacc-page">
      <div className="child-vacc-hero">
        <div className="hero-top-bar">
          <button className="icon-button" onClick={() => window.history.back()}>
            <FiArrowLeft className="hero-icon" />
          </button>

          <div className="hero-texts">
            <h1 className="hero-title">VACCINE TRACKER</h1>

            <p
              className="hero-subtitle clickable"
              onClick={() => setIsDropdownOpen((prev) => !prev)}
            >
              {selectedOption} ▾
            </p>
          </div>
        </div>

        {/* Absolutely positioned dropdown */}
        {isDropdownOpen && (
          <div className="dropdown absolute-dropdown">
            <p
              className="dropdown-item"
              onClick={() =>
                handleSelect(
                  "CHILDHOOD VACCINES",
                  "/app/vaccination/child/tracker"
                )
              }
            >
              CHILDHOOD VACCINES
            </p>
            <p
              className="dropdown-item"
              onClick={() =>
                handleSelect("ADULT VACCINES", "/app/vaccination/adult/tracker")
              }
            >
              ADULT VACCINES
            </p>
            <p
              className="dropdown-item"
              onClick={() =>
                handleSelect(
                  "TRAVEL VACCINES",
                  "/app/vaccination/travel/tracker"
                )
              }
            >
              TRAVEL VACCINES
            </p>
          </div>
        )}
      </div>
      <div className="vaccine-progress">
        {/* Info Box */}
        <div className="info-box">
          <CiCircleInfo className="info-icon" />
          <p className="info-text">Next Due: 26 Sept 2025 – DTPw B + IPV</p>
        </div>

        {/* Progress Section */}
        <div className="progress-section">
          <h1 className="progress-title">
            {completed} of {total} completed
          </h1>

          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${percent}%` }}>
              <span className="progress-label">{percent}%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="timeline-container">
        <h1 className="timeline-title">Smart Vaccine Timeline</h1>

        <div className="timeline">
          {vaccineData.map((stage, index) => {
            const isCompleted = stage.vaccines.some(
              (v) => v.status === "Completed"
            );

            return (
              <div key={index} className="timeline-row">
                {/* Left: Child Image */}
                <div className="child-col">
                  <img
                    src={stage.childImg}
                    alt="child stage"
                    className="child-img"
                  />
                </div>

                {/* Middle: Timeline line + dot */}
                <div className="line-col">
                  <div
                    className={`dot ${
                      isCompleted ? "dot-completed" : "dot-due"
                    }`}
                  >
                    {isCompleted && <FiCheck className="tick-icon" />}
                  </div>
                  {index < vaccineData.length - 1 && <div className="line" />}
                </div>

                {/* Right: Vaccine cards */}
                <div className="vaccine-col">
                  <p className="age-label">{stage.age}</p>
                  {stage.vaccines.map((v, i) => (
                    <div key={i} className="vaccine-card">
                      <div>
                        <p className="vaccine-name">{v.name}</p>
                        <p className="vaccine-date">{v.date}</p>
                      </div>
                      <div className="vaccine-right">
                        <span
                          className={`status ${
                            v.status === "Completed" ? "completed" : "due"
                          }`}
                        >
                          {v.status}
                        </span>
                        <FiArrowUpRight className="arrow-icon" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <style>
        {`
        .child-vacc-page {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

.child-vacc-hero {
  background: linear-gradient(to bottom, #6ea6e7 0%, #daeffe 50%, #e0d3ff 80%);
  padding: 20px;
  margin-bottom: 2rem;
  border-radius: 0 0 32px 32px;
  color: white;
  box-shadow: 0 10px 30px rgba(74, 144, 226, 0.2);
  position: relative;
}

.hero-top-bar {
  display: flex;
  align-items: flex-start;
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

.clickable {
  cursor: pointer;
  color: #000;
  transition: color 0.2s ease;
}

.clickable:hover {
  color: #553fb5;
}

.dropdown {
  margin-top: 0.5rem;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  padding: 0.5rem 0.75rem;
  animation: fadeDown 0.3s ease;
}

.dropdown-item {
  font-size: 12px;
  font-weight: 600;
  color: #000;
  padding: 4px 0;
  cursor: pointer;
  transition: color 0.2s ease;
}

.dropdown-item:hover {
  color: #553fb5;
}

@keyframes fadeDown {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Position dropdown absolutely so it floats on top */
.absolute-dropdown {
  position: absolute;
  top: 60%;
  left: 70px;
  width: 50%;
  z-index: 10;
}

.vaccine-progress {
  max-width: 400px;
  margin: 1rem;
}

/* Info box */
.info-box {
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: #d1f5d3; /* light green */
  border-radius: 8px;
  padding: 8px 12px;
  margin-bottom: 16px;
}

.info-icon {
  font-size: 20px;
  color: #2e7d32; /* dark green */
}

.info-text {
  font-size: 14px;
  font-weight: 500;
  color: #2e7d32;
  margin: 0;
}

/* Progress section */
.progress-section {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.progress-title {
  font-size: 14px;
  font-weight: 600;
  color: #000;
  margin: 0;
}

/* Progress bar */
.progress-bar {
  background: #e5f0f9; /* light blue background */
  border-radius: 12px;
  height: 14px;
  width: 100%;
  overflow: hidden;
  position: relative;
}

.progress-fill {
  background: #4a90e2; /* blue fill */
  height: 100%;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 6px;
  color: #fff;
  font-size: 10px;
  font-weight: 600;
  transition: width 0.3s ease;
}

.progress-label {
  position: relative;
  z-index: 1;
}
.timeline-container {
  width: 100%;
  padding: 0 10px;
}

.timeline-title {
  text-align: center;
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 1.2rem;
}

.timeline {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.timeline-row {
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
}

.child-col {
  width: 50px;
  display: flex;
  justify-content: center;
}

.child-img {
  width: 50px;
  height: 50px;
}

.line-col {
  width: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dot-completed {
  background-color: #4caf50;
  color: white;
}

.dot-due {
  background-color: #dcdcdc;
}

.tick-icon {
  font-size: 10px;
}

.line {
  flex: 1;
  width: 2px;
  background-color: #dcdcdc;
  margin-top: 1px;
}

.vaccine-col {
  flex: 1;
}

.age-label {
  font-size: 11px;
  font-weight: 700;
  margin-bottom: 4px;
}

.vaccine-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 6px 8px;
  margin-bottom: 5px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.vaccine-name {
  font-size: 12px;
  font-weight: 600;
  margin: 0;
}

.vaccine-date {
  font-size: 10px;
  color: #666;
  margin: 1px 0 0 0;
}

.vaccine-right {
  display: flex;
  align-items: center;
  gap: 4px;
}

.status {
  font-size: 10px;
  font-weight: 600;
  padding: 2px 4px;
  border-radius: 4px;
}

.completed {
  background: #d1f5d3;
  color: #2e7d32;
}

.due {
  background: #ffe9d6;
  color: #e65100;
}

.arrow-icon {
  color: #4a90e2;
  font-size: 14px;
}
`}
      </style>
    </div>
  );
};

export default ChildVaccinationTracker;
