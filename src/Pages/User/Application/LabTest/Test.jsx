import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiShare2,
  FiShoppingCart,
  FiChevronDown,
} from "react-icons/fi";

import { GiLoveInjection } from "react-icons/gi";
import { FiInfo, FiClipboard, FiUserCheck, FiClock } from "react-icons/fi";
import AppButton from "../../../../Components/AppButton";
import {
  FaUser,
  FaFlask,
  FaShieldAlt,
  FaMapMarkerAlt,
  FaCalendarAlt,
} from "react-icons/fa";
import { BsGraphUp, BsCheckCircle } from "react-icons/bs";
import "./style.css";

const Test = () => {
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  const faqs = [
    {
      question: "What is Diabetes Screening?",
      answer:
        "It is a test that checks your blood sugar levels to detect early signs of diabetes.",
    },
    {
      question: "How long does the test take?",
      answer: "Most tests take around 10–15 minutes, depending on the type.",
    },
    {
      question: "Do I need to fast before the test?",
      answer:
        "Yes, for fasting blood sugar you should not eat or drink (except water) for 8–12 hours.",
    },
    {
      question: "When will I get my reports?",
      answer: "Reports are usually available within 24–48 hours.",
    },
  ];
  return (
    <div className="labtest-test-page">
      {/* Hero Section - unchanged */}
      <div className="labtest-test-hero">
        <div className="hero-top-bar">
          {/* Left side: back + title */}
          <div className="hero-left">
            <button
              className="icon-button"
              onClick={() => navigate(-1)}
              aria-label="Go back"
            >
              <FiArrowLeft className="hero-icon" />
            </button>
            <h2 className="hero-title">Lab Test Details</h2>
          </div>

          {/* Right side: share + cart */}
          <div className="hero-right">
            <button className="icon-button" aria-label="Share">
              <FiShare2 className="hero-icon" />
            </button>
            <button className="icon-button" aria-label="Cart">
              <FiShoppingCart className="hero-icon" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="labtest-content-container">
        {/* Test Info Card */}
        <div className="modern-card">
          <div className="labtest-icon-container">
            <div className="test-icon-bg">
              <GiLoveInjection className="test-icon" />
            </div>
            <div className="test-text-content">
              <h2 className="test-title">
                KFT with Electrolytes (Kidney Function Test with Electrolytes)
              </h2>
            </div>
          </div>
          <p className="test-subtitle">
            Also referred as{" "}
            <span className="highlight">
              RFT with Electrolytes (Renal Function Test with Electrolytes)
            </span>
          </p>

          {/* Small Info (Stats under header) */}
          <div className="test-stats-inline">
            <span>
              <BsGraphUp className="inline-icon" /> 40,557+ booked recently
            </span>
            <span>
              <FaUser className="inline-icon" /> For men & women
            </span>
          </div>

          {/* Divider */}
          <div className="divider"></div>

          {/* Report & Tests (stacked column) */}
          <div className="test-extra-column">
            <div className="extra-card">
              <div className="extra-icon-container">
                <FiClock className="extra-icon" />
              </div>
              <div>
                <p className="extra-label">Earliest reports in</p>
                <p className="extra-value">15 hours</p>
              </div>
            </div>
            <div className="extra-card">
              <div className="extra-icon-container">
                <FaFlask className="extra-icon" />
              </div>
              <div>
                <p className="extra-label">Contains</p>
                <p className="extra-value">8 tests</p>
              </div>
            </div>
          </div>
        </div>
        <div className="test-info-container">
          <h2 className="section-title">Know more about this test</h2>

          <div className="test-description">
            The KFT with Electrolytes (Kidney Function Test with Electrolytes)
            test evaluates your kidney function, helps detect kidney disease,
            and monitors an ongoing treatment response for kidney or blood
            pressure problems. This test also measures the levels of
            electrolytes to check for the water and pH balance...{" "}
            <span>See more</span>
          </div>

          {/* Three cards in a single row */}
          <div className="card-grid three-columns">
            <div className="card">
              <GiLoveInjection className="card-icon" />
              <div>
                <h3>Samples Required</h3>
                <p>Blood</p>
              </div>
            </div>

            <div className="card">
              <FiInfo className="card-icon" />
              <div>
                <h3>Find out</h3>
                <p>Why is this test booked?</p>
              </div>
            </div>

            <div className="card">
              <FiClipboard className="card-icon" />
              <div>
                <h3>Preparations</h3>
                <p>Overnight Fasting Required</p>
              </div>
            </div>
          </div>

          <div className="single-card">
            <FiUserCheck className="card-icon" />
            <div>
              <h3>Sample Collection</h3>
              <p>Who will collect your samples?</p>
            </div>
          </div>
        </div>

        <div className="popular-test-list">
          <h2 className="section-heading">Popular Tests</h2>

          <div className="popular-test-card">
            <div className="popular-labtest-icon-container">
              <div className="test-icon-bg">
                <GiLoveInjection className="test-icon" />
              </div>
            </div>

            <div className="test-info">
              <h3 className="popular-test-title">
                Diabetes Screening (HbAIC & Fasting Sugar)
              </h3>
              <AppButton text="Book Now" />
            </div>
          </div>
          <div className="popular-test-card">
            <div className="popular-labtest-icon-container">
              <div className="test-icon-bg">
                <GiLoveInjection className="test-icon" />
              </div>
            </div>

            <div className="test-info">
              <h3 className="popular-test-title">
                Kidney Function Test (KFT with Electrolytes)
              </h3>
              <AppButton text="Book Now" />
            </div>
          </div>
        </div>
        <div className="faq-container">
          <h1 className="faq-heading">FAQs</h1>

          <div className="faq-list">
            {faqs.map((item, index) => (
              <div
                className={`faq-item ${openIndex === index ? "active" : ""}`}
                key={index}
                onClick={() => toggleFAQ(index)}
              >
                <div className="faq-question">
                  <span>{item.question}</span>
                  <FiChevronDown
                    className={`faq-icon ${
                      openIndex === index ? "rotate" : ""
                    }`}
                  />
                </div>
                <div
                  className="faq-answer-wrapper"
                  style={{
                    maxHeight: openIndex === index ? "200px" : "0px",
                  }}
                >
                  <p className="faq-answer">{item.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing Section (fixed bottom bar) */}
      <div className="pricing-container">
        <div className="price-info">
          <div className="price-main">
            <span className="current-price">₹479</span>
            <span className="original-price">₹625</span>
            <span className="discount-badge">25% off</span>
          </div>
          <p className="price-note">Inclusive of all taxes</p>
        </div>
        <button className="add-cart-btn">Add to Cart</button>
      </div>
    </div>
  );
};

export default Test;
