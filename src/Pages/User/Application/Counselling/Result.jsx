import {
  FaExclamationTriangle,
  FaCheckCircle,
  FaInfoCircle,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FaVideo } from "react-icons/fa";
import { IoChatbox } from "react-icons/io5";
import { LuFileSpreadsheet } from "react-icons/lu";
import AppButton from "../../../../Components/AppButton";
import HealthRecord from "../../../../assets/healthrecord.png";

const Result = () => {
  const navigate = useNavigate();

  const riskVisuals = {
    color: "#2ed573",
    bgColor: "rgba(46, 213, 115, 0.1)",
    icon: <FaCheckCircle />,
    title: "Normal Risk",
    gradient: "linear-gradient(135deg, #2ed573 0%, #388e3c 100%)",
  };

  return (
    <div className="result-container">
      <div className="result-header">
        <div
          className="header-gradient"
          style={{ background: riskVisuals.gradient }}
        >
          <div className="header-content">
            <h1>Congragulation Sakshi</h1>
            <p>You have successfully completed your assessment</p>
            <div className="result-icon" style={{ color: "#fff" }}>
              {riskVisuals.icon}
            </div>
          </div>
          <div className="result-content-card">
            <p>
              Based on your responses and current health profile, you need to
              consult a diabetologist for personalized advice.
            </p>
          </div>
        </div>
      </div>

      {/* Doctor Consultation Section */}
      <div className="consult-container">
        <div className="consult-text-section">
          <h1 className="consult-heading">
            Still in Doubt?{" "}
            <span role="img" aria-label="thinking">
              🤔
            </span>
            <br />
            <span className="subheading">Talk to a Doctor</span>
          </h1>
          <p className="consult-description">
            <strong>
              Even with a low-risk score, your peace of mind matters.
            </strong>
            <br />
            Connect with one of our trusted diabetologists or endocrinologists
            to ask questions, share past reports, or get further advice.
          </p>

          <button
            className="book-btn"
            onClick={() => navigate("/app/consultation")}
          >
            Book a Consultation
          </button>
        </div>

        <div className="consult-options">
          <div className="consult-option">
            <FaVideo className="consult-icon" />
            <p>Instant Video calls</p>
          </div>
          <div className="consult-option">
            <IoChatbox className="consult-icon" />
            <p>Chat with specialist</p>
          </div>
          <div className="consult-option">
            <LuFileSpreadsheet className="consult-icon" />
            <p>Precise Prescription </p>
          </div>
        </div>
      </div>

      {/* Health Record Banner */}
      <div className="report-banner">
        <div className="report-text">
          <h2>
            <span className="highlight">YOUR HEALTH </span> <br />
            <span className="highlight">RECORDS</span>
          </h2>
          <p>
            Your results and insights have been saved in your Locker. Access
            anytime from your Profile tab.
          </p>
          <AppButton text="View Records" />
        </div>
        <div className="report-image">
          <img src={HealthRecord} alt="Health Record Secure" />
        </div>
      </div>

      <style>
        {`
        /* Modern Style.css */
:root {
  --color-primary: #2563eb;
  --color-danger: #ff4757;
  --color-warning: #ffa502;
  --color-success: #2ed573;
  --color-dark: #1e293b;
  --color-light: #f8fafc;
  --color-gray: #64748b;
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.12);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 25px rgba(0, 0, 0, 0.1);
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --transition: all 0.3s ease;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background-color: #f1f5f9;
  line-height: 1.6;
  color: var(--color-dark);
}

.result-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0;
  background-color: #f1f5f9;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
}

/* Header Styles */
.header-gradient {
  padding: 2rem;
  color: white;
  text-align: center;
  background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
  
    border-radius: 0 0 32px 32px;
}

.header-content {
  max-width: 800px;
  margin: 0 auto;
}

.result-header h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
  font-weight: 700;
}

.result-icon {
  font-size: 3rem;
  margin: 1rem 0;
}

.result-status {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0;
}

/* Content Container */
.result-content {
  padding: 2rem;
}

/* Card Styles */
.card {
  border-radius: var(--radius-md);
  margin-bottom: 2rem;
  transition: var(--transition);
}

.card h3 {
  font-size: 1.25rem;
  margin-bottom: 1.5rem;
  color: var(--color-dark);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* Summary Card */
.summary-card {
  background: white;
  border-radius: var(--radius-md);
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: var(--shadow-sm);
  border: 1px solid #e2e8f0;
}

.summary-content h3 {
  font-size: 1.25rem;
  margin-bottom: 1.5rem;
  color: var(--color-dark);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* Risk Meter Styles */
.risk-meter-container {
  margin: 2rem 0;
}

.risk-meter-labels {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  color: var(--color-gray);
  font-size: 0.875rem;
}

.risk-meter {
  height: 12px;
  background-color: #e2e8f0;
  border-radius: 6px;
  overflow: hidden;
  position: relative;
}

.risk-meter-fill {
  height: 100%;
  border-radius: 6px;
  transition: var(--transition);
  position: relative;
}

.risk-meter-fill::after {
  content: "";
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: white;
}

.risk-score {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  font-size: 1rem;
}

.score-value {
  font-weight: 700;
  font-size: 1.2rem;
}

/* Risk Factors Grid */
.risk-factors-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
}

.risk-factor-card {
  background: white;
  border-radius: var(--radius-sm);
  padding: 1rem;
  border: 1px solid #e2e8f0;
  transition: var(--transition);
  display: flex;
  flex-direction: column;
}

.risk-factor-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-sm);
}

.factor-content {
  flex: 1;
}

.factor-question {
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--color-dark);
}

.factor-answer {
  color: var(--color-gray);
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.factor-severity {
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  align-self: flex-start;
}

/* Diabetes Grid */
.diabetes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.diabetes-card {
  background: white;
  border-radius: var(--radius-sm);
  padding: 1.5rem;
  box-shadow: var(--shadow-sm);
  transition: var(--transition);
}

.diabetes-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
}

.diabetes-card h4 {
  font-size: 1.1rem;
  margin-bottom: 1rem;
  color: var(--color-dark);
}

.diabetes-content {
  font-size: 0.9rem;
  color: var(--color-gray);
}

.risk-factors {
  margin-top: 1rem;
}

.risk-factors span {
  font-weight: 600;
  color: var(--color-dark);
}

.risk-factors ul {
  margin-top: 0.5rem;
  padding-left: 1.25rem;
}

.risk-factors li {
  margin-bottom: 0.25rem;
}

/* Recommendations */
.recommendations-card {
  border-radius: var(--radius-md);
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.recommendation-content {
  display: flex;
  gap: 1.5rem;
}

.recommendation-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.recommendation-content h4 {
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}

.recommendation-content p {
  margin-bottom: 1rem;
  color: var(--color-gray);
}

.recommendation-content ul {
  padding-left: 1.25rem;
}

.recommendation-content li {
  margin-bottom: 0.5rem;
  color: var(--color-gray);
}

/* Responsive Design */
@media (max-width: 768px) {
  .result-container {
    border-radius: 0;
  }

  .header-gradient {
    padding: 1.5rem;
  }

  .result-header h1 {
    font-size: 1.5rem;
  }

  .result-content {
    padding: 1.5rem;
  }

  .risk-factors-grid,
  .diabetes-grid {
    grid-template-columns: 1fr;
  }

  .recommendation-content {
    flex-direction: column;
    gap: 1rem;
  }

  .recommendation-icon {
    align-self: center;
  }
}

.consult-container {
  border-radius: 12px;
  padding: 30px 20px;
  max-width: 600px;
  text-align: center;
}

.consult-text-section {
  margin-bottom: 30px;
}

.consult-heading {
  font-size: 22px;
  color: #666;
  font-weight: 600;
  text-align: left;
  margin-bottom: 10px;
}

.subheading {
  color: #000;
  text-align: left;
  font-weight: bold;
  font-size: 24px;
}

.consult-description {
  text-align: left;
  font-size: 14px;
  color: #444;
  line-height: 1.6;
  margin-bottom: 20px;
}

.consult-options {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.consult-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 100px;
}

.consult-icon {
  font-size: 28px;
  color: #553fb5;
  margin-bottom: 8px;
}

.consult-option p {
  font-size: 13px;
  color: #333;
  text-align: center;
  margin: 0;
}

.report-banner {
  display: flex;
  flex-direction: row;
  align-items: center;
  background: linear-gradient(180deg, #f0f4ff 0%, #e9dfff 100%);
  border-radius: 20px;
  padding: 1.2rem 1rem;
  margin: 1rem;
  gap: 1rem;
}

.report-text {
  flex: 1;
}

.report-text h2 {
  font-size: 1.4rem;
  font-weight: 800;
  line-height: 1.3;
  margin-bottom: 0.6rem;
}

.highlight {
  color: #e11d48; /* Pink-red */
}

.report-text p {
  font-size: 10px;
  color: #374151;
  margin-bottom: 0.8rem;
}

.report-image {
  flex-shrink: 0;
  width: 40%;
  display: flex;
  justify-content: center;
}

.report-image img {
  width: 100%;
  max-width: 140px;
  height: auto;
}

/* Mobile responsiveness */
@media (max-width: 600px) {
  .report-text h2 {
    font-size: 1.3rem;
  }
}

.result-content-card {
  max-width: 720px;
  margin: 1rem auto;
  padding: 1rem 1.25rem;
  border-radius: 14px;
  background: rgba(255,255,255,0.08);        /* faint white */
  backdrop-filter: blur(10px) saturate(120%);/* core glass effect */
  -webkit-backdrop-filter: blur(10px) saturate(120%);
  border: 1px solid rgba(255,255,255,0.12);
  box-shadow: 0 8px 30px rgba(12, 20, 30, 0.35);
  color: #e6f0ff; /* light text good on dark background */
  line-height: 1.5;
}
.result-content-card  p{ margin:0; font-size: 0.98rem; }


.book-btn {
  background-color: #553fb5;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 10px 18px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  width: 100%;
  font-family: "Outfit", sans-serif;

  transition: background 0.2s ease;
}
`}
      </style>
    </div>
  );
};

export default Result;
