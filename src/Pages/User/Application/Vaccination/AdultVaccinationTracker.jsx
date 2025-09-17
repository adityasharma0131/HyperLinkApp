import React, { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import DoseTray from "./DoseTray"; // ✅ Import the tray
import "./style.css";

const AdultVaccinationTracker = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("ADULT VACCINES");
  const [activeTab, setActiveTab] = useState("upcoming");
  const [isTrayOpen, setIsTrayOpen] = useState(false); // ✅ NEW
  const [selectedVaccine, setSelectedVaccine] = useState(null); // ✅ NEW

  const navigate = useNavigate();

  const handleSelect = (option, path) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
    navigate(path);
  };

  const upcomingVaccines = [
    {
      dose: "1st Dose",
      name: "Human papillomavirus (HPV)",
      description: "Prevents infections caused by human papillomavirus",
      date: "02 Aug 2025",
      brand: "Gardasil 9",
      type: "ESSENTIAL",
      doses: [
        { number: 1, status: "", date: "02 Aug 2025" },
        { number: 2, status: "", date: "" },
        { number: 3, status: "", date: "" },
      ],
    },
  ];

  const completedVaccines = [
    {
      dose: "1st Dose",
      name: "Hepatitis B",
      description: "Prevents infections caused by the hepatitis B virus",
      date: "12 Jan 2025",
      brand: "Engerix-B",
      progress: "1 (out of 3)",
      type: "ESSENTIAL",
      doses: [
        {
          number: 1,
          status: "completed",
          completionDate: "12 Jan 2025",
          certificateUrl: "#",
        },
        { number: 2, status: "", date: "12 Mar 2025" },
        { number: 3, status: "", date: "" },
      ],
    },
  ];

  /** ⬇️ Helper: handle "View Progress" click */
  const handleViewProgress = (vaccine) => {
    setSelectedVaccine(vaccine);
    setIsTrayOpen(true);
  };

  /** ⬇️ Card render logic */
  const renderCard = (item, isCompleted = false) => (
    <div className="vaccine-card">
      <div className="dose-badge">{item.dose}</div>

      <div className="vaccine-info">
        <h2 className="vaccine-name">{item.name}</h2>
        <p className="vaccine-desc">{item.description}</p>
        <div className="vaccine-meta">
          <p>
            <strong>Date:</strong> {item.date}
          </p>
          {isCompleted && (
            <p>
              <strong>Dose:</strong> {item.progress}
            </p>
          )}
          <p>
            <strong>Brand Name:</strong> {item.brand}
          </p>
        </div>
      </div>

      <div className="vaccine-actions">
        {isCompleted ? (
          <>
            <button className="btn-primary">View Certificate</button>
            <button
              className="btn-outline"
              onClick={() => handleViewProgress(item)}
            >
              View Progress
            </button>
          </>
        ) : (
          <>
            <button className="btn-primary">Set Reminder</button>
            <button
              className="btn-outline"
              onClick={() => handleViewProgress(item)}
            >
              View Progress
            </button>
          </>
        )}
      </div>
    </div>
  );

  return (
    <div className="adult-vacc-page">
      {/* Hero Top Bar */}
      <div className="adult-vacc-hero">
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

        {/* Dropdown */}
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

      {/* Tabs */}
      <div className="vaccine-page">
        <div className="tab-buttons">
          <button
            className={activeTab === "upcoming" ? "active" : ""}
            onClick={() => setActiveTab("upcoming")}
          >
            Upcoming
          </button>
          <button
            className={activeTab === "completed" ? "active" : ""}
            onClick={() => setActiveTab("completed")}
          >
            Completed
          </button>
          <div
            className="tab-indicator"
            style={{ left: activeTab === "upcoming" ? "0%" : "50%" }}
          />
        </div>

        {/* Cards */}
        <div className="vaccine-list">
          {activeTab === "upcoming"
            ? upcomingVaccines.map((item, i) => (
                <div key={i}>{renderCard(item)}</div>
              ))
            : completedVaccines.map((item, i) => (
                <div key={i}>{renderCard(item, true)}</div>
              ))}
        </div>
      </div>

      {/* ✅ DoseTray */}
      {isTrayOpen && selectedVaccine && (
        <DoseTray
          isOpen={isTrayOpen}
          handleClose={() => setIsTrayOpen(false)}
          vaccine={selectedVaccine}
          userDoses={selectedVaccine.doses}
          onScheduleDose={(doseNum) =>
            alert("Schedule dose " + doseNum + " clicked")
          }
          onUploadCertificate={(doseNum) =>
            alert("Upload for dose " + doseNum + " clicked")
          }
          onViewCertificate={(url) => alert("View cert at " + url)}
        />
      )}

      <style>
        {`
        .adult-vacc-page {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

.adult-vacc-hero {
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
/* Overall Layout */
.vaccine-page {
  max-width: 440px;
  margin: 0 auto;
  padding: 20px;
  font-family: "Outfit", sans-serif;
}

/* Tabs */
.tab-buttons {
  position: relative;
  display: flex;
  background: #f4f4f6;
  border-radius: 14px;
  overflow: hidden;
  margin-bottom: 25px;
}

.tab-buttons button {
  flex: 1;
  padding: 12px 0;
  border: none;
  background: transparent;
  font-size: 15px;
  font-weight: 600;
  color: #666;
  cursor: pointer;
  position: relative;
  z-index: 2;
  transition: color 0.3s;
}

.tab-buttons button.active {
  color: #fff;
}

.tab-indicator {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 50%;
  background: #553fb5;
  border-radius: 14px;
  transition: left 0.3s ease;
  z-index: 1;
}

/* Cards */
.vaccine-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.vaccine-card {
  background: linear-gradient(180deg, #ffffff, #fafaff);
  border: 1px solid #e7e7f2;
  border-radius: 18px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 14px;
  transition: transform 0.2s, box-shadow 0.2s;
}

.vaccine-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
}

/* Badge */
.dose-badge {
  display: inline-block;
  background: #e7f9f0;
  color: #059669;
  font-size: 13px;
  font-weight: 600;
  padding: 5px 12px;
  border-radius: 999px;
  width: fit-content;
  letter-spacing: 0.2px;
}

/* Info */
.vaccine-info .vaccine-name {
  font-size: 18px;
  font-weight: 600;
  color: #2b2b2b;
  margin: 4px 0;
}

.vaccine-desc {
  color: #666;
  font-size: 14px;
  margin-bottom: 8px;
  line-height: 1.4;
}

.vaccine-meta p {
  margin: 2px 0;
  font-size: 14px;
  color: #444;
}

/* Actions */
.vaccine-actions {
  display: flex;
  gap: 12px;
  margin-top: 10px;
}

.btn-primary,
.btn-outline {
  flex: 1;
  padding: 11px 0;
  font-size: 14px;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;
  font-family: "Outfit", sans-serif;
}

.btn-primary {
  background: #553fb5;
  color: #fff;
  border: none;
  box-shadow: 0 2px 6px rgba(85, 63, 181, 0.25);
}

.btn-primary:hover {
  opacity: 0.9;
}

.btn-outline {
  border: 1.5px solid #d5d5e0;
  background: #fff;
  color: #4b4b4b;
}

.btn-outline:hover {
  background: #f9f9fb;
}
`}
      </style>
    </div>
  );
};

export default AdultVaccinationTracker;
