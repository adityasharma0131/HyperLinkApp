import React, { useEffect, useRef, useState } from "react";
import { FiArrowLeft, FiCamera, FiX, FiCheck } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";
import "./style.css";

const Scan = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const videoRef = useRef(null);

  // ✅ Get mealType from navigation state, fallback to "Meal"
  const mealType = location.state?.mealType || "Meal";

  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [scanProgress, setScanProgress] = useState(0);
  const [cameraError, setCameraError] = useState(false);

  useEffect(() => {
    const openCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
          audio: false,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Camera access denied: ", err);
        setCameraError(true);
      }
    };

    openCamera();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  const startScanning = () => {
    setIsScanning(true);
    setScanProgress(0);

    // Simulate scanning progress
    const scanInterval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(scanInterval);
          captureImage();
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const captureImage = () => {
    // Simulate detection results
    setTimeout(() => {
      setIsScanning(false);
      setScanComplete(true);

      // Simulated detected foods
      const detectedFoods = [
        {
          name: "Apple",
          serving: "1 medium (182g)",
          calories: 95,
          category: "Fruits",
          protein: 0.5,
          carbs: 25.0,
          fat: 0.3,
          confidence: 0.87,
        },
        {
          name: "Banana",
          serving: "1 medium (118g)",
          calories: 105,
          category: "Fruits",
          protein: 1.3,
          carbs: 27.0,
          fat: 0.4,
          confidence: 0.92,
        },
        {
          name: "Orange",
          serving: "1 medium (131g)",
          calories: 62,
          category: "Fruits",
          protein: 1.2,
          carbs: 15.4,
          fat: 0.2,
          confidence: 0.78,
        },
      ];

      setScanResult(detectedFoods);
    }, 500);
  };

  const retryScan = () => {
    setScanComplete(false);
    setScanResult(null);
    setScanProgress(0);
    setCameraError(false);
  };

  const addToTray = (food, quantity) => {
    // ✅ Use mealTray instead of mealData
    const mealTray = JSON.parse(localStorage.getItem("mealTray")) || {};

    const newMeal = {
      name: food.name,
      protein: food.protein,
      carbs: food.carbs,
      fat: food.fat,
      calories: food.calories,
      quantity,
      totalCalories: food.calories * quantity,
      addedAt: new Date().toISOString(),
      mealType, // ✅ store meal type
    };

    if (!mealTray[mealType]) {
      mealTray[mealType] = [];
    }

    // ✅ check if food already exists → update qty, else add
    const existingIndex = mealTray[mealType].findIndex(
      (item) => item.name === food.name
    );

    if (existingIndex >= 0) {
      mealTray[mealType][existingIndex] = newMeal;
    } else {
      mealTray[mealType].push(newMeal);
    }

    // ✅ Save back to localStorage
    localStorage.setItem("mealTray", JSON.stringify(mealTray));
  };

  return (
    <div className="scan-container">
      {/* Header */}
      <div className="scan-header">
        <button
          className="icon-button"
          onClick={() => navigate(-1)}
          aria-label="Go back"
        >
          <FiArrowLeft className="hero-icon" />
        </button>
        <h2 className="scan-title">Scan Food for {mealType}</h2>
        <div style={{ width: "40px" }}></div>
      </div>

      <video ref={videoRef} autoPlay playsInline muted className="scan-video" />

      {/* Camera Error */}
      {cameraError && (
        <div className="camera-error">
          <div className="error-content">
            <FiX size={32} className="error-icon" />
            <h3>Camera Access Denied</h3>
            <p>Please allow camera access to use the scanner</p>
            <button className="retry-button" onClick={retryScan}>
              Try Again
            </button>
          </div>
        </div>
      )}

      {/* Overlay */}
      <div className="scan-overlay">
        <div className="scan-frame">
          <div className="corner top-left"></div>
          <div className="corner top-right"></div>
          <div className="corner bottom-left"></div>
          <div className="corner bottom-right"></div>
        </div>

        {/* Scanning animation */}
        {isScanning && (
          <div className="scanning-animation">
            <div className="scanning-grid">
              <div className="grid-line horizontal"></div>
              <div className="grid-line vertical"></div>
              <div className="scanning-dots">
                <div className="scan-dot dot-1"></div>
                <div className="scan-dot dot-2"></div>
                <div className="scan-dot dot-3"></div>
                <div className="scan-dot dot-4"></div>
              </div>
            </div>
            <div className="scan-progress">
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${scanProgress}%` }}
                ></div>
              </div>
              <p className="progress-text">Analyzing food... {scanProgress}%</p>
            </div>
          </div>
        )}

        {/* Instructions */}
        {!isScanning && !scanComplete && !cameraError && (
          <div className="scan-instructions">
            <div className="instruction-text">
              <h3>Position food in frame</h3>
              <p>Ensure good lighting for best results</p>
            </div>
            <button className="scan-button" onClick={startScanning}>
              <FiCamera size={24} />
              Scan Now
            </button>
          </div>
        )}

        {/* Results */}
        {/* Scan Results */}
        {scanComplete && scanResult && (
          <div className="scan-results visible">
            <div className="results-header">
              <h3 className="results-title">Scan Results</h3>
              <div className="success-badge">
                <FiCheck size={16} />
                Complete
              </div>
            </div>

            <div className="food-results">
              {scanResult.map((food, index) => (
                <div key={index} className="food-result-item">
                  <div className="food-result-info">
                    <span className="food-name">{food.name}</span>
                    <span className="food-serving">{food.serving}</span>
                    <div className="macronutrient-pills">
                      <span className="pill calories">{food.calories} Cal</span>
                      <span className="pill protein">P: {food.protein}g</span>
                      <span className="pill carbs">C: {food.carbs}g</span>
                      <span className="pill fat">F: {food.fat}g</span>
                    </div>
                    <span className="confidence">
                      {(food.confidence * 100).toFixed(0)}% confidence
                    </span>
                  </div>
                  <div className="result-actions">
                    {food.quantity ? (
                      <div className="qty-buttons">
                        <button
                          onClick={() => {
                            const updatedQty = food.quantity - 1;
                            const updatedResults = [...scanResult];
                            if (updatedQty <= 0) {
                              updatedResults[index].quantity = null;
                            } else {
                              updatedResults[index].quantity = updatedQty;
                            }
                            setScanResult(updatedResults);
                            addToTray(
                              food,
                              updatedResults[index].quantity || 0
                            );
                          }}
                          className="qty-btn"
                        >
                          -
                        </button>
                        <span className="qty-value">{food.quantity}</span>
                        <button
                          onClick={() => {
                            const updatedResults = [...scanResult];
                            updatedResults[index].quantity =
                              (food.quantity || 0) + 1;
                            setScanResult(updatedResults);
                            addToTray(food, updatedResults[index].quantity);
                          }}
                          className="qty-btn"
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      <button
                        className="add-result-btn"
                        onClick={() => {
                          const updatedResults = [...scanResult];
                          updatedResults[index].quantity = 1;
                          setScanResult(updatedResults);
                          addToTray(food, 1);
                        }}
                      >
                        Add
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <button className="retry-button" onClick={() => navigate(-1)}>
              Continue
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Scan;
