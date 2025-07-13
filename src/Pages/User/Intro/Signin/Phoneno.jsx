import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import Button from "../../../../Components/Button";

const Phoneno = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();

  const isValidPhone = phoneNumber.length === 10;

  const handleVerify = () => {
    if (isValidPhone) {
      navigate(`/signin/phone/${phoneNumber}`);
    }
  };

  const handleEmail = () => {
    navigate("/signin/email");
  };

  return (
    <div className="signin-container">
      <div className="signin-background">
        <div className="gradient-circle purple"></div>
        <div className="gradient-circle orange"></div>
      </div>

      <div className="signin-card">
        <div className="signin-header">
          <h1 className="signin-title">Welcome</h1>
          <p className="signin-subtitle">
            Sign in to access your health dashboard
          </p>
        </div>

        <div className={`input-container ${isFocused ? "focused" : ""}`}>
          <div className="country-code-wrapper">
            <span className="country-code">+91</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M6 9L12 15L18 9"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <input
            type="tel"
            className="mobile-input"
            placeholder="Enter mobile number"
            maxLength={10}
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ""))}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        </div>

        <Button type="primary" onClick={handleVerify}>
          Get Verification Code
        </Button>

        <div className="divider">
          <span className="divider-line"></span>
          <span className="divider-text">or</span>
          <span className="divider-line"></span>
        </div>

        <Button type="secondary" onClick={handleEmail}>
          Sign in with Email
        </Button>

        <div className="signin-footer">
          <p className="footer-text">
            By continuing, you agree to our{" "}
            <a href="#" className="footer-link">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="footer-link">
              Privacy Policy
            </a>
          </p>
          <p className="copyright">
            © 2025 Hyperlink Health. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Phoneno;
