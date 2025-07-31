import React, { useState, useMemo } from "react";
import {
  FiArrowLeft,
  FiFilter,
  FiCalendar,
  FiAward,
  FiPackage,
  FiClock,
  FiInfo,
} from "react-icons/fi";
import { FaMicrophone } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { IoChevronDownSharp } from "react-icons/io5";
import { GiLoveInjection } from "react-icons/gi";

import ChildVaccineHero from "../../../../assets/ChildVaccineHero.svg";
import AppButton from "../../../../Components/AppButton";

const ChildVaccination = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAgeDropdownOpen, setIsAgeDropdownOpen] = useState(false);
  const [selectedAge, setSelectedAge] = useState("all");
  const [activeFilter, setActiveFilter] = useState("all");

  const ageGroups = [
    "all",
    "0-2 weeks",
    "1-6 months",
    "6-12 months",
    "1-2 years",
    "2-5 years",
  ];

  const vaccineData = useMemo(
    () => [
      {
        id: 1,
        name: "BCG Vaccine",
        description:
          "Protects against tuberculosis, recommended for all newborns. This vaccine helps prevent severe TB in children.",
        doses: 1,
        price: 479,
        isRecommended: true,
        ageGroups: ["0-2 weeks"],
        tag: "Essential",
        scheduleAt: "At birth",
      },
      {
        id: 2,
        name: "Hepatitis B",
        description:
          "Prevents hepatitis B infection given at birth; reduces risk of chronic liver disease.",
        doses: 3,
        price: 650,
        isRecommended: true,
        ageGroups: ["0-2 weeks", "1-6 months"],
        tag: "Essential",
        scheduleAt: "At birth",
      },
      {
        id: 3,
        name: "OPV (Polio)",
        description:
          "Oral polio vaccine for birth and infancy; critical for preventing paralysis.",
        doses: 4,
        price: 320,
        isRecommended: false,
        ageGroups: ["0-2 weeks", "1-6 months", "6-12 months"],
        tag: "Essential",
        scheduleAt: "At birth & infancy",
      },
      {
        id: 4,
        name: "Pentavalent Vaccine",
        description:
          "Protects against diphtheria, tetanus, pertussis, hepatitis B and Hib.",
        doses: 3,
        price: 450,
        isRecommended: true,
        ageGroups: ["1-6 months", "6-12 months"],
        tag: "Essential",
        scheduleAt: "6, 10 & 14 weeks",
      },
      {
        id: 5,
        name: "Rotavirus Vaccine",
        description: "Prevents severe diarrhea caused by rotavirus infection.",
        doses: 2,
        price: 1200,
        isRecommended: true,
        ageGroups: ["1-6 months", "6-12 months"],
        tag: "Recommended",
        scheduleAt: "6 & 10 weeks",
      },
      {
        id: 6,
        name: "MMR Vaccine",
        description: "Protects against measles, mumps and rubella.",
        doses: 2,
        price: 550,
        isRecommended: true,
        ageGroups: ["6-12 months", "1-2 years"],
        tag: "Essential",
        scheduleAt: "9-12 months & 15-18 months",
      },
    ],
    []
  );

  const filteredVaccines = useMemo(() => {
    return vaccineData.filter((vaccine) => {
      // Filter by search query
      const matchesSearch =
        vaccine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vaccine.description.toLowerCase().includes(searchQuery.toLowerCase());

      // Filter by age group
      const matchesAge =
        selectedAge === "all" || vaccine.ageGroups.includes(selectedAge);

      // Filter by active filter
      let matchesFilter = true;
      if (activeFilter === "recommended") {
        matchesFilter = vaccine.isRecommended;
      } else if (activeFilter === "essential") {
        matchesFilter = vaccine.tag === "Essential";
      }

      return matchesSearch && matchesAge && matchesFilter;
    });
  }, [vaccineData, searchQuery, selectedAge, activeFilter]);

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
    isRecommended = false,
    tag = "Essential",
    scheduleAt = "At birth",
    size = "compact",
    onSchedule,
    onInfo,
  }) => (
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
            {tag && (
              <div className={`vaccine-tag ${tag.toLowerCase()}`}>{tag}</div>
            )}
          </div>

          <p className="vaccine-desc" title={description}>
            {description}
          </p>

          <div className="vaccine-meta">
            <div className="meta-item" aria-label={`${doses} doses`}>
              <FiPackage size={14} />
              <span>
                {doses} {doses > 1 ? "doses" : "dose"}
              </span>
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

  return (
    <div className="child-vaccine-page">
      {/* Hero Section */}
      <div className="child-vaccine-hero">
        <div className="hero-top-bar">
          <button className="icon-button" onClick={() => window.history.back()}>
            <FiArrowLeft className="hero-icon" />
          </button>
        </div>

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

        <div className="search-bar hero-search">
          <IoIosSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search vaccines..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FaMicrophone className="mic-icon" />
        </div>
      </div>

      {/* Filters */}
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
              <span>{selectedAge === "all" ? "All Ages" : selectedAge}</span>
            </div>
            <IoChevronDownSharp
              className={`dropdown-icon ${isAgeDropdownOpen ? "open" : ""}`}
            />

            {isAgeDropdownOpen && (
              <div className="dropdown-menu">
                {ageGroups.map((age) => (
                  <div
                    key={age}
                    className={`dropdown-item ${
                      selectedAge === age ? "active" : ""
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAgeSelect(age);
                    }}
                  >
                    {age === "all" ? "All Ages" : age}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Vaccine Cards */}
      <div className="vaccine-list-container">
        <div className="section-header">
          <h3 className="section-title">
            {selectedAge === "all" ? "Vaccines" : `Vaccines `}
          </h3>
        </div>

        {filteredVaccines.length > 0 ? (
          <div className="vaccine-list">
            {filteredVaccines.map((vaccine) => (
              <VaccineCard
                key={vaccine.id}
                name={vaccine.name}
                description={vaccine.description}
                doses={vaccine.doses}
                price={vaccine.price}
                isRecommended={vaccine.isRecommended}
                tag={vaccine.tag}
                scheduleAt={vaccine.scheduleAt}
                onSchedule={() => console.log(`Schedule ${vaccine.name}`)}
                onInfo={() => console.log(`Info ${vaccine.name}`)}
              />
            ))}
          </div>
        ) : (
          <div className="no-results">
            <p>No vaccines found matching your criteria.</p>
            <button
              className="reset-filters"
              onClick={() => {
                setSearchQuery("");
                setSelectedAge("all");
                setActiveFilter("all");
              }}
            >
              Reset filters
            </button>
          </div>
        )}
      </div>
      <style>
        {`
        
        /* Modern CSS with animations and improved styling */
.child-vaccine-page {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

.child-vaccine-hero {
  background: linear-gradient(135deg, #6e8efb, #a777e3);
  padding: 20px;
  border-radius: 0 0 32px 32px;
  color: white;
  position: relative;
  box-shadow: 0 10px 30px rgba(103, 108, 255, 0.2);
}

.hero-top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.hero-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  font-size: 14px;
}

.title-icon {
  font-size: 18px;
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

.hero-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  position: relative;
  z-index: 2;
}

.hero-text h1 {
  font-size: 32px;
  font-weight: 800;
  line-height: 1.2;
  margin: 0 0 12px 0;
  letter-spacing: -0.5px;
}

.hero-subtitle {
  font-size: 14px;
  opacity: 0.9;
  margin-bottom: 24px;
  max-width: 200px;
  line-height: 1.5;
}

.cta-button {
  background: white;
  color: #6e8efb;
  border: none;
  padding: 12px 24px;
  border-radius: 14px;
  font-weight: 600;
  font-size: 14px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.hero-image {
  position: relative;
}

.hero-image img {
  width: 160px;
  height: auto;
  position: relative;
  z-index: 2;
  filter: drop-shadow(0 10px 15px rgba(0, 0, 0, 0.1));
  animation: float 4s ease-in-out infinite;
}

.image-decoration {
  position: absolute;
  width: 180px;
  height: 180px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
}

.floating-stats {
  display: flex;
  gap: 20px;
  margin-top: 30px;
  animation: fadeInUp 0.6s ease-out;
}

.stat-item {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  padding: 12px 16px;
  border-radius: 16px;
  min-width: 80px;
}

.stat-value {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 12px;
  opacity: 0.8;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive adjustments */
@media (max-width: 480px) {
  .hero-text h1 {
    font-size: 28px;
  }

  .hero-image img {
    width: 175px;
  }
}

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
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 50%);
  width: calc(100% - 40px);
  max-width: 500px;
}
/* Modern CSS for the filter component */
.vaccine-filter-container {
  margin: 32px 0;
}

.vacc-filter {
  display: flex;
  align-items: center;
  gap: 16px;
  border-radius: 16px;
  padding: 8px;
}

.filter-label {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: 12px;
  background: #f8f9fa;
  font-size: 14px;
  font-weight: 600;
  color: #495057;
  cursor: default;
}

.filter-icon {
  font-size: 16px;
  color: #6c757d;
}

.filter-dropdown {
  position: relative;
  flex-grow: 1;
}

.selected-option {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: 12px;
  background: #ffffff;
  border: 1px solid #e9ecef;
  font-size: 14px;
  font-weight: 500;
  color: #212529;
  cursor: pointer;
  transition: all 0.2s ease;
}

.selected-option:hover {
  border-color: #ced4da;
  background: #f8f9fa;
}

.option-icon {
  font-size: 16px;
  color: #6d28d9;
}

.dropdown-icon {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 14px;
  color: #868e96;
  transition: transform 0.2s ease;
}

.dropdown-icon.open {
  transform: translateY(-50%) rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  width: 100%;
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  padding: 8px 0;
  z-index: 10;
  animation: fadeIn 0.2s ease-out;
}

.dropdown-item {
  padding: 12px 16px;
  font-size: 14px;
  color: #495057;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

.dropdown-item:hover {
  background: #f1f3f5;
  color: #6d28d9;
}

.dropdown-item::before {
  content: "";
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #dee2e6;
  margin-right: 8px;
}

.dropdown-item:hover::before {
  background: #6d28d9;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive adjustments */
@media (max-width: 480px) {
  .vacc-filter {
    gap: 8px;
  }

  .filter-label {
    justify-content: center;
  }
} /* Container + Section */
.vaccine-list-container {
  padding: 0 20px;
  margin: 28px 0;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
}

.section-title {
  font-size: 20px;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
}



/* Grid: smaller cards */
.vaccine-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 16px;
}

/* Card base */
.vaccine-card {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.07);
  padding: 18px;
  position: relative;
  overflow: hidden;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  border: 1px solid #eef2f7;
}

.vaccine-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

/* Compact modifier (default) further tightens spacing */
.vaccine-card.is-compact {
  padding: 16px;
  border-radius: 14px;
}

/* Badge smaller */
.recommended-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  background: #7c3aed;
  color: white;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 6px;
}

.badge-icon {
  font-size: 14px;
}

/* Layout inside card */
.card-content {
  display: flex;
  gap: 14px;
}

.vaccine-icon-container {
  flex-shrink: 0;
}

.vaccine-icon-bg {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #f3f4ff, #e0e7ff);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.vaccine-icon {
  color: #7c3aed;
  font-size: 22px;
}

.vaccine-info {
  flex: 1;
}

/* Header smaller */
.info-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.vaccine-name {
  font-size: 17px;
  font-weight: 800;
  color: #1e293b;
  margin: 0;
}

.vaccine-tag {
  background: #e9f7ef;
  color: #2e7d32;
  padding: 3px 8px;
  border-radius: 6px;
  font-size: 10px;
  font-weight: 800;
  text-transform: uppercase;
}

/* Description: shorter (2-line clamp) */
.vaccine-desc {
  font-size: 12px;
  color: #64748b;
  line-height: 1.5;
  margin: 0 0 12px 0;

  display: -webkit-box;
  -webkit-line-clamp: 2; /* show only 2 lines */
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Meta smaller */
.vaccine-meta {
  display: flex;
  gap: 12px;
  margin-bottom: 14px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #475569;
}

/* Price + Buttons */
.vaccine-price-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
}

.price-info {
  display: flex;
  align-items: baseline;
  gap: 6px;
}

.vaccine-price {
  font-size: 18px;
  font-weight: 900;
  color: #1e293b;
  margin: 0;
}

.price-unit {
  font-size: 12px;
  color: #64748b;
}

/* Make AppButton smaller inside card without changing global button */
.vaccine-buttons {
  display: flex;
  gap: 8px;
}


/* Responsive */
@media (max-width: 768px) {
  .vaccine-list {
    grid-template-columns: 1fr;
  }
  .vaccine-list-container {
    padding: 0 16px;
  }
}

@media (max-width: 480px) {
  .vaccine-card,
  .vaccine-card.is-compact {
    padding: 14px;
  }

  .card-content {
    flex-direction: column;
    gap: 12px;
  }

  .vaccine-price-container {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .vaccine-buttons {
    width: 100%;
  }
}

        `}
      </style>
    </div>
  );
};

export default ChildVaccination;
