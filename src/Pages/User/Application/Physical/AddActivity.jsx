import React, { useState, useMemo } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { IoIosSearch } from "react-icons/io";
import { FaMicrophone } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./style.css";

const AddActivity = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const categories = [
    "All",
    "Suggested",
    "Aerobic",
    "Exercise",
    "Jogging",
    "Running",
    "Swimming",
    "Skipping",
    "Cycling",
    "Yoga",
    "Strength Training",
    "Pilates",
    "Hiking",
    "Dancing",
    "CrossFit",
    "Rowing",
  ];

  const frequentlyTracked = [
    "Running",
    "Walking",
    "Bicycling",
    "Swimming",
    "Yoga",
    "Strength Training",
    "Hiking",
    "Dancing",
  ];

  const allActivities = [
    "Running",
    "Walking",
    "Bicycling",
    "Swimming",
    "Yoga",
    "Strength Training",
    "Hiking",
    "Dancing",
    "Jogging",
    "Skipping",
    "Cycling",
    "Pilates",
    "CrossFit",
    "Rowing",
    "Aerobics",
    "Weightlifting",
    "Stretching",
    "Boxing",
    "Martial Arts",
  ];

  const [activeCategory, setActiveCategory] = useState("Suggested");

  // Filter activities based on search query and active category
  const filteredActivities = useMemo(() => {
    let result = allActivities;

    // Filter by search query
    if (searchQuery) {
      result = result.filter((activity) =>
        activity.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (activeCategory !== "All" && activeCategory !== "Suggested") {
      result = result.filter(
        (activity) =>
          activity.toLowerCase().includes(activeCategory.toLowerCase()) ||
          (activeCategory === "Aerobic" && activity === "Aerobics")
      );
    }

    return result;
  }, [searchQuery, activeCategory, allActivities]);

  // Handle activity click - navigate to details
  const handleActivityClick = (activity) => {
    navigate("/app/physical/activity-details", {
      state: { activityType: activity },
    });
  };

  return (
    <div className="diet-dashboard-page">
      <div className="diet-dashboard-hero">
        <div className="hero-top-bar">
          <button
            className="icon-button"
            onClick={() => window.history.back()}
            aria-label="Go back"
          >
            <FiArrowLeft className="hero-icon" />
          </button>
          <h1 className="hero-title">ADD ACTIVITIES</h1>
        </div>

        {/* Search Bar */}
        <div className="search-bar hero-search">
          <IoIosSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search Activities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FaMicrophone className="mic-icon" />
        </div>
      </div>

      <div className="container">
        {/* Scrollable Category Tabs */}
        <div className="category-tabs-wrapper">
          <div className="category-tabs">
            {categories.map((cat) => (
              <div
                key={cat}
                className={`category-tab ${
                  activeCategory === cat ? "active" : ""
                }`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </div>
            ))}
          </div>
        </div>

        {/* Search Results */}
        {searchQuery && (
          <div className="search-results-section">
            <h2>Search Results</h2>
            <div className="activities-list">
              {filteredActivities.length > 0 ? (
                filteredActivities.map((activity) => (
                  <div
                    key={activity}
                    className="activity-item"
                    onClick={() => handleActivityClick(activity)}
                  >
                    <span>{activity}</span>
                    <span className="arrow">›</span>
                  </div>
                ))
              ) : (
                <p className="no-results">No activities found</p>
              )}
            </div>
          </div>
        )}

        {/* Frequently Tracked Workouts */}
        {!searchQuery && (
          <div className="frequent-section">
            <h2>Frequently Tracked Workouts</h2>
            <div className="frequent-list">
              {frequentlyTracked.map((item) => (
                <div
                  key={item}
                  className="frequent-item"
                  onClick={() => handleActivityClick(item)}
                >
                  <span>{item}</span>
                  <span className="arrow">›</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Category Activities */}
        {!searchQuery && activeCategory !== "Suggested" && (
          <div className="category-activities-section">
            <h2>{activeCategory} Activities</h2>
            <div className="activities-list">
              {filteredActivities.length > 0 ? (
                filteredActivities.map((activity) => (
                  <div
                    key={activity}
                    className="activity-item"
                    onClick={() => handleActivityClick(activity)}
                  >
                    <span>{activity}</span>
                    <span className="arrow">›</span>
                  </div>
                ))
              ) : (
                <p className="no-results">
                  No activities found in this category
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      <style>
        {`
        .diet-dashboard-page {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

.diet-dashboard-hero {
  background: linear-gradient(to bottom, #d35400, #f39c12);
  padding: 20px;
  border-radius: 0 0 32px 32px;
  color: white;
  position: relative;
  box-shadow: 0 10px 30px rgba(103, 108, 255, 0.2);
  margin-bottom: 2rem;
  padding-bottom: 2rem;
}

.hero-top-bar {
  display: flex;
  align-items: center;
  justify-content: flex-start;
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

/* Scrollable Tabs */
.category-tabs-wrapper {
  overflow-x: auto;
  padding-top: 10px;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.category-tabs-wrapper::-webkit-scrollbar {
  display: none; /* Chrome, Safari */
}

.category-tabs {
  display: flex;
  gap: 12px;
}

.category-tab {
  flex: 0 0 auto;
  padding: 10px 20px;
  border-radius: 10px;
  background-color: #f0f0f0;
  cursor: pointer;
  color: #f39c12;
  font-size: 14px;
  font-weight: 500;
  border: none;
  transition: background-color 0.3s, transform 0.2s;
  white-space: nowrap;
}

.category-tab.active {
  background-color: #f39c12;
  color: white;
  font-weight: bold;
}

.category-tab:hover {
  background-color: #f39c12;
}

/* Frequently Tracked Workouts */
.frequent-section {
  padding: 20px; /* Outer padding added */
}

.frequent-section h2 {
  font-size: 20px;
  margin-bottom: 15px;
  font-weight: 600;
}

.frequent-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.frequent-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 12px;
  cursor: pointer;
  transition: background-color 0.2s, box-shadow 0.2s;
}

.frequent-item:hover {
  background-color: #f9f9f9;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.arrow {
  font-size: 20px;
  color: #888;
}
`}
      </style>
    </div>
  );
};

export default AddActivity;
