import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../../../Components/Loading";
import HeroVideo from "../../../../assets/hero.mp4";
import HalfLogo from "../../../../assets/halflogo.png";

import Button from "../../../../Components/Button";
// import "./style.css";

const Hero = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handleAgree = () => {
    navigate("/signin/phone");
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <Loading />;

  return (
    <>
      <div className="hero-container">
        <div className="hero-background">
          <div className="gradient-circle pink"></div>
          <div className="gradient-circle blue"></div>
          <div className="gradient-circle yellow"></div>
        </div>

        <div className="hero-content">
          <video
            src={HeroVideo}
            className="hero-illustration"
            autoPlay
            loop
            muted
            playsInline
          />

          <div className="hero-card">
            <div className="logo-container">
              <img
                src={HalfLogo}
                alt="Hyperlink 360 Logo"
                className="hero-logo"
              />
            </div>
            <h1 className="hero-title">
              Your health, <span className="gradient-text">our priority</span>
            </h1>
            <p className="hero-subtitle">Welcome to Hyperlink 360!</p>
            <p className="hero-description">
              Comprehensive healthcare solutions powered by AI and medical
              expertise
            </p>
            <Button type="primary" onClick={() => setShowPopup(true)}>
              Get Started
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 12H19M19 12L12 5M19 12L12 19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Button>
          </div>
        </div>
      </div>

      {/* Permission Modal */}
      {showPopup && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h2 className="modal-title">App Permissions</h2>
              <p className="modal-subtitle">
                We respect your privacy and data security
              </p>
            </div>

            <div className="modal-body">
              <div className="privacy-card">
                <div className="privacy-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                      stroke="#8B5CF6"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 16V12M12 8H12.01"
                      stroke="#8B5CF6"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="privacy-content">
                  <h3>Terms of service and privacy</h3>
                  <p>
                    Your health is our priority and we take your privacy
                    seriously. All health data shared is with your explicit
                    consent only and is compliant with the Information
                    Technology Act (IT Act) of 2000, Digital Information
                    Security in Healthcare Act of 2018 (DISHA) and the Digital
                    Personal Data Protection (DPDP) Act of 2023.
                  </p>
                </div>
              </div>

              <div className="permissions-grid">
                {[
                  {
                    icon: (
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12 8V12L15 15"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ),
                    title: "Location",
                    description:
                      "Recommended to set location sharing 'Always' for showing location-specific data.",
                  },
                  {
                    icon: (
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M23 19C23 19.5304 22.7893 20.0391 22.4142 20.4142C22.0391 20.7893 21.5304 21 21 21H3C2.46957 21 1.96086 20.7893 1.58579 20.4142C1.21071 20.0391 1 19.5304 1 19V8C1 7.46957 1.21071 6.96086 1.58579 6.58579C1.96086 6.21071 2.46957 6 3 6H7L9 3H15L17 6H21C21.5304 6 22.0391 6.21071 22.4142 6.58579C22.7893 6.96086 23 7.46957 23 8V19Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12 17C14.2091 17 16 15.2091 16 13C16 10.7909 14.2091 9 12 9C9.79086 9 8 10.7909 8 13C8 15.2091 9.79086 17 12 17Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ),
                    title: "Camera",
                    description: "Used to take and upload prescription images.",
                  },
                  {
                    icon: (
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M22 16.92V19C22 19.5304 21.7893 20.0391 21.4142 20.4142C21.0391 20.7893 20.5304 21 20 21H4C3.46957 21 2.96086 20.7893 2.58579 20.4142C2.21071 20.0391 2 19.5304 2 19V16.92M22 16.92C21.5364 15.8335 20.8312 14.8744 19.948 14.1185C19.0648 13.3627 18.0302 12.8329 16.9279 12.5733C15.8256 12.3137 14.6883 12.3316 13.5946 12.6256C12.5008 12.9196 11.4839 13.4815 10.63 14.26L12 16H12.63L14 14.26C13.1461 13.4815 12.1292 12.9196 11.0354 12.6256C9.94166 12.3316 8.80436 12.3137 7.70207 12.5733C6.59978 12.8329 5.56521 13.3627 4.682 14.1185C3.79879 14.8744 3.09359 15.8335 2.63 16.92H22Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M7 7V3M17 7V3M12 7V3"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ),
                    title: "Files Access",
                    description:
                      "Needed to store and retrieve prescription uploads.",
                  },
                  {
                    icon: (
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M22 2L11 13M22 2L15 22L11 13M11 13L2 9"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ),
                    title: "SMS",
                    description: "Used for automatic OTP confirmation.",
                  },
                  {
                    icon: (
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ),
                    title: "Receive SMS",
                    description:
                      "Helps to send payment-related SMS via RazorPay.",
                  },
                  {
                    icon: (
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M5 12H19M12 5L19 12L12 19"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ),
                    title: "Wi-Fi State",
                    description:
                      "Optimizes video consultation based on signal strength.",
                  },
                ].map((item, index) => (
                  <div className="permission-item" key={index}>
                    <div className="permission-icon">{item.icon}</div>
                    <div className="permission-details">
                      <h4>{item.title}</h4>
                      <p>{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="modal-footer">
              <Button type="primary" onClick={handleAgree}>
                I Agree
              </Button>
            </div>
          </div>
        </div>
      )}

      <style jsx="true">
        {`
          /* Base Styles */
          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }

          body {
            color: #1e293b;
            line-height: 1.5;
          }

          /* Hero Container */
          .hero-container {
            position: relative;
            width: 100%;
            min-height: 100vh;
            overflow: hidden;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #f8fafc;
          }

          .hero-background {
            position: absolute;
            width: 100%;
            height: 100%;
            z-index: 0;
          }

          .gradient-circle {
            position: absolute;
            border-radius: 50%;
            filter: blur(80px);
            opacity: 0.15;
            z-index: 0;
          }

          .gradient-circle.pink {
            width: 300px;
            height: 300px;
            background: radial-gradient(circle, #ec4899, transparent 70%);
            top: -100px;
            right: -100px;
          }

          .gradient-circle.blue {
            width: 400px;
            height: 400px;
            background: radial-gradient(circle, #6d28d9, transparent 70%);
            bottom: -150px;
            left: -150px;
          }

          .gradient-circle.yellow {
            width: 250px;
            height: 250px;
            background: radial-gradient(circle, #f59e0b, transparent 70%);
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }

          .hero-content {
            position: relative;
            z-index: 1;
            width: 100%;
            max-width: 1200px;
            padding: 2rem;
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 3rem;
            justify-content: center;
          }

          .hero-illustration {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            object-fit: cover;
            z-index: -1; /* Optional: push it behind other content */
            filter: brightness(0.9) drop-shadow(0 10px 20px rgba(0, 0, 0, 0.1));
          }

          .hero-card {
            background: #f8fafc;
            backdrop-filter: blur(10px);
            border-radius: 24px;
            padding: 2.5rem;
            width: 100%;
            max-width: 500px;
            text-align: center;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.3);
            transform-style: preserve-3d;
            transform: perspective(1000px);
          }

          .logo-container {
            margin-bottom: 1.5rem;
          }

          .hero-logo {
            width: 120px;
            height: auto;
            filter: drop-shadow(0 4px 8px rgba(109, 40, 217, 0.2));
          }

          .hero-title {
            font-size: 2.25rem;
            font-weight: 700;
            margin-bottom: 1rem;
            color: #1e293b;
            line-height: 1.2;
          }

          .gradient-text {
            background: linear-gradient(90deg, #6d28d9, #ec4899);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
          }

          .hero-subtitle {
            font-size: 1.25rem;
            color: #8b5cf6;
            font-weight: 600;
            margin-bottom: 0.5rem;
          }

          .hero-description {
            font-size: 1rem;
            color: #94a3b8;
            margin-bottom: 2rem;
            max-width: 350px;
            margin-left: auto;
            margin-right: auto;
          }

          .cta-button {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 0.75rem;
            background: linear-gradient(90deg, #6d28d9, #8b5cf6);
            color: white;
            border: none;
            padding: 1rem 2.5rem;
            border-radius: 12px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(109, 40, 217, 0.3);
            position: relative;
            overflow: hidden;
          }

          .cta-button::before {
            content: "";
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(
              90deg,
              transparent,
              rgba(255, 255, 255, 0.2),
              transparent
            );
            transition: all 0.5s ease;
          }

          .cta-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(109, 40, 217, 0.4);
          }

          .cta-button:hover::before {
            left: 100%;
          }

          .cta-button svg {
            width: 18px;
            height: 18px;
            transition: transform 0.3s ease;
          }

          .cta-button:hover svg {
            transform: translateX(4px);
          }

          /* Modal Styles */
          .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.6);
            backdrop-filter: blur(8px);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            padding: 1rem;
            scrollbar-width: none;
            -ms-overflow-style: none;
          }

          .modal-container {
            background: white;
            border-radius: 24px;
            width: 100%;
            max-width: 600px;
            max-height: 90vh;
            overflow-y: auto;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
            animation: fadeInUp 0.4s ease-out;
          }

          .modal-header {
            padding: 2rem 2rem 1rem;
            text-align: center;
            border-bottom: 1px solid rgba(0, 0, 0, 0.05);
          }

          .modal-title {
            font-size: 1.75rem;
            font-weight: 700;
            color: #1e293b;
            margin-bottom: 0.5rem;
          }

          .modal-subtitle {
            font-size: 1rem;
            color: #94a3b8;
            font-weight: 500;
          }

          .modal-body {
            padding: 1.5rem 2rem;
          }

          .privacy-card {
            background: rgba(139, 92, 246, 0.05);
            border-radius: 12px;
            padding: 1.5rem;
            margin-bottom: 2rem;
            display: flex;
            gap: 1rem;
            border: 1px solid rgba(139, 92, 246, 0.1);
          }

          .privacy-icon {
            flex-shrink: 0;
            width: 40px;
            height: 40px;
            background: rgba(139, 92, 246, 0.1);
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .privacy-icon svg {
            width: 20px;
            height: 20px;
          }

          .privacy-content h3 {
            font-size: 1.1rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
            color: #6d28d9;
          }

          .privacy-content p {
            font-size: 0.95rem;
            color: #1e293b;
            opacity: 0.8;
          }

          .permissions-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 1.5rem;
            margin-bottom: 1.5rem;
          }

          .permission-item {
            display: flex;
            gap: 1rem;
            align-items: flex-start;
          }

          .permission-icon {
            flex-shrink: 0;
            width: 40px;
            height: 40px;
            background: rgba(236, 72, 153, 0.05);
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #ec4899;
          }

          .permission-details h4 {
            font-size: 1rem;
            font-weight: 600;
            margin-bottom: 0.25rem;
            color: #1e293b;
          }

          .permission-details p {
            font-size: 0.85rem;
            color: #94a3b8;
            line-height: 1.5;
          }

          .modal-footer {
            padding: 1.5rem 2rem;
            border-top: 1px solid rgba(0, 0, 0, 0.05);
            display: flex;
            justify-content: center;
          }

          /* Animations */
          @keyframes float {
            0%,
            100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-15px);
            }
          }

          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          /* Responsive Design */
          @media (max-width: 768px) {
            .hero-content {
              flex-direction: column;
              gap: 0rem;
              padding: 1.5rem;
            }

            .hero-card {
              padding: 1rem 1.5rem;
            }

            .hero-title {
              font-size: 1.75rem;
            }

            .hero-subtitle {
              font-size: 1.1rem;
            }

            .modal-container {
              max-width: 95%;
            }

            .permissions-grid {
              grid-template-columns: 1fr;
            }
          }

          @media (max-width: 480px) {
            .hero-title {
              font-size: 1.5rem;
            }

            .hero-description {
              font-size: 0.9rem;
            }

            .cta-button {
              padding: 0.875rem 1.5rem;
              font-size: 0.9rem;
            }

            .modal-header {
              padding: 1.5rem 1rem 1rem;
            }

            .modal-body {
              padding: 1rem;
            }

            .modal-footer {
              padding: 1rem;
            }
          }
        `}
      </style>
    </>
  );
};

export default Hero;
