import React from "react";
import UserNavigation from "../../../../Components/UserNavigation";
import { FaArrowRight } from "react-icons/fa";
import { FaWalking, FaBed, FaFireAlt, FaTint } from "react-icons/fa";

import DnaHome from "../../../../assets/dnahome.png";
import ModelHome from "../../../../assets/modelhome.png";
import { FaPlus, FaBell, FaMicrophone } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { MdOutlineDateRange } from "react-icons/md";
import { FaRobot } from "react-icons/fa";
import { TbVaccine } from "react-icons/tb";
import { GiFruitBowl } from "react-icons/gi";

import "./style.css";

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

              <div className="user-button">
                Chat with HELIX <FaArrowRight />
              </div>
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
            <div className="action-card green">
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
      </div>
      <UserNavigation />
    </>
  );
};

export default Home;
