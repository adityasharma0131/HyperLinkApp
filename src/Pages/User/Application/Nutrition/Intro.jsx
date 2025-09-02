import React from "react";
import NutritionIntro from "../../../../assets/NutritionIntro.svg";
import AppButton from "../../../../Components/AppButton";
import { useNavigate } from "react-router-dom";
import "./style.css";

const Intro = () => {
  const navigate = useNavigate();
  return (
    <div className="intro-container">
      {/* Background bubbles */}
      <div className="circle circle1"></div>
      <div className="circle circle2"></div>
      <div className="circle circle3"></div>
      <div className="circle circle4"></div>

      <h1 className="intro-title">Welcome to Nutrition</h1>

      <div className="intro-image">
        <img src={NutritionIntro} alt="Nutrition Illustration" />
      </div>

      <div className="intro-button">
        <AppButton
          text="Get Started"
          variant="secondary"
          onClick={() => navigate("/app/nutrition")}
        />
      </div>
    </div>
  );
};

export default Intro;
