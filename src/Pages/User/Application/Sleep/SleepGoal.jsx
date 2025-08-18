import React, { useState, useRef, useEffect } from "react";
import { FiArrowLeft, FiEdit2 } from "react-icons/fi";
import { FaEdit } from "react-icons/fa";
import "./style.css";

const SleepGoal = () => {
  // ---- STATE ----
  const [sleepTime, setSleepTime] = useState(22 * 60); // default 10:00 PM
  const [wakeTime, setWakeTime] = useState(9 * 60); // default 9:00 AM
  const [activeDays, setActiveDays] = useState([0, 1, 2, 3, 4]); // default weekdays
  const [dragging, setDragging] = useState(null);

  // Picker state
  const [showPicker, setShowPicker] = useState(false);
  const [pickerType, setPickerType] = useState(null);
  const [tempTime, setTempTime] = useState({ hour: 10, minute: 0, ampm: "PM" });

  // Refs for wheel containers
  const hourWheelRef = useRef(null);
  const minuteWheelRef = useRef(null);
  const ampmWheelRef = useRef(null);
  const scrollTimeoutRef = useRef(null);

  // Picker lists
  const hours = [...Array(12)].map((_, i) => i + 1);
  const minutes = [...Array(60)].map((_, i) => i.toString().padStart(2, "0"));
  const ampmList = ["AM", "PM"];

  const svgRef = useRef(null);
  const radius = 120;

  // ---- EFFECT: LOAD DATA ----
  useEffect(() => {
    const savedSleep = localStorage.getItem("sleepTime");
    const savedWake = localStorage.getItem("wakeTime");
    const savedDays = localStorage.getItem("activeDays");

    if (savedSleep) setSleepTime(parseInt(savedSleep));
    if (savedWake) setWakeTime(parseInt(savedWake));
    if (savedDays) setActiveDays(JSON.parse(savedDays));
  }, []);

  // ---- EFFECT: SAVE DATA ----
  useEffect(() => {
    localStorage.setItem("sleepTime", sleepTime);
    localStorage.setItem("wakeTime", wakeTime);
    localStorage.setItem("activeDays", JSON.stringify(activeDays));
  }, [sleepTime, wakeTime, activeDays]);

  const duration = (wakeTime - sleepTime + 1440) % 1440;

  /** Format time (hh:mm AM/PM) **/
  const formatTime = (minutes) => {
    const hour = Math.floor(minutes / 60);
    const min = minutes % 60;
    const period = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    const displayMin = min.toString().padStart(2, "0");
    return `${displayHour}:${displayMin} ${period}`;
  };

  /** Convert minutes to radians **/
  const minutesToRadians = (minutes) =>
    ((minutes % 1440) / 1440) * 2 * Math.PI - Math.PI / 2;

  // Angles
  const sleepAngle = minutesToRadians(sleepTime);
  const wakeAngle = minutesToRadians(wakeTime);

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
  const largeArcFlag = duration > 720 ? 1 : 0;
  const arcPath = `
    M ${sleepPos.x} ${sleepPos.y}
    A ${radius} ${radius} 0 ${largeArcFlag} 1 ${wakePos.x} ${wakePos.y}
  `;

  /** Convert mouse/touch position → minutes **/
  const getMinutesFromPosition = (clientX, clientY) => {
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

    return Math.round((angle / (Math.PI * 2)) * 1440) % 1440;
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
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    const minutes = getMinutesFromPosition(clientX, clientY);
    if (dragging === "sleep") setSleepTime(minutes);
    if (dragging === "wake") setWakeTime(minutes);
  };

  const handleEndDrag = () => setDragging(null);

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

  /** Scroll to selected item in wheel **/
  const scrollToSelected = () => {
    const itemHeight = 44;

    // Scroll hour wheel
    const hourIndex = hours.indexOf(tempTime.hour);
    if (hourWheelRef.current && hourIndex >= 0) {
      hourWheelRef.current.scrollTo({
        top: hourIndex * itemHeight,
        behavior: "auto",
      });
    }

    // Scroll minute wheel
    const minuteIndex = minutes.findIndex(
      (m) => parseInt(m) === tempTime.minute
    );
    if (minuteWheelRef.current && minuteIndex >= 0) {
      minuteWheelRef.current.scrollTo({
        top: minuteIndex * itemHeight,
        behavior: "auto",
      });
    }

    // Scroll AM/PM wheel
    const ampmIndex = ampmList.indexOf(tempTime.ampm);
    if (ampmWheelRef.current && ampmIndex >= 0) {
      ampmWheelRef.current.scrollTo({
        top: ampmIndex * itemHeight,
        behavior: "auto",
      });
    }
  };

  /** Open Picker **/
  const openPicker = (type) => {
    setPickerType(type);
    const currentMinutes = type === "sleep" ? sleepTime : wakeTime;
    let hour = Math.floor(currentMinutes / 60);
    const minute = currentMinutes % 60;
    const ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12;
    setTempTime({ hour, minute, ampm });
    setShowPicker(true);
  };

  // Auto-scroll wheels when picker opens
  useEffect(() => {
    if (showPicker) {
      // Use requestAnimationFrame for better timing
      requestAnimationFrame(() => {
        scrollToSelected();
      });
    }
  }, [showPicker, tempTime]);

  /** Confirm Picker **/
  const handleOk = () => {
    let hour24 =
      tempTime.ampm === "PM" ? (tempTime.hour % 12) + 12 : tempTime.hour % 12;
    const minutes = hour24 * 60 + tempTime.minute;
    if (pickerType === "sleep") setSleepTime(minutes);
    if (pickerType === "wake") setWakeTime(minutes);
    setShowPicker(false);
  };

  /** Scroll Picker logic **/
  const handleScroll = (e, type) => {
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = setTimeout(() => {
      const container = e.target;
      const itemHeight = 44;
      const scrollTop = container.scrollTop;
      const index = Math.round(scrollTop / itemHeight);

      let safeIndex = index;
      if (type === "hour") {
        safeIndex = Math.max(0, Math.min(hours.length - 1, index));
        setTempTime((prev) => ({ ...prev, hour: hours[safeIndex] }));
      }
      if (type === "minute") {
        safeIndex = Math.max(0, Math.min(minutes.length - 1, index));
        setTempTime((prev) => ({
          ...prev,
          minute: parseInt(minutes[safeIndex]),
        }));
      }
      if (type === "ampm") {
        safeIndex = Math.max(0, Math.min(ampmList.length - 1, index));
        setTempTime((prev) => ({ ...prev, ampm: ampmList[safeIndex] }));
      }
    }, 100);
  };

  const handleScrollEnd = (e) => {
    const container = e.target;
    const itemHeight = 44;
    const scrollTop = container.scrollTop;
    const index = Math.round(scrollTop / itemHeight);
    const finalScrollTop = index * itemHeight;

    // Use smooth scrolling only for the final position
    container.scrollTo({ top: finalScrollTop, behavior: "smooth" });
  };

  /** Toggle Day **/
  const toggleDay = (i) => {
    setActiveDays((prev) =>
      prev.includes(i) ? prev.filter((d) => d !== i) : [...prev, i]
    );
  };

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
                const angle = minutesToRadians(i * 60);
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
                const angle = minutesToRadians(i * 60);
                return (
                  <text
                    key={i}
                    x={150 + Math.cos(angle) * (radius - 30)}
                    y={150 + Math.sin(angle) * (radius - 30) + 6}
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
                  ⏰
                </text>
              </g>
            </svg>

            {/* Centered duration */}
            <div className="clock-center">
              <h2 className="sleep-duration">
                {Math.floor(duration / 60)}h {duration % 60}m
              </h2>
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

      {/* CONTENT BELOW */}
      <div className="content-below-hero">
        {/* Days Selector */}
        <div className="days-selector">
          {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((d, i) => (
            <div
              key={i}
              className={`day-pill ${activeDays.includes(i) ? "active" : ""}`}
              onClick={() => toggleDay(i)}
            >
              {d}
            </div>
          ))}
        </div>

        {/* Bedtime & Wake Time Cards */}
        <div className="time-summary">
          <div className="time-card" onClick={() => openPicker("sleep")}>
            <div className="time-card-top">
              <span className="time-icon bedtime">🌙</span>
              <FaEdit className="edit-icon" />
            </div>
            <div className="time-card-label">Bedtime</div>
            <div className="time-card-value">{formatTime(sleepTime)}</div>
          </div>

          <div className="time-card" onClick={() => openPicker("wake")}>
            <div className="time-card-top">
              <span className="time-icon wake">⏰</span>
              <FaEdit className="edit-icon" />
            </div>
            <div className="time-card-label">Wake Up</div>
            <div className="time-card-value">{formatTime(wakeTime)}</div>
          </div>
        </div>

        {/* Bottom Sheet Time Picker */}
        {showPicker && (
          <div className="time-picker-modal">
            <div
              className="time-picker-overlay"
              onClick={() => setShowPicker(false)}
            />
            <div className="time-picker-container">
              <div className="time-picker-header">
                <h3 className="time-picker-title">
                  {pickerType === "sleep" ? "Set Bedtime" : "Set Wake Time"}
                </h3>
              </div>

              <div className="time-picker-body">
                {/* Hours */}
                <div className="time-wheel-container">
                  <div
                    ref={hourWheelRef}
                    className="time-wheel"
                    onScroll={(e) => handleScroll(e, "hour")}
                    onTouchEnd={handleScrollEnd}
                    onMouseUp={handleScrollEnd}
                  >
                    {hours.map((h, i) => (
                      <div
                        key={`hour-${i}`}
                        className={`time-wheel-item ${
                          tempTime.hour === h ? "active" : ""
                        }`}
                      >
                        {h.toString().padStart(2, "0")}
                      </div>
                    ))}
                  </div>
                  <div className="time-wheel-highlight" />
                  <div className="time-wheel-label">Hours</div>
                </div>

                <div className="time-separator">:</div>

                {/* Minutes */}
                <div className="time-wheel-container">
                  <div
                    ref={minuteWheelRef}
                    className="time-wheel"
                    onScroll={(e) => handleScroll(e, "minute")}
                    onTouchEnd={handleScrollEnd}
                    onMouseUp={handleScrollEnd}
                  >
                    {minutes.map((m, i) => (
                      <div
                        key={`minute-${i}`}
                        className={`time-wheel-item ${
                          tempTime.minute === parseInt(m) ? "active" : ""
                        }`}
                      >
                        {m}
                      </div>
                    ))}
                  </div>
                  <div className="time-wheel-highlight" />
                  <div className="time-wheel-label">Minutes</div>
                </div>

                {/* AM/PM */}
                <div className="time-wheel-container">
                  <div
                    ref={ampmWheelRef}
                    className="time-wheel"
                    onScroll={(e) => handleScroll(e, "ampm")}
                    onTouchEnd={handleScrollEnd}
                    onMouseUp={handleScrollEnd}
                  >
                    {ampmList.map((a, i) => (
                      <div
                        key={`ampm-${i}`}
                        className={`time-wheel-item ${
                          tempTime.ampm === a ? "active" : ""
                        }`}
                      >
                        {a}
                      </div>
                    ))}
                  </div>
                  <div className="time-wheel-highlight" />
                  <div className="time-wheel-label">AM/PM</div>
                </div>
              </div>

              <div className="time-picker-footer">
                <button
                  onClick={() => setShowPicker(false)}
                  className="time-picker-button secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={handleOk}
                  className="time-picker-button primary"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SleepGoal;
