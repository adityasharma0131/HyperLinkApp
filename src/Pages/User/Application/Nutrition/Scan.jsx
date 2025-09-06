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
      <style>
        {`
        .scan-container {
  position: relative;
  width: 100%;
  height: 100vh;
  background: #0a0a0a;
  overflow: hidden;
}

.scan-header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  z-index: 10;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.8) 0%,
    transparent 100%
  );
}

.scan-title {
  color: white;
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.icon-button {
  background: rgba(255, 255, 255, 0.15);
  border: none;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.icon-button:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: translateY(-2px);
}

.hero-icon {
  font-size: 20px;
  color: white;
}

.scan-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.9);
}

/* Camera Error */
.camera-error {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 20;
}

.error-content {
  background: #1a1a1a;
  padding: 32px;
  border-radius: 24px;
  text-align: center;
  max-width: 320px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
}

.error-icon {
  color: #ff4757;
  margin-bottom: 16px;
}

.error-content h3 {
  color: white;
  margin: 0 0 8px 0;
  font-size: 20px;
}

.error-content p {
  color: #aaa;
  margin: 0 0 24px 0;
  line-height: 1.5;
}

/* Overlay */
.scan-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

/* Scan Frame */
.scan-frame {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 280px;
  height: 430px;
  overflow: hidden;
}

/* Corner guides */
.corner {
  position: absolute;
  width: 24px;
  height: 24px;
  border: 3px solid #ffffff;
}

.top-left {
  top: 0;
  left: 0;
  border-right: none;
  border-bottom: none;
  border-radius: 12px 0 0 0;
}

.top-right {
  top: 0;
  right: 0;
  border-left: none;
  border-bottom: none;
  border-radius: 0 12px 0 0;
}

.bottom-left {
  bottom: 0;
  left: 0;
  border-right: none;
  border-top: none;
  border-radius: 0 0 0 12px;
}

.bottom-right {
  bottom: 0;
  right: 0;
  border-left: none;
  border-top: none;
  border-radius: 0 0 12px 0;
}

/* Scanning animation */
.scanning-animation {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 280px;
  height: 280px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 15;
}

.scanning-grid {
  position: relative;
  width: 100%;
  height: 100%;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 24px;
  overflow: hidden;
  backdrop-filter: blur(2px);
}

.grid-line {
  position: absolute;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(59, 130, 246, 0.7),
    transparent
  );
}

.grid-line.horizontal {
  top: 33%;
  left: 0;
  right: 0;
  height: 2px;
  animation: scanHorizontal 2s infinite ease-in-out;
}

.grid-line.vertical {
  left: 33%;
  top: 0;
  bottom: 0;
  width: 2px;
  animation: scanVertical 2s infinite ease-in-out;
}

.scanning-dots {
  position: absolute;
  inset: 0;
}

.scan-dot {
  position: absolute;
  width: 10px;
  height: 10px;
  background: #16aa16;
  border-radius: 50%;
  animation: pulseDot 1.5s infinite;
  box-shadow: 0 0 12px #16aa16;
}

.dot-1 {
  top: 20%;
  left: 20%;
  animation-delay: 0s;
}
.dot-2 {
  top: 20%;
  right: 20%;
  animation-delay: 0.3s;
}
.dot-3 {
  bottom: 20%;
  left: 20%;
  animation-delay: 0.6s;
}
.dot-4 {
  bottom: 20%;
  right: 20%;
  animation-delay: 0.9s;
}

.scan-progress {
  position: absolute;
  bottom: -70px;
  width: 100%;
  text-align: center;
}

.progress-bar {
  width: 100%;
  height: 6px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #16aa16, #009100);
  border-radius: 3px;
  transition: width 0.2s ease;
  box-shadow: 0 0 10px rgba(59, 130, 246, 0.6);
}

.progress-text {
  color: white;
  font-size: 14px;
  font-weight: 500;
  margin: 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

@keyframes scanHorizontal {
  0%,
  100% {
    transform: translateY(-30px);
  }
  50% {
    transform: translateY(30px);
  }
}

@keyframes scanVertical {
  0%,
  100% {
    transform: translateX(-30px);
  }
  50% {
    transform: translateX(30px);
  }
}

@keyframes pulseDot {
  0%,
  100% {
    transform: scale(1);
    opacity: 0.7;
  }
  50% {
    transform: scale(1.5);
    opacity: 1;
  }
}

/* Scan instructions */
.scan-instructions {
  position: absolute;
  bottom: 47px;
  text-align: center;
  width: 100%;
  padding: 0 24px;
}

.instruction-text {
  margin-bottom: 24px;
}

.instruction-text h3 {
  color: white;
  font-size: 18px;
  margin: 0 0 8px 0;
  font-weight: 600;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.instruction-text p {
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
  font-size: 14px;
}

.scan-button {
  background: #16aa16;
  color: white;
  border: none;
  padding: 18px 32px;
  border-radius: 16px;
  font-size: 16px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 0 auto;
  cursor: pointer;
  transition: all 0.3s;
}

.scan-button:hover {
  transform: translateY(-3px);
}

.scan-button:active {
  transform: translateY(0);
}
.scan-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  z-index: 999;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
}
.scan-backdrop.visible {
  opacity: 1;
  pointer-events: auto;
}

/* Tray */
.scan-results {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(12px);
  border-radius: 24px 24px 0 0;
  padding: 26px 22px 32px;
  max-height: 72vh;
  overflow-y: auto;
  box-shadow: 0 -8px 30px rgba(0, 0, 0, 0.25);
  transform: translateY(100%);
  transition: transform 0.35s ease, opacity 0.3s ease;
  max-width: 500px;
  margin: 0 auto;
}
.scan-results.visible {
  transform: translateY(0);
}

/* Header */
.results-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 22px;
}
.results-title {
  margin: 0;
  font-size: 20px;
  font-weight: 700;
  color: #222;
}
.success-badge {
  display: flex;
  align-items: center;
  gap: 6px;
  background: #16aa16;
  color: white;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
}

/* Food Results */
.food-results {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 26px;
}
.food-result-item {
  display: flex;
  align-items: center;
  padding: 16px;
  background: #f8fafc;
  border-radius: 16px;
  gap: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  transition: transform 0.2s, box-shadow 0.2s;
}
.food-result-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
}

.food-image-placeholder {
  width: 54px;
  height: 54px;
  border-radius: 14px;
  background: linear-gradient(135deg, #3b82f6, #60a5fa);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 18px;
  flex-shrink: 0;
  box-shadow: 0 3px 8px rgba(59, 130, 246, 0.4);
}

.food-result-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
}
.food-name {
  font-weight: 700;
  font-size: 16px;
  color: #1a1a1a;
}
.food-calories {
  font-size: 14px;
  color: #475569;
}
.confidence {
  font-size: 13px;
  color: #16aa16;
  font-weight: 600;
}

/* Buttons */
.add-result-btn {
  background: #16aa16;
  color: white;
  border: none;
  padding: 10px 18px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 2px 6px rgba(16, 185, 129, 0.3);
}
.add-result-btn:hover {
  background: #0d7a0d;
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(16, 185, 129, 0.4);
}

.retry-button {
  width: 100%;
  background: #16aa16;
  color: #fff;
  border: none;
  padding: 15px;
  border-radius: 14px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.retry-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.15);
}

/* Add these styles to your existing CSS file */

/* Nutrition Bars */
.nutrition-bar {
  margin-bottom: 12px;
}

.nutrition-label {
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
  font-size: 12px;
  color: #555;
}

.bar-container {
  height: 6px;
  background-color: #eee;
  border-radius: 3px;
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  border-radius: 3px;
  transition: width 0.3s ease;
}

/* Macronutrient Pills */
.macronutrient-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin: 8px 0;
}

.pill {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
}

.pill.calories {
  background: rgba(22, 170, 22, 0.15);
  color: #16aa16;
}

.pill.protein {
  background: rgba(33, 150, 243, 0.15);
  color: #2196f3;
}

.pill.carbs {
  background: rgba(76, 175, 80, 0.15);
  color: #4caf50;
}

.pill.fat {
  background: rgba(255, 152, 0, 0.15);
  color: #ff9800;
}

/* Food serving size */
.food-serving {
  font-size: 12px;
  color: #666;
  margin: 2px 0;
}

/* Result actions */
.result-actions {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.info-button {
  background: rgba(33, 150, 243, 0.1);
  color: #2196f3;
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
}

.info-button:hover {
  background: rgba(33, 150, 243, 0.2);
}

/* Update food result item for new layout */
.food-result-item {
  display: flex;
  align-items: center;
  padding: 16px;
  background: #f8fafc;
  border-radius: 16px;
  gap: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  transition: transform 0.2s, box-shadow 0.2s;
}

.food-result-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
}

.qty-buttons {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #f8f8f8;
  border-radius: 8px;
  padding: 4px 10px;
}
.qty-btn {
  background: #16aa16;
  border: none;
  color: white;
  font-size: 16px;
  font-weight: bold;
  padding: 4px 10px;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s ease;
}
.qty-btn:hover {
  background: #0d7a0d;
}
.qty-value {
  font-size: 15px;
  font-weight: 600;
  color: #333;
  min-width: 20px;
  text-align: center;
}
`}
      </style>
    </div>
  );
};

export default Scan;
