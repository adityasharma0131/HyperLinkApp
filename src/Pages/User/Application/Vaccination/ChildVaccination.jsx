import React, { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { FiFilter } from "react-icons/fi";
import { FiCalendar } from "react-icons/fi";
import { FiChevronRight } from "react-icons/fi";
import { FiAward } from "react-icons/fi";
import { FiPackage } from "react-icons/fi";
import { FiClock } from "react-icons/fi";
import { FiInfo } from "react-icons/fi";
import { FaMicrophone } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { IoChevronDownSharp } from "react-icons/io5";
import { GiLoveInjection } from "react-icons/gi";

import ChildVaccineHero from "../../../../assets/ChildVaccineHero.svg";
import AppButton from "../../../../Components/AppButton";
import "./style.css";

const ChildVaccination = () => {
  const [isAgeDropdownOpen, setIsAgeDropdownOpen] = useState(false);
  const [selectedAge, setSelectedAge] = useState("0-2 weeks");

  const handleAgeSelect = (age) => {
    setSelectedAge(age);
    setIsAgeDropdownOpen(false);
  };
  const formatINR = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);

  const VaccineCard = ({
    name,
    description,
    doses,
    price,
    isRecommended,
    tag = "Essential",
    scheduleAt = "At birth",
    size = "compact", // "compact" | "regular"
    onSchedule,
    onInfo,
  }) => {
    return (
      <div
        className={`vaccine-card ${size === "compact" ? "is-compact" : ""} ${
          isRecommended ? "recommended" : ""
        }`}
      >
        {isRecommended && (
          <div className="recommended-badge" aria-label="Recommended badge">
            <FiAward className="badge-icon" />
            <span>Recommended</span>
          </div>
        )}

        <div className="card-content">
          <div className="vaccine-icon-container" aria-hidden="true">
            <div className="vaccine-icon-bg">
              <GiLoveInjection size={22} className="vaccine-icon" />
            </div>
          </div>

          <div className="vaccine-info">
            <div className="info-header">
              <h2 className="vaccine-name">{name}</h2>
              {tag && <div className="vaccine-tag">{tag}</div>}
            </div>

            {/* Clamp description to 2 lines, with title for full text on hover */}
            <p className="vaccine-desc" title={description}>
              {description}
            </p>

            <div className="vaccine-meta">
              <div className="meta-item" aria-label={`${doses} doses`}>
                <FiPackage size={14} />
                <span>{doses} doses</span>
              </div>
              <div className="meta-item" aria-label={scheduleAt}>
                <FiClock size={14} />
                <span>{scheduleAt}</span>
              </div>
            </div>

            <div className="vaccine-price-container">
              <div className="price-info">
                <h3 className="vaccine-price">{formatINR(price)}</h3>
                <span className="price-unit">per dose</span>
              </div>

              <div className="vaccine-buttons">
                <AppButton
                  text="Schedule"
                  icon={FiCalendar}
                  onClick={onSchedule}
                />
                <AppButton
                  variant="secondary"
                  text="Info"
                  icon={FiInfo}
                  onClick={onInfo}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="child-vaccine-page">
      <div className="child-vaccine-hero">
        {/* Top bar with back button */}
        <div className="hero-top-bar">
          <button className="icon-button" onClick={() => window.history.back()}>
            <FiArrowLeft className="hero-icon" />
          </button>
        </div>

        {/* Main content */}
        <div className="hero-content">
          <div className="hero-text">
            <h1>
              Childhood
              <br />
              Vaccination
            </h1>
            <p className="hero-subtitle">
              Protect your child with the right vaccines at the right time.
            </p>
          </div>

          <div className="hero-image">
            <span className="image-decoration" />
            <img src={ChildVaccineHero} alt="Child receiving vaccine" />
          </div>
        </div>

        {/* Search bar */}
        <div className="search-bar hero-search">
          <IoIosSearch className="search-icon" />
          <input type="text" placeholder="Search vaccines, age, etc." />
          <FaMicrophone className="mic-icon" />
        </div>
      </div>
      <div className="vaccine-filter-container">
        <div className="vacc-filter">
          <div className="filter-label">
            <FiFilter className="filter-icon" />
            <span>Filter By</span>
          </div>

          <div
            className="filter-dropdown"
            onClick={() => setIsAgeDropdownOpen(!isAgeDropdownOpen)}
          >
            <div className="selected-option">
              <FiCalendar className="option-icon" />
              <span>{selectedAge}</span>
            </div>
            <IoChevronDownSharp
              className={`dropdown-icon ${isAgeDropdownOpen ? "open" : ""}`}
            />

            {isAgeDropdownOpen && (
              <div className="dropdown-menu">
                {[
                  "0-2 weeks",
                  "1-6 months",
                  "6-12 months",
                  "1-2 years",
                  "2-5 years",
                ].map((age) => (
                  <div
                    key={age}
                    className="dropdown-item"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAgeSelect(age);
                    }}
                  >
                    {age}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="vaccine-list-container">
        <div className="section-header">
          <h3 className="section-title">Recommended Vaccines</h3>
          <button className="view-all-btn">
            View all <FiChevronRight className="btn-icon" />
          </button>
        </div>

        <div className="vaccine-list">
          <VaccineCard
            name="BCG Vaccine"
            description="Protects against tuberculosis, recommended for all newborns. This vaccine helps prevent severe TB in children."
            doses={1}
            price={479}
            isRecommended
            size="compact"
            scheduleAt="At birth"
          />

          <VaccineCard
            name="Hepatitis B"
            description="Prevents hepatitis B infection given at birth; reduces risk of chronic liver disease."
            doses={3}
            price={650}
            isRecommended
            size="compact"
            scheduleAt="At birth"
          />

          <VaccineCard
            name="OPV (Polio)"
            description="Oral polio vaccine for birth and infancy; critical for preventing paralysis."
            doses={4}
            price={320}
            size="compact"
            scheduleAt="At birth & infancy"
          />
        </div>
      </div>
    </div>
  );
};

export default ChildVaccination;
