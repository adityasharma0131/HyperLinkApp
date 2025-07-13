import React, { useEffect, useState } from "react";
import Loading from "../../../../Components/Loading";
import HeroTop from "../../../../assets/herotop.png";
import HalfLogo from "../../../../assets/halflogo.png";

import Button from "../../../../Components/Button";
import "./style.css";

const Hero = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);

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
          <img
            src={HeroTop}
            alt="Healthcare Illustration"
            className="hero-illustration"
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
            <button className="cta-button" onClick={() => setShowPopup(true)}>
              <span>Get Started</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 12H19M19 12L12 5M19 12L12 19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
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
              <Button text="I Agree" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Hero;
