import React from "react";
import "./style.css";

import { FaArrowLeft, FaMicrophone } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import Vaccinationbg from "../../../../assets/vaccinationhero.png";
import AppButton from "../../../../Components/AppButton";

import ChildVacc from "../../../../assets/catchildhoodvaccines.png";
import AdultVacc from "../../../../assets/catadultvaccines.png";
import TravelVacc from "../../../../assets/cattravelvaccines.png";

const Vaccination = () => {
  return (
    <div className="vaccination-page">
      <div className="vaccination-hero">
        <div className="vaccination-header">
          <div className="header-left">
            <FaArrowLeft className="back-icon" />
            <div className="text-block">
              <h1>VACCINATION</h1>
              <p>Your Care, Personalized</p>
              <AppButton text="Talk to an Expert" />
            </div>
          </div>

          <div className="header-right">
            <div className="image-wrapper">
              <img src={Vaccinationbg} alt="Vaccination" />
            </div>
          </div>
        </div>

        <div className="search-bar hero-search">
          <IoIosSearch className="search-icon" />
          <input type="text" placeholder="Search" />
          <FaMicrophone className="mic-icon" />
        </div>
      </div>

      <div className="categories-section">
        <h2 className="categories-title">Categories</h2>
        <div className="categories-cards">
          <div className="category-card pink">
            <h3>
              Childhood <br /> Vaccines
            </h3>
            <img src={ChildVacc} alt="Childhood Vaccines" />
            <span className="ripple" />
          </div>
          <div className="category-card orange">
            <h3>
              Adult <br /> Vaccines
            </h3>
            <img src={AdultVacc} alt="Adult Vaccines" />
            <span className="ripple" />
          </div>
          <div className="category-card blue">
            <h3>
              Travel <br /> Vaccines
            </h3>
            <img src={TravelVacc} alt="Travel Vaccines" />
            <span className="ripple" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vaccination;
