import React, { useState } from "react";
import {
  FiArrowLeft,
  FiCheck,
  FiZap,
  FiShield,
  FiHeart,
  FiActivity,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import AppButton from "../../../../Components/AppButton";

const Home = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState("6");

  // ⛔️ NO JSX IN STATE! Use icon names instead.
  const benefits = {
    3: [
      { icon: "activity", text: "Full Genetic Assessment via Helix AI" },
      { icon: "heart", text: "Personalized Nutrigenomics Report & Diet Plan" },
      {
        icon: "zap",
        text: "2 Free Doctor Consultations (Oncology, Endocrinology, Nutrition)",
      },
      { icon: "shield", text: "10% Discounted Vaccination Services" },
      {
        icon: "check",
        text: "Access to Health Locker (store + share medical reports securely)",
      },
    ],
    6: [
      { icon: "zap", text: "4 Free Doctor Consultations" },
      {
        icon: "activity",
        text: "1 Free Preventive Lab Test (based on risk category)",
      },
      {
        icon: "heart",
        text: "Advanced Nutrigenomics Personalization (updated every 45 days)",
      },
      {
        icon: "check",
        text: "Premium Helix Insights (sleep, activity, hydration, immunity)",
      },
      {
        icon: "shield",
        text: "Priority Lab Bookings + Free Home Sample Collection",
      },
      {
        icon: "check",
        text: "Access to Health Locker (store + share medical reports securely)",
      },
    ],
  };

  const iconMap = {
    check: <FiCheck />,
    zap: <FiZap />,
    shield: <FiShield />,
    heart: <FiHeart />,
    activity: <FiActivity />,
  };

  const planDetails = {
    3: {
      duration: "3 Months",
      price: "₹2,999",
      monthly: "₹999/mo",
      description:
        "Ideal for individuals beginning their preventive health journey",
    },
    6: {
      duration: "6 Months",
      price: "₹4,999",
      monthly: "₹833/mo",
      savings: "Save 30%",
      description: "Best value for comprehensive health monitoring",
    },
  };

  const handleStartTrial = () => {
    navigate("/app/subscription/summary", {
      state: {
        selectedPlan,
        benefits: benefits[selectedPlan], // ✅ Now contains only strings
        planInfo: planDetails[selectedPlan],
      },
    });
  };

  return (
    <div className="subscription-container">
      {/* Hero Section */}
      <div className="subscription-hero">
        <div className="hero-content">
          <button className="back-button" onClick={() => window.history.back()}>
            <FiArrowLeft className="hero-icon" />
          </button>
          <h1 className="hero-title">Premium Health Plans</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="subscription-content">
        {/* Header */}
        <div className="plan-header">
          <h2>
            <span className="highlight">Unlock</span> Premium Health with{" "}
            <span className="brand">Hyperlink</span>
          </h2>
          <p className="header-description">
            Stay on top of your genetic health, nutrition, and preventive care
            with our comprehensive subscription packages.
          </p>
        </div>

        {/* Plan Cards */}
        <div className="plan-cards">
          <div
            className={`plan-card ${selectedPlan === "3" ? "active" : ""}`}
            onClick={() => setSelectedPlan("3")}
          >
            <div className="plan-duration">3 Months</div>
            <div className="plan-price">
              <span className="price-amount">₹2,999</span>
              <span className="price-monthly">₹999/mo</span>
            </div>
            <div className="plan-description">
              Ideal for individuals beginning their preventive health journey
            </div>
          </div>

          <div
            className={`plan-card featured ${
              selectedPlan === "6" ? "active" : ""
            }`}
            onClick={() => setSelectedPlan("6")}
          >
            <div className="plan-badge">Most Popular</div>
            <div className="plan-duration">6 Months</div>
            <div className="plan-price">
              <span className="price-amount">₹4,999</span>
              <span className="price-monthly">₹833/mo</span>
            </div>
            <div className="plan-savings">Save 30%</div>
            <div className="plan-description">
              Best value for comprehensive health monitoring
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="benefits-section">
          <h3 className="benefits-title">What's included:</h3>
          <ul className="benefits-list">
            {benefits[selectedPlan].map((benefit, index) => (
              <li key={index} className="benefit-item">
                <span className="benefit-icon">{iconMap[benefit.icon]}</span>
                <span>{benefit.text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA Section */}
        <div className="cta-section">
          <AppButton
            text="Start 7-Day Free Trial"
            className="cta-button"
            onClick={handleStartTrial}
          />
          <p className="disclaimer">
            ₹{selectedPlan === "3" ? "2,999" : "4,999"} billed at the end of
            trial unless canceled. Plans renew automatically. Cancel anytime.
          </p>
        </div>
      </div>

      <style>
        {`
        /* Modern CSS Styles */
.subscription-container {
  background-color: #f5f7fa;
  min-height: 100vh;
  color: #2d3748;
}

/* Hero Section */
.subscription-hero {
  background: linear-gradient(to bottom, #4a90e2, #8c60e2);
  padding: 20px;
  border-radius: 0 0 32px 32px;
  color: white;
  position: relative;
  box-shadow: 0 10px 30px rgba(74, 144, 226, 0.2);
}

.hero-content {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  text-align: left;
  gap: 1rem;
}

.back-button {
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

.back-button:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

.hero-icon {
  font-size: 18px;
  color: white;
}

.hero-title {
  font-size: 1rem;
  font-weight: 500;
  margin: 0;
  flex: 1;
  line-height: 1.2;
}

/* Main Content */
.subscription-content {
  max-width: 800px;
  margin: 2rem auto 0;
  padding: 0 1.5rem 3rem;
  position: relative;
  z-index: 1;
}

.plan-header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.plan-header h2 {
  font-size: 1.75rem;
  margin-bottom: 0.75rem;
  font-weight: 700;
}

.highlight {
  color: #6e8efb;
}

.brand {
  color: #a777e3;
  font-weight: 700;
}

.header-description {
  color: #64748b;
  font-size: 1rem;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.5;
}
/* Plan Cards */
.plan-cards {
  display: flex;
  gap: 1rem;
  margin: 2rem 0;
  justify-content: center;
  overflow: visible;
}

/* Each Plan Card */
.plan-card {
  width: 250px; /* Wider to accommodate wrapped text */
  background: white;
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  cursor: pointer;
  border: 1px solid #e2e8f0;
  position: relative;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.plan-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
}

/* Highlight Active & Featured */
.plan-card.active {
  border: 2px solid #6e8efb;
  background-color: #f0f7ff;
}

.plan-card.featured {
  border: 2px solid #a777e3;
}

.plan-card.featured.active {
  background-color: #f7f1ff;
}

/* Discount Badge */
.plan-badge {
  position: absolute;
  top: -8px;
  right: 10px;
  background: #a777e3;
  color: white;
  font-size: 0.65rem;
  font-weight: 600;
  padding: 0.2rem 0.5rem;
  border-radius: 10px;
  box-shadow: 0 3px 10px rgba(167, 119, 227, 0.25);
}

/* Plan Info */
.plan-duration {
  font-size: 1rem;
  font-weight: 600;
  color: #475569;
  margin-bottom: 0.3rem;
}

.plan-price {
  margin: 0.4rem 0;
}

.price-amount {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
}

.price-monthly {
  display: block;
  font-size: 0.8rem;
  color: #64748b;
  margin-top: 0.2rem;
}

.plan-savings {
  color: #10b981;
  font-weight: 600;
  font-size: 0.75rem;
  margin-bottom: 0.4rem;
}

/* Description stays inside the box */
.plan-description {
  font-size: 0.75rem;
  color: #64748b;
  padding-top: 0.5rem;
  border-top: 1px dashed #e2e8f0;
  margin-top: auto;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

/* Responsive */
@media (max-width: 600px) {
  .plan-card {
    width: 100%;
    max-width: 90%;
  }

  .plan-cards {
    justify-content: center;
  }
}

/* Benefits Section */
.benefits-section {
  background: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
  margin: 2.5rem 0;
  border: 1px solid #e2e8f0;
}

.benefits-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #1e293b;
  text-align: center;
}

.benefits-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.benefit-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid #f1f5f9;
  font-size: 0.95rem;
  line-height: 1.5;
}

.benefit-item:last-child {
  border-bottom: none;
}

.benefit-icon {
  color: #6e8efb;
  font-size: 1.1rem;
  margin-top: 0.15rem;
  flex-shrink: 0;
}

/* CTA Section */
.cta-section {
  text-align: center;
  margin-top: 2rem;
}

.cta-button {
  background: linear-gradient(135deg, #6e8efb, #a777e3);
  border: none;
  color: white;
  font-weight: 600;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-size: 1rem;
  box-shadow: 0 8px 20px rgba(110, 142, 251, 0.3);
  transition: all 0.3s ease;
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 24px rgba(110, 142, 251, 0.4);
}

.disclaimer {
  font-size: 0.8rem;
  color: #94a3b8;
  margin-top: 1.5rem;
  line-height: 1.5;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .hero-title {
    font-size: 1.5rem;
  }

  .plan-header h2 {
    font-size: 1.5rem;
  }
}
`}
      </style>
    </div>
  );
};

export default Home;
