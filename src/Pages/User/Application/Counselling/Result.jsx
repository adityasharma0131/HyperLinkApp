import { useLocation } from "react-router-dom";
import {
  FaHeartbeat,
  FaExclamationTriangle,
  FaCheckCircle,
  FaInfoCircle,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FaVideo } from "react-icons/fa";
import { IoChatbox } from "react-icons/io5";
import { LuFileSpreadsheet } from "react-icons/lu";
import "./style.css";
import AppButton from "../../../../Components/AppButton";
import HealthRecord from "../../../../assets/healthrecord.png";

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { assessment } = location.state || {};

  // Calculate percentage score
  const percentageScore = assessment
    ? Math.round((assessment.totalScore / assessment.maxPossibleScore) * 100)
    : 0;

  // Determine color and icon based on risk level
  const getRiskVisuals = () => {
    switch (assessment?.riskLevel) {
      case "high":
        return {
          color: "#ff4757",
          bgColor: "rgba(255, 71, 87, 0.1)",
          icon: <FaExclamationTriangle />,
          title: "Critical Risk",
          gradient: "linear-gradient(135deg, #ff4757 0%, #d32f2f 100%)",
        };
      case "moderate":
        return {
          color: "#ffa502",
          bgColor: "rgba(255, 165, 2, 0.1)",
          icon: <FaExclamationTriangle />,
          title: "Moderate Risk",
          gradient: "linear-gradient(135deg, #ffa502 0%, #ff7f50 100%)",
        };
      default:
        return {
          color: "#2ed573",
          bgColor: "rgba(46, 213, 115, 0.1)",
          icon: <FaCheckCircle />,
          title: "Normal Risk",
          gradient: "linear-gradient(135deg, #2ed573 0%, #388e3c 100%)",
        };
    }
  };

  const riskVisuals = getRiskVisuals();

  return (
    <div className="result-container">
      <div className="result-header">
        <div
          className="header-gradient"
          style={{ background: riskVisuals.gradient }}
        >
          <div className="header-content">
            <h1>Your Genetic Health Assessment</h1>
            <div className="result-icon" style={{ color: "#fff" }}>
              {riskVisuals.icon}
            </div>
            <div className="result-status" style={{ color: "#fff" }}>
              {riskVisuals.title}
            </div>
          </div>
        </div>
      </div>

      <div className="result-content">
        {/* Risk Summary Card */}
        <div className="summary-card">
          <div className="summary-content">
            <h3>
              <FaInfoCircle /> Risk Summary
            </h3>
            <div className="risk-meter-container">
              <div className="risk-meter-labels">
                <span>Low Risk</span>
                <span>Medium Risk</span>
                <span>High Risk</span>
              </div>
              <div className="risk-meter">
                <div
                  className="risk-meter-fill"
                  style={{
                    width: `${percentageScore}%`,
                    background: riskVisuals.gradient,
                    boxShadow: `0 0 15px ${riskVisuals.color}`,
                  }}
                ></div>
              </div>
              <div className="risk-score">
                <span>Your Risk Score:</span>
                <span
                  className="score-value"
                  style={{ color: riskVisuals.color }}
                >
                  {percentageScore}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Risk Factors */}
        <div className="card">
          <h3>
            <FaExclamationTriangle /> Key Risk Factors Identified
          </h3>
          <div className="risk-factors-grid">
            {assessment?.riskFactors.map((factor, index) => (
              <div key={index} className="risk-factor-card">
                <div className="factor-content">
                  <div className="factor-question">{factor.question}</div>
                  <div className="factor-answer">{factor.answer}</div>
                </div>
                <div
                  className="factor-severity"
                  style={{
                    background:
                      factor.severity === "high"
                        ? "rgba(255, 71, 87, 0.2)"
                        : "rgba(255, 165, 2, 0.2)",
                    color: factor.severity === "high" ? "#ff4757" : "#ffa502",
                  }}
                >
                  {factor.severity} risk
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Diabetes Information */}
        <div className="card">
          <h3>Understanding Diabetes Risk</h3>
          <div className="diabetes-grid">
            <div
              className="diabetes-card"
              style={{ borderTop: "4px solid #1976d2" }}
            >
              <h4>Type 1 Diabetes</h4>
              <div className="diabetes-content">
                <p>
                  Autoimmune condition where pancreas produces little or no
                  insulin.
                </p>
                <div className="risk-factors">
                  <span>Risk Factors:</span>
                  <ul>
                    <li>Family history</li>
                    <li>Genetic predisposition</li>
                    <li>Age (usually develops in children/young adults)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div
              className="diabetes-card"
              style={{ borderTop: "4px solid #388e3c" }}
            >
              <h4>Type 2 Diabetes</h4>
              <div className="diabetes-content">
                <p>
                  Body becomes resistant to insulin or doesn't produce enough
                  insulin.
                </p>
                <div className="risk-factors">
                  <span>Risk Factors:</span>
                  <ul>
                    <li>Family history</li>
                    <li>Obesity</li>
                    <li>Physical inactivity</li>
                    <li>Age (over 45)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div
              className="diabetes-card"
              style={{ borderTop: "4px solid #7b1fa2" }}
            >
              <h4>Type 3 Diabetes</h4>
              <div className="diabetes-content">
                <p>
                  Proposed term for Alzheimer's disease linked to insulin
                  resistance in the brain.
                </p>
                <div className="risk-factors">
                  <span>Risk Factors:</span>
                  <ul>
                    <li>Family history of Alzheimer's</li>
                    <li>ApoE4 gene</li>
                    <li>Metabolic syndrome</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div
          className="recommendations-card"
          style={{
            background: riskVisuals.bgColor,
            borderLeft: `4px solid ${riskVisuals.color}`,
          }}
        >
          <h3>Recommendations Based on Your Assessment</h3>
          {assessment?.riskLevel === "high" ? (
            <div className="recommendation-content">
              <div className="recommendation-icon" style={{ color: "#ff4757" }}>
                <FaExclamationTriangle />
              </div>
              <div>
                <h4>Critical Risk</h4>
                <p>
                  We strongly recommend consulting with a genetic counselor and
                  scheduling a comprehensive health screening. Early
                  intervention is crucial.
                </p>
                <ul>
                  <li>Schedule an appointment with an endocrinologist</li>
                  <li>Consider genetic testing</li>
                  <li>Begin lifestyle modifications immediately</li>
                </ul>
              </div>
            </div>
          ) : assessment?.riskLevel === "moderate" ? (
            <div className="recommendation-content">
              <div className="recommendation-icon" style={{ color: "#ffa502" }}>
                <FaExclamationTriangle />
              </div>
              <div>
                <h4>Moderate Risk</h4>
                <p>
                  Consider lifestyle modifications and regular monitoring. A
                  follow-up with your primary care physician is advised.
                </p>
                <ul>
                  <li>Annual blood glucose testing</li>
                  <li>Weight management program</li>
                  <li>Regular physical activity</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="recommendation-content">
              <div className="recommendation-icon" style={{ color: "#2ed573" }}>
                <FaCheckCircle />
              </div>
              <div>
                <h4>Normal Risk</h4>
                <p>
                  Maintain healthy lifestyle habits. Regular check-ups are still
                  recommended for preventive care.
                </p>
                <ul>
                  <li>Continue balanced diet and exercise</li>
                  <li>Regular health screenings</li>
                  <li>Monitor family health history</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

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

          <AppButton text={"Book a Consultation"} />
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
          <AppButton
            text="View Records"
            onClick={() => navigate("/app/counselling/questionnaires")}
          />
        </div>
        <div className="report-image">
          <img src={HealthRecord} alt="Health Record Secure" />
        </div>
      </div>
    </div>
  );
};

export default Result;
