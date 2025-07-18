import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Button from "../../../../Components/Button";
import { MdEnhancedEncryption } from "react-icons/md";

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

    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    existingUsers.push(userData);
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
    const stringValue = String(value).slice(-1);

    if (/^\d?$/.test(stringValue)) {
      const newOtp = [...otp];
      newOtp[index] = stringValue;
      setOtp(newOtp);
      setError("");

      // Auto-focus to next input if a digit was entered
      if (stringValue !== "" && index < 3) {
        inputsRef.current[index + 1]?.focus();
      }

      // Auto-submit if last digit was entered
      if (index === 3 && stringValue !== "") {
        const enteredOtp = [...newOtp].join("");
        if (enteredOtp.length === 4) {
          handleSubmit(newOtp);
        }
      }
    }
  };

  const handleKeyDown = (e, index) => {
    // Handle backspace
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
    // Handle arrow keys
    if (e.key === "ArrowLeft" && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
    if (e.key === "ArrowRight" && index < 3) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text/plain").slice(0, 4);
    if (/^\d+$/.test(pasteData)) {
      const newOtp = [...otp];
      for (let i = 0; i < pasteData.length; i++) {
        if (i < 4) {
          newOtp[i] = pasteData[i];
        }
      }
      setOtp(newOtp);
      if (pasteData.length === 4) {
        handleSubmit(newOtp);
      } else {
        inputsRef.current[pasteData.length]?.focus();
      }
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

  const handleSubmit = (otpArray = otp) => {
    const enteredOtp = otpArray.join("");

    // Check if all 4 digits are filled
    if (enteredOtp.length !== 4 || otpArray.some((digit) => digit === "")) {
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
        const newUser = createUser();
        const userId = newUser.userId;

        toast.success("Verification successful! Redirecting...", {
          icon: "✅",
          duration: 2000,
        });

        setTimeout(() => {
          navigate(`/signin/${userId}`);
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
              <MdEnhancedEncryption />
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
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength="1"
                value={value}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onFocus={() => handleInputFocus(index)}
                onPaste={handlePaste}
                ref={(el) => (inputsRef.current[index] = el)}
                className={error ? "error" : ""}
                autoFocus={index === 0}
                autoComplete="one-time-code"
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
          <Button
            type="primary"
            onClick={() => handleSubmit()}
            disabled={isLoading}
          >
            {isLoading ? "Verifying..." : "Verify and Continue"}
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
            color: #6d28d9;
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
