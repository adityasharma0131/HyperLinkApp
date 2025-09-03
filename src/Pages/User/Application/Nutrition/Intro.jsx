import React from "react";
import NutritionIntro from "../../../../assets/NutritionIntro.svg";
import AppButton from "../../../../Components/AppButton";
import { useNavigate } from "react-router-dom";

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
      <style>
        {`
      
  .intro-container {
  position: relative;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(to bottom, #004918 0%, #02b614 100%);
  color: #ffffff;
  text-align: center;
  padding: 40px 20px;
  box-sizing: border-box;
  overflow: hidden;
}
/* Floating background circles */
.circle {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.15);
}

.circle1 {
  width: 120px;
  height: 120px;
  top: 20px;
  right: 30px;
}

.circle2 {
  width: 90px;
  height: 90px;
  bottom: 150px;
  left: 20px;
}

.circle3 {
  width: 60px;
  height: 60px;
  top: 150px;
  left: 60px;
}

.circle4 {
  width: 150px;
  height: 150px;
  bottom: -40px;
  right: -50px;
}

.intro-title {
  font-size: 24px;
  font-weight: bold;
  margin-top: 30px;
  z-index: 2;
}

.intro-image {
  width: 100%;
  display: flex;
  justify-content: flex-end; /* push SVG to right */
  z-index: 2;
}

.intro-image img {
  width: 285px;
  max-width: 90%;
  margin-right: -21px; /* touch right edge */
}

.intro-button {
  margin-bottom: 40px;
  width: 100%;
  z-index: 2;
}`}
      </style>
    </div>
  );
};

export default Intro;
