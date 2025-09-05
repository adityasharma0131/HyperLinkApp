import React, { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";

const MealInfo = ({
  isOpen,
  onClose,
  name,
  protein,
  carbs,
  fats,
  calories,
  onMealAdded, // callback from AddDiet
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const staticImage =
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80";

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = "hidden";
    } else {
      setIsVisible(false);
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose(), 300);
  };

  const increaseQty = () => setQuantity((prev) => prev + 1);
  const decreaseQty = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAdd = () => {
    const newMeal = {
      name,
      protein,
      carbs,
      fats,
      calories,
      quantity,
      totalCalories: calories * quantity,
      addedAt: new Date().toISOString(),
    };

    if (typeof onMealAdded === "function") {
      onMealAdded(newMeal);
    }

    handleClose();
  };

  if (!isOpen && !isVisible) return null;

  return (
    <>
      <div
        className={`bottom-tray-backdrop ${isVisible ? "visible" : ""}`}
        onClick={handleClose}
      />

      <div className={`bottom-tray ${isVisible ? "visible" : ""}`}>
        <div className="bottom-tray-handle">
          <div className="bottom-tray-handle-bar"></div>
        </div>

        <button
          onClick={handleClose}
          className="bottom-tray-close-btn"
          aria-label="Close tray"
        >
          <FiX className="bottom-tray-close-icon" />
        </button>

        <div className="bottom-tray-content">
          <div className="meal-header">
            <img src={staticImage} alt={name} className="meal-image" />

            <div className="meal-header-text">
              <h2 className="meal-title">{name}</h2>
              <div className="quantity-row">
                <span>Quantity</span>
                <div className="qty-buttons">
                  <button onClick={decreaseQty} className="qty-btn">
                    -
                  </button>
                  <span className="qty-value">{quantity}</span>
                  <button onClick={increaseQty} className="qty-btn">
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="macro-calorie-row">
            <div className="macronutrients">
              <div>
                <p className="macro-label protein">Protein</p>
                <p className="macro-value">{protein}g</p>
              </div>
              <div>
                <p className="macro-label carbs">Carbs</p>
                <p className="macro-value">{carbs}g</p>
              </div>
              <div>
                <p className="macro-label fats">Fats</p>
                <p className="macro-value">{fats}g</p>
              </div>
            </div>

            <div className="calories-circle">
              <p className="calories-value">{calories}</p>
              <span>Cal</span>
            </div>
          </div>

          <button className="add-button" onClick={handleAdd}>
            Add
          </button>
        </div>
      </div>

      {/* Styles */}
      <style jsx>{`
        .bottom-tray-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.55);
          z-index: 999;
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }
        .bottom-tray-backdrop.visible {
          opacity: 1;
          pointer-events: auto;
        }
        .bottom-tray {
          position: fixed;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 1000;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(12px);
          border-radius: 24px 24px 0 0;
          transition: transform 0.3s ease, opacity 0.3s ease;
          transform: translateY(100%);
          max-width: 500px;
          margin: 0 auto;
          box-shadow: 0 -8px 30px rgba(0, 0, 0, 0.25);
        }
        .bottom-tray.visible {
          transform: translateY(0);
        }
        .bottom-tray-handle {
          display: flex;
          justify-content: center;
          padding: 14px 0;
        }
        .bottom-tray-handle-bar {
          width: 60px;
          height: 5px;
          background: #bbb;
          border-radius: 99px;
        }
        .bottom-tray-close-btn {
          position: absolute;
          top: 16px;
          right: 20px;
          border: none;
          background: transparent;
          cursor: pointer;
          padding: 8px;
          border-radius: 50%;
          transition: background 0.2s ease;
        }
        .bottom-tray-close-btn:hover {
          background: rgba(0, 0, 0, 0.05);
        }
        .bottom-tray-close-icon {
          font-size: 24px;
          color: #444;
        }
        .bottom-tray-content {
          padding: 20px 26px 36px;
        }
        .meal-header {
          display: flex;
          align-items: center;
          gap: 18px;
          margin-bottom: 22px;
        }
        .meal-image {
          width: 80px;
          height: 80px;
          border-radius: 14px;
          object-fit: cover;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
        .meal-title {
          margin: 0 0 6px;
          font-size: 20px;
          font-weight: 700;
          color: #222;
        }
        .quantity-row {
          font-size: 14px;
          display: flex;
          gap: 10px;
          align-items: center;
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
        .macro-calorie-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid #eee;
          border-bottom: 1px solid #eee;
          padding: 14px 0;
        }
        .macronutrients {
          display: flex;
          gap: 24px;
        }
        .macro-label {
          font-size: 13px;
          font-weight: 600;
          margin-bottom: 2px;
        }
        .macro-label.protein {
          color: #3b82f6;
        }
        .macro-label.carbs {
          color: #22c55e;
        }
        .macro-label.fats {
          color: #f97316;
        }
        .macro-value {
          font-size: 14px;
          font-weight: 500;
          color: #333;
        }
        .calories-circle {
          width: 80px;
          height: 80px;
          border: 4px solid #16aa16;
          border-radius: 50%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          font-weight: 700;
          color: #111;
          background: linear-gradient(135deg, #f0fff0, #e6ffe6);
        }
        .calories-value {
          font-size: 20px;
          line-height: 1;
        }
        .add-button {
          width: 100%;
          background: linear-gradient(135deg, #16aa16, #0d7a0d);
          color: #fff;
          font-size: 16px;
          padding: 15px;
          border: none;
          border-radius: 14px;
          margin-top: 24px;
          cursor: pointer;
          font-weight: 600;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .add-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 14px rgba(0, 0, 0, 0.15);
        }
      `}</style>
    </>
  );
};

export default MealInfo;
