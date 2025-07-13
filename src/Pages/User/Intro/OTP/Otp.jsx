import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import "./style.css";

const Otp = () => {
  const { type, credentials } = useParams();
  const [otp, setOtp] = useState(new Array(4).fill(""));
  const [timer, setTimer] = useState(30);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const inputsRef = useRef([]);

  useEffect(() => {
    // Show initial toast when component mounts
    toast.success(`OTP sent to ${credentials}`, {
      icon: "🔐",
      duration: 4000,
    });

    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => {
      clearInterval(interval);
      toast.dismiss(); // Clean up any toasts when component unmounts
    };
  }, [credentials]);

  const handleChange = (value, index) => {
    if (!isNaN(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      setError("");

      if (value !== "" && index < 3) {
        inputsRef.current[index + 1]?.focus();
      }

      if (index === 3 && value !== "") {
        handleSubmit();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleResend = (method) => {
    if (timer > 0) {
      toast.error(`Please wait ${timer} seconds before resending`, {
        icon: "⏳",
      });
      return;
    }

    const methodName =
      method === "sms" ? "SMS" : method === "call" ? "phone call" : "email";
    toast.success(`New OTP sent via ${methodName}`, {
      icon: "🔄",
    });

    setTimer(30);
    setOtp(new Array(4).fill(""));
    inputsRef.current[0]?.focus();
  };

  const handleSubmit = () => {
    const enteredOtp = otp.join("");
    if (enteredOtp.length !== 3) {
      setError("Please enter a 4-digit code");
      toast.error("Please enter a complete 4-digit code", {
        icon: "❌",
      });
      return;
    }

    setIsLoading(true);
    toast.loading("Verifying OTP...", {
      id: "otp-verification",
    });

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.dismiss("otp-verification");

      // Mock verification - replace with actual API call
      if (enteredOtp === "1234") {
        // Example correct OTP
        toast.success("Verification successful!", {
          icon: "✅",
          duration: 4000,
        });
      } else {
        toast.error("Invalid OTP. Please try again", {
          icon: "❌",
        });
        setOtp(new Array(4).fill(""));
        inputsRef.current[0]?.focus();
      }
    }, 1500);
  };

  const handleInputFocus = (index) => {
    const input = inputsRef.current[index];
    if (input) {
      input.select();
    }
  };

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#fff",
            color: "#1e293b",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            borderRadius: "12px",
            padding: "16px 20px",
            fontSize: "14px",
            fontWeight: "500",
          },
        }}
      />

      <div className="otp-verification-container">
        <div className="otp-background">
          <div className="gradient-circle purple"></div>
          <div className="gradient-circle orange"></div>
        </div>

        <div className="otp-card">
          <div className="otp-header">
            <div className="otp-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                <path
                  d="M22 16.92V19.08C22 19.92 21.36 20.58 20.53 20.71C19.71 20.83 18.48 20.92 17 20.92C15.52 20.92 14.29 20.83 13.47 20.71C12.64 20.58 12 19.92 12 19.08V16.92C12 16.08 12.64 15.42 13.47 15.29C14.29 15.17 15.52 15.08 17 15.08C18.48 15.08 19.71 15.17 20.53 15.29C21.36 15.42 22 16.08 22 16.92Z"
                  fill="#6D28D9"
                />
                <path
                  d="M19 8.75H15C14.59 8.75 14.25 8.41 14.25 8C14.25 7.59 14.59 7.25 15 7.25H19C19.41 7.25 19.75 7.59 19.75 8C19.75 8.41 19.41 8.75 19 8.75Z"
                  fill="#6D28D9"
                />
                <path
                  d="M19 12.75H15C14.59 12.75 14.25 12.41 14.25 12C14.25 11.59 14.59 11.25 15 11.25H19C19.41 11.25 19.75 11.59 19.75 12C19.75 12.41 19.41 12.75 19 12.75Z"
                  fill="#6D28D9"
                />
                <path
                  d="M10 8.75H5C4.59 8.75 4.25 8.41 4.25 8C4.25 7.59 4.59 7.25 5 7.25H10C10.41 7.25 10.75 7.59 10.75 8C10.75 8.41 10.41 8.75 10 8.75Z"
                  fill="#6D28D9"
                />
                <path
                  d="M10 12.75H5C4.59 12.75 4.25 12.41 4.25 12C4.25 11.59 4.59 11.25 5 11.25H10C10.41 11.25 10.75 11.59 10.75 12C10.75 12.41 10.41 12.75 10 12.75Z"
                  fill="#6D28D9"
                />
                <path
                  d="M17 15.08C15.52 15.08 14.29 15.17 13.47 15.29C12.64 15.42 12 16.08 12 16.92V19.08C12 19.92 12.64 20.58 13.47 20.71C14.29 20.83 15.52 20.92 17 20.92C18.48 20.92 19.71 20.83 20.53 20.71C21.36 20.58 22 19.92 22 19.08V16.92C22 16.08 21.36 15.42 20.53 15.29C19.71 15.17 18.48 15.08 17 15.08ZM17 14C18.65 14 20 15.35 20 17C20 18.65 18.65 20 17 20C15.35 20 14 18.65 14 17C14 15.35 15.35 14 17 14Z"
                  fill="#6D28D9"
                />
                <path
                  d="M17 18C17.5523 18 18 17.5523 18 17C18 16.4477 17.5523 16 17 16C16.4477 16 16 16.4477 16 17C16 17.5523 16.4477 18 17 18Z"
                  fill="#6D28D9"
                />
              </svg>
            </div>
            <h1 className="otp-title">
              Verify your {type === "phone" ? "phone number" : "email"}
            </h1>
            <p className="otp-subtitle">
              We've sent a 4-digit verification code to
              <br />
              <strong>{credentials}</strong>
            </p>
          </div>

          <div className="otp-input-container">
            {otp.map((value, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={value}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onFocus={() => handleInputFocus(index)}
                ref={(el) => (inputsRef.current[index] = el)}
                className={error ? "error" : ""}
                autoFocus={index === 0}
              />
            ))}
          </div>

          {error && <p className="otp-error-message">{error}</p>}

          <div className="otp-timer">
            {timer > 0 ? (
              <p className="otp-timer-text">
                Resend code in <span>{String(timer).padStart(2, "0")}s</span>
              </p>
            ) : (
              <div className="otp-resend-options">
                <button
                  className="otp-resend-btn"
                  onClick={() =>
                    handleResend(type === "phone" ? "sms" : "email")
                  }
                >
                  Resend code
                </button>
                {type === "phone" && (
                  <button
                    className="otp-resend-btn"
                    onClick={() => handleResend("call")}
                  >
                    Get a call instead
                  </button>
                )}
              </div>
            )}
          </div>

          <button
            className={`otp-submit-btn ${isLoading ? "loading" : ""}`}
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="otp-spinner"></div>
            ) : (
              "Verify and Continue"
            )}
          </button>

          <button className="otp-change-method">
            Not {credentials}?{" "}
            <span>Change {type === "phone" ? "number" : "email"}</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Otp;
