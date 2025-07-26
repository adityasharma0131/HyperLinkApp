import React from "react";
import { FiArrowLeft } from "react-icons/fi";
import { FaMicrophone } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";

import ChildVaccineHero from "../../../../assets/ChildVaccineHero.svg";
import "./style.css";

const ChildVaccination = () => {
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
    </div>
  );
};

export default ChildVaccination;
