import React, { useRef, useEffect, useState } from "react";
import UserNavigation from "../../../../Components/UserNavigation";
import { MdOutlineVaccines } from "react-icons/md";
import { FaAppleAlt, FaStethoscope } from "react-icons/fa";
import { GiHealthNormal, GiStethoscope } from "react-icons/gi";
import { BiPulse } from "react-icons/bi";
import "./style.css";

const Services = () => {
  const containerRef = useRef(null);
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const lastRotation = useRef(0);
  const [userName] = useState("Sakshi");

  const cards = [
    {
      icon: <MdOutlineVaccines className="card-icon" />,
      title: "Vaccinations",
      desc: "Stay up-to-date with your vaccinations",
      color: "blue-card",
    },
    {
      icon: <FaAppleAlt className="card-icon" />,
      title: "Health Wellness",
      desc: "Access resources for a healthier lifestyle",
      color: "red-card",
    },
    {
      icon: <GiStethoscope className="card-icon" />,
      title: "General Checkup",
      desc: "Book your routine health checkups",
      color: "green-card",
    },
    {
      icon: <FaStethoscope className="card-icon" />,
      title: "Doctor Consultation",
      desc: "Connect with doctors online",
      color: "pink-card",
    },
    {
      icon: <GiHealthNormal className="card-icon" />,
      title: "Health Resources",
      desc: "Comprehensive health resources",
      color: "darkblue-card",
    },
    {
      icon: <GiStethoscope className="card-icon" />,
      title: "Emergency Care",
      desc: "Quick help in emergencies",
      color: "purple-card",
    },
    {
      icon: <BiPulse className="card-icon" />,
      title: "Health Monitoring",
      desc: "Track your health stats",
      color: "orange-card",
    },
  ];

  // Mouse + wheel scroll
  const handleWheel = (e) => {
    setRotation((prev) => prev + e.deltaY * 0.2);
  };

  // Touch & drag handling
  const handleTouchStart = (e) => {
    setIsDragging(true);
    startX.current = e.touches[0].clientX;
    lastRotation.current = rotation;
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const deltaX = e.touches[0].clientX - startX.current;
    setRotation(lastRotation.current + deltaX * 0.5); // adjust 0.5 for sensitivity
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Mouse drag (desktop)
  const handleMouseDown = (e) => {
    setIsDragging(true);
    startX.current = e.clientX;
    lastRotation.current = rotation;
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startX.current;
    setRotation(lastRotation.current + deltaX * 0.5);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Wheel
    container.addEventListener("wheel", handleWheel);

    // Touch
    container.addEventListener("touchstart", handleTouchStart);
    container.addEventListener("touchmove", handleTouchMove);
    container.addEventListener("touchend", handleTouchEnd);

    // Mouse drag
    container.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      container.removeEventListener("wheel", handleWheel);

      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("touchend", handleTouchEnd);

      container.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [rotation, isDragging]);

  return (
    <div className="services-page">
      {/* Hero Section */}
      <div className="services-hero">
        <h2>Explore Our Services</h2>
        <p className="hero-subtitle">
          Empowering you to take charge of your health with modern solutions
        </p>
      </div>

      {/* Greeting */}
      <div className="greeting-section">
        <h1>👋 Hi, {userName}</h1>
        <p>Your personalized healthcare journey starts here.</p>
      </div>

      {/* Circular Scroll Cards */}
      <div className="circular-wrapper">
        <div className="circular-container" ref={containerRef}>
          <div
            className="circular-cards"
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            {cards.map((card, index) => (
              <div
                key={index}
                className={`circular-card glass-card ${card.color}`}
                style={{
                  transform: `rotate(${
                    (360 / cards.length) * index + 10
                  }deg) translateY(-170px)`,
                }}
              >
                <div className="card-content">
                  {card.icon}
                  <h3 className="card-title">{card.title}</h3>
                  <p className="card-description">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <UserNavigation />

      <style>
        {`
        body {
  margin: 0;
  background: linear-gradient(135deg, #f5f7fa, #e4ebf7);
  font-family: "Poppins", sans-serif;
}

/* Page layout */
.services-page {
  position: relative;
  min-height: 100vh;
  padding-bottom: 80px;
  overflow-x: hidden;
}

/* Hero section */
.services-hero {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: #fff;
  padding: 60px 20px;
  text-align: center;
  border-radius: 0 0 36px 36px;
  box-shadow: 0 6px 20px rgba(118, 75, 162, 0.3);
  animation: fadeInDown 1s ease;
}

.services-hero h2 {
  font-size: 34px;
  font-weight: 700;
  margin-bottom: 12px;
}

.hero-subtitle {
  font-size: 18px;
  font-weight: 400;
  opacity: 0.95;
}

/* Greeting */
.greeting-section {
  text-align: center;
  margin: 30px 20px;
  animation: fadeInUp 1s ease;
}

.greeting-section h1 {
  font-size: 30px;
  font-weight: 700;
  color: #333;
  margin-bottom: 6px;
}

.greeting-section p {
  font-size: 18px;
  color: #666;
}

/* Circular wrapper */
.circular-wrapper {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: 380px;
  overflow: hidden;
  pointer-events: none;
  z-index: 1;
}

.circular-container {
    position: absolute;
    bottom: -135px;
    left: 50%;
    transform: translateX(-50%);
    width: 340px;
    height: 380px;
    border-radius: 50%;
    perspective: 1000px;
}

.circular-cards {
  position: absolute;
  width: 100%;
  height: 100%;
  transform-origin: center center;
  transition: transform 0.4s ease-out;
}

/* Card styling */
.circular-card {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 120px; /* slightly smaller */
  height: 140px;
  margin: -70px 0 0 -60px;
  border-radius: 20px;
  text-align: center;
  color: white;
  font-weight: 500;
  transition: transform 0.35s ease, box-shadow 0.35s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: auto;
  gap: 6px; /* adds gap between icon, text, etc. */
}

.circular-card:hover {
  transform: scale(1.12);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.25);
}

/* Glassmorphism effect */
.glass-card {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.25);
}

.card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px;
}

.card-icon {
  font-size: 42px;
  margin-bottom: 10px;
}

/* Card colors (light gradient overlays) */
.blue-card {
  background: linear-gradient(145deg, #4a90e2, #357abd);
}
.red-card {
  background: linear-gradient(145deg, #ff6f91, #e94e77);
}
.green-card {
  background: linear-gradient(145deg, #50c878, #3da768);
}
.pink-card {
  background: linear-gradient(145deg, #ff9a9e, #ff6f91);
}
.darkblue-card {
  background: linear-gradient(145deg, #34495e, #2c3e50);
}
.purple-card {
  background: linear-gradient(145deg, #9b59b6, #8e44ad);
}
.orange-card {
  background: linear-gradient(145deg, #f39c12, #d68910);
}

/* Animations */
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .services-hero {
    padding: 40px 20px;
  }
  .services-hero h2 {
    font-size: 26px;
  }
  .hero-subtitle {
    font-size: 15px;
  }
  .greeting-section h1 {
    font-size: 24px;
  }
  .greeting-section p {
    font-size: 15px;
  }
  .circular-card {
    width: 110px;
    height: 130px;
  }
  .card-icon {
    font-size: 30px;
  }
}

.card-title {
  font-size: 10px;
}
.card-description {
  font-size: 10px;
}


`}
      </style>
    </div>
  );
};

export default Services;
