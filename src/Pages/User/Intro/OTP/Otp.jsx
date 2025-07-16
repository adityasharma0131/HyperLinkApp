import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Button from "../../../../Components/Button";

const Otp = () => {
  const { type, credentials } = useParams();
  const navigate = useNavigate();
  const [otp, setOtp] = useState(new Array(4).fill(""));
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [timer, setTimer] = useState(30);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const inputsRef = useRef([]);
  const otpGeneratedRef = useRef(false);

  // Generate unique user ID
  const generateUserId = () => {
    return "user_" + Math.random().toString(36).substr(2, 9);
  };

  const generateOTP = () => {
    const digits = "0123456789";
    let otp = "";
    for (let i = 0; i < 4; i++) {
      otp += digits[Math.floor(Math.random() * 10)];
    }
    return otp;
  };

  // Create user object in localStorage
  const createUser = () => {
    const userId = generateUserId();
    const userData = {
      userId,
      phoneNo: type === "phone" ? credentials : null,
      email: type === "email" ? decodeURIComponent(credentials) : null,
      name: null,
      gender: null,
      dob: null,
      locationCoordinates: null,
      createdAt: new Date().toISOString(),
    };

    // Get existing users or initialize empty array
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

    // Add new user
    existingUsers.push(userData);

    // Save back to localStorage
    // localStorage.setItem("users", JSON.stringify(existingUsers));

    // Also set current user in localStorage for easy access
    localStorage.setItem("currentUser", JSON.stringify(userData));

    return userData;
  };

  useEffect(() => {
    if (!otpGeneratedRef.current) {
      const newOtp = generateOTP();
      setGeneratedOtp(newOtp);

      setTimeout(() => {
        alert(`Generated OTP: ${newOtp}`);
      }, 100);

      toast.success(`OTP sent to ${credentials}`, {
        icon: "🔐",
        duration: 4000,
      });

      otpGeneratedRef.current = true;
    }

    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => {
      clearInterval(interval);
      toast.dismiss();
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
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      inputsRef.current[index - 1]?.focus();
    } else if (e.key === "Enter" && index === 3 && otp[index] !== "") {
      handleSubmit();
    }
  };

  const handleResend = (method) => {
    if (timer > 0) {
      toast.error(`Please wait ${timer} seconds before resending`, {
        icon: "⏳",
      });
      return;
    }

    const newOtp = generateOTP();
    setGeneratedOtp(newOtp);
    console.log("New OTP generated:", newOtp);

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

    if (enteredOtp.length !== 4) {
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

    setTimeout(() => {
      setIsLoading(false);
      toast.dismiss("otp-verification");

      if (enteredOtp === generatedOtp) {
        const newUser = createUser(); // Generates and stores user
        const userId = newUser.userId;

        toast.success("Verification successful! Redirecting...", {
          icon: "✅",
          duration: 2000,
        });

        setTimeout(() => {
          navigate(`/signin/${userId}`); // ✅ Redirects to dynamic route
        }, 2000);
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
    inputsRef.current[index]?.select();
  };

  return (
    <>
      <Toaster position="top-center" />
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
          <Button type="primary" onClick={handleSubmit}>
            Verify and Continue
          </Button>

          <button className="otp-change-method">
            Not {credentials}?{" "}
            <span>Change {type === "phone" ? "number" : "email"}</span>
          </button>
        </div>
      </div>
      <style jsx="true">
        {`
          /* OTP Verification Styles */
          .otp-verification-container {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            padding: 2rem;
            background-color: #f8fafc;
            overflow: hidden;
            font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
          }

          .otp-background {
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

          .gradient-circle.purple {
            width: 400px;
            height: 400px;
            background: radial-gradient(circle, #6d28d9, transparent 70%);
            top: -100px;
            right: -100px;
          }

          .gradient-circle.orange {
            width: 300px;
            height: 300px;
            background: radial-gradient(circle, #f59e0b, transparent 70%);
            bottom: -100px;
            left: -100px;
          }

          .otp-card {
            position: relative;
            z-index: 1;
            width: 100%;
            max-width: 440px;
            animation: fadeInUp 0.5s ease-out;
          }

          .otp-header {
            text-align: center;
            margin-bottom: 2rem;
          }

          .otp-icon {
            margin-bottom: 1rem;
          }

          .otp-icon svg {
            width: 48px;
            height: 48px;
          }

          .otp-title {
            font-size: 1.75rem;
            font-weight: 700;
            color: #1e293b;
            margin-bottom: 0.75rem;
            line-height: 1.3;
          }

          .otp-subtitle {
            font-size: 1rem;
            color: #64748b;
            line-height: 1.5;
            margin-bottom: 0;
          }

          .otp-subtitle strong {
            color: #1e293b;
            font-weight: 600;
          }

          .otp-input-container {
            display: flex;
            justify-content: center;
            gap: 0.5rem;
            margin: 2rem 0;
          }

          .otp-input-container input {
            width: 56px;
            height: 64px;
            font-size: 1.5rem;
            font-weight: 600;
            text-align: center;
            border: 2px solid #e2e8f0;
            border-radius: 12px;
            outline: none;
            transition: all 0.2s ease;
            color: #1e293b;
            background: #ffffff;
          }

          .otp-input-container input:focus {
            border-color: #8b5cf6;
            box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.2);
          }

          .otp-input-container input.error {
            border-color: #ef4444;
            animation: shake 0.5s ease-in-out;
          }

          .otp-error-message {
            color: #ef4444;
            font-size: 0.875rem;
            text-align: center;
            margin-top: -1.5rem;
            margin-bottom: 1.5rem;
          }

          .otp-timer {
            text-align: center;
            margin-bottom: 1.5rem;
          }

          .otp-timer-text {
            color: #64748b;
            font-size: 0.875rem;
          }

          .otp-timer-text span {
            color: #6d28d9;
            font-weight: 600;
          }

          .otp-resend-options {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
          }

          .otp-resend-btn {
            background: none;
            border: none;
            color: #6d28d9;
            font-weight: 600;
            font-size: 0.875rem;
            cursor: pointer;
            padding: 0.5rem;
            border-radius: 8px;
            transition: all 0.2s ease;
          }

          .otp-resend-btn:hover {
            background-color: rgba(109, 40, 217, 0.05);
          }

          .otp-submit-btn {
            width: 100%;
            border: none;
            margin-bottom: 1.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 52px;
          }

          .otp-submit-btn:disabled {
            background-color: #c7d2fe;
            cursor: not-allowed;
          }

          .otp-submit-btn.loading {
            background-color: #6d28d9;
          }

          .otp-spinner {
            width: 20px;
            height: 20px;
            border: 3px solid rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            border-top-color: white;
            animation: spin 1s ease-in-out infinite;
          }

          .otp-change-method {
            background: none;
            border: none;
            color: #64748b;
            font-size: 0.875rem;
            cursor: pointer;
            display: block;
            margin: 15px auto;
            text-align: center;
          }

          .otp-change-method span {
            color: #6d28d9;
            font-weight: 600;
            text-decoration: underline;
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

          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }

          @keyframes shake {
            0%,
            100% {
              transform: translateX(0);
            }
            20%,
            60% {
              transform: translateX(-5px);
            }
            40%,
            80% {
              transform: translateX(5px);
            }
          }

          /* Responsive Design */
          @media (max-width: 480px) {
            .otp-verification-container {
              padding: 1.5rem;
              align-items: flex-start;
            }

            .otp-input-container input {
              width: 48px;
              height: 56px;
              font-size: 1.25rem;
            }
          }
        `}
      </style>
    </>
  );
};

export default Otp;
