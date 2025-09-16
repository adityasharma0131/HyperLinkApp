import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { IoIosSearch } from "react-icons/io";
import { FaMicrophone, FaFilePdf, FaCheckCircle } from "react-icons/fa";

import hyperlinklogoicon from "../../../../assets/hyperlinklogoicon.svg";
import "./style.css";
import BottomOps from "./BottomOps";

const SingleDirectory = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const longPressTimer = useRef(null);
  const longPressed = useRef(false);

  const reports = [
    { id: 1, date: "18 June 2025", title: "CBC REPORT" },
    { id: 2, date: "18 June 2025", title: "CBC REPORT" },
    { id: 3, date: "18 June 2025", title: "CBC REPORT" },
    { id: 4, date: "18 June 2025", title: "CBC REPORT" },
  ];

  // --- Long press logic ---
  const toggleChildSelection = (index) => {
    setSelectedItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleLongPressStart = (index) => {
    longPressed.current = false;
    longPressTimer.current = setTimeout(() => {
      toggleChildSelection(index);
      longPressed.current = true;
    }, 600); // 600ms threshold
  };

  const handleLongPressEnd = () => {
    clearTimeout(longPressTimer.current);
  };

  // --- Click to navigate ---
  const handleCardClick = (index) => {
    // Clear any pending long press
    clearTimeout(longPressTimer.current);

    // If it wasn't a long press, navigate
    if (!longPressed.current) {
      navigate("/app/health-record/single-folder", {
        state: { report: reports[index] },
      });
    }

    // Reset the long press flag
    longPressed.current = false;
  };

  return (
    <div className="file-list-page">
      {/* ---------- HERO ---------- */}
      <div className="file-list-hero">
        <div className="hero-top-bar">
          <button
            className="icon-button"
            onClick={() => navigate(-1)}
            aria-label="Go back"
          >
            <FiArrowLeft className="hero-icon" />
          </button>
          <h1 className="hero-title">CBC REPORTS</h1>
        </div>

        <div className="search-bar-container">
          <div className="search-bar hero-search">
            <IoIosSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FaMicrophone className="mic-icon" />
          </div>
        </div>
      </div>

      {/* ---------- GRID ---------- */}
      <div className="report-grid">
        {reports.map((report, i) => (
          <div
            key={report.id}
            className={`report-card ${
              selectedItems.includes(i) ? "child-selected" : ""
            }`}
            onMouseDown={() => handleLongPressStart(i)}
            onMouseUp={handleLongPressEnd}
            onMouseLeave={handleLongPressEnd} // Added to handle mouse leaving during long press
            onTouchStart={() => handleLongPressStart(i)}
            onTouchEnd={handleLongPressEnd}
            onClick={() => handleCardClick(i)}
            style={{ cursor: "pointer" }}
          >
            {/* ✅ Green check icon when selected */}
            {selectedItems.includes(i) && (
              <FaCheckCircle className="check-icon" />
            )}

            <div className="report-date">{report.date}</div>

            <div className="report-body">
              <img src={hyperlinklogoicon} alt="PDF" className="report-bg" />

              <div className="report-footer">
                <FaFilePdf className="report-icon" />
                <span>{report.title}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <BottomOps />

      <style>
        {`
        .file-list-page {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  min-height: 100vh;
  background: #f7f8fc;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* -------- Hero Section -------- */
.file-list-hero {
  width: 100%;
  max-width: 600px;
  background: linear-gradient(to bottom, #6ea6e7 0%, #daeffe 50%, #e0d3ff 80%);
  padding: 20px;
  border-radius: 0 0 32px 32px;
  color: white;
  box-shadow: 0 10px 30px rgba(74, 144, 226, 0.2);
  position: relative;
}

.hero-top-bar {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
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
  font-size: 20px;
  font-weight: 700;
  color: #553fb5;
  margin: 0;
  line-height: 1.2;
}

/* -------- Search Bar -------- */
.search-bar-container {
  position: absolute;
  bottom: -25px;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  max-width: 500px;
}

.search-bar {
  display: flex;
  align-items: center;
  background: #ffffff;
  border-radius: 10px;
  padding: 10px 16px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15);
  border: 1px solid #c9c9c9;
}

.search-bar input {
  flex: 1;
  border: none;
  outline: none;
  padding: 8px 12px;
  font-size: 14px;
  background: transparent;
}

.search-icon,
.mic-icon {
  color: #6b7280;
  font-size: 18px;
}

.hero-search {
  width: 100%;
}

/* Grid layout */
.report-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-top: 60px;
  margin-bottom: 80px;
  max-width: 600px;
  padding: 0 1rem;
  justify-items: center;
}

/* Card container */
.report-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 150px;
  border-radius: 18px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.report-card:hover {
  transform: translateY(-6px) scale(1.02);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

/* Date bar at top */
.report-date {
  background: linear-gradient(135deg, #d0eaff, #b5d9ff);
  color: #1b6bdc;
  font-weight: 700;
  font-size: 0.75rem;
  padding: 6px;
  text-align: center;
  width: 100%;
  letter-spacing: 0.3px;
  border-bottom: 1px solid #d0eaff;
}

/* PDF background body */
.report-body {
  position: relative;
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow: hidden;
  border-top: 1px solid #ddd;
}

/* Soft white overlay */
.report-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.15) 0%,
    rgba(255, 255, 255, 0.5) 100%
  );
  pointer-events: none;
}

/* Footer bar */
.report-footer {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.3rem;
  background: #2d9cf0;
  color: #fff;
  padding: 5px 6px;
  font-size: 0.65rem;
  font-weight: 600;
  text-align: center;
  z-index: 2;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0 0 14px 14px;
}

.report-icon {
  font-size: 0.7rem;
  display: block;
}
.report-bg {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 40px; /* 👈 make it smaller */
  height: 40px; /* keep it square */
  object-fit: contain;
  opacity: 0.7;
  transform: translate(-50%, -50%); /* 👈 centers it perfectly */
  pointer-events: none; /* prevent click blocking */
  z-index: 0;
}

/* Selected visual */
.child-selected {
  outline: 2px solid #2ecc71;
  border-radius: 12px;
}

/* Check icon when selected */
.check-icon {
  position: absolute;
  top: 6px;
  right: 6px;
  color: #2ecc71;
  font-size: 18px;
  z-index: 3;
  background: white;
  border-radius: 50%;
  padding: 2px;
}
`}
      </style>
    </div>
  );
};

export default SingleDirectory;
