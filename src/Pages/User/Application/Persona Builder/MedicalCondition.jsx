import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiCheck, FiPlus } from "react-icons/fi";
import AppButton from "../../../../Components/AppButton";
import successbg from "../../../../assets/successbg.svg";
import "./style.css";

const MedicalCondition = () => {
  const navigate = useNavigate();

  const steps = [
    { id: 1, label: "About yourself" },
    { id: 2, label: "Physical Activity" },
    { id: 3, label: "Nutrition" },
    { id: 4, label: "Sleep" },
    { id: 5, label: "Medical condition" },
  ];

  const [currentStep] = useState(5);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);

  const questions = [
    {
      id: 1,
      type: "input",
      text: "Please provide us with your latest diagnostic parameters",
      fields: [
        { key: "hba1c", label: "HbA1c (in %)", placeholder: "e.g. 6.5" },
        {
          key: "fasting",
          label: "Fasting Blood Sugar (in mg/dl)",
          placeholder: "e.g. 95",
        },
        {
          key: "postprandial",
          label: "Postprandial Blood Sugar (in mg/dl)",
          placeholder: "e.g. 140",
        },
      ],
    },
    {
      id: 2,
      type: "choice",
      text: "Do you have a family history of diabetes?",
      options: ["Yes", "No"],
    },
    {
      id: 3,
      type: "choice",
      text: "Do you have a family history of high blood pressure (hypertension)?",
      options: ["Yes", "No"],
    },
    {
      id: 4,
      type: "choice",
      text: "Do you consume alcohol?",
      options: ["No", "Occasionally", "Frequently"],
    },
    {
      id: 5,
      type: "checkbox",
      text: "Do you have any of these symptoms?",
      options: [
        "Sudden weight loss",
        "Low blood sugar",
        "Dark patches on skin",
        "Diagnosed with an autoimmune disorder",
        "Episodes of anxiety/depression",
      ],
    },
    {
      id: 6,
      type: "inputs",
      text: "What medications are you on currently?",
    },
    {
      id: 7,
      type: "choice",
      text: "Are you allergic to any medication?",
      options: ["Yes", "No"],
    },
    {
      id: 8,
      type: "inputs2",
      text: "Please mention the medicines you are allergic to",
    },
  ];

  const [answers, setAnswers] = useState({
    6: [
      { name: "", strength: "", dosage: "" },
      { name: "", strength: "", dosage: "" },
      { name: "", strength: "", dosage: "" },
    ],
    8: [""],
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentQuestion]);

  const handleInputChange = (fieldKey, value) => {
    setAnswers((prev) => ({ ...prev, [fieldKey]: value }));
  };

  const handleChoiceSelect = (questionId, option) => {
    setAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  const handleCheckboxToggle = (questionId, option) => {
    const currentSelections = answers[questionId] || [];
    const updated = currentSelections.includes(option)
      ? currentSelections.filter((item) => item !== option)
      : [...currentSelections, option];
    setAnswers((prev) => ({ ...prev, [questionId]: updated }));
  };

  const handleMedicineChange = (index, field, value) => {
    const meds = [...answers[6]];
    meds[index][field] = value;
    setAnswers((prev) => ({ ...prev, 6: meds }));
  };

  const addNewMedicine = () => {
    setAnswers((prev) => ({
      ...prev,
      6: [...prev[6], { name: "", strength: "", dosage: "" }],
    }));
  };

  const handleAllergyChange = (index, value) => {
    const arr = [...answers[8]];
    arr[index] = value;
    setAnswers((prev) => ({ ...prev, 8: arr }));
  };

  const addNewAllergy = () => {
    setAnswers((prev) => ({ ...prev, 8: [...prev[8], ""] }));
  };

  const currentQ = questions.find((q) => q.id === currentQuestion);

  return (
    <>
      {/* ---------- HERO + STEPS ---------- */}
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
            <h2 className="hero-title">Medical Condition</h2>
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

      {/* ---------- QUESTION ---------- */}
      <div className="questions-container" style={{ paddingBottom: "100px" }}>
        {currentQ && (
          <div className="question-card">
            <div className="question-header">
              <div className="question-number">Q{currentQ.id}</div>
              <h2 className="question-text">{currentQ.text}</h2>
            </div>

            {/* --- INPUT --- */}
            {currentQ.type === "input" &&
              currentQ.fields.map((field) => (
                <div className="custom-question" key={field.key}>
                  <label className="custom-label">{field.label}</label>
                  <input
                    type="number"
                    className="custom-input"
                    placeholder={field.placeholder}
                    value={answers[field.key] || ""}
                    onChange={(e) =>
                      handleInputChange(field.key, e.target.value)
                    }
                  />
                </div>
              ))}

            {/* --- CHOICE --- */}
            {currentQ.type === "choice" && (
              <div className="options-group">
                {currentQ.options.map((option, index) => {
                  const isSelected = answers[currentQ.id] === option;
                  return (
                    <div
                      key={index}
                      className={`option-card ${isSelected ? "selected" : ""}`}
                      onClick={() => handleChoiceSelect(currentQ.id, option)}
                    >
                      <span className="option-text">{option}</span>
                      {isSelected && <FiCheck className="tick-icon" />}
                    </div>
                  );
                })}
              </div>
            )}

            {/* --- CHECKBOX --- */}
            {currentQ.type === "checkbox" && (
              <div className="options-group">
                {currentQ.options.map((option, index) => {
                  const selectedArray = answers[currentQ.id] || [];
                  const isSelected = selectedArray.includes(option);
                  return (
                    <div
                      key={index}
                      className={`option-card ${isSelected ? "selected" : ""}`}
                      onClick={() => handleCheckboxToggle(currentQ.id, option)}
                    >
                      <span className="option-text">{option}</span>
                      {isSelected && <FiCheck className="tick-icon" />}
                    </div>
                  );
                })}
              </div>
            )}

            {/* --- MEDICINES --- */}
            {currentQ.type === "inputs" && (
              <div className="medicines-list">
                {answers[6]?.map((med, index) => (
                  <div className="medicine-row" key={index}>
                    <input
                      className="custom-input"
                      placeholder="Medicine Name"
                      value={med.name}
                      onChange={(e) =>
                        handleMedicineChange(index, "name", e.target.value)
                      }
                    />
                    <input
                      className="custom-input"
                      placeholder="Dosage Strength"
                      value={med.strength}
                      onChange={(e) =>
                        handleMedicineChange(index, "strength", e.target.value)
                      }
                    />
                    <input
                      className="custom-input"
                      placeholder="Dosage (e.g. once daily)"
                      value={med.dosage}
                      onChange={(e) =>
                        handleMedicineChange(index, "dosage", e.target.value)
                      }
                    />
                  </div>
                ))}
                <button
                  type="button"
                  className="add-medicine-btn"
                  onClick={addNewMedicine}
                >
                  <FiPlus /> Add another medicine
                </button>
              </div>
            )}

            {/* --- ALLERGIES --- */}
            {currentQ.type === "inputs2" && (
              <div className="allergy-list">
                {answers[8]?.map((item, index) => (
                  <input
                    key={index}
                    className="custom-input"
                    placeholder="Medicine Name"
                    value={item}
                    onChange={(e) => handleAllergyChange(index, e.target.value)}
                  />
                ))}
                <button
                  type="button"
                  className="add-medicine-btn"
                  onClick={addNewAllergy}
                >
                  <FiPlus /> Add another medicine
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ---------- SUCCESS POPUP ---------- */}
      {showSuccess && (
        <div className="success-overlay">
          <div className="success-popup">
            <button
              className="close-btn"
              onClick={() => setShowSuccess(false)}
              aria-label="Close"
            >
              ✕
            </button>
            <img src={successbg} alt="Success" className="success-image" />
            <h1 className="success-title">
              Thank you for adding your responses, Sakshi!
            </h1>
            <p className="success-text">
              This will help us create your personalized dashboard.
            </p>
            <AppButton
              text="Go to Home"
              onClick={() => {
                setShowSuccess(false);
                navigate("/app/");
              }}
            />
          </div>
        </div>
      )}

      {/* ---------- BOTTOM ACTIONS ---------- */}
      <div className="completion-actions">
        <AppButton
          text="Back"
          variant="secondary"
          onClick={() =>
            currentQuestion === 1
              ? navigate(-1)
              : setCurrentQuestion((prev) => prev - 1)
          }
        />
        <AppButton
          text={currentQuestion === questions.length ? "Finish" : "Next"}
          onClick={() => {
            if (currentQuestion < questions.length) {
              setCurrentQuestion((prev) => prev + 1);
            } else {
              console.log("All Answers:", answers);
              setShowSuccess(true); // ✅ Show popup
            }
          }}
        />
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
  margin-bottom: 5rem;
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

.custom-question {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 12px;
}

.custom-label {
  font-size: 1rem;
  font-weight: 500;
  color: #334155;
}

.custom-input {
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  padding: 14px 16px;
  resize: vertical;
  font-size: 1rem;
  color: #334155;
  outline: none;
  transition: 0.2s;
}

.custom-input:focus {
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
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

.medicines-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
}

.add-medicine-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: none;
  background: #6366f1;
  color: #fff;
  font-weight: 600;
  border-radius: 12px;
  padding: 14px 18px;
  cursor: pointer;
  transition: 0.2s;
  align-self: flex-start;
}

.add-medicine-btn:hover {
  background: #4f46e5;
  transform: translateY(-2px);
}

.plus-icon {
  font-size: 1.2rem;
}

/* Popup background */
.success-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

/* Popup card */
.success-popup {
  background: #fff;
  border-radius: 20px;
  padding: 40px 30px;
  text-align: center;
  max-width: 380px;
  width: 90%;
  position: relative;
  animation: fadeSlideUp 0.4s ease;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

/* Animation */
@keyframes fadeSlideUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.success-image {
  width: 120px;
  margin: 0 auto 20px;
  display: block;
}

.success-title {
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 10px;
  color: #222;
}

.success-text {
  color: #555;
  margin-bottom: 25px;
  font-size: 0.95rem;
}

.close-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #777;
}

`}
      </style>
    </>
  );
};

export default MedicalCondition;
