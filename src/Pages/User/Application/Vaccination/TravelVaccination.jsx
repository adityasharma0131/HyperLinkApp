import React, { useState, useMemo, useCallback } from "react";
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
import { IoChevronDownSharp } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import { GiLoveInjection } from "react-icons/gi";
import TravelVaccineHero from "../../../../assets/TravelVaccineHero.svg";
import AppButton from "../../../../Components/AppButton";
import VaccInfo from "./VaccInfo";
import DoseTray from "./DoseTray";
import NewUserTray from "./NewUserTray";

const TravelVaccination = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAgeDropdownOpen, setIsAgeDropdownOpen] = useState(false);
  const [selectedAge, setSelectedAge] = useState("all");
  const [activeFilter, setActiveFilter] = useState("all");

  // State for vaccine trays
  const [selectedVaccine, setSelectedVaccine] = useState(null);
  const [isInfoTrayOpen, setIsInfoTrayOpen] = useState(false);
  const [isDoseTrayOpen, setIsDoseTrayOpen] = useState(false);
  const [doseTrayVaccine, setDoseTrayVaccine] = useState(null);
  const [isNewUserTrayOpen, setIsNewUserTrayOpen] = useState(false);

  const ageGroups = useMemo(
    () => [
      { value: "all", label: "All Ages" },
      { value: "18-49 years", label: "18-49 years" },
      { value: "50-64 years", label: "50-64 years" },
      { value: "65+ years", label: "65+ years" },
      { value: "Pregnant women", label: "Pregnant women" },
      { value: "Healthcare workers", label: "Healthcare workers" },
    ],
    []
  );

  const vaccineData = useMemo(
    () => [
      {
        id: 1,
        name: "Yellow Fever Vaccine",
        description:
          "Required for travel to certain countries in Africa and South America.",
        doses: 1,
        price: 2500,
        isRecommended: true,
        ageGroups: ["18-49 years", "50-64 years"],
        tag: "Travel",
        scheduleAt: "10 days before travel",
        benefits: [
          "Required for entry in some countries",
          "Provides lifetime immunity",
          "Prevents yellow fever infection",
        ],
        countries: ["Brazil", "Ghana", "Kenya", "Peru"],
        certificateRequired: true,
      },
      {
        id: 2,
        name: "Typhoid Vaccine",
        description: "Recommended for travelers to areas with poor sanitation.",
        doses: 1,
        price: 1200,
        isRecommended: true,
        ageGroups: ["all"],
        tag: "Travel",
        scheduleAt: "2 weeks before travel",
        benefits: [
          "Protects against typhoid fever",
          "Oral and injectable options available",
          "Effective for 2-5 years",
        ],
        countries: ["India", "Pakistan", "Bangladesh", "Mexico"],
      },
      {
        id: 3,
        name: "Hepatitis A Vaccine",
        description: "Recommended for most international travelers.",
        doses: 2,
        price: 1800,
        isRecommended: true,
        ageGroups: ["all"],
        tag: "Travel",
        scheduleAt: "6 months apart",
        benefits: [
          "Protects against food/water-borne illness",
          "Provides long-term protection",
          "Often combined with Hepatitis B vaccine",
        ],
        countries: ["All developing countries"],
      },
      {
        id: 4,
        name: "Japanese Encephalitis",
        description: "Recommended for long-term travelers to rural Asia.",
        doses: 2,
        price: 3500,
        isRecommended: false,
        ageGroups: ["18-49 years", "50-64 years"],
        tag: "Travel",
        scheduleAt: "28 days apart",
        benefits: [
          "Protects against mosquito-borne disease",
          "Recommended for rural travel",
          "Important for long-term stays",
        ],
        countries: ["China", "India", "Thailand", "Vietnam"],
      },
      {
        id: 5,
        name: "Meningococcal Vaccine",
        description: "Required for travel to the meningitis belt of Africa.",
        doses: 1,
        price: 2800,
        isRecommended: true,
        ageGroups: ["all"],
        tag: "Travel",
        scheduleAt: "Before travel",
        benefits: [
          "Required for Hajj pilgrimage",
          "Protects against meningitis",
          "Valid for 3-5 years",
        ],
        countries: ["Saudi Arabia", "Sudan", "Ethiopia"],
        certificateRequired: true,
      },
      {
        id: 6,
        name: "Rabies Vaccine",
        description: "Recommended for travelers at risk of animal bites.",
        doses: 3,
        price: 3200,
        isRecommended: false,
        ageGroups: ["all"],
        tag: "Travel",
        scheduleAt: "28 day series",
        benefits: [
          "Prevents rabies infection",
          "Reduces need for post-exposure treatment",
          "Important for adventure travelers",
        ],
        countries: ["All with animal exposure risk"],
      },
      {
        id: 7,
        name: "Cholera Vaccine",
        description: "Recommended for travelers to outbreak areas.",
        doses: 2,
        price: 1500,
        isRecommended: false,
        ageGroups: ["all"],
        tag: "Travel",
        scheduleAt: "1-6 weeks apart",
        benefits: [
          "Protects against cholera",
          "Oral vaccine available",
          "Useful for humanitarian workers",
        ],
        countries: ["Yemen", "Haiti", "Zimbabwe"],
      },
    ],
    []
  );

  const filteredVaccines = useMemo(() => {
    return vaccineData.filter((vaccine) => {
      const matchesSearch =
        vaccine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vaccine.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vaccine.tag.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesAge =
        selectedAge === "all" || vaccine.ageGroups.includes(selectedAge);

      let matchesFilter = true;
      if (activeFilter === "recommended") {
        matchesFilter = vaccine.isRecommended;
      } else if (activeFilter === "required") {
        matchesFilter = vaccine.certificateRequired === true;
      }

      return matchesSearch && matchesAge && matchesFilter;
    });
  }, [vaccineData, searchQuery, selectedAge, activeFilter]);

  const handleAgeSelect = useCallback((age) => {
    setSelectedAge(age);
    setIsAgeDropdownOpen(false);
  }, []);

  const handleFilterSelect = useCallback((filter) => {
    setActiveFilter(filter);
  }, []);

  const formatINR = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);

  const handleScheduleClick = (vaccine) => {
    const dosesArray = Array.from({ length: vaccine.doses }, (_, i) => ({
      number: i + 1,
      note: `${i + 1}${["st", "nd", "rd"][i] || "th"} dose for ${vaccine.name}`,
      certificateRequired: vaccine.certificateRequired || false,
      travelNotice: vaccine.countries
        ? `Required for: ${vaccine.countries.join(", ")}`
        : null,
    }));

    setDoseTrayVaccine({
      name: vaccine.name,
      type: vaccine.tag.toUpperCase(),
      doses: dosesArray,
      countries: vaccine.countries,
      certificateRequired: vaccine.certificateRequired,
    });
    setIsDoseTrayOpen(true);
  };

  const handleInfoClick = (vaccine) => {
    setSelectedVaccine(vaccine);
    setIsInfoTrayOpen(true);
  };

  const handleDoseScheduleNow = (doseNumber) => {
    setIsDoseTrayOpen(false);
    setTimeout(() => {
      setIsNewUserTrayOpen(true);
    }, 300);
  };

  const VaccineCard = ({ vaccine }) => (
    <div
      className={`vaccine-card ${vaccine.isRecommended ? "recommended" : ""}`}
    >
      {vaccine.isRecommended && (
        <div className="recommended-badge">
          <FiAward className="badge-icon" />
          <span>Recommended</span>
        </div>
      )}

      <div className="card-content">
        <div className="vaccine-icon-container">
          <div className="vaccine-icon-bg">
            <GiLoveInjection size={22} className="vaccine-icon" />
          </div>
        </div>
        <div className="vaccine-info">
          <div className="info-header">
            <h2 className="vaccine-name">{vaccine.name}</h2>
            <div className={`vaccine-tag ${vaccine.tag.toLowerCase()}`}>
              {vaccine.tag}
            </div>
          </div>
          <p className="vaccine-desc">{vaccine.description}</p>

          <div className="vaccine-meta">
            <div className="meta-item">
              <FiPackage size={14} />
              <span>
                {vaccine.doses} {vaccine.doses > 1 ? "doses" : "dose"}
              </span>
            </div>
            <div className="meta-item">
              <FiClock size={14} />
              <span>{vaccine.scheduleAt}</span>
            </div>
          </div>
          <div className="vaccine-price-container">
            <div className="price-info">
              <h3 className="vaccine-price">{formatINR(vaccine.price)}</h3>
              <span className="price-unit">per dose</span>
            </div>
            <div className="vaccine-buttons">
              <AppButton
                text="Schedule"
                icon={FiCalendar}
                onClick={(e) => {
                  e.stopPropagation();
                  handleScheduleClick(vaccine);
                }}
              />
              <AppButton
                variant="secondary"
                text="Info"
                icon={FiInfo}
                onClick={(e) => {
                  e.stopPropagation();
                  handleInfoClick(vaccine);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="travel-vaccine-page">
      <div className="travel-vaccine-hero">
        <div className="hero-top-bar">
          <button className="icon-button" onClick={() => window.history.back()}>
            <FiArrowLeft className="hero-icon" />
          </button>
        </div>
        <div className="hero-content">
          <div className="hero-text">
            <h1>
              Travel
              <br />
              Vaccination
            </h1>
            <p className="hero-subtitle">
              Stay protected with vaccines recommended for your destination and
              travel plans.
            </p>
          </div>
          <div className="hero-image">
            <span className="image-decoration" />
            <img src={TravelVaccineHero} alt="Travel vaccination" />
          </div>
        </div>
        <div className="search-bar hero-search">
          <IoIosSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search vaccines or destinations..."
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
            onClick={() => setIsAgeDropdownOpen((prev) => !prev)}
          >
            <div className="selected-option">
              <FiCalendar className="option-icon" />
              <span>
                {ageGroups.find((a) => a.value === selectedAge)?.label ||
                  "All Ages"}
              </span>
            </div>
            <IoChevronDownSharp
              className={`dropdown-icon ${isAgeDropdownOpen ? "open" : ""}`}
            />
            {isAgeDropdownOpen && (
              <div className="dropdown-menu">
                {ageGroups.map((age) => (
                  <div
                    key={age.value}
                    className={`dropdown-item ${
                      selectedAge === age.value ? "active" : ""
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAgeSelect(age.value);
                    }}
                  >
                    {age.label}
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
            {selectedAge === "all"
              ? "Travel Vaccines"
              : `Travel Vaccines for ${
                  ageGroups.find((a) => a.value === selectedAge)?.label
                }`}
          </h3>
        </div>

        {filteredVaccines.length > 0 ? (
          <div className="vaccine-list">
            {filteredVaccines.map((vaccine) => (
              <VaccineCard key={vaccine.id} vaccine={vaccine} />
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

      {/* Info Tray */}
      <VaccInfo
        isOpen={isInfoTrayOpen}
        onClose={() => setIsInfoTrayOpen(false)}
        vaccineData={selectedVaccine}
        handleScheduleClick={handleScheduleClick}
        isTravelVaccine={true}
      />

      {/* Dose Tray */}
      {doseTrayVaccine && (
        <DoseTray
          isOpen={isDoseTrayOpen}
          handleClose={() => setIsDoseTrayOpen(false)}
          vaccine={doseTrayVaccine}
          userDoses={[]}
          onViewCertificate={(url) => window.open(url, "_blank")}
          onScheduleDose={handleDoseScheduleNow}
          onUploadCertificate={(doseNumber) =>
            alert(`Upload certificate for Dose ${doseNumber}`)
          }
          isTravelVaccine={true}
        />
      )}

      {/* New User Tray */}
      {isNewUserTrayOpen && (
        <NewUserTray
          onClose={() => setIsNewUserTrayOpen(false)}
          isTravelVaccine={true}
        />
      )}
      <style>
        {`
        .travel-vaccine-page {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

.travel-vaccine-hero {
  background: linear-gradient(135deg, #34a1fc, #0172d0);
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
/* Container + Section */
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


.reset-filters {
  padding: 10px 20px;
  background-color: #7c3aed;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.2s ease;
}

.reset-filters:hover {
  background-color: #6d28d9;
  transform: translateY(-2px);
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
  .section-title {
    font-size: 16px;
  }

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
}

/* Section header improvements */
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
  flex-wrap: wrap;
  gap: 12px;
}

.section-title {
  font-size: 20px;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
}

.result-count {
  font-size: 14px;
  color: #64748b;
}

/* Tag variants */
.vaccine-tag.essential {
  background: #e9f7ef;
  color: #2e7d32;
}

.vaccine-tag.recommended {
  background: #eef2ff;
  color: #4f46e5;
}

.vaccine-tag.seasonal {
  background: #fff4e5;
  color: #ed6c02;
}

.vaccine-tag.preventive {
  background: #f0fdf4;
  color: #15803d;
}

.vaccine-tag.risk-based {
  background: #fff1f2;
  color: #e11d48;
}

/* No results state */
.no-results {
  text-align: center;
  padding: 40px 20px;
  background: #f8fafc;
  border-radius: 16px;
  margin-top: 20px;
}

.no-results p {
  color: #64748b;
  margin-bottom: 16px;
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
}
`}
      </style>
    </div>
  );
};

export default TravelVaccination;
