import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { IoIosSearch } from "react-icons/io";
import { FaMicrophone } from "react-icons/fa";
import { MdArrowOutward, MdCheckCircle } from "react-icons/md";

import "./style.css";
import BottomOps from "./BottomOps";

// ---------- FolderGroup (Reusable Component) ----------
const FolderGroup = ({ folders }) => {
  const [expanded, setExpanded] = useState(false);
  const [selected, setSelected] = useState(new Set());
  const [mainSelected, setMainSelected] = useState(false);
  const folderRef = useRef(null);
  const longPressTimer = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        expanded &&
        folderRef.current &&
        !folderRef.current.contains(e.target)
      ) {
        // Only collapse, do not clear selection
        setExpanded(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [expanded]);

  // Handle long press logic for child items
  const handleLongPressStart = (index) => {
    longPressTimer.current = setTimeout(() => {
      toggleChildSelection(index);
    }, 600); // 600ms
  };

  const handleLongPressEnd = () => {
    clearTimeout(longPressTimer.current);
  };

  const toggleChildSelection = (index) => {
    setSelected((prev) => {
      const updated = new Set(prev);
      if (updated.has(index)) {
        updated.delete(index);
      } else {
        updated.add(index);
      }
      // if not all are selected anymore, unset mainSelected
      if (updated.size !== folders.length) setMainSelected(false);
      return updated;
    });
  };

  // ✅ NEW: Handle main folder selection
  const handleMainSelect = () => {
    if (mainSelected) {
      // deselect all
      setMainSelected(false);
      setSelected(new Set());
    } else {
      // select all
      const all = new Set(folders.map((_, i) => i));
      setMainSelected(true);
      setSelected(all);
    }
  };

  return (
    <div className="folder-wrapper" ref={folderRef}>
      {!expanded ? (
        <div
          className={`folder-collapsed ${mainSelected ? "main-selected" : ""}`}
          onClick={() => setExpanded(true)}
          onMouseDown={() => {
            longPressTimer.current = setTimeout(handleMainSelect, 600);
          }}
          onMouseUp={handleLongPressEnd}
          onMouseLeave={handleLongPressEnd}
          onTouchStart={() => {
            longPressTimer.current = setTimeout(handleMainSelect, 600);
          }}
          onTouchEnd={handleLongPressEnd}
        >
          {folders.map((f, i) => (
            <div
              key={i}
              className={`folder-card ${f.color} ${
                i === folders.length - 1 ? "top-card" : "collapsed-behind"
              } ${mainSelected ? "selected-outline" : ""}`} // ✅
            >
              {mainSelected && i === folders.length - 1 && (
                <MdCheckCircle className="check-icon" />
              )}
              <span className="folder-title">{f.name}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="folder-stack">
          {folders.map((f, i) => (
            <div
              key={i}
              className={`folder-card ${f.color} expanded-card ${
                selected.has(i) ? "child-selected selected-outline" : ""
              }`}
              onMouseDown={() => handleLongPressStart(i)}
              onMouseUp={handleLongPressEnd}
              onMouseLeave={handleLongPressEnd}
              onTouchStart={() => handleLongPressStart(i)}
              onTouchEnd={handleLongPressEnd}
              onClick={() => {
                if (selected.size > 0) toggleChildSelection(i);
              }}
            >
              {selected.has(i) && <MdCheckCircle className="check-icon" />}
              <div className="folder-title-container">
                <span className="folder-title">{f.name}</span>
                {i !== folders.length - 1 && (
                  <MdArrowOutward className="arrow" />
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ---------- Main DirectoryList Page ----------
const DirectoryList = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const folderGroups = [
    [
      { name: "CBC REPORTS", color: "folder-orange" },
      { name: "ECG REPORTS", color: "folder-yellow" },
      { name: "THYROID REPORTS", color: "folder-pink" },
      { name: "UPLOADED REPORTS", color: "folder-blue" },
    ],
    [
      { name: "XRAY SCANS", color: "folder-orange" },
      { name: "MRI SCANS", color: "folder-yellow" },
      { name: "CT SCANS", color: "folder-pink" },
      { name: "ULTRASOUND", color: "folder-blue" },
    ],
  ];

  return (
    <div className="directory-list-page">
      <div className="directory-list-hero">
        <div className="hero-top-bar">
          <button
            className="icon-button"
            onClick={() => navigate(-1)}
            aria-label="Go back"
          >
            <FiArrowLeft className="hero-icon" />
          </button>
          <h1 className="hero-title">TEST REPORTS</h1>
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

      <div className="folder-grid-container">
        {folderGroups.map((group, i) => (
          <FolderGroup key={i} folders={group} />
        ))}
      </div>

      <BottomOps />

      <style>
        {`
        /* Reset page structure */
.directory-list-page {
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
.directory-list-hero {
  width: 100%;
  max-width: 600px;
  background: linear-gradient(to bottom, #6ea6e7 0%, #daeffe 50%, #e0d3ff 80%);
  padding: 20px;
  border-radius: 0 0 32px 32px;
  color: white;
  box-shadow: 0 10px 30px rgba(74, 144, 226, 0.2);
  position: relative; /* anchor for search bar */
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
  bottom: -25px; /* Float the search bar outside the hero section */
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
.folder-grid-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-items: center;
  margin-top: 70px;
  margin-bottom: 80px;
  width: 100%;
  max-width: 400px;
}

.folder-wrapper {
  display: flex;
  justify-content: center;
  perspective: 1000px;
  width: 150px;
  margin-top: 2rem;
  transition: height 0.3s ease;
}

/* Base Card */
.folder-card {
  width: 130px;
  height: 80px;
  border-radius: 14px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 8px 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  font-weight: 600;
  color: #000;
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  position: relative;
}

/* Colors */
.folder-blue {
  background: #9ee6ff;
}
.folder-orange {
  background: #ffb47b;
}
.folder-yellow {
  background: #ffe877;
}
.folder-pink {
  background: #ffc5eb;
}

/* --- Collapsed stacked look --- */
.folder-collapsed {
  position: relative;
  width: 130px;
  height: 110px;
}

.folder-collapsed .collapsed-behind {
  position: absolute;
  left: 0;
  width: 130px;
  height: 80px;
  pointer-events: none;
}

.folder-collapsed .folder-pink {
  top: -24px;
  z-index: 1;
}
.folder-collapsed .folder-yellow {
  top: -16px;
  z-index: 2;
}
.folder-collapsed .folder-orange {
  top: -8px;
  z-index: 3;
}
.folder-collapsed .top-card {
  z-index: 4;
}

/* --- Expanded stacked look (top → bottom) --- */
.folder-stack {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  animation: expand 0.3s ease forwards;

  /* ✨ no gap here so they overlap slightly */
}

.expanded-card {
  margin-top: -40px; /* tighter stack overlap */
  position: relative;
  cursor: pointer;

  /* combine all transitions together */
  transition: margin-top 0.3s ease, transform 0.2s ease, box-shadow 0.2s ease;
}

.expanded-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
  z-index: 2;
}

/* reverse z order: first shown on top */
.expanded-card:nth-child(4) {
  z-index: 4;
}
.expanded-card:nth-child(3) {
  z-index: 3;
}
.expanded-card:nth-child(2) {
  z-index: 2;
}
.expanded-card:nth-child(1) {
  z-index: 1;
}

@keyframes expand {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.folder-title-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2rem;
  justify-content: space-between;
}
.folder-title {
  font-size: 10px;
}

.arrow {
  font-size: 15px;
  color: #444;
}

.selected-outline {
  outline: 2px solid #2ecc71;
  border-radius: 12px;
}

.child-selected {
  outline: 2px solid #2ecc71;
  border-radius: 12px;
}

.main-selected .folder-card.top-card .check-icon {
  color: #2ecc71;
}

.check-icon {
  position: absolute;
  top: 6px;
  right: 6px;
  color: #2ecc71;
  font-size: 20px;
  z-index: 3;
  background: white; /* optional: clean background circle */
  border-radius: 50%;
}
`}
      </style>
    </div>
  );
};

export default DirectoryList;
