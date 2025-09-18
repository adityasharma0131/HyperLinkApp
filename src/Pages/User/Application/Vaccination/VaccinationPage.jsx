import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiShare2,
  FiShoppingCart,
  FiClock,
  FiChevronDown,
} from "react-icons/fi";
import {
  FaSyringe,
  FaShieldAlt,
  FaCalendarAlt,
  FaUser,
  FaClipboard,
  FaUserCheck,
} from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";

import childVaccData from "./ChildVaccData.json";
import adultVaccData from "./AdultVaccData.json";
import travelVaccData from "./TravelVaccData.json"; // ✅ NEW
import GridInfoTray from "./GridInfoTray";

const VaccinationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { vaccineName } = location.state || {};

  const [vaccineData, setVaccineData] = useState(null);
  const [trayOpen, setTrayOpen] = useState(false);
  const [trayContent, setTrayContent] = useState("");
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "Is this vaccine safe?",
      answer: "Yes, it is safe for eligible individuals.",
    },
    {
      question: "Are there side effects?",
      answer: "Only mild side effects like soreness or fever.",
    },
  ];

  // ✅ Combine child + adult + travel data
  useEffect(() => {
    if (!vaccineName) return;

    const allVaccines = [
      ...(childVaccData?.vaccineData || []),
      ...(adultVaccData?.vaccineData || []),
      ...(travelVaccData?.vaccineData || []), // ✅ Travel added
    ];

    const found = allVaccines.find((v) => v.name === vaccineName);
    setVaccineData(found || null);
  }, [vaccineName]);

  const handleCardClick = (type) => {
    if (!vaccineData) return;

    let content = {};
    switch (type) {
      case "doses":
        content = {
          title: "Doses Required",
          body: `${vaccineData.doses} dose(s) are recommended as per the schedule: ${vaccineData.scheduleAt}`,
        };
        break;
      case "eligibility":
        content = {
          title: "Eligibility",
          body: vaccineData.eligibility,
        };
        break;
      case "precautions":
        content = {
          title: "Precautions",
          body: vaccineData.precautions,
        };
        break;
      case "administration":
        content = {
          title: "Administration",
          body: vaccineData.administration,
        };
        break;
      default:
        content = {
          title: "Details",
          body: "No information available",
        };
    }

    setTrayContent(content);
    setTrayOpen(true);
  };

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (!vaccineData) {
    return <div>Loading vaccine details...</div>;
  }

  return (
    <div className="labtest-test-page">
      {/* Hero */}
      <div className="labtest-test-hero">
        <div className="hero-top-bar">
          <div className="hero-left">
            <button className="icon-button" onClick={() => navigate(-1)}>
              <FiArrowLeft className="hero-icon" />
            </button>
            <h2 className="hero-title">
              {vaccineData.name.toUpperCase()} VACCINE DETAILS
            </h2>
          </div>

          <div className="hero-right">
            <button className="icon-button">
              <FiShare2 className="hero-icon" />
            </button>
            <button className="icon-button">
              <FiShoppingCart className="hero-icon" />
            </button>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="labtest-content-container">
        <div className="modern-card">
          <div className="labtest-icon-container">
            <div className="test-icon-bg">
              <FaSyringe className="test-icon" />
            </div>
            <div className="test-text-content">
              <h2 className="test-title">{vaccineData.name} Vaccine</h2>
            </div>
          </div>
          <p className="test-subtitle">{vaccineData.description}</p>

          <div className="divider"></div>

          <div className="test-extra-column">
            <div className="extra-card">
              <div className="extra-icon-container">
                <FiClock className="extra-icon" />
              </div>
              <div>
                <p className="extra-label">Doses Required</p>
                <p className="extra-value">{vaccineData.doses}</p>
              </div>
            </div>
            <div className="extra-card">
              <div className="extra-icon-container">
                <FaShieldAlt className="extra-icon" />
              </div>
              <div>
                <p className="extra-label">Tag</p>
                <p className="extra-value">{vaccineData.tag}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="test-info-container">
          <h2 className="section-title">Know more about this vaccine</h2>

          <div className="test-description">
            {vaccineData.description}
            <span> See more</span>
          </div>

          <div className="card-grid three-columns">
            <div className="card" onClick={() => handleCardClick("doses")}>
              <div className="card-icons">
                <FaCalendarAlt className="card-icon" />
                <IoIosArrowForward className="arrow-icon" />
              </div>
              <div className="card-content">
                <h3>Doses</h3>
                <p>{vaccineData.doses}</p>
              </div>
            </div>

            <div
              className="card"
              onClick={() => handleCardClick("eligibility")}
            >
              <div className="card-icons">
                <FaUser className="card-icon" />
                <IoIosArrowForward className="arrow-icon" />
              </div>
              <div className="card-content">
                <h3>Eligibility</h3>
                <p>{vaccineData.eligibility?.slice(0, 20)}...</p>
              </div>
            </div>

            <div
              className="card"
              onClick={() => handleCardClick("precautions")}
            >
              <div className="card-icons">
                <FaClipboard className="card-icon" />
                <IoIosArrowForward className="arrow-icon" />
              </div>
              <div className="card-content">
                <h3>Precautions</h3>
                <p>Before vaccination</p>
              </div>
            </div>
          </div>

          <div
            className="single-card"
            onClick={() => handleCardClick("administration")}
          >
            <div className="card-icons">
              <FaUserCheck className="card-icon" />
              <IoIosArrowForward className="arrow-icon" />
            </div>
            <div>
              <p>Administration</p>
              <h3>Who gives the vaccine?</h3>
            </div>
          </div>

          <GridInfoTray
            isOpen={trayOpen}
            onClose={() => setTrayOpen(false)}
            content={trayContent}
          />
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

      {/* Bottom Booking Bar */}
      <div className="pricing-container">
        <div className="price-info">
          <div className="price-main">
            <span className="current-price">₹{vaccineData.price} /-</span>
          </div>
          <p className="price-note">Inclusive of all taxes</p>
        </div>

        <button
          className="book-test-button"
          onClick={() =>
            navigate(`/app/vaccination/cart`, {
              state: {
                vaccineName: vaccineData.name,
                price: vaccineData.price,
                doses: vaccineData.doses,
                tag: vaccineData.tag,
              },
            })
          }
        >
          Add to Cart
        </button>
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
  background: linear-gradient(to bottom, #6ea6e7 0%, #daeffe 50%, #e0d3ff 80%);
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
  color: #553fb5;
}
.hero-title {
  font-size: 18px;
  font-weight: 700;
  color: #553fb5;
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
  background: linear-gradient(to bottom, #f9d9ea, #e9def7);
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.test-icon {
  color: #553fb5;
  font-size: 24px;
}

.test-title {
  font-size: 17px;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 8px;
  line-height: 1.4;
}

.test-subtitle {
  font-size: 14px;
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
/* .test-stats-inline {
  display: flex;
  gap: 16px;
  font-size: 0.85rem;
  color: #4b5563;
  margin-top: 15px;
}

.inline-icon {
  font-size: 20px;
  color: #553fb5;
  margin-right: 10px;
  vertical-align: middle;
}

.test-stats-inline span {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.test-stats-inline p {
  font-size: 13px;
} */
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
  padding: 10px;
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
  background: linear-gradient(to bottom, #f9d9ea, #e9def7);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.extra-icon {
  font-size: 18px;
  color: #553fb5;
}

.extra-label {
  font-size: 12px;
  color: #6b7280;
  margin: 0;
}

.extra-value {
  font-size: 14px;
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
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 12px;
  color: #1a73e8;
}

.test-description {
  background: #fff;
  padding: 12px;
  border-radius: 12px;
  font-size: 11px;
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
  color: #553fb5;
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
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 10px;
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
    font-size: 14px;
  }
}
/* Container */
.faq-container {
  max-width: 750px;
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
  font-size: 12px;
  color: #555;
  line-height: 1.5;
}

/* Mobile */
@media (max-width: 600px) {
  .faq-heading {
    font-size: 16px;
  }
  .faq-item {
    padding: 14px;
  }
  .faq-question {
    font-size: 14px;
  }
}

.book-test-button {
  display: flex;
  font-family: "Outfit", sans-serif;

  justify-content: center;
  width: 100%;
  max-width: 400px;
  background-color: #553fb5;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
  align-items: flex-end;
}

.book-test-button:hover {
  background-color: #452c91;
}

.button-icon {
  margin-right: 8px;
  font-size: 1.2rem;
}
`}
      </style>
    </div>
  );
};

export default VaccinationPage;
