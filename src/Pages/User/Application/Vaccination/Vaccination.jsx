import React from "react";
import "./style.css";

import { FaArrowLeft, FaMicrophone } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import Vaccinationbg from "../../../../assets/vaccinationhero.png";
import AppButton from "../../../../Components/AppButton";

import ChildVacc from "../../../../assets/catchildhoodvaccines.svg";
import AdultVacc from "../../../../assets/catadultvaccines.svg";
import TravelVacc from "../../../../assets/cattravelvaccines.svg";
import PrescriptionBG from "../../../../assets/PrescriptionBG.svg";
import HealthRecord from "../../../../assets/healthrecord.png";

import { FaHome } from "react-icons/fa";
import { FaRibbon } from "react-icons/fa6";
import { FaUserCheck } from "react-icons/fa";

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
      <div className="prescription-container">
        <h2 className="section-title">Upload Your Prescription</h2>

        <div className="prescription-card">
          <div className="prescription-content">
            <p className="prescription-subtext">
              Let us handle the rest. Upload your prescription and we’ll check
              for vaccines.
            </p>
            <AppButton text="Click to Upload" />
          </div>

          <div className="prescription-image">
            <img src={PrescriptionBG} alt="Upload Illustration" />
          </div>
        </div>
      </div>

      <div className="vaccine-benefits">
        <div className="benefit-card">
          <FaHome className="benefit-icon" />
          <p>Home vaccination support with certified nurses</p>
        </div>
        <div className="benefit-card">
          <FaRibbon className="benefit-icon" />
          <p>Special focus on cancer prevention & women’s wellness</p>
        </div>
        <div className="benefit-card">
          <FaUserCheck className="benefit-icon" />
          <p>Personalized vaccine suggestions based on health profile</p>
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
  );
};

export default Vaccination;
