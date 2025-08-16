import React from "react";

import { useNavigate } from "react-router-dom";
import SleepIntro from "../../../../assets/SleepIntro.svg";
import AppButton from "../../../../Components/AppButton";
import "./style.css";

const Intro = () => {
  const navigate = useNavigate();
  return (
    <div className="intro-container">
      {/* Background elements */}
      <div className="night-sky">
        <div className="moon"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star delay-1"></div>
        <div className="cloud cloud1"></div>
        <div className="cloud cloud2"></div>
        <div className="haze"></div>
        <div className="stars"></div>
      </div>

      {/* Content */}
      <div className="intro-content">
        <h1 className="intro-title">Restful Nights Ahead</h1>
        <p className="intro-subtitle">
          Discover the perfect sleep with personalized guidance
        </p>
        <img
          src={SleepIntro}
          alt="Peaceful Sleep Illustration"
          className="intro-image"
        />
        <div className="intro-button">
          <AppButton
            onClick={() => navigate("/app/sleep/user-info")}
            variant="secondary"
            text={"Begin Your Journey"}
          />
        </div>
      </div>

      <style>
        {`
        /* Modern Design System Variables */
:root {
  --primary-dark: #040a20;
  --primary-blue: #1e3a8a;
  --accent-purple: #6d28d9;
  --moon-glow: #fef3c7;
  --text-light: #f8fafc;
  --text-muted: #94a3b8;
  --gradient-start: #4f46e5;
  --gradient-end: #9333ea;
}

/* Base Container */
.intro-container {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, var(--primary-dark), var(--primary-blue));
  color: var(--text-light);
  text-align: center;
  padding: 2rem;
  overflow: hidden;
}

/* Night Sky Elements */
.night-sky {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 0;
}

/* Content Container */
.intro-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 420px;
  z-index: 10;
  padding: 0 1.5rem;
}

/* Typography */
.intro-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  line-height: 1.2;
  background: linear-gradient(to right, #fff, #d1d5db);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  letter-spacing: -0.025em;
}

.intro-subtitle {
  font-size: 1.125rem;
  font-weight: 400;
  color: var(--text-muted);
  margin-bottom: 2.5rem;
  max-width: 320px;
  line-height: 1.6;
}

/* Image */
.intro-image {
  width: 120%;
  max-width: 500px;
  margin: 2rem 0 3rem;
  position: relative;
  left: 11%;
  filter: drop-shadow(0 10px 15px rgba(0, 0, 0, 0.3));
  z-index: 2;
  transition: transform 0.3s ease;
}

.intro-image:hover {
  transform: translateY(-5px);
}

/* Button */
.intro-button {
  width: 100%;
  max-width: 280px;
  margin-top: 1rem;
  z-index: 2;
}

/* Moon */
.moon {
  position: absolute;
  top: 12%;
  right: 10%;
  width: 80px;
  height: 80px;
  background: radial-gradient(
    circle at 30% 30%,
    var(--moon-glow) 0%,
    #f59e0b 100%
  );
  border-radius: 50%;
  box-shadow: 0 0 60px rgba(245, 158, 11, 0.4);
  z-index: 1;
  animation: pulse 8s infinite alternate;
}

/* Stars */
.stars {
  position: absolute;
  width: 100%;
  height: 100%;
  background: transparent;
  background-image: radial-gradient(1.5px 1.5px at 15% 25%, #fff, transparent),
    radial-gradient(1.5px 1.5px at 85% 15%, #fff, transparent),
    radial-gradient(1.5px 1.5px at 45% 75%, #fff, transparent),
    radial-gradient(1.5px 1.5px at 65% 55%, #fff, transparent),
    radial-gradient(1.5px 1.5px at 5% 65%, #fff, transparent),
    radial-gradient(1.5px 1.5px at 95% 35%, #fff, transparent),
    radial-gradient(2px 2px at 30% 50%, #fff, transparent),
    radial-gradient(2px 2px at 70% 30%, #fff, transparent);
  animation: twinkle 4s infinite alternate;
  z-index: 0;
}

/* Shooting Stars */
.shooting-star {
  position: absolute;
  width: 4px;
  height: 4px;
  background: white;
  border-radius: 50%;
  filter: blur(1px);
  opacity: 0;
  animation: shoot 8s linear infinite;
}

.shooting-star:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 60px;
  height: 2px;
  background: linear-gradient(to right, rgba(255, 255, 255, 0.8), transparent);
  transform: rotate(200deg);
  transform-origin: left center;
}

.shooting-star.delay-1 {
  animation-delay: 3s;
  top: 15%;
  left: 10%;
}

/* Clouds */
.cloud {
  position: absolute;
  background: rgba(255, 255, 255, 0.416);
  border-radius: 50%;
  filter: blur(25px);
  opacity: 0.5;
}

.cloud1 {
  width: 200px;
  height: 100px;
  top: 20%;
  left: -90px;
  animation: float 30s linear infinite;
}

.cloud2 {
  width: 180px;
  height: 90px;
  top: 60%;
  right: 40px;
  animation: float 40s linear infinite reverse;
}

/* Haze */
.haze {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 200px;
  background: radial-gradient(
    ellipse at center,
    rgba(129, 140, 248, 0.15),
    transparent 70%
  );
  filter: blur(40px);
  z-index: 1;
}

/* Animations */
@keyframes twinkle {
  0%,
  100% {
    opacity: 0.4;
  }
  50% {
    opacity: 0.8;
  }
}

@keyframes float {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(120%);
  }
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 60px rgba(245, 158, 11, 0.4);
  }
  50% {
    box-shadow: 0 0 80px rgba(245, 158, 11, 0.6);
  }
  100% {
    box-shadow: 0 0 60px rgba(245, 158, 11, 0.4);
  }
}

@keyframes shoot {
  0% {
    transform: translateX(0) translateY(0);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  70% {
    transform: translateX(300px) translateY(150px);
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
}
`}
      </style>
    </div>
  );
};

export default Intro;
