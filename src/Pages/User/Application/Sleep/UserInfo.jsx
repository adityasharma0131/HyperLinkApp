import React, { useState } from "react";
import "./style.css";
import AppButton from "../../../../Components/AppButton";
import { useNavigate } from "react-router-dom";

const UserInfo = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    age: "",
    shift: "",
    conditions: [],
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        conditions: checked
          ? [...prev.conditions, value]
          : prev.conditions.filter((item) => item !== value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log("Form submitted:", formData);
    setShowPopup(true);
  };

  const handleContinue = () => {
    setShowPopup(false);
    navigate("/app/sleep/dashboard"); // Replace with your actual navigation path
  };

  const handleCancel = () => {
    setShowPopup(false);
    // Additional cancel logic if needed
  };

  return (
    <div className="user-info-container">
      <div className="form-card">
        {/* Header with decorative elements */}
        <div className="form-header">
          <div className="header-decoration">
            <div className="decoration-circle purple"></div>
            <div className="decoration-circle blue"></div>
          </div>
          <h1 className="title">Tell Us About You</h1>
          <p className="subtitle">
            We'll use this information to personalize your sleep experience
          </p>
        </div>

        {/* Form content with smooth transitions */}
        <form className="form-content" onSubmit={handleSubmit}>
          {/* Age Input */}
          <div className="form-group">
            <label className="question">
              <span className="question-text">What is your age?</span>
              <span className="input-hint">(in years)</span>
            </label>
            <div className="input-cont">
              <input
                type="number"
                name="age"
                className="input-field"
                placeholder="28"
                min="18"
                max="100"
                value={formData.age}
                onChange={handleInputChange}
                required
              />
              <span className="input-icon">👤</span>
            </div>
          </div>

          {/* Shift Work */}
          <div className="form-group">
            <label className="question">Do you work in shifts?</label>
            <div className="options">
              <label className="option">
                <input
                  type="radio"
                  name="shift"
                  value="yes"
                  className="option-input"
                  checked={formData.shift === "yes"}
                  onChange={handleInputChange}
                  required
                />
                <span className="option-content">
                  <span className="option-emoji">🌙</span>
                  <span className="option-text">Yes</span>
                </span>
                <span className="option-check"></span>
              </label>
              <label className="option">
                <input
                  type="radio"
                  name="shift"
                  value="no"
                  className="option-input"
                  checked={formData.shift === "no"}
                  onChange={handleInputChange}
                />
                <span className="option-content">
                  <span className="option-emoji">☀️</span>
                  <span className="option-text">No</span>
                </span>
                <span className="option-check"></span>
              </label>
            </div>
          </div>

          {/* Conditions */}
          <div className="form-group">
            <label className="question">
              Do you have any of these pre-existing conditions?
            </label>
            <div className="options checkbox-options">
              <label className="option">
                <input
                  type="checkbox"
                  name="conditions"
                  value="Insomnia"
                  className="option-input"
                  checked={formData.conditions.includes("Insomnia")}
                  onChange={handleInputChange}
                />
                <span className="option-content">
                  <span className="option-emoji">😵‍💫</span>
                  <span className="option-text">Insomnia</span>
                </span>
                <span className="option-check"></span>
              </label>
              <label className="option">
                <input
                  type="checkbox"
                  name="conditions"
                  value="Sleep Apnea"
                  className="option-input"
                  checked={formData.conditions.includes("Sleep Apnea")}
                  onChange={handleInputChange}
                />
                <span className="option-content">
                  <span className="option-emoji">😴</span>
                  <span className="option-text">Sleep Apnea</span>
                </span>
                <span className="option-check"></span>
              </label>
              <label className="option">
                <input
                  type="checkbox"
                  name="conditions"
                  value="Narcolepsy"
                  className="option-input"
                  checked={formData.conditions.includes("Narcolepsy")}
                  onChange={handleInputChange}
                />
                <span className="option-content">
                  <span className="option-emoji">💤</span>
                  <span className="option-text">Narcolepsy</span>
                </span>
                <span className="option-check"></span>
              </label>
              <label className="option">
                <input
                  type="checkbox"
                  name="conditions"
                  value="Parasomnia"
                  className="option-input"
                  checked={formData.conditions.includes("Parasomnia")}
                  onChange={handleInputChange}
                />
                <span className="option-content">
                  <span className="option-emoji">👻</span>
                  <span className="option-text">Parasomnia</span>
                </span>
                <span className="option-check"></span>
              </label>
            </div>
          </div>

          {/* Button with loading state */}
          <div className="button-container">
            <AppButton type="submit" text={"Save Response"} />
          </div>
        </form>
      </div>

      {/* Submission Confirmation Popup */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="confirmation-popup">
            <div className="popup-content">
              <div className="popup-icon">✓</div>
              <h3 className="popup-title">Thank You!</h3>
              <p className="popup-message">
                We appreciate you sharing your information with us.
              </p>
              <div className="popup-buttons">
                <AppButton
                  text="Continue"
                  variant="primary"
                  onClick={handleContinue}
                  className="popup-button"
                />
                <AppButton
                  text="Cancel"
                  variant="secondary"
                  onClick={handleCancel}
                  className="popup-button"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        /* Modern UI Styles */
        :root {
          --primary: #6366f1;
          --primary-light: #a5b4fc;
          --primary-dark: #4f46e5;
          --text-primary: #1e293b;
          --text-secondary: #64748b;
          --bg-light: #f8fafc;
          --bg-card: #ffffff;
          --border-light: #e2e8f0;
          --border-dark: #cbd5e1;
          --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
          --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
            0 2px 4px -1px rgba(0, 0, 0, 0.06);
          --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
            0 4px 6px -2px rgba(0, 0, 0, 0.05);
          --radius-sm: 8px;
          --radius-md: 12px;
          --radius-lg: 16px;
          --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Base Styles */
        .user-info-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          padding: 24px;
          background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%);
          position: relative;
        }

        .form-card {
          width: 100%;
          max-width: 520px;
          overflow: hidden;
          position: relative;
          padding: 10px;
          transition: var(--transition);
          border-radius: var(--radius-lg);
        }

        /* Header */
        .form-header {
          margin-bottom: 40px;
          text-align: left;
          position: relative;
        }

        .title {
          font-size: 28px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 12px;
          line-height: 1.3;
          background: linear-gradient(90deg, var(--primary) 0%, #8b5cf6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-fill-color: transparent;
        }

        .subtitle {
          font-size: 16px;
          color: var(--text-secondary);
          font-weight: 400;
          max-width: 80%;
        }

        /* Form Groups */
        .form-group {
          margin-bottom: 32px;
        }

        .question {
          display: block;
          margin-bottom: 16px;
          font-size: 16px;
          font-weight: 500;
          color: var(--text-primary);
        }
        .question-text {
          display: block;
          margin-bottom: 6px;
        }

        .input-hint {
          font-size: 14px;
          color: var(--text-secondary);
          font-weight: 400;
        }

        /* Input Field */
        .input-cont {
          position: relative;
          margin-top: 8px;
        }

        .input-field {
          width: 100%;
          padding: 18px 52px 18px 18px;
          font-size: 16px;
          color: var(--text-primary);
          border: 1px solid var(--border-light);
          border-radius: var(--radius-md);
          transition: var(--transition);
          appearance: none;
          box-shadow: var(--shadow-sm);
        }

        .input-field:focus {
          outline: none;
          border-color: var(--primary);
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
        }

        .input-underline {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background-color: var(--primary);
          transition: var(--transition);
        }

        .input-field:focus ~ .input-underline {
          width: 100%;
        }

        .input-icon {
          position: absolute;
          right: 18px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 20px;
          opacity: 0.7;
        }

        /* Options */
        .options {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 16px;
          margin-top: 12px;
        }

        .checkbox-options {
          grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
        }

        .option {
          display: block;
          cursor: pointer;
          position: relative;
        }

        .option-input {
          position: absolute;
          opacity: 0;
        }

        .option-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 20px 16px;
          background-color: var(--bg-card);
          border: 1px solid var(--border-light);
          border-radius: var(--radius-md);
          transition: var(--transition);
          box-shadow: var(--shadow-sm);
          position: relative;
          overflow: hidden;
        }

        .option-content::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 4px;
          background: transparent;
          transition: var(--transition);
        }

        .option-emoji {
          font-size: 28px;
          margin-bottom: 12px;
          transition: var(--transition);
        }

        .option-text {
          font-size: 15px;
          font-weight: 500;
          color: var(--text-primary);
          transition: var(--transition);
        }

        .option-check {
          position: absolute;
          top: 8px;
          right: 8px;
          width: 20px;
          height: 20px;
          border: 2px solid var(--border-dark);
          border-radius: 50%;
          transition: var(--transition);
        }

        /* Radio/Checkbox States */
        .option-input:checked + .option-content {
          background-color: rgba(99, 102, 241, 0.05);
          border-color: var(--primary);
        }

        .option-input:checked + .option-content::before {
          background: var(--primary);
        }

        .option-input:checked + .option-content .option-text {
          color: var(--primary);
        }

        .option-input:checked ~ .option-check {
          background-color: var(--primary);
          border-color: var(--primary);
        }

        .option-input:checked ~ .option-check::after {
          content: "";
          position: absolute;
          top: 2px;
          left: 5px;
          width: 6px;
          height: 10px;
          border: solid white;
          border-width: 0 2px 2px 0;
          transform: rotate(45deg);
        }

        .option-input:focus + .option-content {
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
        }

        .option:hover .option-content {
          border-color: var(--primary);
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }

        /* Button */
        .button-container {
          margin-top: 40px;
          text-align: center;
        }

        /* Popup Styles */
        .popup-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          backdrop-filter: blur(4px);
          animation: fadeIn 0.3s ease;
        }

        .confirmation-popup {
          background-color: var(--bg-card);
          border-radius: var(--radius-lg);
          padding: 32px;
          max-width: 400px;
          width: 90%;
          text-align: center;
          box-shadow: var(--shadow-lg);
          transform: scale(0.95);
          animation: popIn 0.3s ease forwards;
        }

        .popup-content {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .popup-icon {
          font-size: 48px;
          color: #10b981;
          margin-bottom: 16px;
          background: #ecfdf5;
          width: 80px;
          height: 80px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          line-height: 1;
        }

        .popup-title {
          font-size: 24px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 12px;
        }

        .popup-message {
          font-size: 16px;
          color: var(--text-secondary);
          margin-bottom: 24px;
          line-height: 1.5;
        }

        .popup-buttons {
          display: flex;
          gap: 16px;
          width: 100%;
        }

        .popup-button {
          flex: 1;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes popIn {
          0% { transform: scale(0.95); opacity: 0; }
          50% { transform: scale(1.02); }
          100% { transform: scale(1); opacity: 1; }
        }

        /* Responsive Adjustments */
        @media (max-width: 640px) {
          .options {
            grid-template-columns: 1fr 1fr;
          }

          .checkbox-options {
            grid-template-columns: -1fr;
          }

          .popup-buttons {
            flex-direction: column;
          }
        }

        @media (max-width: 480px) {
          .title {
            font-size: 24px;
          }

          .subtitle {
            font-size: 15px;
          }

          .form-group {
            margin-bottom: 28px;
          }

          .option-content {
            padding: 16px 12px;
          }

          .confirmation-popup {
            padding: 24px;
          }
        }
      `}</style>
    </div>
  );
};

export default UserInfo;
