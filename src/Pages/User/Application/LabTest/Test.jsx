import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiShare2,
  FiShoppingCart,
  FiChevronDown,
} from "react-icons/fi";
import { IoIosArrowForward } from "react-icons/io";

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
import GridInfoTray from "./GridInfoTray";
import "./style.css";

const Test = () => {
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState(0);

  const [trayOpen, setTrayOpen] = useState(false);
  const [trayContent, setTrayContent] = useState({});

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Define content for each card
  const cardContents = {
    samples: {
      title: "Samples Required",
      body: (
        <div>
          <p>For this test, we require a blood sample.</p>
          <h3>Collection Process:</h3>
          <ul>
            <li>A trained phlebotomist will collect your sample</li>
            <li>The process typically takes 5-10 minutes</li>
            <li>We use sterile, single-use equipment</li>
          </ul>
        </div>
      ),
    },
    information: {
      title: "Why This Test Is Booked",
      body: (
        <div>
          <p>This test has been booked for the following reasons:</p>
          <ul>
            <li>Routine health screening as per your age group</li>
            <li>Baseline measurement for future comparisons</li>
            <li>Assessment of specific health markers based on your profile</li>
          </ul>
          <p>
            If you have any questions about why this test was recommended,
            please consult with your healthcare provider.
          </p>
        </div>
      ),
    },
    preparations: {
      title: "Test Preparations",
      body: (
        <div>
          <h3>Overnight Fasting Required</h3>
          <p>For accurate results, please follow these instructions:</p>
          <ul>
            <li>
              Do not eat or drink anything (except water) for 8-12 hours before
              the test
            </li>
            <li>
              You may take prescribed medications with a small amount of water
            </li>
            <li>Avoid strenuous exercise before the test</li>
            <li>Continue drinking water to stay hydrated</li>
          </ul>
          <p>
            Fasting helps ensure accurate measurements of glucose, cholesterol,
            and other biomarkers.
          </p>
        </div>
      ),
    },
    collection: {
      title: "Sample Collection",
      body: (
        <div>
          <h3>Who will collect your samples?</h3>
          <p>
            Your sample will be collected by one of our certified phlebotomists
            who:
          </p>
          <ul>
            <li>Are trained and experienced in blood collection procedures</li>
            <li>Follow all safety and hygiene protocols</li>
            <li>
              Are committed to making the process as comfortable as possible
            </li>
          </ul>
          <p>
            Our phlebotomists undergo regular training and competency
            assessments to ensure the highest standards of care.
          </p>
        </div>
      ),
    },
  };

  const handleCardClick = (contentKey) => {
    setTrayContent(cardContents[contentKey]);
    setTrayOpen(true);
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
            <div className="card" onClick={() => handleCardClick("samples")}>
              <div className="card-icons">
                <GiLoveInjection className="card-icon" />
                <IoIosArrowForward className="arrow-icon" />
              </div>
              <div className="card-content">
                <h3>Samples Required</h3>
                <p>Blood</p>
              </div>
            </div>

            <div
              className="card"
              onClick={() => handleCardClick("information")}
            >
              <div className="card-icons">
                <FiInfo className="card-icon" />
                <IoIosArrowForward className="arrow-icon" />
              </div>
              <div className="card-content">
                <h3>Find out</h3>
                <p>Why is this test booked?</p>
              </div>
            </div>

            <div
              className="card"
              onClick={() => handleCardClick("preparations")}
            >
              <div className="card-icons">
                <FiClipboard className="card-icon" />
                <IoIosArrowForward className="arrow-icon" />
              </div>
              <div className="card-content">
                <h3>Preparations</h3>
                <p>Overnight Fasting Required</p>
              </div>
            </div>
          </div>

          <div
            className="single-card"
            onClick={() => handleCardClick("collection")}
          >
            <div className="card-icons">
              <FiUserCheck className="card-icon" />
              <IoIosArrowForward className="arrow-icon" />
            </div>
            <div>
              <h3>Sample Collection</h3>
              <p>Who will collect your samples?</p>
            </div>
          </div>

          <GridInfoTray
            isOpen={trayOpen}
            onClose={() => setTrayOpen(false)}
            content={trayContent}
          />
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
        <AppButton text={"Add to Cart"} />
      </div>

      <style>
        {`
        /* -------- Page Layout -------- */
.labtest-test-page {
  min-height: 100vh;
  background: #f5f7fa;
  display: flex;
  flex-direction: column;
}

.labtest-content-container {
  padding: 20px;
  max-width: 600px;
  margin: 0 auto 120px; /* leave space for bottom bar */
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* -------- Hero Section (unchanged) -------- */
.labtest-test-hero {
  background: linear-gradient(to bottom right, #4a90e2, #8c60e2);
  padding: 20px;
  border-radius: 0 0 32px 32px;
  color: white;
  box-shadow: 0 10px 30px rgba(74, 144, 226, 0.2);
}
.hero-top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between; /* space between left + right */
}

.hero-left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.hero-right {
  display: flex;
  align-items: center;
  gap: 0.6rem;
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
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
  line-height: 1.2;
}

/* -------- Modern Card Styling -------- */
.modern-card {
  background: #ffffff;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.modern-card:hover {
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
}

/* -------- Test Info Section -------- */
.labtest-icon-container {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.test-icon-bg {
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg, #f3f4ff, #e0e7ff);
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.test-icon {
  color: #7c3aed;
  font-size: 24px;
}

.test-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 8px;
  line-height: 1.4;
}

.test-subtitle {
  font-size: 0.95rem;
  color: #6b7280;
  margin: 0 0 12px;
  line-height: 1.5;
}

.highlight {
  background: #f3f4f6;
  padding: 3px 8px;
  border-radius: 6px;
  font-weight: 500;
  color: #4b5563;
}

/* -------- Inline Stats -------- */
.test-stats-inline {
  display: flex;
  gap: 16px;
  font-size: 0.85rem;
  color: #4b5563;
  margin-top: 12px;
}

.inline-icon {
  font-size: 14px;
  color: #4f46e5;
  margin-right: 6px;
  vertical-align: middle;
}

/* -------- Divider -------- */
.divider {
  height: 1px;
  background: #e5e7eb;
  margin: 20px 0;
}

/* -------- Extra Info Column -------- */
.test-extra-column {
  display: flex;
  gap: 16px;
}

.extra-card {
  flex: 1;
  background: #f9fafb;
  padding: 16px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: background 0.2s ease;
}

.extra-card:hover {
  background: #f3f4f6;
}

.extra-icon-container {
  width: 40px;
  height: 40px;
  background: #e0e7ff;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.extra-icon {
  font-size: 18px;
  color: #4f46e5;
}

.extra-label {
  font-size: 0.85rem;
  color: #6b7280;
  margin: 0;
}

.extra-value {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1f2937;
  margin: 4px 0 0;
}

/* -------- Pricing Section -------- */
.pricing-container {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #ffffff;
  border-radius: 16px 16px 0 0;
  width: 100%;
  box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.08);
}

.price-info {
  display: flex;
  flex-direction: column;
}

.price-main {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 4px;
}

.current-price {
  font-size: 1.5rem;
  font-weight: 800;
  color: #1f2937;
}

.original-price {
  font-size: 1rem;
  color: #9ca3af;
  text-decoration: line-through;
}

.discount-badge {
  background: #dcfce7;
  color: #16a34a;
  padding: 4px 8px;
  border-radius: 16px;
  font-size: 0.8rem;
  font-weight: 600;
}

.price-note {
  margin: 0;
  font-size: 0.8rem;
  color: #6b7280;
}

.add-cart-btn {
  background: linear-gradient(135deg, #4f46e5, #7c3aed);
  color: white;
  font-weight: 600;
  border: none;
  padding: 12px 24px;
  border-radius: 12px;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  font-size: 1rem;
  min-width: 140px;
}

.add-cart-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(79, 70, 229, 0.3);
}

/* Responsive adjustments */
@media (max-width: 480px) {
  .labtest-content-container {
    padding: 16px;
  }

  .test-extra-column {
    flex-direction: column;
  }

  .benefits-grid {
    grid-template-columns: 1fr;
  }

  .pricing-container {
    padding: 14px 16px;
  }

  .add-cart-btn {
    padding: 10px 16px;
    min-width: 120px;
  }
}
.test-info-container {
  max-width: 100%;
  margin: auto;
  background: linear-gradient(180deg, #d6efff 20%, #8c60e2 150%);
  padding: 12px;
  border-radius: 16px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
  box-sizing: border-box;
}

.section-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 12px;
  color: #1a73e8;
}

.test-description {
  background: #fff;
  padding: 12px;
  border-radius: 12px;
  font-size: 13px;
  line-height: 1.4;
  color: #444;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  margin-bottom: 16px;
}

.test-description span {
  color: #1a73e8;
  font-weight: 600;
  cursor: pointer;
}
.card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 cards per row */
  gap: 10px;
  margin-bottom: 16px;
  max-width: 100%;
  box-sizing: border-box;
}

.card,
.single-card {
  display: flex;
  flex-direction: column;
  gap: 8px;
  background: #fff;
  border-radius: 10px;
  padding: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  font-size: 13px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
  box-sizing: border-box;
}

.card,
.single-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.12);
}

/* Top row: icon left, arrow right */
.card-icons {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.card-icon {
  font-size: 20px;
  color: #6a1b9a;
}

.arrow-icon {
  font-size: 18px;
  color: #999;
}

.card-content {
  display: flex;
  flex-direction: column;
  margin-top: 4px;
}

.card-content h3 {
  font-size: 12px;
  font-weight: 500;
  color: #666;
  margin: 0 0 3px;
}

.card-content p {
  font-size: 13px;
  font-weight: bold;
  margin: 0;
  color: #222;
}

.popular-test-list {
  max-width: 800px;
}

.section-heading {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 20px;
  color: #1a73e8;
  text-align: left;
}

.popular-test-card {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  background: #ffffff;
  padding: 18px;
  margin-bottom: 16px;
  border-radius: 14px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.popular-test-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.12);
}

.popular-labtest-icon-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 14px;
}

.popular-test-info {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.popular-test-title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 12px;
  color: #333;
  line-height: 1.4;
  flex: 1;
}

@media (max-width: 600px) {
  .popular-est-card {
    align-items: flex-start;
    padding: 14px;
  }

  .popular-test-info {
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    gap: 12px;
  }

  .popular-test-title {
    font-size: 15px;
  }
}
/* Container */
.faq-container {
  max-width: 750px;
  margin: 0 auto;
}

/* Heading */
.faq-heading {
  font-size: 24px;
  font-weight: 700;
  color: #1a73e8;
  margin-bottom: 20px;
  text-align: left;
}

/* FAQ list layout */
.faq-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* FAQ card */
.faq-item {
  background: #ffffff;
  border-radius: 14px;
  padding: 18px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;
}

.faq-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

/* Active card border */
.faq-item.active {
  border: 1px solid #1a73e8;
}

/* Question */
.faq-question {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* Chevron icon */
.faq-icon {
  font-size: 20px;
  color: #1a73e8;
  transition: transform 0.3s ease;
}
.faq-icon.rotate {
  transform: rotate(180deg);
}

/* Answer animation */
.faq-answer-wrapper {
  overflow: hidden;
  transition: max-height 0.3s ease;
}
.faq-answer {
  margin-top: 10px;
  font-size: 14px;
  color: #555;
  line-height: 1.5;
}

/* Mobile */
@media (max-width: 600px) {
  .faq-heading {
    font-size: 20px;
  }
  .faq-item {
    padding: 14px;
  }
  .faq-question {
    font-size: 15px;
  }
}
`}
      </style>
    </div>
  );
};

export default Test;
