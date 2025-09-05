import React, { useState, useEffect } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { FaMicrophone, FaCamera, FaUtensils } from "react-icons/fa";
import { IoIosSearch, IoIosBarcode, IoIosAdd } from "react-icons/io";
import { useLocation } from "react-router-dom";
import foodData from "./foodData.json"; // Import the JSON file
import "./style.css";

const AddDiet = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [recentFoods, setRecentFoods] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);
  const [servingSize, setServingSize] = useState(1);
  const location = useLocation();
  const mealType = location.state?.mealType || "Meal";

  // Use the food data from the JSON file
  const foodDatabase = foodData.foods;

  // Load recent foods from localStorage on component mount
  useEffect(() => {
    const savedRecentFoods = localStorage.getItem("recentFoods");
    if (savedRecentFoods) {
      setRecentFoods(JSON.parse(savedRecentFoods));
    }
  }, []);

  // Save to recent foods when adding a food item
  const addToRecent = (food, servings = 1) => {
    const foodWithServings = {
      ...food,
      servings: servings,
      totalCalories: Math.round(food.calories * servings),
    };

    const updatedRecent = [
      foodWithServings,
      ...recentFoods.filter((item) => item.name !== food.name),
    ].slice(0, 6); // Keep only 6 most recent items

    setRecentFoods(updatedRecent);
    localStorage.setItem("recentFoods", JSON.stringify(updatedRecent));
    setSelectedFood(null);

    // In a real app, you would also add this to the meal plan
    alert(`Added ${servings} serving(s) of ${food.name} to your ${mealType}`);
  };

  const isSearching = searchQuery.trim().length > 0;
  const filteredFoods = isSearching
    ? foodDatabase.filter((food) =>
        food.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  // Group foods by category for the browse section
  const foodsByCategory = foodDatabase.reduce((acc, food) => {
    if (!acc[food.category]) acc[food.category] = [];
    acc[food.category].push(food);
    return acc;
  }, {});

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

`}
      </style>
    </div>
  );
};

export default AddDiet;
