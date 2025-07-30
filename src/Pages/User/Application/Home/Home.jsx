import React from "react";
import UserNavigation from "../../../../Components/UserNavigation";
import AppButton from "../../../../Components/AppButton";
import { useNavigate } from "react-router-dom";
import { FaWalking, FaBed, FaFireAlt, FaTint } from "react-icons/fa";
import { FaPlus, FaBell, FaMicrophone } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { MdOutlineDateRange } from "react-icons/md";
import { FaRobot } from "react-icons/fa";
import { TbVaccine } from "react-icons/tb";
import { GiFruitBowl } from "react-icons/gi";

import DnaHome from "../../../../assets/dnahome.png";
import ModelHome from "../../../../assets/modelhome.png";
import SubscribBanner from "../../../../assets/subscribebanner.png";
import HealthFeed1 from "../../../../assets/healthfeed1.png";
import HealthFeed2 from "../../../../assets/healthfeed2.png";
import HealthRecord from "../../../../assets/healthrecord.png";

const Home = () => {
  const data = [
    {
      label: "Steps",
      value: "7304",
      total: "10,000",
      unit: "",
      percent: 73,
      icon: <FaWalking />,
      color: "pink",
    },
    {
      label: "Sleep",
      value: "6.5",
      total: "hrs",
      unit: "hrs",
      percent: 65,
      icon: <FaBed />,
      color: "purple",
    },
    {
      label: "Calories",
      value: "1,245",
      total: "kcal",
      unit: "kcal",
      percent: 85,
      icon: <FaFireAlt />,
      color: "green",
    },
    {
      label: "Water",
      value: "5",
      total: "10 glasses",
      unit: "glasses",
      percent: 50,
      icon: <FaTint />,
      color: "blue",
    },
  ];

  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate("/app/vaccination");
  };

  return (
    <>
      <div className="home-page">
        <div className="home-container">
          {/* Header */}
          <div className="home-header">
            <div className="user-info">
              <h1>Hi, Sakshi</h1>
              <p>Ghatkopar, Mumbai</p>
            </div>
            <div className="icons">
              <div className="icon-wrapper">
                <FaPlus className="icon" />
              </div>
              <div className="icon-wrapper">
                <FaBell className="icon" />
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="search-bar">
            <IoIosSearch className="search-icon" />
            <input type="text" placeholder="Search" />
            <FaMicrophone className="mic-icon" />
          </div>

          {/* Hero Section */}
          <div className="hero-section">
            <div className="hero-text">
              <h2>
                <span className="gradient-text">HYPERLINK 360</span>
              </h2>
              <p>One App. Infinite Health Possibilities.</p>
              <AppButton text="Chat with HELIX" />
            </div>
            <div className="hero-image">
              <img className="dna" src={DnaHome} alt="DNA Strand" />
              <img className="doctor" src={ModelHome} alt="Doctor" />
            </div>
          </div>
        </div>

        <div className="quick-actions-section">
          <div className="section-header">
            <h2 className="section-title">Quick Actions</h2>
          </div>

          <div className="quick-actions-grid">
            {/* DNA Test Card */}
            <div className="action-card blue">
              <div className="card-content">
                <div className="icon-wrapper">
                  <MdOutlineDateRange className="action-icon" />
                </div>
                <div className="text-content">
                  <h3>Book a DNA Test</h3>
                  <p>Find your best health care provider</p>
                </div>
                <div className="hover-effect"></div>
                <div className="corner-decoration"></div>
              </div>
              <div className="card-bg-pattern"></div>
            </div>

            {/* Helix Consultation Card */}
            <div className="action-card pink">
              <div className="card-content">
                <div className="icon-wrapper">
                  <FaRobot className="action-icon" />
                </div>
                <div className="text-content">
                  <h3>Consult Helix</h3>
                  <p>Your medications, refill drugs</p>
                </div>
                <div className="hover-effect"></div>
                <div className="corner-decoration"></div>
              </div>
              <div className="card-bg-pattern"></div>
            </div>

            {/* Vaccines Card */}
            <div
              className="action-card green"
              onClick={handleCardClick}
              style={{ cursor: "pointer" }}
            >
              <div className="card-content">
                <div className="icon-wrapper">
                  <TbVaccine className="action-icon" />
                </div>
                <div className="text-content">
                  <h3>View Your Vaccines</h3>
                  <p>Lab reports, radiology microbiology</p>
                </div>
                <div className="hover-effect"></div>
                <div className="corner-decoration"></div>
              </div>
              <div className="card-bg-pattern"></div>
            </div>

            {/* Nutrigenomics Card */}
            <div className="action-card purple">
              <div className="card-content">
                <div className="icon-wrapper">
                  <GiFruitBowl className="action-icon" />
                </div>
                <div className="text-content">
                  <h3>Start Nutrigenomics</h3>
                  <p>Medicine, knowledge & more</p>
                </div>
                <div className="hover-effect"></div>
                <div className="corner-decoration"></div>
              </div>
              <div className="card-bg-pattern"></div>
            </div>
          </div>
        </div>
        <div className="summary-section">
          <h2 className="summary-title">Today’s Summary</h2>

          <div className="summary-grid">
            {data.map((item, index) => (
              <div key={index} className="summary-card">
                <div className="summary-header">
                  <div className={`summary-icon icon-${item.color}`}>
                    {item.icon}
                  </div>
                  <h3>{item.label}</h3>
                </div>
                <p className="summary-value">
                  <strong>{item.value}</strong>{" "}
                  <span className="summary-unit">/ {item.total}</span>
                </p>
                <div className="progress-bar">
                  <div
                    className={`progress-fill fill-${item.color}`}
                    style={{ width: `${item.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="subscribe-banner">
          <div className="subscribe-text">
            <h1>
              A DIET <br />
              AS UNIQUE AS <br />
              <span className="gradient-text">YOUR DNA</span>
            </h1>

            <AppButton text="SUBSCRIBE NOW!" />
          </div>
          <div className="subscribe-image">
            <img src={SubscribBanner} alt="Doctor holding apple" />
          </div>
        </div>

        <div className="health-feeds-wrapper">
          <div className="health-feeds-header">
            <h2>Recent Health Feeds</h2>
            <a href="#" className="see-all-link">
              See All
            </a>
          </div>

          <div className="health-feeds-scroll">
            <div className="health-card">
              <img
                src={HealthFeed1}
                alt="Diabetes Check"
                className="feed-image"
              />
              <span className="tag blue">#GeneticInsights</span>
              <h3 className="feed-title">
                Understanding Your Genetic Predisposition to Diabetes
              </h3>
              <p className="feed-meta">5 min read · Dr. Kavita Madhuri</p>
            </div>

            <div className="health-card">
              <img
                src={HealthFeed2}
                alt="Heart Health"
                className="feed-image"
              />
              <span className="tag green">#HeartHealth</span>
              <h3 className="feed-title">
                Understanding Your Genetic Predisposition to Diabetes
              </h3>
              <p className="feed-meta">5 min read · Dr. Kavita Madhuri</p>
            </div>
            <div className="health-card">
              <img
                src={HealthFeed1}
                alt="Diabetes Check"
                className="feed-image"
              />
              <span className="tag blue">#GeneticInsights</span>
              <h3 className="feed-title">
                Understanding Your Genetic Predisposition to Diabetes
              </h3>
              <p className="feed-meta">5 min read · Dr. Kavita Madhuri</p>
            </div>

            <div className="health-card">
              <img
                src={HealthFeed2}
                alt="Heart Health"
                className="feed-image"
              />
              <span className="tag green">#HeartHealth</span>
              <h3 className="feed-title">
                Understanding Your Genetic Predisposition to Diabetes
              </h3>
              <p className="feed-meta">5 min read · Dr. Kavita Madhuri</p>
            </div>
          </div>
        </div>

        <div className="report-banner">
          <div className="report-text">
            <h2>
              <span className="highlight">YOUR REPORT</span> <br />
              <span className="highlight">IS SECURE</span>
            </h2>
            <p>
              Your results and insights have been saved in your Locker. Access
              anytime from your Profile tab.
            </p>
            <AppButton text="View Records" />
          </div>
          <div className="report-image">
            <img src={HealthRecord} alt="Health Record Secure" />
          </div>
        </div>
      </div>

      <UserNavigation />
      <style>
        {`/* General Page Setup */
.home-page {
  background-color: #f8fafc;
}

.home-container {
  background: linear-gradient(to bottom, #bde0fe, #e0d2ff);
  border-bottom-left-radius: 24px;
  border-bottom-right-radius: 24px;
  padding: 20px 20px 0 20px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

/* Header */
.home-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.user-info h1 {
  font-size: 20px;
  font-weight: 700;
  color: #111827;
  margin-bottom: 4px;
}

.user-info p {
  font-size: 13px;
  color: #4b5563;
}

.icons {
  display: flex;
  gap: 12px;
}

.icon-wrapper {
  background-color: #ffffff;
  padding: 8px;
  border-radius: 50%;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon {
  font-size: 14px;
  color: #8b5cf6;
}

/* Search Bar */
.search-bar {
  display: flex;
  align-items: center;
  background: #ffffff;
  border-radius: 999px;
  padding: 10px 16px;
  margin: 16px -10px;
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

/* Hero Section */
.hero-section {
  position: relative;
  display: flex;
  flex-direction: row;
  gap: 3rem; /* Default (large screens) */
}

/* Medium screens (≤1024px) */
@media (max-width: 1024px) {
  .hero-section {
    gap: 2rem;
  }
}

/* Small screens (≤768px) */
@media (max-width: 768px) {
  .hero-section {
    gap: 1.5rem;
  }
}

/* Extra-small screens (≤640px) */
@media (max-width: 640px) {
  .hero-section {
    gap: 2.25rem;
  }
}
/* Extra-small screens (≤640px) */
@media (max-width: 320px) {
  .hero-section {
    gap: 0.25rem;
  }
}

.hero-text h2 {
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 4px;
}

.hero-text p {
  font-size: 11px;
  margin-bottom: 12px;
  color: #1f2937;
}

.gradient-text {
  background: linear-gradient(90deg, #ec4899, #6366f1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Hero Images */
.hero-image {
  position: relative;
  height: 140px;
}

.hero-image .dna {
  position: absolute;
  bottom: 0;
  right: -85px;
  width: 150px;
  opacity: 0.6;
  z-index: 1;
}

.hero-image .doctor {
  position: absolute;
  bottom: 0;
  right: -90px;
  width: 100px;
  z-index: 2;
}

/* Quick Actions Section */
.quick-actions-section {
  padding: 1.5rem 1.25rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 500;
  color: #1f2937;
  margin: 0;
}

/* Grid Layout */
.quick-actions-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;

}

/* Action Cards */
.action-card {
  border-radius: 1.25rem;
  overflow: hidden;
  position: relative;
  min-height: 10rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

}

.action-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.card-content {
  position: relative;
  z-index: 2;
  padding: 1.25rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between
  

}

.icon-wrapper {
  background-color: rgba(255, 255, 255, 0.2);
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}

.action-icon {
  font-size: 1.25rem;
  color: white;
}


.text-content h3 {
  font-size: 1rem;
  font-weight: 700;
  color: white;
  margin: 0 0 0.5rem 0;
  line-height: 1.3;
}

.text-content p {
  font-size: 0.75rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
  line-height: 1.4;
}

/* Card Backgrounds */
.action-card.blue {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
}

.action-card.pink {
  background: linear-gradient(135deg, #ec4899, #db2777);
}

.action-card.green {
  background: linear-gradient(135deg, #10b981, #059669);
}

.action-card.purple {
  background: linear-gradient(135deg, #8b5cf6, #7c3aed);
}

/* Decorative Elements */
.card-bg-pattern {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: radial-gradient(
    rgba(255, 255, 255, 0.15) 1px,
    transparent 1px
  );
  background-size: 10px 10px;
  opacity: 0.5;
}

.corner-decoration {
  position: absolute;
  bottom: -1rem;
  right: -1rem;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
}

.hover-effect {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.15), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.action-card:hover .hover-effect {
  opacity: 1;
}

/* Responsive Adjustments */
@media (max-width: 480px) {
  .quick-actions-section {
    padding: 1.25rem 1rem;
  }

  .quick-actions-grid {
    gap: 0.75rem;
  }

  .card-content {
    padding: 1rem;
  }
}
.summary-section {
  padding: 24px;
  background: #f9fafb;
  max-width: 800px;
  margin: auto;
}

.summary-title {
  font-size: 1rem;
  font-weight: 500;
  color: #1f2937;
  margin: 0;
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.summary-card {
  background: transparent;
  border-radius: 16px;
  padding: 12px;
  background-color: #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.summary-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 10px;
}

.summary-header h3 {
  font-size: 15px;
  font-weight: 600;
  color: #1f2937;
}

.summary-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 16px;
}

/* Icon Gradient Fill */
.icon-pink {
  background: linear-gradient(135deg, #f472b6, #ec4899);
}
.icon-purple {
  background: linear-gradient(135deg, #c084fc, #a855f7);
}
.icon-green {
  background: linear-gradient(135deg, #34d399, #10b981);
}
.icon-blue {
  background: linear-gradient(135deg, #60a5fa, #3b82f6);
}

.summary-value {
  font-size: 14px;
  font-weight: 500;
  color: #4b5563;
  margin-bottom: 6px;
}

.summary-value strong {
  font-size: 18px;
  font-weight: 700;
  color: #111827;
}

.summary-unit {
  font-weight: 500;
  color: #6b7280;
}

.progress-bar {
  width: 100%;
  height: 6px;
  background: #e5e7eb;
  border-radius: 999px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  border-radius: 999px;
  transition: width 0.6s ease;
}

/* Progress Fill Gradients */
.fill-pink {
  background: linear-gradient(135deg, #f472b6, #ec4899);
}
.fill-purple {
  background: linear-gradient(135deg, #c084fc, #a855f7);
}
.fill-green {
  background: linear-gradient(135deg, #34d399, #10b981);
}
.fill-blue {
  background: linear-gradient(135deg, #60a5fa, #3b82f6);
}
.subscribe-banner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(135deg, #0f3a8c, #1e40af);
  border-radius: 20px;
  margin: 1.2rem;
  padding: 1.5rem;
  color: white;
  box-shadow: 0 8px 20px rgba(15, 58, 140, 0.25);
  position: relative;
  overflow: hidden;
}

.subscribe-text {
  width: 100%;
  text-align: center;
  margin-bottom: 1rem;
}

.subscribe-text h1 {
  font-size: 1.8rem;
  font-weight: 800;
  line-height: 1.3;
  margin-bottom: 1rem;
}

.subscribe-image {
  width: 100%;
  display: flex;
  justify-content: center;
}

.subscribe-image img {
  width: 70%;
  max-width: 240px;
  height: auto;
  margin-top: -10px;
  object-fit: contain;
}

/* Optional: Adjust for slightly larger phones */
@media (min-width: 480px) {
  .subscribe-text h1 {
    font-size: 2rem;
  }
}
.health-feeds-wrapper {
  padding: 1.25rem 1rem;
}

.health-feeds-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.health-feeds-header h2 {
  font-size: 1rem;
  font-weight: 500;
  color: #1f2937;
  margin: 0;
}

.see-all-link {
  font-size: 0.95rem;
  font-weight: 600;
  color: #2563eb;
  text-decoration: none;
}
.health-feeds-scroll {
  display: flex;
  overflow-x: auto;
  gap: 1rem;
  padding-bottom: 0.5rem;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;

  /* Hide scrollbar for WebKit (Chrome, Safari) */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}

.health-feeds-scroll::-webkit-scrollbar {
  display: none; /* Chrome, Safari */
}

.health-card {
  flex: 0 0 80%;
  max-width: 55%;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  scroll-snap-align: start;
  overflow: hidden; /* Important: clips rounded image corners */
  padding-bottom: 1rem; /* Padding only at bottom now */
}

.feed-image {
  width: 100%;
  height: 140px;
  object-fit: cover;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  display: block;
}

.tag {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.3rem 0.6rem;
  border-radius: 9999px;
  margin: 0.75rem 1rem 0.5rem 1rem;
  width: fit-content;
}

.tag.blue {
  background-color: #e0f2fe;
  color: #0284c7;
}

.tag.green {
  background-color: #dcfce7;
  color: #16a34a;
}

.feed-title {
  font-size: 13px;
  font-weight: 600;
  color: #111827;
  margin: 0 1rem 0.4rem 1rem;
}

.feed-meta {
  font-size: 10px;
  color: #6b7280;
  margin: 0 1rem;
}

.report-banner {
  display: flex;
  flex-direction: row;
  align-items: center;
  background: linear-gradient(180deg, #f0f4ff 0%, #e9dfff 100%);
  border-radius: 20px;
  padding: 1.2rem 1rem;
  margin: 1rem 1rem 7rem 1rem;
      gap: 1rem;
}

.report-text {
  flex: 1;
}

.report-text h2 {
  font-size: 1.4rem;
  font-weight: 800;
  line-height: 1.3;
  margin-bottom: 0.6rem;
}

.highlight {
  color: #e11d48; /* Pink-red */
}

.report-text p {
  font-size: 10px;
  color: #374151;
  margin-bottom: 0.8rem;
}

.report-image {
  flex-shrink: 0;
  width: 40%;
  display: flex;
  justify-content: center;
}

.report-image img {
  width: 100%;
  max-width: 140px;
  height: auto;
}

/* Mobile responsiveness */
@media (max-width: 600px) {
  .report-text h2 {
    font-size: 1.3rem;
  }
}
`}
      </style>
    </>
  );
};

export default Home;
