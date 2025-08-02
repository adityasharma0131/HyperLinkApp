import { useLocation } from "react-router-dom";
import {
  FaHeartbeat,
  FaExclamationTriangle,
  FaCheckCircle,
  FaInfoCircle,
} from "react-icons/fa";
import "./style.css";

const Result = () => {
  const location = useLocation();
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

      <style>
        {`
        /* Modern Style.css */
:root {
  --font-primary: "Inter", "Segoe UI", Roboto, sans-serif;
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
  font-family: var(--font-primary);
  line-height: 1.6;
  color: var(--color-dark);
}

.result-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0;
  background-color: white;
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
  background: white;
  border-radius: var(--radius-md);
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: var(--shadow-sm);
  transition: var(--transition);
}

.card:hover {
  box-shadow: var(--shadow-md);
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
`}
      </style>
    </div>
  );
};

export default Result;
