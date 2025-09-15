import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiCheck } from "react-icons/fi";
import AppButton from "../../../../Components/AppButton";
import personaphysicalbg from "../../../../assets/personaphysicalbg.svg"; // make sure path is correct
import "./style.css";

const PhysicalActivity = () => {
  const navigate = useNavigate();

  const steps = [
    { id: 1, label: "About yourself" },
    { id: 2, label: "Physical Activity" },
    { id: 3, label: "Nutrition" },
    { id: 4, label: "Sleep" },
    { id: 5, label: "Medical condition" },
  ];

  const [currentStep] = useState(2);

  const questions = [
    {
      id: 1,
      type: "choice",
      text: "What kind of job do you perform?",
      options: ["Desk job or sitting job", "Standing job", "Field work"],
    },
    {
      id: 2,
      type: "choice",
      text: "What level of physical activity/exercise do you perform outside your job?",
      options: [
        "'No' to 'low' activity (sedentary)",
        "Light activity",
        "Moderate activity",
        "High-level activity",
        "Extreme or rigorous activity",
      ],
    },
    {
      id: 3,
      type: "range",
      text: "How much do you walk?",
      min: 0,
      max: 30000,
      step: 500,
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});

  const handleNext = () => {
    if (currentQuestion < questions.length) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const handleSelectOption = (option) => {
    const qId = questions[currentQuestion].id;

    setAnswers((prev) => ({
      ...prev,
      [qId]: option,
    }));

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion((prev) => prev + 1);
      }, 300);
    }
  };

  const handleSliderChange = (e) => {
    const value = Number(e.target.value);
    const qId = questions[currentQuestion].id;

    setAnswers((prev) => ({
      ...prev,
      [qId]: value,
    }));
  };

  const isCompletion = currentQuestion === questions.length;
  const question = questions[currentQuestion];

  return (
    <div className="persona-about-page">
      {/* Hero Section */}
      <div className="persona-about-hero">
        <div className="hero-top-bar">
          <div className="hero-left">
            <button
              className="icon-button"
              onClick={() => navigate(-1)}
              aria-label="Go back"
            >
              <FiArrowLeft className="hero-icon" />
            </button>
            <h2 className="hero-title">Physical Activity</h2>
          </div>
        </div>

        {/* Steps */}
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

      {/* Completion OR Questions */}
      {isCompletion ? (
        <div className="about-completion-section">
          <h2 className="completion-title">
            Great! You’ve just taken a big step on your journey.
          </h2>

          <img
            src={personaphysicalbg}
            alt="completion"
            className="completion-image"
          />

          <div className="completion-text">
            <p>
              A healthy diet throughout life promotes healthy pregnancy
              outcomes, supports normal growth, development and aging, helps to
              maintain a healthy body weight, and reduces the risk of chronic
              disease leading to overall health and well-being.{" "}
            </p>
            <p>Now, let’s talk about your nutrition.</p>
          </div>
        </div>
      ) : (
        <div className="question-card">
          <div className="question-header">
            <div className="question-number">Q{question.id}</div>
            <h2 className="question-text">{question.text}</h2>
          </div>

          {question.type === "choice" && (
            <div className="options-group">
              {question.options.map((option, index) => {
                const isSelected = answers[question.id] === option;

                return (
                  <div
                    key={index}
                    className={`option-card ${isSelected ? "selected" : ""}`}
                    onClick={() => handleSelectOption(option)}
                  >
                    <span className="option-text">{option}</span>
                    {isSelected && <FiCheck className="tick-icon" />}
                  </div>
                );
              })}
            </div>
          )}

          {question.type === "range" && (
            <div className="slider-wrapper">
              <div className="slider-value">{answers[question.id] || 0}</div>
              <input
                type="range"
                min={question.min}
                max={question.max}
                step={question.step}
                value={answers[question.id] || 0}
                onChange={handleSliderChange}
                className="slider-input"
              />
              <div className="slider-labels">
                <span>0 steps</span>
                <span>30,000 steps</span>
              </div>
              <p className="slider-subtitle">SLIDE TO GIVE YOUR COUNT</p>
              <p className="slider-distance">
                Approximate distance covered :{" "}
                {((answers[question.id] || 0) / 1312).toFixed(1)} kms
              </p>
            </div>
          )}
        </div>
      )}

      {/* Fixed Bottom Actions */}
      <div className="completion-actions">
        <AppButton
          text="Back"
          variant="secondary"
          onClick={handleBack}
          disabled={currentQuestion === 0}
        />
        <AppButton text={"Next"} onClick={handleNext} disabled={isCompletion} />
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

/* -------- Hero Section (unchanged) -------- */
.persona-about-hero {
  background: linear-gradient(to bottom right, #4a90e2, #8c60e2);
  padding: 20px;
  border-radius: 0 0 32px 32px;
  color: white;
  box-shadow: 0 10px 30px rgba(74, 144, 226, 0.2);
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
  gap: 0; /* no unnecessary gaps */
  overflow-x: hidden; /* prevent scrolling */
  width: 100%;
  max-width: 100%;
  position: relative;
}

.step-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  flex: 1; /* evenly distribute */
  min-width: 0; /* allow shrinking to fit container */
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
  white-space: normal; /* allow wrapping */
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
  background: #4caf50; /* green */
  border-color: #4caf50;
  color: white;
  box-shadow: 0 4px 10px rgba(76, 175, 80, 0.4);
}

.step-circle.completed svg {
  font-size: 18px;
  stroke-width: 3;
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

/* Fixed bottom actions */
.completion-actions {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px 20px;
  display: flex;
  justify-content: space-between;
  background: #fff;
  border-top: 1px solid #e5e7eb;
  box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.08);
  border-radius: 16px 16px 0 0;
  z-index: 100;
  gap: 12px;
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

.completion-actions button {
  flex: 1; /* AppButton will stretch equally */
}

.slider-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 0;
}

.slider-value {
  color: #2563eb;
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 10px;
}

.slider-input {
  width: 100%;
  accent-color: #22c55e;
}

.slider-labels {
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-size: 0.85rem;
  margin-top: 6px;
  color: #6b7280;
}

.slider-subtitle {
  margin-top: 14px;
  font-weight: 600;
}

.slider-distance {
  margin-top: 4px;
  color: #374151;
  font-size: 0.9rem;
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

export default PhysicalActivity;
