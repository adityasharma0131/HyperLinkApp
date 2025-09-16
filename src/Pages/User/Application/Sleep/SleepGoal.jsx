import React, { useState, useRef, useEffect } from "react";
import {
  FiArrowLeft,
  FiEdit2,
  FiBell,
  FiMusic,
  FiVolume2,
  FiSun,
  FiMoon,
} from "react-icons/fi";
import { FaEdit } from "react-icons/fa";
import AppButton from "../../../../Components/AppButton";

const SleepGoal = () => {
  // ---- STATE ----
  const [sleepTime, setSleepTime] = useState(22 * 60); // default 10:00 PM
  const [wakeTime, setWakeTime] = useState(9 * 60); // default 9:00 AM
  const [activeDays, setActiveDays] = useState([0, 1, 2, 3, 4]); // default weekdays
  const [dragging, setDragging] = useState(null);
  const [alarmSound, setAlarmSound] = useState("Cherry Blossom");
  const [alarmName, setAlarmName] = useState("Healthy sleep");
  const [alarmVolume, setAlarmVolume] = useState(80);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [showNameInput, setShowNameInput] = useState(false);
  const [tempAlarmName, setTempAlarmName] = useState(alarmName);

  // Picker state
  const [showPicker, setShowPicker] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [pickerType, setPickerType] = useState(null);
  const [tempTime, setTempTime] = useState({ hour: 10, minute: 0, ampm: "PM" });

  // Refs for wheel containers
  const hourWheelRef = useRef(null);
  const minuteWheelRef = useRef(null);
  const ampmWheelRef = useRef(null);
  const scrollTimeoutRef = useRef(null);
  const nameInputRef = useRef(null);

  // Picker lists
  const hours = [...Array(12)].map((_, i) => i + 1);
  const minutes = [...Array(60)].map((_, i) => i.toString().padStart(2, "0"));
  const ampmList = ["AM", "PM"];
  const soundOptions = [
    "Cherry Blossom",
    "Ocean Waves",
    "Morning Birds",
    "Digital Beep",
    "Piano Melody",
  ];

  const svgRef = useRef(null);
  const radius = 120;

  const closePicker = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowPicker(false);
      setIsClosing(false);
    }, 300);
  };

  // ---- EFFECTS ----
  useEffect(() => {
    const savedSleep = localStorage.getItem("sleepTime");
    const savedWake = localStorage.getItem("wakeTime");
    const savedDays = localStorage.getItem("activeDays");
    const savedSound = localStorage.getItem("alarmSound");
    const savedName = localStorage.getItem("alarmName");
    const savedVolume = localStorage.getItem("alarmVolume");

    if (savedSleep) setSleepTime(parseInt(savedSleep));
    if (savedWake) setWakeTime(parseInt(savedWake));
    if (savedDays) setActiveDays(JSON.parse(savedDays));
    if (savedSound) setAlarmSound(savedSound);
    if (savedName) setAlarmName(savedName);
    if (savedVolume) setAlarmVolume(parseInt(savedVolume));
  }, []);

  useEffect(() => {
    localStorage.setItem("sleepTime", sleepTime);
    localStorage.setItem("wakeTime", wakeTime);
    localStorage.setItem("activeDays", JSON.stringify(activeDays));
    localStorage.setItem("alarmSound", alarmSound);
    localStorage.setItem("alarmName", alarmName);
    localStorage.setItem("alarmVolume", alarmVolume);
  }, [sleepTime, wakeTime, activeDays, alarmSound, alarmName, alarmVolume]);

  useEffect(() => {
    if (showNameInput && nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, [showNameInput]);

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

  // Clock positions and path
  const sleepAngle = minutesToRadians(sleepTime);
  const wakeAngle = minutesToRadians(wakeTime);
  const sleepPos = {
    x: 150 + Math.cos(sleepAngle) * radius,
    y: 150 + Math.sin(sleepAngle) * radius,
  };
  const wakePos = {
    x: 150 + Math.cos(wakeAngle) * radius,
    y: 150 + Math.sin(wakeAngle) * radius,
  };
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

  // Drag handlers
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

    const minutes = getMinutesFromPosition(clientX, clientY);
    if (dragging === "sleep") setSleepTime(minutes);
    if (dragging === "wake") setWakeTime(minutes);
  };

  const handleEndDrag = () => {
    if (!dragging) return;
    setDragging(null);
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

  // Time picker functions
  const scrollToSelected = () => {
    const itemHeight = 44;
    const hourIndex = hours.indexOf(tempTime.hour);
    const minuteIndex = minutes.findIndex(
      (m) => parseInt(m) === tempTime.minute
    );
    const ampmIndex = ampmList.indexOf(tempTime.ampm);

    if (hourWheelRef.current && hourIndex >= 0) {
      hourWheelRef.current.scrollTo({
        top: hourIndex * itemHeight,
        behavior: "auto",
      });
    }
    if (minuteWheelRef.current && minuteIndex >= 0) {
      minuteWheelRef.current.scrollTo({
        top: minuteIndex * itemHeight,
        behavior: "auto",
      });
    }
    if (ampmWheelRef.current && ampmIndex >= 0) {
      ampmWheelRef.current.scrollTo({
        top: ampmIndex * itemHeight,
        behavior: "auto",
      });
    }
  };

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

  useEffect(() => {
    if (showPicker) {
      requestAnimationFrame(() => {
        scrollToSelected();
      });
    }
  }, [showPicker, tempTime]);

  const handleOk = () => {
    let hour24 =
      tempTime.ampm === "PM" ? (tempTime.hour % 12) + 12 : tempTime.hour % 12;
    const minutes = hour24 * 60 + tempTime.minute;

    if (pickerType === "sleep") setSleepTime(minutes);
    if (pickerType === "wake") setWakeTime(minutes);

    setIsClosing(true);
    setTimeout(() => {
      setShowPicker(false);
      setIsClosing(false);
    }, 300);
  };

  const handleScroll = (e, type) => {
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
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
    container.scrollTo({ top: index * itemHeight, behavior: "smooth" });
  };

  // Day selection
  const toggleDay = (i) => {
    setActiveDays((prev) =>
      prev.includes(i) ? prev.filter((d) => d !== i) : [...prev, i]
    );
  };

  // Alarm name editing
  const handleNameEdit = () => {
    setShowNameInput(true);
    setTempAlarmName(alarmName);
  };

  const handleNameSave = () => {
    if (tempAlarmName.trim()) {
      setAlarmName(tempAlarmName);
    }
    setShowNameInput(false);
  };

  const handleNameCancel = () => {
    setShowNameInput(false);
  };

  // Sound selection
  const handleSoundSelect = (sound) => {
    setAlarmSound(sound);
  };

  // Volume control
  const toggleVolumeSlider = () => {
    setShowVolumeSlider(!showVolumeSlider);
  };

  const handleVolumeChange = (e) => {
    setAlarmVolume(parseInt(e.target.value));
  };

  // Handle submit
  const handleSubmit = () => {
    console.log("Sleep Goal Settings:", {
      sleepTime: formatTime(sleepTime),
      wakeTime: formatTime(wakeTime),
      activeDays,
      alarmSound,
      alarmName,
      alarmVolume,
    });
    alert("Sleep goal has been set successfully!");
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
                style={{ cursor: "grab" }}
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
                style={{ cursor: "grab" }}
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

      {/* CONTENT BELOW HERO */}
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
              <div className="time-icon-wrapper bedtime">
                <FiMoon className="time-icon" />
              </div>
              <button className="edit-btn">
                <FaEdit className="edit-icon" />
              </button>
            </div>
            <div className="time-card-label">Bedtime</div>
            <div className="time-card-value">{formatTime(sleepTime)}</div>
          </div>

          <div className="time-card" onClick={() => openPicker("wake")}>
            <div className="time-card-top">
              <div className="time-icon-wrapper wake">
                <FiSun className="time-icon" />
              </div>
              <button className="edit-btn">
                <FaEdit className="edit-icon" />
              </button>
            </div>
            <div className="time-card-label">Wake Up</div>
            <div className="time-card-value">{formatTime(wakeTime)}</div>
          </div>
        </div>

        {/* Sound Picker Modal */}
        {showPicker && pickerType === "sound" && (
          <div className="sound-picker-modal">
            <div
              className={`sound-picker-overlay ${isClosing ? "exit" : "enter"}`}
              onClick={closePicker}
            />
            <div
              className={`sound-picker-container ${
                isClosing ? "exit" : "enter"
              }`}
            >
              <div className="sound-picker-header">
                <h3 className="sound-picker-title">Select Alarm Sound</h3>
              </div>

              <div className="sound-picker-body">
                {soundOptions.map((sound) => (
                  <div
                    key={sound}
                    className={`sound-option ${
                      alarmSound === sound ? "active" : ""
                    }`}
                    onClick={() => {
                      handleSoundSelect(sound);
                      closePicker();
                    }}
                  >
                    {sound}
                    {alarmSound === sound && (
                      <span className="sound-check">✓</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Time Picker Modal */}
        {showPicker && (pickerType === "sleep" || pickerType === "wake") && (
          <div className="time-picker-modal">
            <div
              className={`time-picker-overlay ${isClosing ? "exit" : "enter"}`}
              onClick={closePicker}
            />
            <div
              className={`time-picker-container ${
                isClosing ? "exit" : "enter"
              }`}
            >
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
                <AppButton
                  text={"Cancel"}
                  onClick={closePicker}
                  variant={"secondary"}
                />
                <AppButton text={"Confirm"} onClick={handleOk} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* SUBMIT BUTTON - FIXED BOTTOM */}
      <div className="submit-section">
        <AppButton text={"Set My Goal"} onClick={handleSubmit} />
      </div>

      <style>
        {`
      /* ============================= */
/* Sleep Goal Page Layout        */
/* ============================= */
.sleep-goal-page {
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
.sleep-goal-hero {
  background: linear-gradient(to bottom, #4a90e2, #8c60e2);
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
}

.sleep-duration {
  font-size: 2.6rem;
  font-weight: 800;
  color: #0172d0;
  margin: 0;
}

.sleep-details {
  margin-top: 10px;
  font-size: 1rem;
  color: #475569;
}

.sleep-label {
  color: #3b82f6;
  font-weight: 600;
}

.wake-label {
  color: #10b981;
  font-weight: 600;
}

/* ============================= */
/* Content Below Hero            */
/* ============================= */
.content-below-hero {
  width: 100%;
  max-width: 520px;
  padding: 0 20px;
  margin: 25px auto;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

/* ============================= */
/* Days Selector                 */
/* ============================= */
.days-selector {
  display: flex;
  justify-content: space-between;
  gap: 6px;
}

.day-pill {
  flex: 1;
  text-align: center;
  background: #fff;
  border-radius: 18px;
  padding: 10px 0;
  font-weight: 600;
  font-size: 0.9rem;
  color: #64748b;
  border: 1.5px solid #e2e8f0;
  cursor: pointer;
  transition: all 0.25s ease;
}

.day-pill.active {
  background: #f0f7ff;
  border-color: #8c60e2;
  color: #8c60e2;
}

/* ============================= */
/* Time Summary (Bed/Wake Cards) */
/* ============================= */
.time-summary {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  margin-top: 18px;
}

.time-card {
  flex: 1;
  background: rgba(255, 255, 255, 0.85);
  border-radius: 20px;
  padding: 18px 20px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(12px);
  display: flex;
  flex-direction: column;
  gap: 8px;
  transition: all 0.25s ease;
  cursor: pointer;
}

.time-card:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.12);
}

.time-card:active {
  transform: scale(0.98);
}

.time-card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.time-icon-wrapper {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  color: #fff;
}

.time-icon-wrapper.bedtime {
  background: linear-gradient(135deg, #4a90e2, #8c60e2);
}

.time-icon-wrapper.wake {
  background: linear-gradient(135deg, #f97316, #f43f5e);
}

.time-icon {
  font-size: 18px;
}

.edit-btn {
  background: #f1f5f9;
  border: none;
  border-radius: 50%;
  padding: 6px;
  cursor: pointer;
  transition: background 0.2s ease;
}

.edit-btn:hover {
  background: #e2e8f0;
}

.edit-icon {
  font-size: 1rem;
  color: #475569;
}

.time-card-label {
  font-size: 0.9rem;
  font-weight: 500;
  color: #64748b;
}

.time-card-value {
  font-size: 1.6rem;
  font-weight: 700;
  color: #0f172a;
}

/* ============================= */
/* List Container                */
/* ============================= */
.list-container {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-top: 16px;
}

/* ============================= */
/* List-style Cards              */
/* ============================= */
.list-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  border-radius: 16px;
  padding: 14px 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.25s ease;
}

.list-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
}

.list-left {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
}

.list-icon {
  width: 42px;
  height: 42px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: white;
}

.list-icon.sound {
  background: linear-gradient(135deg, #8b5cf6, #d946ef);
}

.list-icon.volume {
  background: linear-gradient(135deg, #f59e0b, #ef4444);
}

.list-icon.text {
  background: linear-gradient(135deg, #10b981, #06b6d4);
}

.list-label {
  font-size: 0.8rem;
  font-weight: 500;
  color: #64748b;
}

.list-value {
  font-size: 1rem;
  font-weight: 600;
  color: #1e293b;
}

.list-right {
  display: flex;
  align-items: center;
}

.list-arrow {
  font-size: 1.6rem;
  color: #94a3b8;
  font-weight: 500;
}

/* Volume Controls */
.volume-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
}

.volume-slider {
  width: 100px;
  height: 6px;
  -webkit-appearance: none;
  appearance: none;
  background: #e2e8f0;
  border-radius: 3px;
  outline: none;
}

.volume-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #3b82f6;
  cursor: pointer;
}

.volume-bars {
  display: flex;
  align-items: flex-end;
  gap: 3px;
  height: 30px;
}

.volume-bar {
  width: 6px;
  background: #cbd5e1;
  border-radius: 3px;
  transition: background 0.2s ease;
}

.volume-bar.active {
  background: #3b82f6;
}

/* Name Input */
.name-input {
  border: none;
  border-bottom: 1px solid #cbd5e1;
  font-size: 1rem;
  font-weight: 600;
  color: #1e293b;
  padding: 2px 0;
  width: 100%;
  outline: none;
  background: transparent;
}

.name-input:focus {
  border-bottom-color: #3b82f6;
}

.name-edit-buttons {
  display: flex;
  gap: 8px;
}

.name-edit-btn {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  font-size: 14px;
}

.name-edit-btn.save {
  background: #10b981;
  color: white;
}

.name-edit-btn.cancel {
  background: #f1f5f9;
  color: #64748b;
}

/* Sound Picker Modal */
.sound-picker-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  z-index: 1000;
}

.sound-picker-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  animation: fadeIn 0.3s ease;
}

.sound-picker-container {
  position: relative;
  width: 100%;
  max-width: 420px;
  background: #ffffff;
  border-radius: 24px 24px 0 0;
  box-shadow: 0 -8px 32px rgba(0, 0, 0, 0.1);
  padding: 24px;
  padding-bottom: 32px;
  animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 1;
  max-height: 70vh;
  overflow-y: auto;
}

.sound-picker-header {
  margin-bottom: 16px;
  text-align: center;
}

.sound-picker-title {
  font-size: 1.4rem;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
}

.sound-picker-body {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.sound-option {
  padding: 16px;
  border-radius: 12px;
  font-size: 1rem;
  color: #334155;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.sound-option:hover {
  background: #f8fafc;
}

.sound-option.active {
  background: #f0f7ff;
  color: #2563eb;
  font-weight: 500;
}

.sound-check {
  color: #2563eb;
  font-weight: bold;
}

/* Modern Time Picker Styles */
.time-picker-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  z-index: 1000;
}

.time-picker-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  animation: fadeIn 0.3s ease;
}

.time-picker-container {
  position: relative;
  width: 100%;
  max-width: 420px;
  background: #ffffff;
  border-radius: 24px 24px 0 0;
  box-shadow: 0 -8px 32px rgba(0, 0, 0, 0.1);
  padding: 24px;
  padding-bottom: 32px;
  animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 1;
}

.time-picker-header {
  margin-bottom: 16px;
  text-align: center;
}

.time-picker-title {
  font-size: 1.4rem;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
}

.time-picker-body {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin: 24px 0;
  position: relative;
}

.time-wheel-container {
  position: relative;
  height: 200px;
  width: 80px;
  overflow: hidden;
}

.time-wheel {
  height: 100%;
  width: 100%;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  -webkit-overflow-scrolling: touch;
  padding: 78px 0;
}

.time-wheel::-webkit-scrollbar {
  display: none;
}

.time-wheel-highlight {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 44px;
  transform: translateY(-50%);
  background: rgba(59, 130, 246, 0.08);
  border-radius: 12px;
  pointer-events: none;
  border: 1px solid rgba(59, 130, 246, 0.15);
}

.time-wheel-item {
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  font-weight: 400;
  color: #9ca3af;
  scroll-snap-align: center;
  transition: all 0.2s ease;
}

.time-wheel-item.active {
  color: #1a1a1a;
  font-weight: 600;
  font-size: 1.6rem;
}

.time-wheel-label {
  position: absolute;
  bottom: -20px;
  left: 0;
  right: 0;
  text-align: center;
  font-size: 0.75rem;
  color: #6b7280;
  font-weight: 500;
}

.time-separator {
  font-size: 1.6rem;
  font-weight: 600;
  color: #1a1a1a;
  padding: 60px 0;
  align-self: flex-end;
  margin-bottom: 20px;
}

.time-picker-footer {
  display: flex;
  gap: 12px;
  margin-top: 32px;
}

/* Submit Section Styles */
.submit-section {
 position: fixed;
    display: flex;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 16px;
    background: white;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
    z-index: 100;
    justify-content: center;
}


/* Adjust content-below-hero to account for fixed button */

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

@keyframes slideDown {
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(100%);
    opacity: 0;
  }
}

/* Active states */
.time-picker-overlay.enter,
.sound-picker-overlay.enter {
  animation: fadeIn 0.3s ease forwards;
}

.time-picker-overlay.exit,
.sound-picker-overlay.exit {
  animation: fadeOut 0.3s ease forwards;
}

.time-picker-container.enter,
.sound-picker-container.enter {
  animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.time-picker-container.exit,
.sound-picker-container.exit {
  animation: slideDown 0.3s ease forwards;
}
`}
      </style>
    </div>
  );
};

export default SleepGoal;
