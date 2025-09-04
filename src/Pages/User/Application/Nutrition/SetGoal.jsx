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
    </div>
  );
};

export default CalorieGoal;
