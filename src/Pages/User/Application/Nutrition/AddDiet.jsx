import React, { useState, useEffect } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { FaMicrophone, FaCamera, FaUtensils } from "react-icons/fa";
import { IoIosSearch, IoIosBarcode, IoIosAdd } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { useLocation } from "react-router-dom";
import foodData from "./foodData.json";
import MealInfo from "./MealInfo";
import { useNavigate } from "react-router-dom";

import "./style.css";

const AddDiet = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [recentFoods, setRecentFoods] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);
  const [mealTray, setMealTray] = useState([]);
  const location = useLocation();
  const mealType = location.state?.mealType || "Meal";

  // ✅ Load from localStorage on mount
  useEffect(() => {
    const savedMeals = JSON.parse(localStorage.getItem("mealTray")) || {};
    setMealTray(savedMeals[mealType] || []);

    const savedRecentFoods = localStorage.getItem("recentFoods");
    if (savedRecentFoods) {
      setRecentFoods(JSON.parse(savedRecentFoods));
    }
  }, [mealType]);

  // ✅ Save tray changes by mealType
  const updateMealTray = (updatedTray) => {
    setMealTray(updatedTray);
    const savedMeals = JSON.parse(localStorage.getItem("mealTray")) || {};
    savedMeals[mealType] = updatedTray;
    localStorage.setItem("mealTray", JSON.stringify(savedMeals));
  };

  // ✅ Remove meal
  const handleRemoveFromTray = (index) => {
    const updatedTray = mealTray.filter((_, i) => i !== index);
    updateMealTray(updatedTray);
  };

  // ✅ Foods grouped by category
  const foodDatabase = foodData.foods;
  const foodsByCategory = foodDatabase.reduce((acc, food) => {
    if (!acc[food.category]) acc[food.category] = [];
    acc[food.category].push(food);
    return acc;
  }, {});

  const isSearching = searchQuery.trim().length > 0;
  const filteredFoods = isSearching
    ? foodDatabase.filter((food) =>
        food.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  // ✅ Calculate total calories in tray
  const totalCalories = mealTray.reduce(
    (sum, meal) => sum + (meal.totalCalories || 0),
    0
  );

  return (
    <div className="diet-dashboard-page">
      {/* Header */}
      <div className="diet-dashboard-hero">
        <div className="hero-top-bar">
          <button
            className="icon-button"
            onClick={() => window.history.back()}
            aria-label="Go back"
          >
            <FiArrowLeft className="hero-icon" />
          </button>
          <h1 className="hero-title">ADD {mealType.toUpperCase()}</h1>
        </div>

        {/* Search Bar */}
        <div className="search-bar hero-search">
          <IoIosSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search meals..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FaMicrophone className="mic-icon" />
        </div>
      </div>

      <div className="main-content">
        {/* Tray Section */}
        {mealTray.length > 0 && (
          <div className="food-section">
            <h2 className="section-title">Your Tray ({mealType})</h2>
            <div className="food-list">
              {mealTray.map((meal, index) => (
                <div key={index} className="food-item">
                  <div className="food-info">
                    <p className="food-name">{meal.name}</p>
                    <p className="food-calories">
                      {meal.totalCalories * meal.quantity} cals ({meal.quantity}{" "}
                      qty)
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="qty-controls">
                    <button
                      className="qty-btn"
                      onClick={() => {
                        if (meal.quantity > 1) {
                          const updatedTray = [...mealTray];
                          updatedTray[index].quantity -= 1;
                          updatedTray[index].totalCalories =
                            meal.calories * updatedTray[index].quantity;
                          updateMealTray(updatedTray);
                        }
                      }}
                    >
                      -
                    </button>

                    <span className="qty-value">{meal.quantity}</span>

                    <button
                      className="qty-btn"
                      onClick={() => {
                        const updatedTray = [...mealTray];
                        updatedTray[index].quantity += 1;
                        updatedTray[index].totalCalories =
                          meal.calories * updatedTray[index].quantity;
                        updateMealTray(updatedTray);
                      }}
                    >
                      +
                    </button>
                  </div>

                  {/* Delete Button */}
                  <button
                    className="remove-btn"
                    onClick={() => handleRemoveFromTray(index)}
                  >
                    <MdDelete />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* If NOT searching → show Scan + Recent + Browse */}
        {!isSearching && (
          <>
            {/* Scan Options */}
            <div className="scan-options">
              <div className="scan-card">
                <FaCamera className="scan-icon" />
                <p className="scan-text">Scan a Meal</p>
              </div>
              <div className="scan-card">
                <IoIosBarcode className="scan-icon" />
                <p className="scan-text">Scan a Barcode</p>
              </div>
            </div>

            {/* Recent Foods */}
            {recentFoods.length > 0 && (
              <div className="food-section">
                <h2 className="section-title">Recent</h2>
                <div className="food-list">
                  {recentFoods.map((food, index) => (
                    <div key={index} className="food-item">
                      <div className="food-info">
                        <p className="food-name">{food.name}</p>
                        <p className="food-calories">
                          {food.totalCalories} cals ({food.servings} serving
                          {food.servings !== 1 ? "s" : ""})
                        </p>
                      </div>
                      <button
                        className="add-btn"
                        onClick={() => setSelectedFood(food)}
                      >
                        <IoIosAdd className="add-icon" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Browse by Category */}
            <div className="food-section">
              <h2 className="section-title">Browse Foods</h2>
              {Object.entries(foodsByCategory).map(([category, foods]) => (
                <div key={category} className="category-section">
                  <h3 className="category-title">
                    <FaUtensils className="category-icon" />
                    {category}
                  </h3>
                  <div className="food-list">
                    {foods.slice(0, 4).map((food, index) => (
                      <div key={index} className="food-item">
                        <div className="food-info">
                          <p className="food-name">{food.name}</p>
                          <p className="food-calories">{food.calories} cals</p>
                        </div>
                        <button
                          className="add-btn"
                          onClick={() => setSelectedFood(food)}
                        >
                          <IoIosAdd className="add-icon" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* If searching → show search results */}
        {isSearching && (
          <div className="food-section">
            <h2 className="section-title">Search Results</h2>
            <div className="food-list">
              {filteredFoods.length > 0 ? (
                filteredFoods.map((food, index) => (
                  <div key={index} className="food-item">
                    <div className="food-info">
                      <p className="food-name">{food.name}</p>
                      <p className="food-calories">{food.calories} cals</p>
                    </div>
                    <button
                      className="add-btn"
                      onClick={() => setSelectedFood(food)}
                    >
                      <IoIosAdd className="add-icon" />
                    </button>
                  </div>
                ))
              ) : (
                <p className="no-results">No matching foods found</p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ✅ Bottom Fixed Tray */}
      {mealTray.length > 0 && (
        <div className="add-diet-bottom-tray">
          <div className="add-diet-tray-content">
            <div className="add-diet-tray-info">
              <span className="add-diet-tray-label">Total Calories</span>
              <span className="add-diet-tray-calories">
                {totalCalories} cal
              </span>
            </div>
            <button
              className="add-diet-done-btn"
              onClick={() => navigate("/app/nutrition/diet-dashboard")}
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* ✅ Bottom Tray MealInfo */}
      {selectedFood && (
        <MealInfo
          isOpen={!!selectedFood}
          onClose={() => setSelectedFood(null)}
          name={selectedFood.name}
          protein={selectedFood.protein}
          carbs={selectedFood.carbs}
          fats={selectedFood.fats}
          calories={selectedFood.calories}
          onMealAdded={(newMeal) => {
            const updated = [...mealTray, { ...newMeal, mealType }];
            updateMealTray(updated);

            // recent foods
            setRecentFoods((prev) => {
              const updatedRecent = [newMeal, ...prev].slice(0, 10);
              localStorage.setItem(
                "recentFoods",
                JSON.stringify(updatedRecent)
              );
              return updatedRecent;
            });
          }}
        />
      )}

      <style>
        {`
        /* style.css */
.diet-dashboard-page {
  box-sizing: border-box;
  padding: 0;
  background-color: #f7fafc;
  min-height: 100vh;
  margin: 0;
}

.diet-dashboard-hero {
  background: linear-gradient(to bottom, #004918 0%, #02b614 100%);
  padding: 20px;
  border-radius: 0 0 32px 32px;
  color: white;
  position: relative;
  box-shadow: 0 10px 30px rgba(103, 108, 255, 0.2);
  margin-bottom: 2rem;
}

.hero-top-bar {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  text-align: left;
  margin-bottom: 1rem;
  gap: 1rem;
}

.icon-button {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(5px);
  transition: all 0.3s ease;
  cursor: pointer;
}

.icon-button:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

.hero-icon {
  font-size: 18px;
  color: white;
}

.hero-title {
  font-size: 16px;
  font-weight: 700;
  margin: 0;
  line-height: 1.2;
  text-align: left;
  letter-spacing: 1px;
}

.search-bar {
  display: flex;
  align-items: center;
  background: #ffffff;
  border-radius: 999px;
  padding: 10px 16px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
}

.search-bar input {
  flex: 1;
  border: none;
  outline: none;
  padding: 6px 10px;
  font-size: 14px;
  background: transparent;
}

.search-icon,
.mic-icon {
  color: #6b7280;
  font-size: 16px;
}

.hero-search {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 50%);
  width: calc(100% - 40px);
  max-width: 500px;
}

.main-content {
  padding: 20px;
}

.scan-options {
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;
  padding: 10px 0 30px;
}

.scan-card {
  background: #fff;
  border-radius: 12px;
  width: 160px;
  height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
}

.scan-card:hover {
  transform: translateY(-5px);
  box-shadow: 0px 6px 14px rgba(0, 0, 0, 0.15);
}

.scan-icon {
  font-size: 32px;
  color: #333;
  margin-bottom: 12px;
}

.scan-text {
  font-size: 14px;
  font-weight: 500;
  color: #222;
  text-align: center;
}

.food-section {
  margin-bottom: 30px;
}

.section-title {
  font-size: 18px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 16px;
  padding-left: 10px;
}

.category-section {
  margin-bottom: 20px;
}

.category-title {
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  color: #2d3748;
  margin: 0 0 12px;
  padding-left: 10px;
}

.category-icon {
  margin-right: 8px;
  color: #4caf50;
  font-size: 14px;
}

.food-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.food-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #ffffff;
  padding: 14px 16px;
  border-radius: 12px;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.food-item:hover {
  background: #f8f9fa;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.food-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.food-name {
  font-size: 15px;
  font-weight: 600;
  color: #222;
  margin: 0;
}

.food-calories {
  font-size: 13px;
  color: #666;
  margin: 0;
}

.add-btn {
  background: #16aa16;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.add-btn:hover {
  background: #0e7c0e;
  transform: scale(1.1);
}

.add-icon {
  font-size: 20px;
  color: #fff;
}

.no-results {
  text-align: center;
  color: #718096;
  padding: 20px;
  font-style: italic;
}

@media (max-width: 480px) {
  .scan-card {
    width: 100%;
    max-width: 280px;
  }

  .hero-title {
    font-size: 14px;
  }
}
   .remove-btn {
  background: #e53935;
  border: none;
  font-size: 20px;
  color: #fff;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.remove-btn:hover {
  background: #b71c1c;
  transform: scale(1.1);
}

.remove-btn:active {
  transform: scale(0.95);
}

.remove-btn:focus {
  outline: 2px solid #ff8a80;
  outline-offset: 2px;
}

.remove-icon {
  color: white;
  font-size: 18px;
}

.add-diet-bottom-tray {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  border-top: 1px solid #eee;
  padding: 12px 20px;
  box-shadow: 0 -2px 12px rgba(0,0,0,0.1);
  z-index: 1000;
}

.add-diet-tray-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.add-diet-tray-info {
  display: flex;
  flex-direction: column;
  font-size: 14px;
}

.add-diet-tray-label {
  color: #666;
  font-weight: 500;
}

.add-diet-tray-calories {
  font-size: 16px;
  font-weight: 700;
  color: #111;
}

.add-diet-done-btn {
  background: #16aa16;
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  padding: 10px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.add-diet-done-btn:hover {
  background: #0e7c0e;
}

.qty-controls {
  display: flex;
  align-items: center;
  gap: 8px;
}

.qty-btn {
  background: #16aa16;
  color: white;
  border: none;
  width: 28px;
  height: 28px;
  border-radius: 6px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
}

.qty-btn:hover {
  background: #0e7c0e;
}

.qty-value {
  font-size: 14px;
  font-weight: 600;
  min-width: 20px;
  text-align: center;
}

`}
      </style>
    </div>
  );
};

export default AddDiet;
