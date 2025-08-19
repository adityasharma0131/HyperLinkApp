import React from "react";
import { useNavigate } from "react-router-dom";
import SleepIntro from "../../../../assets/SleepIntro.svg";
import SleepIntroBG from "../../../../assets/sleepintrobg.svg";
import AppButton from "../../../../Components/AppButton";

const Intro = () => {
  const navigate = useNavigate();

  return (
    <div className="intro-container">
      {/* Animated Background Elements */}
      <div className="night-sky">
        <div className="moon"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star delay-1"></div>
        <div className="shooting-star delay-2"></div>
        <div className="cloud cloud1"></div>
        <div className="cloud cloud2"></div>
        <div className="cloud cloud3"></div>
        <div className="haze"></div>
        <div className="stars"></div>
      </div>

      {/* Main Content */}
      <div className="intro-content">
        <img
          src={SleepIntroBG}
          className="intro-bg-image"
          alt="Background pattern"
        />

        <div className="text-content">
          <h1 className="intro-title">Restful Nights Ahead</h1>
          <p className="intro-subtitle">
            Discover the perfect sleep with personalized guidance
          </p>
        </div>

        <div className="image-container">
          <img
            src={SleepIntro}
            alt="Peaceful Sleep Illustration"
            className="intro-image"
          />
        </div>

        <div className="intro-button">
          <AppButton
            onClick={() => navigate("/app/sleep/user-info")}
            variant="gradient"
            text={"Begin Your Journey"}
          />
        </div>
      </div>

      <style jsx>{`
        /* Modern Design System Variables */
        :root {
          --primary-dark: #040a20;
          --primary-blue: #1e3a8a;
          --accent-purple: #6d28d9;
          --moon-glow: #ffffffff;
          --text-light: #f8fafc;
          --text-muted: #94a3b8;
          --gradient-start: #4f46e5;
          --gradient-end: #9333ea;
          --star-color: rgba(255, 255, 255, 0.8);
        }

        /* Base Container */
        .intro-container {
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100vh;
          min-height: 600px;
          background: linear-gradient(
            135deg,
            var(--primary-dark),
            var(--primary-blue)
          );
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
          width: 100%;
          z-index: 10;
          padding: 0 1.5rem;
        }

        .text-content {
          margin-bottom: 1.5rem;
          z-index: 2;
        }

        .image-container {
          position: relative;
          width: 100%;
          margin: 1rem 0 2rem;
          z-index: 2;
        }

        /* Typography */
        .intro-title {
          font-size: 2.25rem;
          font-weight: 800;
          margin-bottom: 0.75rem;
          line-height: 1.2;
          background: linear-gradient(to right, #fff, #d1d5db);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          letter-spacing: -0.025em;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .intro-subtitle {
          font-size: 1.125rem;
          font-weight: 400;
          color: var(--text-muted);
          margin-bottom: 0;
          max-width: 320px;
          line-height: 1.6;
        }

        /* Images */
        .intro-bg-image {
          position: absolute;
          top: 40%;
          left: 40%;
          transform: translate(-50%, -50%);
          z-index: 1;
        }

        .intro-image {
          width: 110%;
          max-width: 500px;
          filter: drop-shadow(0 10px 15px rgba(0, 0, 0, 0.3));
          transition: transform 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);
          will-change: transform;
        }

        .intro-image:hover {
          transform: translateY(-8px) scale(1.02);
        }

        /* Button */
        .intro-button {
          width: 100%;
          max-width: 280px;
          margin-top: 1rem;
          z-index: 2;
          transition: transform 0.3s ease;
        }

        .intro-button:hover {
          transform: translateY(-2px);
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
            #ffffffff 100%
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
          background-image: radial-gradient(
              1.2px 1.2px at 20% 30%,
              var(--star-color),
              transparent
            ),
            radial-gradient(
              1.4px 1.4px at 80% 20%,
              var(--star-color),
              transparent
            ),
            radial-gradient(
              1.2px 1.2px at 40% 70%,
              var(--star-color),
              transparent
            ),
            radial-gradient(
              1.4px 1.4px at 60% 50%,
              var(--star-color),
              transparent
            ),
            radial-gradient(
              1.2px 1.2px at 10% 60%,
              var(--star-color),
              transparent
            ),
            radial-gradient(
              1.4px 1.4px at 90% 40%,
              var(--star-color),
              transparent
            ),
            radial-gradient(
              1.6px 1.6px at 25% 45%,
              var(--star-color),
              transparent
            ),
            radial-gradient(
              1.6px 1.6px at 75% 35%,
              var(--star-color),
              transparent
            );
          animation: twinkle 5s infinite alternate;
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
          animation: shoot 10s linear infinite;
        }

        .shooting-star:before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 80px;
          height: 2px;
          background: linear-gradient(
            to right,
            rgba(255, 255, 255, 0.9),
            transparent
          );
          transform: rotate(200deg);
          transform-origin: left center;
        }

        .shooting-star.delay-1 {
          animation-delay: 3s;
          top: 15%;
          left: 10%;
        }

        .shooting-star.delay-2 {
          animation-delay: 6s;
          top: 25%;
          left: 5%;
        }

        /* Clouds */
        .cloud {
          position: absolute;
          background: rgba(255, 255, 255, 0.15);
          border-radius: 50%;
          filter: blur(25px);
          opacity: 0.6;
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

        .cloud3 {
          width: 220px;
          height: 110px;
          top: 40%;
          right: -100px;
          animation: float 50s linear infinite;
          animation-delay: 10s;
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
            opacity: 0.9;
          }
        }

        @keyframes float {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(120vw);
          }
        }

        @keyframes pulse {
          0% {
            box-shadow: 0 0 60px rgba(245, 158, 11, 0.4);
          }
          50% {
            box-shadow: 0 0 100px rgba(245, 158, 11, 0.7);
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
          5% {
            opacity: 1;
          }
          70% {
            transform: translateX(400px) translateY(200px);
            opacity: 0;
          }
          100% {
            opacity: 0;
          }
        }

        /* Responsive Adjustments */
        @media (max-width: 480px) {
          .intro-title {
            font-size: 1.75rem;
          }

          .intro-subtitle {
            font-size: 1rem;
          }

          .moon {
            width: 60px;
            height: 60px;
            top: 10%;
            right: 5%;
          }

          .intro-image {
            width: 120%;
            margin: 1rem 0;
          }
        }

        @media (max-height: 700px) {
          .intro-container {
            min-height: 650px;
          }

          .intro-image {
            width: 100%;
            margin: 0.5rem 0 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Intro;
