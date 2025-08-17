import React, { useState, useRef, useEffect } from "react";
import { FiArrowLeft, FiEdit2 } from "react-icons/fi";
import "./style.css";

const SleepGoal = () => {
  const [sleepTime, setSleepTime] = useState(22); // 10 PM
  const [wakeTime, setWakeTime] = useState(9); // 6 AM
  const [dragging, setDragging] = useState(null); // "sleep" | "wake" | null
  const svgRef = useRef(null);

  const radius = 120;
  const duration = (wakeTime - sleepTime + 24) % 24;

  const formatTime = (hour) => {
    const period = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    return `${displayHour}:00 ${period}`;
  };

  const hourToRadians = (hour) =>
    ((hour % 24) / 24) * 2 * Math.PI - Math.PI / 2;

  // Angles
  const sleepAngle = hourToRadians(sleepTime);
  const wakeAngle = hourToRadians(wakeTime);

  // Positions
  const sleepPos = {
    x: 150 + Math.cos(sleepAngle) * radius,
    y: 150 + Math.sin(sleepAngle) * radius,
  };
  const wakePos = {
    x: 150 + Math.cos(wakeAngle) * radius,
    y: 150 + Math.sin(wakeAngle) * radius,
  };

  // Arc Path
  const largeArcFlag = duration > 12 ? 1 : 0;
  const arcPath = `
    M ${sleepPos.x} ${sleepPos.y}
    A ${radius} ${radius} 0 ${largeArcFlag} 1 ${wakePos.x} ${wakePos.y}
  `;

  /** Time adjust handlers **/
  const incrementTime = (type) =>
    type === "sleep"
      ? setSleepTime((prev) => (prev + 1) % 24)
      : setWakeTime((prev) => (prev + 1) % 24);

  const decrementTime = (type) =>
    type === "sleep"
      ? setSleepTime((prev) => (prev - 1 + 24) % 24)
      : setWakeTime((prev) => (prev - 1 + 24) % 24);

  // Convert mouse/touch position → hour
  const getHourFromPosition = (clientX, clientY) => {
    if (!svgRef.current) return 0;
    const svg = svgRef.current;
    const pt = svg.createSVGPoint();
    pt.x = clientX;
    pt.y = clientY;
    const svgP = pt.matrixTransform(svg.getScreenCTM().inverse());

    const dx = svgP.x - 150;
    const dy = svgP.y - 150;
    let angle = Math.atan2(dy, dx);

    // Shift so 0h starts at top
    angle = (angle + Math.PI * 2.5) % (Math.PI * 2);

    return Math.round((angle / (Math.PI * 2)) * 24) % 24;
  };

  const handleStartDrag = (type, e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(type);
  };

  const handleMove = (e) => {
    if (!dragging) return;

    let clientX, clientY;

    if (e.touches) {
      // Touch event
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      // Mouse event
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const hour = getHourFromPosition(clientX, clientY);
    if (dragging === "sleep") setSleepTime(hour);
    if (dragging === "wake") setWakeTime(hour);
  };

  const handleEndDrag = () => {
    setDragging(null);
  };

  // Event listeners for smooth dragging
  useEffect(() => {
    if (dragging) {
      window.addEventListener("mousemove", handleMove);
      window.addEventListener("mouseup", handleEndDrag);
      window.addEventListener("touchmove", handleMove, { passive: false });
      window.addEventListener("touchend", handleEndDrag);

      return () => {
        window.removeEventListener("mousemove", handleMove);
        window.removeEventListener("mouseup", handleEndDrag);
        window.removeEventListener("touchmove", handleMove);
        window.removeEventListener("touchend", handleEndDrag);
      };
    }
  }, [dragging]);

  return (
    <div className="sleep-goal-page">
      {/* HERO SECTION */}
      <div className="sleep-goal-hero">
        <div className="hero-top-bar">
          <button className="icon-button" onClick={() => window.history.back()}>
            <FiArrowLeft className="hero-icon" />
          </button>
          <div className="hero-texts">
            <h1 className="hero-title">Sleep Goals</h1>
            <p className="hero-subtitle">
              Customize your bedtime and wake time
            </p>
          </div>
          <button className="icon-button">
            <FiEdit2 className="hero-icon" />
          </button>
        </div>

        {/* CLOCK */}
        <div className="clock-card">
          <div className="clock-container">
            <svg className="clock-svg" viewBox="0 0 300 300" ref={svgRef}>
              <defs>
                <linearGradient
                  id="arcGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#4A90E2" />
                  <stop offset="100%" stopColor="#8C60E2" />
                </linearGradient>
              </defs>

              {/* Tick marks */}
              {Array.from({ length: 24 }).map((_, i) => {
                const angle = hourToRadians(i);
                const innerR = i % 6 === 0 ? radius - 20 : radius - 15;
                const outerR = radius;
                const x1 = 150 + Math.cos(angle) * innerR;
                const y1 = 150 + Math.sin(angle) * innerR;
                const x2 = 150 + Math.cos(angle) * outerR;
                const y2 = 150 + Math.sin(angle) * outerR;
                return (
                  <line
                    key={i}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="#64748b"
                    strokeWidth={i % 6 === 0 ? 2.5 : 1.5}
                  />
                );
              })}

              {/* Hour markers */}
              {[0, 6, 12, 18].map((i) => {
                const angle = hourToRadians(i);
                return (
                  <text
                    key={i}
                    x={150 + Math.cos(angle) * (radius - 25)}
                    y={150 + Math.sin(angle) * (radius - 25) + 6}
                    textAnchor="middle"
                    fontSize="18"
                    fontWeight="700"
                    fill="#334155"
                  >
                    {i}
                  </text>
                );
              })}

              {/* Background circle */}
              <circle
                cx="150"
                cy="150"
                r={radius}
                fill="none"
                stroke="#e2e8f0"
                strokeWidth="22"
              />

              {/* ARC */}
              <path
                d={arcPath}
                fill="none"
                stroke="url(#arcGradient)"
                strokeWidth="18"
                strokeLinecap="round"
              />

              {/* Sleep Handle */}
              <g
                onMouseDown={(e) => handleStartDrag("sleep", e)}
                onTouchStart={(e) => handleStartDrag("sleep", e)}
                style={{ cursor: "grab", touchAction: "none" }}
              >
                <circle
                  cx={sleepPos.x}
                  cy={sleepPos.y}
                  r={15}
                  fill="rgb(74, 144, 226)"
                  stroke="white"
                  strokeWidth="5"
                />
                <text
                  x={sleepPos.x}
                  y={sleepPos.y + 5}
                  textAnchor="middle"
                  fontSize="14"
                  fill="white"
                >
                  🌙
                </text>
              </g>

              {/* Wake Handle */}
              <g
                onMouseDown={(e) => handleStartDrag("wake", e)}
                onTouchStart={(e) => handleStartDrag("wake", e)}
                style={{ cursor: "grab", touchAction: "none" }}
              >
                <circle
                  cx={wakePos.x}
                  cy={wakePos.y}
                  r={15}
                  fill="rgb(140, 96, 226)"
                  stroke="white"
                  strokeWidth="5"
                />
                <text
                  x={wakePos.x}
                  y={wakePos.y + 5}
                  textAnchor="middle"
                  fontSize="14"
                  fill="white"
                >
                  🔔
                </text>
              </g>
            </svg>

            {/* Centered duration */}
            <div className="clock-center">
              <h2 className="sleep-duration">{duration}h</h2>
              <div className="sleep-details">
                <p>
                  <span className="sleep-label">Sleep:</span>{" "}
                  {formatTime(sleepTime)}
                </p>
                <p>
                  <span className="wake-label">Wake:</span>{" "}
                  {formatTime(wakeTime)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CONTENT BELOW HERO */}
      <div className="content-below-hero">
        {/* Days Selector */}
        <div className="days-selector">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
            <div key={d} className="day-pill">
              {d}
            </div>
          ))}
        </div>

        {/* Summary Card */}
        <div className="summary-card">
          <div className="summary-item">
            <h3>Bed Time</h3>
            <p>{formatTime(sleepTime)}</p>
          </div>
          <div className="summary-item">
            <h3>Wake Time</h3>
            <p>{formatTime(wakeTime)}</p>
          </div>
        </div>

        {/* Time Controls */}
        <div className="time-edit-container">
          <div className="time-edit-group">
            <label>Sleep Time</label>
            <div className="time-adjust">
              <button onClick={() => decrementTime("sleep")}>-</button>
              <span>{formatTime(sleepTime)}</span>
              <button onClick={() => incrementTime("sleep")}>+</button>
            </div>
          </div>

          <div className="time-edit-group">
            <label>Wake Time</label>
            <div className="time-adjust">
              <button onClick={() => decrementTime("wake")}>-</button>
              <span>{formatTime(wakeTime)}</span>
              <button onClick={() => incrementTime("wake")}>+</button>
            </div>
          </div>

          <div className="duration-preview">
            <span>💤 Sleep Duration:</span> <strong>{duration}h</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SleepGoal;
