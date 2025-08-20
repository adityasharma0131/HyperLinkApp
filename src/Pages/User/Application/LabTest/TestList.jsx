import React, { useState } from "react";
import { FiArrowLeft, FiCalendar, FiInfo } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { IoIosArrowDown, IoIosSearch } from "react-icons/io";
import { FaMicrophone } from "react-icons/fa";
import { GiLoveInjection } from "react-icons/gi";
import AppButton from "../../../../Components/AppButton";
import "./style.css";

const TestList = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  // --- Sample Lab Tests Data ---
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

  // --- Filtered based on Search ---
  const filteredTests = labTests.filter((test) =>
    test.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        {filteredTests.length > 0 ? (
          filteredTests.map((test) => (
            <div className="test-list-container" key={test.id}>
              {/* Test Card */}
              <div className="test-card">
                <div className="test-icon-container">
                  <div className="test-icon-bg">
                    <GiLoveInjection className="test-icon" />
                  </div>
                </div>

                <div className="test-info">
                  <div className="test-header">
                    <h2 className="test-title">{test.name}</h2>
                  </div>

                  <p className="test-sub">
                    Contains {test.tests} tests
                    <IoIosArrowDown className="arrow-icon" />
                  </p>
                  <p className="test-report">Report within {test.reportTime}</p>
                </div>
              </div>

              {/* Pricing Section */}
              <div className="price-section">
                <div className="price-info">
                  <h3 className="final-price">₹{test.price}</h3>
                  <span className="original-price">₹{test.originalPrice}</span>
                  <span className="discount">{test.discount}</span>
                </div>
                <div className="test-buttons">
                  <AppButton icon={FiCalendar} text={"Book Now"} />
                  <AppButton icon={FiInfo} text={"Info"} variant="secondary" />
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="no-results">No lab tests found.</p>
        )}
      </div>
    </div>
  );
};

export default TestList;
