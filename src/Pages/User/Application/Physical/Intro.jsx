import React from "react";
import { useNavigate } from "react-router-dom";
import PhysicalIntro from "../../../../assets/PhysicalIntro.svg";
import "./style.css";

const Intro = () => {
  const navigate = useNavigate();

  return (
    <div className="intro-container">
      {/* Decorative Illustrations */}
      <div className="decor decor-top-left">+</div>
      <div className="decor decor-top-right">+</div>
      <div className="decor decor-bottom-left">+</div>
      <div className="decor decor-bottom-right">+</div>

      {/* Heading */}
      <h1 className="intro-title">
        Welcome to <br /> <span>Physical Activity Tracker</span>
      </h1>

      {/* Center Illustration */}
      <div className="intro-image">
        <img src={PhysicalIntro} alt="Physical Activity" />
      </div>

      {/* CTA Button (One-line navigation) */}
      <button
        className="intro-button"
        onClick={() => navigate("/app/physical")}
      >
        Get Started
      </button>

      <style>
        {`
        /* Container with gradient background */
.intro-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background: linear-gradient(180deg, #d35400, #f39c12);
  padding: 40px 20px;
  box-sizing: border-box;
  text-align: center;
  position: relative;
  overflow: hidden;
}

/* Title Styling */
.intro-title {
  font-size: 26px;
  font-weight: 700;
  color: #fff;
  line-height: 1.5;
  z-index: 2;
}

.intro-title span {
  display: block;
}

/* Illustration Styling */
.intro-image {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  z-index: 2;
}

.intro-image img {
  max-width: 100%;
  height: auto;
}

/* Button Styling */
.intro-button {
  background-color: #fff;
  color: #e67e22;
  font-size: 18px;
  font-weight: 600;
  width: 80%; /* ⬅️ Increased width */
  max-width: 320px; /* ⬅️ Prevents it from getting too wide on large screens */
  padding: 16px 0; /* ⬅️ More vertical padding for a modern look */
  border: none;
  border-radius: 10px; /* ⬅️ More rounded for rich modern UI */
  cursor: pointer;
  margin-bottom: 50px;
  transition: all 0.3s ease;
  z-index: 2;
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.15);
}

.intro-button:hover {
  background-color: #fdf2e9;
  transform: translateY(-3px);
}

/* Decorative Illustrations (Plus signs) */
.decor {
  position: absolute;
  font-size: 30px;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.25);
  z-index: 1;
}

.decor-top-left {
  top: 30px;
  left: 20px;
}

.decor-top-right {
  top: 60px;
  right: 25px;
}

.decor-bottom-left {
  bottom: 120px;
  left: 40px;
}

.decor-bottom-right {
  bottom: 80px;
  right: 50px;
}
`}
      </style>
    </div>
  );
};

export default Intro;
