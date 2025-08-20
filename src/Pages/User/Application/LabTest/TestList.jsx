import React, { useState, useEffect } from "react";
import { FiArrowLeft, FiCalendar, FiInfo, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { IoIosArrowDown, IoIosArrowUp, IoIosSearch } from "react-icons/io";
import { FaMicrophone } from "react-icons/fa";
import { GiLoveInjection } from "react-icons/gi";
import AppButton from "../../../../Components/AppButton";

import LabTestInfoTray from "./LabTestInfoTray";
import "./style.css";

const TestList = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTest, setSelectedTest] = useState(null);
  const [expandedTestId, setExpandedTestId] = useState(null);
  const [filteredTests, setFilteredTests] = useState([]);

  // Sample Lab Tests Data
  const labTests = [
    {
      id: 1,
      name: "Diabetes Screening (HbA1C & Fasting Sugar)",
      tests: 2,
      reportTime: "15 hours",
      price: 479,
      originalPrice: 625,
      discount: "25% off",
      ainfo: {
        purpose: "Helps diagnose and monitor diabetes.",
        parameters: [
          "HbA1C (Glycated Hemoglobin)",
          "Fasting Blood Sugar (Glucose Level)",
        ],
      },
    },
    {
      id: 2,
      name: "Thyroid Profile (T3, T4, TSH)",
      tests: 3,
      reportTime: "12 hours",
      price: 399,
      originalPrice: 550,
      discount: "28% off",
      ainfo: {
        purpose: "Evaluates thyroid gland function and hormone imbalance.",
        parameters: [
          "T3 (Triiodothyronine)",
          "T4 (Thyroxine)",
          "TSH (Thyroid Stimulating Hormone)",
        ],
      },
    },
    {
      id: 3,
      name: "Liver Function Test (LFT)",
      tests: 7,
      reportTime: "18 hours",
      price: 699,
      originalPrice: 950,
      discount: "26% off",
      ainfo: {
        purpose: "Assesses overall liver health and function.",
        parameters: [
          "Bilirubin (Total, Direct, Indirect)",
          "SGPT (ALT)",
          "SGOT (AST)",
          "Alkaline Phosphatase (ALP)",
          "Total Protein",
          "Albumin",
          "Globulin",
        ],
      },
    },
    {
      id: 4,
      name: "Kidney Function Test (KFT)",
      tests: 6,
      reportTime: "20 hours",
      price: 649,
      originalPrice: 880,
      discount: "26% off",
      ainfo: {
        purpose: "Checks kidney health and filtration efficiency.",
        parameters: [
          "Blood Urea",
          "Serum Creatinine",
          "Uric Acid",
          "Sodium",
          "Potassium",
          "Chloride",
        ],
      },
    },
    {
      id: 5,
      name: "Complete Blood Count (CBC)",
      tests: 24,
      reportTime: "10 hours",
      price: 299,
      originalPrice: 400,
      discount: "25% off",
      ainfo: {
        purpose: "Provides a complete overview of blood health.",
        parameters: [
          "Hemoglobin",
          "Red Blood Cells (RBC)",
          "White Blood Cells (WBC)",
          "Platelet Count",
          "Hematocrit",
          "MCV, MCH, MCHC",
          "Differential Count (Neutrophils, Lymphocytes, Monocytes, Eosinophils, Basophils)",
        ],
      },
    },
    {
      id: 6,
      name: "Vitamin D & B12 Test",
      tests: 2,
      reportTime: "24 hours",
      price: 899,
      originalPrice: 1200,
      discount: "25% off",
      ainfo: {
        purpose:
          "Detects vitamin deficiencies affecting bone, nerve, and energy health.",
        parameters: ["Vitamin D (25-Hydroxy)", "Vitamin B12 (Cobalamin)"],
      },
    },
  ];

  // Filter tests based on search query
  useEffect(() => {
    const filtered = labTests.filter((test) =>
      test.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredTests(filtered);
  }, [searchQuery]);

  const toggleExpand = (testId) => {
    setExpandedTestId(expandedTestId === testId ? null : testId);
  };

  const handleBookTest = (test) => {
    // In a real app, this would navigate to booking page
    console.log("Booking test:", test.name);
    alert(`Booking ${test.name} for ₹${test.price}`);
  };

  return (
    <div className="labtest-list-page">
      {/* Hero Section */}
      <div className="labtest-list-hero">
        <div className="hero-top-bar">
          <button
            className="icon-button"
            onClick={() => navigate(-1)}
            aria-label="Go back"
          >
            <FiArrowLeft className="hero-icon" />
          </button>
          <h1 className="hero-title">Blood Tests</h1>
        </div>

        {/* Search Bar */}
        <div className="search-bar hero-search">
          <IoIosSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search Lab Tests..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FaMicrophone className="mic-icon" />
        </div>
      </div>

      {/* Test Cards List */}
      <div className="labtest-cards-container">
        <div className="labtest-list">
          {filteredTests.length > 0 ? (
            filteredTests.map((test) => (
              <div className="test-list-container" key={test.id}>
                {/* Test Card */}
                <div className="test-card">
                  <div className="labtest-icon-container">
                    <div className="test-icon-bg">
                      <GiLoveInjection className="test-icon" />
                    </div>
                  </div>

                  <div className="test-info">
                    <div className="test-header">
                      <h2 className="test-title">{test.name}</h2>
                    </div>

                    {/* Clicking here will now open Info Tray */}
                    <p
                      className="test-sub clickable"
                      onClick={() => setSelectedTest(test)}
                    >
                      Contains {test.tests} tests
                      <IoIosArrowDown className="arrow-icon" />
                    </p>

                    <p className="test-report">
                      Report within {test.reportTime}
                    </p>
                  </div>
                </div>

                {/* Pricing Section */}
                <div className="price-section">
                  <div className="price-info">
                    <h3 className="final-price">₹{test.price}</h3>
                    <span className="original-price">
                      ₹{test.originalPrice}
                    </span>
                    <span className="discount">{test.discount}</span>
                  </div>
                  <div className="test-buttons">
                    <AppButton
                      icon={FiCalendar}
                      text={"Book"}
                      onClick={() => handleBookTest(test)}
                    />
                    <AppButton
                      icon={FiInfo}
                      text={"Info"}
                      variant="secondary"
                      onClick={() => setSelectedTest(test)}
                    />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">
              <p>No lab tests found.</p>
              <p>Try a different search term.</p>
            </div>
          )}
        </div>
      </div>

      {/* Info Tray */}
      {selectedTest && (
        <LabTestInfoTray
          test={selectedTest}
          onClose={() => setSelectedTest(null)}
        />
      )}

      <style>
        {`
        /* -------- Page Layout -------- */
.labtest-list-page {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  min-height: 100vh;
}

/* -------- Hero Section -------- */
.labtest-list-hero {
  background: linear-gradient(to bottom, #4a90e2, #8c60e2);
  padding: 20px;

  margin-bottom: 3rem;
  padding-bottom: 40px; /* extra space for search bar */
  border-radius: 0 0 32px 32px;
  color: white;
  box-shadow: 0 10px 30px rgba(74, 144, 226, 0.2);
  position: relative; /* important: anchor for absolute child */
}

.hero-top-bar {
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
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
  line-height: 1.2;
}

/* -------- Search Bar -------- */
.search-bar {
  display: flex;
  align-items: center;
  background: #ffffff;
  border-radius: 999px;
  padding: 10px 16px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
}

.search-bar input {
  flex: 1;
  border: none;
  outline: none;
  padding: 6px 10px;
  font-size: 14px;
  background: transparent;
}

.search-icon,
.mic-icon {
  color: #6b7280;
  font-size: 16px;
}

.hero-search {
  position: absolute;
  bottom: -26px; /* pulls it slightly out of purple */
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 40px);
  max-width: 500px;
} /* -------- Test Card Container -------- */
.test-list-container {
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 4px 18px rgba(0, 0, 0, 0.07);
    padding: 18px;
    position: relative;
    overflow: hidden;
    transition: transform 0.25s ease, box-shadow 0.25s ease;
    border: 1px solid #eef2f7;
}

.test-list-container:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

/* -------- Test Card Layout -------- */

.labtest-cards-container {
    padding: 0 20px;
    margin: 28px 0;
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
}

.labtest-list{
    display: grid
;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 16px;
}
.test-card {
  display: flex;
  gap: 14px;
  margin-bottom: 16px;
}

/* Icon */
.labtest-icon-container {
  flex-shrink: 0;
}

.test-icon-bg {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #f3f4ff, #e0e7ff);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.test-icon {
  color: #7c3aed;
  font-size: 22px;
}

/* Info */
.test-info {
  flex: 1;
}

.test-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.test-title {
  font-size: 16px;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
  line-height: 1.3;
}

.arrow-icon {
  font-size: 18px;
  color: #64748b;
  flex-shrink: 0;
}
.test-sub {
  font-size: 13px;
  color: #475569;
  margin: 6px 0 4px 0;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
}

.test-report {
  font-size: 12px;
  color: #64748b;
  margin: 0;
}

@media (max-width: 768px) {
    .labtest-list {
        grid-template-columns: 1fr;
    }
}

/* -------- Pricing Section -------- */
.price-section {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.price-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.final-price {
  font-size: 18px;
  font-weight: 900;
  color: #1e293b;
  margin: 0;
}

.original-price {
  font-size: 13px;
  color: #94a3b8;
  text-decoration: line-through;
}

.discount {
  font-size: 13px;
  color: #16a34a;
  font-weight: 600;
  background: #e9f7ef;
  padding: 2px 6px;
  border-radius: 6px;
}

/* Buttons */
.test-buttons {
  display: flex;
  gap: 10px;
}

/* -------- Responsive -------- */
@media (max-width: 480px) {
  .test-list-container {
    padding: 14px;
  }

  .test-card {
    flex-direction: column;
    gap: 10px;
  }

.labtest-cards-container {
          padding: 0 16px;

}
  .price-section {
    flex-direction: column;
    align-items: flex-start;
  }

  .test-buttons {
    width: 100%;
  }
}
`}
      </style>
    </div>
  );
};

export default TestList;
