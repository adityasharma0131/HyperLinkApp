import React, { useState, useRef, useEffect } from "react";
import { FiArrowLeft, FiEdit2 } from "react-icons/fi";
import { GiKnifeFork } from "react-icons/gi";
import { useNavigate } from "react-router-dom"; // ✅ Import navigation

const CalorieGoal = () => {
  const startCalorie = 0; // fixed starting point
  const [endCalorie, setEndCalorie] = useState(2000); // default calorie goal
  const [dragging, setDragging] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState("");

  const svgRef = useRef(null);
  const radius = 120;

  const MAX_CALORIE = 5500; // updated max limit
  const navigate = useNavigate(); // ✅ hook for navigation

  // Calories consumed = end - start
  const consumed = (endCalorie - startCalorie + MAX_CALORIE) % MAX_CALORIE;

  /** Format calories **/
  const formatCalorie = (cal) => `${cal} kcal`;

  /** Convert calorie → radians **/
  const calorieToRadians = (calorie) =>
    ((calorie % MAX_CALORIE) / MAX_CALORIE) * 2 * Math.PI - Math.PI / 2;

  // Positions
  const startAngle = calorieToRadians(startCalorie);
  const endAngle = calorieToRadians(endCalorie);
  const startPos = {
    x: 150 + Math.cos(startAngle) * radius,
    y: 150 + Math.sin(startAngle) * radius,
  };
  const endPos = {
    x: 150 + Math.cos(endAngle) * radius,
    y: 150 + Math.sin(endAngle) * radius,
  };
  const largeArcFlag = consumed > MAX_CALORIE / 2 ? 1 : 0;
  const arcPath = `
    M ${startPos.x} ${startPos.y}
    A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endPos.x} ${endPos.y}
  `;

  /** Mouse → calorie **/
  const getCaloriesFromPosition = (clientX, clientY) => {
    if (!svgRef.current) return 0;
    const svg = svgRef.current;
    const pt = svg.createSVGPoint();
    pt.x = clientX;
    pt.y = clientY;
    const svgP = pt.matrixTransform(svg.getScreenCTM().inverse());

    const dx = svgP.x - 150;
    const dy = svgP.y - 150;
    let angle = Math.atan2(dy, dx);

    angle = (angle + Math.PI * 2.5) % (Math.PI * 2);

    return Math.round((angle / (Math.PI * 2)) * MAX_CALORIE) % MAX_CALORIE;
  };

  // Drag logic
  const handleStartDrag = (type, e) => {
    e.stopPropagation();
    setDragging(type);
  };

  const handleMove = (e) => {
    if (!dragging) return;
    let clientX, clientY;
    if (e.touches) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    const calories = getCaloriesFromPosition(clientX, clientY);
    if (dragging === "end") setEndCalorie(calories);
  };

  const handleEndDrag = () => setDragging(null);

  // Edit modal functions
  const openEditModal = () => {
    setEditValue(endCalorie.toString());
    setIsEditing(true);
  };

  const closeEditModal = () => {
    setIsEditing(false);
  };

  const saveEditValue = () => {
    const value = parseInt(editValue);
    if (!isNaN(value) && value >= 0 && value <= MAX_CALORIE) {
      setEndCalorie(value);
    }
    setIsEditing(false);
  };

  useEffect(() => {
    if (dragging) {
      window.addEventListener("mousemove", handleMove);
      window.addEventListener("mouseup", handleEndDrag);
      window.addEventListener("touchmove", handleMove);
      window.addEventListener("touchend", handleEndDrag);
    }
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleEndDrag);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("touchend", handleEndDrag);
    };
  }, [dragging]);

  const [active, setActive] = useState("7 days");

  const options = ["7 days", "14 days", "1 month"];

  /** ✅ Handle Submit **/
  const handleSubmit = () => {
    const goalData = {
      calorieGoal: endCalorie,
      duration: active,
    };

    localStorage.setItem("calorieGoalData", JSON.stringify(goalData)); // ✅ save to localStorage
    navigate("/app/nutrition"); // ✅ redirect
  };

  return (
    <div className="calorie-goal-page">
      {/* HERO SECTION */}
      <div className="calorie-goal-hero">
        <div className="hero-top-bar">
          <button className="icon-button" onClick={() => window.history.back()}>
            <FiArrowLeft className="hero-icon" />
          </button>
          <div className="hero-texts">
            <h1 className="hero-title">SET CALORIE GOAL</h1>
            <p className="hero-subtitle">
              Adjust your daily calorie goal by dragging the handle.
            </p>
          </div>
          <button className="icon-button" onClick={openEditModal}>
            <FiEdit2 className="hero-icon" />
          </button>
        </div>

        {/* CLOCK → CALORIE ARC */}
        <div className="clock-card">
          <div className="clock-container">
            <svg className="clock-svg" viewBox="0 0 300 300" ref={svgRef}>
              {/* Background circle */}
              <circle
                cx="150"
                cy="150"
                r={radius}
                fill="none"
                stroke="#e2e8f0"
                strokeWidth="22"
              />

              {/* Tick Marks */}
              {Array.from({ length: 55 }).map((_, i) => {
                const angle = (i / 55) * 2 * Math.PI;
                const x1 = 150 + Math.cos(angle - Math.PI / 2) * (radius - 10);
                const y1 = 150 + Math.sin(angle - Math.PI / 2) * (radius - 10);
                const x2 =
                  150 +
                  Math.cos(angle - Math.PI / 2) *
                    (radius - (i % 5 === 0 ? 20 : 15));
                const y2 =
                  150 +
                  Math.sin(angle - Math.PI / 2) *
                    (radius - (i % 5 === 0 ? 20 : 15));
                return (
                  <line
                    key={i}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="#94a3b8"
                    strokeWidth={i % 5 === 0 ? 3 : 1.5}
                  />
                );
              })}

              {/* ARC */}
              <path
                d={arcPath}
                fill="none"
                stroke="#16AA16"
                strokeWidth="18"
                strokeLinecap="round"
              />

              {/* Fixed Start Handle */}
              <g>
                <circle
                  cx={startPos.x}
                  cy={startPos.y}
                  r={15}
                  fill="#004918"
                  stroke="white"
                  strokeWidth="5"
                />
                <text
                  x={startPos.x}
                  y={startPos.y + 5}
                  textAnchor="middle"
                  fontSize="15"
                  fill="white"
                >
                  🔥
                </text>
              </g>

              {/* Movable Goal Handle */}
              <g
                onMouseDown={(e) => handleStartDrag("end", e)}
                onTouchStart={(e) => handleStartDrag("end", e)}
                style={{ cursor: "grab" }}
              >
                <circle
                  cx={endPos.x}
                  cy={endPos.y}
                  r={15}
                  fill="#16AA16"
                  stroke="white"
                  strokeWidth="5"
                />
                <text
                  x={endPos.x}
                  y={endPos.y + 5}
                  textAnchor="middle"
                  fontSize="18"
                  fill="white"
                >
                  🍽
                </text>
              </g>
            </svg>

            {/* Centered Calories */}
            <div className="clock-center">
              <GiKnifeFork className="center-icon" />

              <h2 className="calorie-duration">{consumed} kcal</h2>
              <div className="calorie-details">
                <p>
                  <span className="calorie-label">Goal:</span>{" "}
                  {formatCalorie(endCalorie)}
                </p>
                <p>
                  <span className="calorie-details">Daily</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditing && (
        <div className="modal-overlay" onClick={closeEditModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Edit Calorie Goal</h3>
            <input
              type="number"
              min="0"
              max={MAX_CALORIE}
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              placeholder="Enter calorie goal"
            />
            <div className="modal-buttons">
              <button onClick={closeEditModal}>Cancel</button>
              <button onClick={saveEditValue}>Save</button>
            </div>
          </div>
        </div>
      )}

      {/* Duration Options */}
      <div className="diet-plan-container">
        <h1 className="diet-plan-title">Select your diet plan duration</h1>

        <div className="diet-plan-options">
          {options.map((option) => (
            <button
              key={option}
              className={`diet-option ${active === option ? "active" : ""}`}
              onClick={() => setActive(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <div className="submit-section">
        <button className="submit-btn" onClick={handleSubmit}>
          Set my Goal
        </button>
      </div>

      <style>{`
      .calorie-goal-page {
  background: #f1f5f9;
  min-height: 100vh;
  color: #1e293b;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* ============================= */
/* Hero Section                  */
/* ============================= */
.calorie-goal-hero {
  background: linear-gradient(to bottom, #004918 0%, #02b614 100%);
  padding: 20px;
  padding-bottom: 165px;
  border-radius: 0 0 32px 32px;
  color: white;
  position: relative;
  width: 100%;
  max-width: 480px;
  box-shadow: 0 10px 30px rgba(74, 144, 226, 0.3);
  margin-bottom: 100px;
}

.hero-top-bar {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 20px;
}

.hero-texts {
  flex: 1;
  text-align: left;
}

.hero-title {
  font-size: 20px;
  font-weight: 700;
  margin: 0;
  line-height: 1.2;
}

.hero-subtitle {
  font-size: 12px;
  font-weight: 400;
  opacity: 0.9;
  margin-top: 4px;
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
  color: white;
}

/* ============================= */
/* Clock Card                    */
/* ============================= */
.clock-card {
  position: absolute;
  bottom: -100px;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  border-radius: 50%;
  width: 280px;
  height: 280px;
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.12);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
}

.clock-container {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.clock-svg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.clock-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.center-icon {
  font-size: 4rem; /* make it big */
  color: #16aa16; /* same green theme */
}

.calorie-duration {
  font-size: 1.5rem;
  font-weight: 800;
  color: #16aa16;
  margin: 0;
}

.calorie-details {
  font-size: 1rem;
  color: #475569;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 12px;
  width: 80%;
  max-width: 300px;
}

.modal-content h3 {
  margin-top: 0;
  color: #16aa16;
}

.modal-content input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  margin: 10px 0;
  font-size: 16px;
}

.modal-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.modal-buttons button {
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
}

.modal-buttons button:first-child {
  background: #e2e8f0;
  color: #475569;
}

.modal-buttons button:last-child {
  background: #16aa16;
  color: white;
}

/* Container */
.diet-plan-container {
  border-radius: 16px;
  margin: 20px;
  text-align: center;
}

/* Title */
.diet-plan-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #222;
}

/* Options */
.diet-plan-options {
  display: flex;
  justify-content: center;
  gap: 15px;
}

.diet-option {
  padding: 12px 22px;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  background-color: #fff;
  cursor: pointer;
  font-size: 15px;
  font-weight: 500;
  color: #374151;
  transition: all 0.3s ease;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
}

.diet-option:hover {
  border-color: #16aa16;
  background: #f9fff9;
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(22, 170, 22, 0.15);
}

.diet-option.active {
  background: linear-gradient(135deg, #16aa16, #0d7d0d);
  color: #fff;
  border-color: #16aa16;
  box-shadow: 0 6px 16px rgba(22, 170, 22, 0.3);
  transform: translateY(-2px);
}

/* Submit Section */
.submit-section {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px;
  background: white;
  box-shadow: 0 -2px 12px rgba(0, 0, 0, 0.08);
  z-index: 100;
  display: flex;
  justify-content: center;
}

.submit-btn {
  width: 100%;
  max-width: 400px;
  padding: 14px 0;
  font-size: 16px;
  font-weight: 600;
  color: white;
  background: linear-gradient(135deg, #16aa16, #0d7d0d);
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 6px 16px rgba(22, 170, 22, 0.25);
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(22, 170, 22, 0.35);
}

        `}</style>
    </div>
  );
};

export default CalorieGoal;
