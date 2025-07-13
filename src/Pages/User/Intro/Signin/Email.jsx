import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import Button from "../../../../Components/Button";

const Email = () => {
  const [email, setEmail] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleVerify = () => {
    if (isValidEmail) {
      const encodedEmail = encodeURIComponent(email);
      navigate(`/signin/email/${encodedEmail}`);
    }
  };

  const handlePhone = () => {
    navigate("/signin/phone");
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
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            style={{ marginRight: "12px" }}
          >
            <path
              d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M22 6L12 13L2 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <input
            type="email"
            className="mobile-input"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

        <Button type="secondary" onClick={handlePhone}>
          Sign in with Phone
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

export default Email;
