import React from "react";
import { useLocation } from "react-router-dom";
import {
  FiCheck,
  FiZap,
  FiShield,
  FiHeart,
  FiActivity,
  FiArrowLeft,
  FiTag,
  FiArrowRight,
} from "react-icons/fi";
import AppButton from "../../../../Components/AppButton";

const Summary = () => {
  const location = useLocation();
  const { selectedPlan, benefits = [], planInfo = {} } = location.state || {};

  if (!location.state) {
    return (
      <div className="no-plan-selected">
        <p>No plan selected. Please go back and choose a plan.</p>
      </div>
    );
  }

  const iconMap = {
    check: <FiCheck className="benefit-icon" />,
    zap: <FiZap className="benefit-icon" />,
    shield: <FiShield className="benefit-icon" />,
    heart: <FiHeart className="benefit-icon" />,
    activity: <FiActivity className="benefit-icon" />,
  };

  const originalPrice = selectedPlan === "6" ? 5999 : 3499;
  const discount = originalPrice - parseInt(planInfo.price.replace("₹", ""));

  return (
    <div className="subscription-summary-page">
      {/* Unmodified Hero Section */}
      <div className="subscription-summary-hero">
        <div className="hero-top-bar">
          <button
            className="icon-button"
            onClick={() => window.history.back()}
            aria-label="Go back"
          >
            <FiArrowLeft className="hero-icon" />
          </button>
          <h1 className="hero-title">SUBSCRIPTION</h1>
        </div>
      </div>

      <div className="summary-container">
        {/* Plan Summary Card */}
        <div className="summary-card">
          <div className="plan-highlight">
            {planInfo.savings && (
              <div className="savings-badge">
                <FiTag className="badge-icon" />
                {planInfo.savings}
              </div>
            )}
            <h2 className="plan-duration">{planInfo.duration} Plan</h2>
            <div className="price-section">
              <div className="plan-price">{planInfo.price}</div>
              <div className="price-breakdown">
                <span className="monthly-price">₹{planInfo.monthly}/month</span>
                {selectedPlan === "6" && (
                  <span className="price-comparison">
                    <s>₹999/month</s>
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Coupon Section */}
          <div className="coupon-section">
            <div className="coupon-input">
              <input type="text" placeholder="Enter coupon code" />
              <button className="apply-button">Apply</button>
            </div>
          </div>

          {/* Bill Summary */}
          <div className="bill-summary">
            <h3 className="section-title">Bill Summary</h3>
            <div className="bill-details">
              <div className="bill-row">
                <span>Plan Price (MRP)</span>
                <span>₹{originalPrice}</span>
              </div>
              <div className="bill-row discount">
                <span>Discount</span>
                <span>-₹{discount}</span>
              </div>
              <div className="divider"></div>
              <div className="bill-total">
                <span>Total Amount</span>
                <span className="total-amount">{planInfo.price}</span>
              </div>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="benefits-section">
            <h3 className="section-title">Included Benefits</h3>
            <ul className="benefits-list">
              {benefits.map((item, index) => (
                <li key={index} className="benefit-item">
                  {iconMap[item.icon]}
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Payment CTA */}
        <div className="payment-cta">
          <div className="price-summary">
            <span>Pay {planInfo.price}</span>
            <span className="tax-note">+ applicable taxes</span>
          </div>
          <AppButton text={"Proceed to Payment"} icon={FiArrowRight} />
        </div>
      </div>
      <style>
        {`
        
        /* Modern CSS Styles */
.subscription-summary-page {
  background-color: #f8fafc;
  min-height: 100vh;
  color: #1e293b;
  padding-bottom: 100px;
}
.subscription-summary-hero {
  background: linear-gradient(to bottom, #4a90e2, #8c60e2);
  padding: 20px;
  border-radius: 0 0 32px 32px;
  color: white;
  position: relative;
  box-shadow: 0 10px 30px rgba(103, 108, 255, 0.2);
}

.hero-top-bar {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  text-align: left;
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
  font-size: 1.5rem;
  font-weight: 500;
  margin: 0;
  flex: 1;
  line-height: 1.2;
}

.summary-container {
  padding: 1.5rem;
  max-width: 500px;
  margin: 0 auto;
}

/* Summary Container */
.summary-container {
  max-width: 500px;
  margin: 0 auto;
  padding: 1.5rem;
  position: relative;
  z-index: 1;
}

/* Summary Card */
.summary-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  margin-bottom: 1.5rem;
}

/* Plan Highlight Section */
.plan-highlight {
  padding: 1.5rem;
  text-align: center;
  background: linear-gradient(135deg, #f0f9ff, #e0f2fe);
  position: relative;
}

.savings-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: #f59e0b;
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.35rem 0.75rem;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.badge-icon {
  font-size: 0.9rem;
}

.plan-duration {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e40af;
  margin: 0.5rem 0;
}

.price-section {
  margin: 1rem 0;
}

.plan-price {
  font-size: 2rem;
  font-weight: 700;
  color: #1e293b;
  line-height: 1;
}

.price-breakdown {
  margin-top: 0.5rem;
}

.monthly-price {
  font-size: 1rem;
  color: #475569;
  font-weight: 500;
}

.price-comparison {
  font-size: 0.85rem;
  color: #94a3b8;
  margin-left: 0.5rem;
}

/* Coupon Section */
.coupon-section {
  padding: 1rem 1.5rem;
  border-bottom: 1px dashed #e2e8f0;
}

.coupon-input {
  display: flex;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  overflow: hidden;
}

.coupon-input input {
  flex: 1;
  padding: 0.75rem;
  border: none;
  font-size: 0.95rem;
}

.coupon-input input:focus {
  outline: none;
}

.apply-button {
  background: #e2e8f0;
  border: none;
  padding: 0 1rem;
  font-weight: 600;
  color: #475569;
  cursor: pointer;
  transition: all 0.2s ease;
}

.apply-button:hover {
  background: #cbd5e1;
}

/* Bill Summary */
.bill-summary {
  padding: 1.5rem;
}

.section-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #1e293b;
}

.bill-details {
  background: #f8fafc;
  border-radius: 8px;
  padding: 1rem;
}

.bill-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.75rem;
  font-size: 0.95rem;
  color: #475569;
}

.bill-row.discount {
  color: #10b981;
  font-weight: 600;
}

.divider {
  height: 1px;
  background: #e2e8f0;
  margin: 0.75rem 0;
}

.bill-total {
  display: flex;
  justify-content: space-between;
  font-weight: 700;
  font-size: 1.1rem;
}

.total-amount {
  color: #1e40af;
}

/* Benefits Section */
.benefits-section {
  padding: 0 1.5rem 1.5rem;
}

.benefits-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.benefit-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid #f1f5f9;
  font-size: 0.95rem;
  line-height: 1.5;
}

.benefit-item:last-child {
  border-bottom: none;
}

.benefit-icon {
  color: #3b82f6;
  font-size: 1.1rem;
  margin-top: 0.15rem;
  flex-shrink: 0;
}

/* Payment CTA */
.payment-cta {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: white;
  padding: 1rem 1.5rem;
  box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.08);
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
}

.price-summary {
  display: flex;
  flex-direction: column;
}

.price-summary span:first-child {
  font-weight: 700;
  font-size: 1.1rem;
  color: #1e293b;
}

.tax-note {
  font-size: 0.75rem;
  color: #64748b;
}

.payment-button {
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: white;
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: none;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.25);
  transition: all 0.2s ease;
}

.payment-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(59, 130, 246, 0.3);
}

/* No Plan Selected State */
.no-plan-selected {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 2rem;
  text-align: center;
  color: #64748b;
}

/* Responsive Adjustments */
@media (max-width: 480px) {
  .summary-container {
    padding: 1rem;
  }

  .plan-highlight {
    padding: 1.5rem 1rem;
  }

  .benefits-section {
    padding: 0 1rem 1rem;
  }

  .payment-cta {
    padding: 1rem;
  }
}
`}
      </style>
    </div>
  );
};

export default Summary;
