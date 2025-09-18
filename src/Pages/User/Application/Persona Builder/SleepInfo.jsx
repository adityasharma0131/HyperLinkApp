import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiMoon, FiSun, FiCheck } from "react-icons/fi";
import { FaEdit } from "react-icons/fa";
import AppButton from "../../../../Components/AppButton";
import personasleepbg from "../../../../assets/personasleepbg.svg";
import "./style.css";

const SleepInfo = () => {
  const navigate = useNavigate();

  const steps = [
    { id: 1, label: "About yourself" },
    { id: 2, label: "Physical Activity" },
    { id: 3, label: "Nutrition" },
    { id: 4, label: "Sleep" },
    { id: 5, label: "Medical condition" },
  ];
  const [currentStep] = useState(4);

  const [sleepTime, setSleepTime] = useState(22 * 60);
  const [wakeTime, setWakeTime] = useState(9 * 60);
  const [dragging, setDragging] = useState(null);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isCompletion, setIsCompletion] = useState(false);

  const questions = [
    {
      id: 1,
      title: "What is your bedtime and wake-up time?",
      type: "clock",
    },
    {
      id: 2,
      title: "Do you work in shifts?",
      type: "choice",
      options: ["Yes", "No"],
    },
    {
      id: 5,
      type: "checkbox",
      title: "Do you have any known sleep issues?",
      options: [
        "None",
        "Insomnia",
        "Sleep disruption",
        "Snoring",
        "Daytime Sleep",
        "Sleep latency",
      ],
    },
  ];

  const hourWheelRef = useRef(null);
  const minuteWheelRef = useRef(null);
  const ampmWheelRef = useRef(null);
  const scrollTimeoutRef = useRef(null);
  const svgRef = useRef(null);

  const radius = 120;
  const hours = [...Array(12)].map((_, i) => i + 1);
  const minutes = [...Array(60)].map((_, i) => i.toString().padStart(2, "0"));
  const ampmList = ["AM", "PM"];

  const [showPicker, setShowPicker] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [pickerType, setPickerType] = useState(null);
  const [tempTime, setTempTime] = useState({ hour: 10, minute: 0, ampm: "PM" });

  const duration = (wakeTime - sleepTime + 1440) % 1440;

  const formatTime = (minutes) => {
    const hour = Math.floor(minutes / 60);
    const min = minutes % 60;
    const period = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    const displayMin = min.toString().padStart(2, "0");
    return `${displayHour}:${displayMin} ${period}`;
  };

  const minutesToRadians = (minutes) =>
    ((minutes % 1440) / 1440) * 2 * Math.PI - Math.PI / 2;

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
  const arcPath = `M ${sleepPos.x} ${sleepPos.y}
                   A ${radius} ${radius} 0 ${largeArcFlag} 1 ${wakePos.x} ${wakePos.y}`;

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

  const handleSelectOption = (option) => {
    const qId = questions[currentQuestion].id;
    setAnswers({ ...answers, [qId]: option });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setIsCompletion(true);
    }
  };

  const handleBack = () => {
    if (isCompletion) {
      setIsCompletion(false);
    } else if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    } else {
      navigate(-1);
    }
  };

  const currentQ = questions[currentQuestion];
  const isLastQuestion = currentQuestion === questions.length - 1;

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

  const closePicker = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowPicker(false);
      setIsClosing(false);
    }, 300);
  };

  return (
    <div className="persona-about-page">
      {/* STEPS BAR */}
      <div className="persona-about-hero">
        <div className="hero-top-bar">
          <div className="hero-left">
            <button className="icon-button" onClick={handleBack}>
              <FiArrowLeft className="hero-icon" />
            </button>
            <h2 className="hero-title">Sleep</h2>
          </div>
        </div>

        <div className="steps-wrapper">
          {steps.map((step, index) => {
            const isActive = step.id === currentStep;
            const isCompleted = step.id < currentStep;
            return (
              <div key={step.id} className="step-item">
                <div
                  className={`step-circle ${
                    isActive ? "active" : isCompleted ? "completed" : "disabled"
                  }`}
                >
                  {isCompleted ? <FiCheck /> : step.id}
                </div>
                <p
                  className={`step-text ${
                    isActive || isCompleted ? "active-text" : "disabled-text"
                  }`}
                >
                  {step.label}
                </p>
                {index < steps.length - 1 && <div className="step-line"></div>}
              </div>
            );
          })}
        </div>
      </div>

      {/* QUESTION BODY */}
      <div className="question-container">
        {/* Completion Section */}
        {isCompletion ? (
          <div className="about-completion-section">
            <h2 className="completion-title">
              Great! You've just taken a big step on your journey.
            </h2>

            <img
              src={personasleepbg}
              alt="completion"
              className="completion-image"
            />

            <div className="completion-text">
              <p>
                When you have a medical condition, keeping a track of your
                health involves paying extra attention to certain parameters of
                health.
              </p>
              <p>Now, let's talk about your medical conditions.</p>
            </div>
          </div>
        ) : (
          <>
            {/* CLOCK QUESTION */}
            {currentQ.type === "clock" && (
              <div className="clock-card-main">
                <div className="clock-question-header">
                  <div className="question-number">Q{currentQ.id}</div>
                  <h2 className="question-text">{currentQ.title}</h2>
                </div>
                {/* CLOCK UI */}
                <div className="clock-outer-container">
                  <div className="clock-card">
                    <div className="clock-container">
                      <svg
                        className="clock-svg"
                        viewBox="0 0 300 300"
                        ref={svgRef}
                      >
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

                        {/* Ticks */}
                        {Array.from({ length: 24 }).map((_, i) => {
                          const angle = minutesToRadians(i * 60);
                          const innerR =
                            i % 6 === 0 ? radius - 20 : radius - 15;
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

                        {/* Circle bg */}
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

                      {/* Center content */}
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

                {/* Bedtime & Wake Time Cards */}
                <div className="time-summary">
                  <div
                    className="time-card"
                    onClick={() => openPicker("sleep")}
                  >
                    <div className="time-card-top">
                      <div className="time-icon-wrapper bedtime">
                        <FiMoon className="time-icon" />
                      </div>
                      <button className="edit-btn">
                        <FaEdit className="edit-icon" />
                      </button>
                    </div>
                    <div className="time-card-label">Bedtime</div>
                    <div className="time-card-value">
                      {formatTime(sleepTime)}
                    </div>
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
                    <div className="time-card-value">
                      {formatTime(wakeTime)}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {showPicker &&
              (pickerType === "sleep" || pickerType === "wake") && (
                <div className="time-picker-modal">
                  <div
                    className={`time-picker-overlay ${
                      isClosing ? "exit" : "enter"
                    }`}
                    onClick={closePicker}
                  />
                  <div
                    className={`time-picker-container ${
                      isClosing ? "exit" : "enter"
                    }`}
                  >
                    <div className="time-picker-header">
                      <h3 className="time-picker-title">
                        {pickerType === "sleep"
                          ? "Set Bedtime"
                          : "Set Wake Time"}
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

            {/* CHOICE QUESTION */}
            {currentQ.type === "choice" && (
              <div className="question-card">
                <div className="question-header">
                  <div className="question-number">Q{currentQ.id}</div>
                  <h2 className="question-text">{currentQ.title}</h2>
                </div>

                <div className="options-group">
                  {currentQ.options.map((option, index) => {
                    const isSelected = answers[currentQ.id] === option;
                    return (
                      <div
                        key={index}
                        className={`option-card ${
                          isSelected ? "selected" : ""
                        }`}
                        onClick={() => handleSelectOption(option)}
                      >
                        <span className="option-text">{option}</span>
                        {isSelected && <FiCheck className="tick-icon" />}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* CHECKBOX QUESTION */}
            {currentQ.type === "checkbox" && (
              <div className="question-card">
                <div className="question-header">
                  <div className="question-number">Q{currentQ.id}</div>
                  <h2 className="question-text">{currentQ.title}</h2>
                </div>

                <div className="options-group">
                  {currentQ.options.map((option, index) => {
                    const selectedArray = answers[currentQ.id] || [];
                    const isSelected = selectedArray.includes(option);

                    return (
                      <div
                        key={index}
                        className={`option-card ${
                          isSelected ? "selected" : ""
                        }`}
                        onClick={() => {
                          const newSelected = isSelected
                            ? selectedArray.filter((item) => item !== option)
                            : [...selectedArray, option];

                          setAnswers((prev) => ({
                            ...prev,
                            [currentQ.id]: newSelected,
                          }));
                        }}
                      >
                        <span className="option-text">{option}</span>
                        {isSelected && <FiCheck className="tick-icon" />}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* NAVIGATION */}
      <div className="completion-actions">
        <AppButton
          text={
            isCompletion ? "Back" : currentQuestion === 0 ? "Back" : "Previous"
          }
          variant="secondary"
          onClick={handleBack}
        />
        {isCompletion ? (
          <AppButton
            text="Next"
            onClick={() => navigate("/app/persona-builder/medical-condition")}
          />
        ) : (
          <AppButton
            text={isLastQuestion ? "Next" : "Next"}
            onClick={handleNext}
          />
        )}
      </div>

      <style>
        {`
        /* -------- Page Layout -------- */
.persona-about-page {
  min-height: 100vh;
  background: #f9fbfd;
  display: flex;
  flex-direction: column;
  padding-bottom: 40px;
}

/* -------- Hero Section -------- */
.persona-about-hero {
  position: relative;
  background: linear-gradient(to bottom, #4a90e2, #8c60e2);
  padding: 20px;
  border-radius: 0 0 32px 32px;
  color: white;
  width: 100%;
  max-width: 480px;
  box-shadow: 0 10px 30px rgba(74, 144, 226, 0.3);
  margin: 0 auto 1rem;
}

.hero-top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.hero-left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.hero-question {
  text-align: center;
  margin-top: 20px;
  font-size: 1.5rem;
  font-weight: 600;
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
  color: white;
}

.hero-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0;
}

/* -------- Steps Section -------- */
.steps-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 28px;
  gap: 0;
  overflow-x: hidden;
  width: 100%;
  max-width: 100%;
  position: relative;
}

.step-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  flex: 1;
  min-width: 0;
}

.step-circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid #c4c4c4;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  background: white;
  z-index: 1;
  transition: all 0.3s ease;
}

.step-circle.active {
  background: #1e73e6;
  border-color: #1e73e6;
  color: white;
  box-shadow: 0 4px 10px rgba(30, 115, 230, 0.4);
}

.step-circle.disabled {
  color: #777;
  background: #f1f1f1;
  border-color: #c4c4c4;
}

.step-text {
  margin-top: 6px;
  font-size: 0.8rem;
  text-align: center;
  white-space: normal;
  word-wrap: break-word;
  max-width: 80px;
}

.active-text {
  font-weight: 700;
  color: #000;
}

.disabled-text {
  color: #999;
}

.step-line {
  position: absolute;
  top: 20px;
  left: 50%;
  width: 100%;
  height: 2px;
  background: #e0e0e0;
  z-index: 0;
  transform: translateX(0%);
}

.step-circle.completed {
  background: #4caf50;
  border-color: #4caf50;
  color: white;
  box-shadow: 0 4px 10px rgba(76, 175, 80, 0.4);
}

.step-circle.completed svg {
  font-size: 18px;
  stroke-width: 3;
}

/* ============================= */
/* Clock Outer Container         */
/* ============================= */
.clock-outer-container {
  display: flex;
  justify-content: center;
  margin-top: -80px;
  margin-bottom: 30px;
}

/* ============================= */
/* Clock Card                    */
/* ============================= */
.clock-card {
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
/* Time Cards Container          */
/* ============================= */
.time-cards-container {
  width: 100%;
  max-width: 480px;
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
/* Submit Section                */
/* ============================= */
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

/* ============================= */
/* Time Picker Modal             */
/* ============================= */
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
.time-picker-overlay.enter {
  animation: fadeIn 0.3s ease forwards;
}

.time-picker-overlay.exit {
  animation: fadeOut 0.3s ease forwards;
}

.time-picker-container.enter {
  animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.time-picker-container.exit {
  animation: slideDown 0.3s ease forwards;
}

.clock-card-main {
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
  border: 1px solid #edf2f7;
  max-width: 600px;
  padding: 24px;
  margin: 16px;
  margin-bottom: 2rem;
}

.clock-question-header {
  display: flex;
  align-items: center;
  margin-bottom: 6rem;
  gap: 12px;
}

.question-number {
  font-size: 16px;
  font-weight: 700;
  color: #6366f1;
  background: rgba(99, 102, 241, 0.1);
  width: 36px;
  height: 36px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.question-text {
  font-size: 18px;
  font-weight: 600;
  color: #1e293b;
  line-height: 1.4;
}

.completion-actions {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px 20px;
  display: flex;
  gap: 12px;
  justify-content: space-between;
  background: #fff;
  border-top: 1px solid #e5e7eb;
  box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.08);
  border-radius: 16px 16px 0 0;
  z-index: 100;
}

.question-card {
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
  border: 1px solid #edf2f7;
  padding: 24px;
  max-width: 600px;
  margin: 16px;
}
.question-header {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  gap: 12px;
}
.question-number {
  font-size: 16px;
  font-weight: 700;
  color: #6366f1;
  background: rgba(99, 102, 241, 0.1);
  width: 36px;
  height: 36px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.question-text {
  font-size: 18px;
  font-weight: 600;
  color: #1e293b;
  line-height: 1.4;
}
.options-group {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
}
.option-card {
  position: relative;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  padding: 14px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  transition: 0.2s;
}
.option-card.selected {
  border-color: #6366f1;
  background: rgba(99, 102, 241, 0.1);
}
.tick-icon {
  color: #6366f1;
  font-size: 1.2rem;
}
.option-card:hover {
  background: #f1f5f9;
  border-color: #cbd5e1;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
}
.option-text {
  color: #334155;
}

.days-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 10px;
  margin-top: 16px;
}

.day-pill {
  padding: 10px 0;
  border: 2px solid #e5e7eb;
  border-radius: 10px;
  text-align: center;
  font-weight: 500;
  color: #475569;
  cursor: pointer;
  transition: 0.2s;
}

.day-pill:hover {
  background: #f1f5f9;
  border-color: #cbd5e1;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
}

.day-pill.active {
  background: rgba(99, 102, 241, 0.1);
  border-color: #6366f1;
  color: #6366f1;
}




.about-completion-section {
  text-align: center;
  padding: 24px 16px 100px;
  max-width: 500px;
  margin: 0 auto;
  animation: fadeInUp 0.6s ease-in-out;
}

.completion-title {
  font-size: 1.4rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 16px;
  line-height: 1.4;
}

.completion-image {
  width: 50%;
  max-width: 280px;
  margin: 20px auto;
  display: block;
  border-radius: 12px;
}

.completion-text {
  margin: 20px auto;
  font-size: 0.95rem;
  color: #4b5563;
  line-height: 1.6;
  text-align: left;
}

.completion-text p {
  margin-bottom: 12px;
}
`}
      </style>
    </div>
  );
};

export default SleepInfo;
