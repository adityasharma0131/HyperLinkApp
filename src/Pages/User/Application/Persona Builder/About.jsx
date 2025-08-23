import React, { useState } from "react";
import "./style.css";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import AppButton from "../../../../Components/AppButton";
import personaaboutbg from "../../../../assets/personaaboutbg.svg";

const About = () => {
  const navigate = useNavigate();
  const [selectedGender, setSelectedGender] = useState("Male");
  const [customGender, setCustomGender] = useState("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [bmiCategory, setBmiCategory] = useState("");
  const [showCompletion, setShowCompletion] = useState(false);

  const steps = [
    { id: 1, label: "About yourself" },
    { id: 2, label: "Physical Activity" },
    { id: 3, label: "Nutrition" },
    { id: 4, label: "Sleep" },
    { id: 5, label: "Medical condition" },
  ];

  const calculateBMI = () => {
    if (!height || !weight) {
      alert("Please enter both height and weight.");
      return;
    }
    const h = parseFloat(height) / 100;
    const w = parseFloat(weight);
    if (h <= 0 || w <= 0) {
      alert("Please enter valid height and weight.");
      return;
    }

    const bmiValue = w / (h * h);
    setBmi(bmiValue);

    let category = "";
    if (bmiValue < 18.5) category = "Underweight";
    else if (bmiValue < 25) category = "Normal";
    else if (bmiValue < 30) category = "Overweight";
    else category = "Obesity";

    setBmiCategory(category);
  };

  const getCategoryColor = () => {
    switch (bmiCategory) {
      case "Underweight":
        return "#fbbf24";
      case "Normal":
        return "#22c55e";
      case "Overweight":
        return "#f97316";
      case "Obesity":
        return "#ef4444";
      default:
        return "#000";
    }
  };

  const handleNext = () => {
    setShowCompletion(true);
  };

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
            <h2 className="hero-title">About Yourself</h2>
          </div>
        </div>

        {/* Steps */}
        <div className="steps-wrapper">
          {steps.map((step, index) => (
            <div key={step.id} className="step-item">
              <div
                className={`step-circle ${index === 0 ? "active" : "disabled"}`}
              >
                {step.id}
              </div>
              <p
                className={`step-text ${
                  index === 0 ? "active-text" : "disabled-text"
                }`}
              >
                {step.label}
              </p>
              {index < steps.length - 1 && <div className="step-line"></div>}
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      {!showCompletion ? (
        <div className="user-info-section">
          <h2 className="section-title">Help us know more about you</h2>

          <form className="user-form" onSubmit={(e) => e.preventDefault()}>
            {/* Age */}
            <div className="form-group">
              <label className="form-label" htmlFor="age">
                Age
              </label>
              <input
                id="age"
                type="number"
                className="input-field"
                placeholder="e.g. 26"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>

            {/* Gender */}
            <div className="form-group">
              <label className="form-label">Gender</label>
              <div className="gender-options">
                {["Male", "Female", "Other"].map((option) => (
                  <button
                    key={option}
                    type="button"
                    className={`gender-btn ${
                      selectedGender === option ? "active" : ""
                    }`}
                    onClick={() => setSelectedGender(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>

              {selectedGender === "Other" && (
                <input
                  type="text"
                  className="input-field custom-gender"
                  placeholder="Enter your gender"
                  value={customGender}
                  onChange={(e) => setCustomGender(e.target.value)}
                />
              )}
            </div>

            {/* Height */}
            <div className="form-group">
              <label className="form-label" htmlFor="height">
                Height (cm)
              </label>
              <input
                id="height"
                type="number"
                className="input-field"
                placeholder="e.g. 170"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </div>

            {/* Weight */}
            <div className="form-group">
              <label className="form-label" htmlFor="weight">
                Weight (kg)
              </label>
              <input
                id="weight"
                type="number"
                className="input-field"
                placeholder="e.g. 65"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>
          </form>

          {/* Calculate BMI */}
          <div className="cta-btn">
            <AppButton text="CALCULATE YOUR BMI" onClick={calculateBMI} />
          </div>

          {/* BMI Result */}
          {bmi && (
            <div className="bmi-result-card">
              <h3 className="bmi-title">Your BMI</h3>
              <div className="bmi-value">{bmi.toFixed(1)}</div>

              <div className="bmi-progress-container">
                <div
                  className="bmi-indicator"
                  style={{
                    left: `${Math.min(100, Math.max(0, (bmi / 40) * 100))}%`,
                    backgroundColor: getCategoryColor(),
                  }}
                />
              </div>

              <div className="bmi-scale">
                <span>Underweight</span>
                <span>Normal</span>
                <span>Overweight</span>
                <span>Obesity</span>
              </div>

              <h4
                className="bmi-category"
                style={{ color: getCategoryColor() }}
              >
                {bmiCategory === "Normal"
                  ? "✅ You're in Great Shape!"
                  : `⚠️ Category: ${bmiCategory}`}
              </h4>
              <p className="bmi-note">
                Healthy BMI range: <strong>18.5 – 25</strong>
              </p>
            </div>
          )}

          {/* Next Button */}
          <div className="next-btn">
            <AppButton text="Next" onClick={handleNext} />
          </div>
        </div>
      ) : (
        <div className="about-completion-section">
          <h2 className="completion-title">
            Great! You’ve just taken a big step on your journey.
          </h2>

          <img
            src={personaaboutbg}
            alt="completion"
            className="completion-image"
          />

          <div className="completion-text">
            <p>
              Did you know? Being physically active can improve your brain
              health, help manage weight, reduce disease risk, strengthen bones
              and muscles, and improve your ability to do everyday activities.
            </p>
            <p>Now, let’s talk about your physical activity.</p>
          </div>

          <div className="completion-actions">
            <AppButton
              text="Back"
              variant="secondary"
              onClick={() => setShowCompletion(false)}
            />
            <AppButton text="Next" />
          </div>
        </div>
      )}

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
  gap: 8px;
  overflow-x: auto;
  padding-bottom: 8px;
  position: relative;
}

.step-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  flex: 1;
  min-width: 80px;
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
  max-width: 90px;
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
} /* -------- User Info Section -------- */
.user-info-section {
  margin: 20px 12px;
  padding: 16px;
  border-radius: 16px;
}

.section-title {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 20px;
  color: #111;
  text-align: center;
}

/* Grid layout for 2x2 form */
.user-form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px 14px;
}

/* Form Groups */
.form-group {
  display: flex;
  flex-direction: column;
}

/* Labels */
.form-label {
  font-size: 0.85rem;
  font-weight: 500;
  margin-bottom: 6px;
  color: #444;
}

/* Inputs */
.input-field {
  width: 100%;
  border: none;
  border-bottom: 2px solid #ddd;
  padding: 10px 6px;
  font-size: 0.95rem;
  border-radius: 4px;
  background: transparent;
  transition: all 0.3s ease;
}
.input-field:focus {
  border-color: #7c3aed;
  outline: none;
}
/* Gender Buttons */
.gender-options {
  display: flex;
  gap: 8px;
  margin-bottom: 10px;
}

.gender-btn {
  flex: 1;
  padding: 10px 12px;
  border: 2px solid #ccc;
  border-radius: 20px;
  background: #fff;
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.gender-btn:hover {
  border-color: #7c3aed;
  color: #1e73e6;
}

.gender-btn.active {
  background: #7c3aed;
  color: white;
  border-color: #7c3aed;
  box-shadow: 0 3px 8px rgba(30, 115, 230, 0.25);
}

/* Custom gender input */
.custom-gender {
  margin-top: 6px;
  border-bottom: 2px solid #ddd;
  font-size: 0.9rem;
  padding: 8px 6px;
  transition: border-color 0.3s ease;
}

.custom-gender:focus {
  border-color: #7c3aed;
  outline: none;
}

/* CTA Button */
.cta-btn {
  margin-top: 24px;
}
/* BMI Result Card */
.bmi-result-card {
  padding: 22px 22px 70px;
  border-radius: 18px;
  text-align: center;
  max-width: 420px;
  animation: fadeIn 0.4s ease-in-out;
}

.bmi-title {
  font-size: 1.2rem;
  font-weight: 700;
  color: #374151;
  margin-bottom: 8px;
}

.bmi-value {
  font-size: 2.4rem;
  font-weight: 800;
  color: #111827;
  background: #e6f9f0;
  display: inline-block;
  padding: 12px 28px;
  margin: 14px 0;
  border-radius: 10px;
  box-shadow: inset 0 2px 8px rgba(34, 197, 94, 0.2);
}

/* Progress Bar */
.bmi-progress-container {
  position: relative;
  height: 14px;
  border-radius: 10px;
  overflow: hidden;
  margin: 18px 0 10px;
  background: linear-gradient(
    to right,
    #fbbf24 0%,
    #fbbf24 25%,
    #22c55e 25%,
    #22c55e 50%,
    #f97316 50%,
    #f97316 75%,
    #ef4444 75%,
    #ef4444 100%
  );
}

.bmi-indicator {
  position: absolute;
  top: -5px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid #fff;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.25);
  transform: translateX(-50%);
  transition: left 0.4s ease-in-out;
}

/* Scale Labels */
.bmi-scale {
  display: flex;
  justify-content: space-between;
  margin: 12px 0;
  font-size: 0.85rem;
  font-weight: 500;
  color: #4b5563;
}

/* Category Text */
.bmi-category {
  font-size: 1.05rem;
  font-weight: 600;
  margin-top: 10px;
  transition: color 0.3s ease-in-out;
}

/* Note */
.bmi-note {
  margin-top: 10px;
  font-size: 0.85rem;
  color: #6b7280;
}

/* Smooth Fade In */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.next-btn {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px 20px;
  background: #fff; /* keeps it visible above content */
  border-top: 1px solid #e5e7eb; /* subtle divider */
  border-radius: 16px 16px 0 0;
  box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.08);
  z-index: 100; /* keeps it above other elements */
}

/* Optional: make button full-width */
.next-btn button {
  width: 100%;
}

.about-completion-section {
  text-align: center;
  padding: 24px 16px 100px; /* extra bottom padding for fixed buttons */
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
  flex: 1; /* equal width */
}

/* Smooth Fade & Slide Up */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
`}
      </style>
    </div>
  );
};

export default About;
