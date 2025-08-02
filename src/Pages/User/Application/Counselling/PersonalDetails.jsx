import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
import { FiArrowLeft } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import CounsellingDetailsBG from "../../../../assets/counsellingdetailsbg.svg";
import AppButton from "../../../../Components/AppButton";
import "./style.css";

const PersonalDetails = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "SAKSHI NISHAD",
      age: "22",
      gender: "female",
      email: "sakshi@example.com",
      phone: "+91 9876543210",
      weight: "",
      height: "",
    },
  ]);

  const [activeUserId, setActiveUserId] = useState(1);
  const [isProfileExpanded, setIsProfileExpanded] = useState(false);
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    age: "",
    gender: "female",
    email: "",
    phone: "",
  });

  const activeUser = users.find((user) => user.id === activeUserId) || users[0];

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setUsers(
      users.map((user) =>
        user.id === activeUserId ? { ...user, [id]: value } : user
      )
    );
  };

  const handleNewUserChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", activeUser);
  };

  const addNewUser = () => {
    if (newUser.name && newUser.age) {
      const newId = Math.max(...users.map((u) => u.id), 0) + 1;
      const userToAdd = {
        id: newId,
        name: newUser.name,
        age: newUser.age,
        gender: newUser.gender,
        email: newUser.email,
        phone: newUser.phone,
        weight: "",
        height: "",
      };
      setUsers([...users, userToAdd]);
      setActiveUserId(newId);
      setIsAddingUser(false);
      setNewUser({
        name: "",
        age: "",
        gender: "female",
        email: "",
        phone: "",
      });
    }
  };

  const removeUser = (id) => {
    if (users.length > 1) {
      const updatedUsers = users.filter((user) => user.id !== id);
      setUsers(updatedUsers);
      if (activeUserId === id) {
        setActiveUserId(updatedUsers[0].id);
      }
    }
  };
  return (
    <div className="counselling-details-page">
      <div className="counselling-details-hero">
        {/* Top Navigation */}
        <div className="hero-top-bar">
          <button className="icon-button" onClick={() => window.history.back()}>
            <FiArrowLeft className="hero-icon" />
          </button>
        </div>

        {/* Image Section */}
        <div className="hero-content">
          <div className="hero-text">
            <h1>DIABETES</h1>
            <p className="hero-subtitle">
              Understand Your Genetic Risk for Diabetes
            </p>
          </div>
          <div className="hero-image">
            <span className="image-decoration" />
            <img src={CounsellingDetailsBG} alt="Child receiving vaccine" />
          </div>
        </div>
        {/* Modern Info Section */}
        <div className="risk-assessment-card">
          <h2 className="card-title">Discover Your Genetic Risk Factors</h2>
          <div className="feature-list">
            <div className="feature-item">
              <div className="feature-icon">⏱️</div>
              <p>3–5 minute assessment with 5–7 simple questions</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🔍</div>
              <p>Personalized Diabetes Risk Score analysis</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">📋</div>
              <p>
                Potential recommendations:
                <span className="tag">Diagnostic Tests</span>
                <span className="tag">Specialist Consult</span>
                <span className="tag">DNA-Based Plans</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="personal-details-container">
        <h2 className="personal-details-heading">
          Let's Start with Your Personal Details
        </h2>

        {/* Profile Card */}
        <div className="profile-section">
          <div
            className="profile-card"
            onClick={() => setIsProfileExpanded(!isProfileExpanded)}
            role="button"
            tabIndex="0"
            aria-expanded={isProfileExpanded}
            aria-label="User profile details"
          >
            <div className="profile-info">
              <div className="user-icon-container">
                <FaUser className="user-icon" />
              </div>
              <div className="profile-text">
                <h1 className="profile-name">{activeUser.name}</h1>
                <p className="profile-details">
                  {activeUser.age} Yrs, {activeUser.gender}
                </p>
              </div>
            </div>
            <IoIosArrowDown
              className={`dropdown-icon ${isProfileExpanded ? "expanded" : ""}`}
              aria-hidden="true"
            />
          </div>

          {isProfileExpanded && (
            <div className="profile-expanded-content">
              <div className="users-list">
                {users.map((user) => (
                  <div
                    key={user.id}
                    className={`user-item ${
                      user.id === activeUserId ? "active" : ""
                    }`}
                    onClick={() => {
                      setActiveUserId(user.id);
                      setIsProfileExpanded(false);
                    }}
                  >
                    <div className="user-avatar">
                      <FaUser />
                    </div>
                    <div className="user-details">
                      <span className="user-name">{user.name}</span>
                      <span className="user-meta">
                        {user.age} yrs, {user.gender}
                      </span>
                    </div>
                    {users.length > 1 && (
                      <button
                        className="remove-user-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeUser(user.id);
                        }}
                        aria-label={`Remove ${user.name}`}
                      >
                        <IoIosClose />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {isAddingUser ? (
                <div className="add-user-form">
                  <h3>Add New User</h3>
                  <div className="form-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={newUser.name}
                      onChange={handleNewUserChange}
                      placeholder="Enter full name"
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Age</label>
                      <input
                        type="number"
                        name="age"
                        value={newUser.age}
                        onChange={handleNewUserChange}
                        placeholder="Age"
                        min="1"
                        max="120"
                      />
                    </div>
                    <div className="form-group">
                      <label>Gender</label>
                      <select
                        name="gender"
                        value={newUser.gender}
                        onChange={handleNewUserChange}
                      >
                        <option value="female">Female</option>
                        <option value="male">Male</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Email (Optional)</label>
                    <input
                      type="email"
                      name="email"
                      value={newUser.email}
                      onChange={handleNewUserChange}
                      placeholder="email@example.com"
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone (Optional)</label>
                    <input
                      type="tel"
                      name="phone"
                      value={newUser.phone}
                      onChange={handleNewUserChange}
                      placeholder="+91 9876543210"
                    />
                  </div>
                  <div className="form-actions">
                    <button
                      type="button"
                      className="cancel-btn"
                      onClick={() => setIsAddingUser(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="save-btn"
                      onClick={addNewUser}
                      disabled={!newUser.name || !newUser.age}
                    >
                      Save User
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  className="add-user-btn"
                  onClick={() => setIsAddingUser(true)}
                >
                  <FaPlus /> Add New User
                </button>
              )}
            </div>
          )}
        </div>

        {/* Input Fields */}
        <form onSubmit={handleSubmit} className="personal-details-form">
          <div className="input-section">
            <div className="input-box">
              <label htmlFor="weight" className="input-label">
                Weight
              </label>
              <input
                type="number"
                id="weight"
                placeholder="Kg"
                value={activeUser.weight}
                onChange={handleInputChange}
                className="detail-input"
                min="30"
                max="200"
                required
              />
            </div>
            <div className="input-box">
              <label htmlFor="height" className="input-label">
                Height
              </label>
              <input
                type="number"
                id="height"
                placeholder="cm"
                value={activeUser.height}
                onChange={handleInputChange}
                className="detail-input"
                min="100"
                max="250"
                required
              />
            </div>
          </div>

          {/* Action Button */}
          <div className="button-wrapper">
            <AppButton
              text="Start Assessment"
              onClick={() => navigate("/app/counselling/questionaries")}
            />
          </div>
        </form>
      </div>

      <style>
        {`
        
        .counselling-details-page {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

.counselling-details-hero {
  background: linear-gradient(135deg, #6e8efb, #a777e3);
  padding: 20px;
  border-radius: 0 0 32px 32px;
  color: white;
  position: relative;
  box-shadow: 0 10px 30px rgba(103, 108, 255, 0.2);
}

.hero-top-bar {
  display: flex;
  align-items: flex-start;
  gap: 0.8rem;
  margin-bottom: 1rem;
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

.hero-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-end; /* Changed from center to flex-end */
  position: relative;
  z-index: 2;
  height: 100%; /* Added to take full height */
}

.hero-text h1 {
  font-size: 26px;
  font-weight: 800;
  line-height: 1.2;
  margin: 0 0 12px 0;
  letter-spacing: -0.5px;
}

.hero-subtitle {
  font-size: 14px;
  opacity: 0.9;
  margin-bottom: 24px;
  max-width: 200px;
  line-height: 1.5;
}

.hero-image {
  position: relative;
  height: 100%; /* Added to take full height */
  display: flex;
  align-items: flex-end; /* Align image to bottom */
}

.hero-image img {
  width: 200px;
  height: auto;
  position: relative;
  filter: drop-shadow(0 10px 15px rgba(0, 0, 0, 0.1));
} /* Modern Styling */

.risk-assessment-card {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%);
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(0, 0, 0, 0.03);
  color: #2d3748;
  margin: 1rem 0;
  transition: transform 0.3s ease;
}

.risk-assessment-card:hover {
  transform: translateY(-2px);
}

.card-title {
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 1.2rem;
  color: #1a365d;
  position: relative;
  padding-bottom: 0.5rem;
}

.card-title::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 40px;
  height: 3px;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  border-radius: 3px;
}

.feature-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.feature-item {
  display: flex;
  align-items: flex-start;
  gap: 0.8rem;
}

.feature-icon {
  font-size: 1.1rem;
  margin-top: 0.1rem;
  flex-shrink: 0;
}

.feature-item p {
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.5;
  color: #4a5568;
}

.tag {
  display: inline-block;
  background: rgba(102, 126, 234, 0.1);
  color: #667eea;
  padding: 0.2rem 0.6rem;
  border-radius: 20px;
  font-size: 0.75rem;
  margin: 0.3rem 0.3rem 0.3rem 0;
  font-weight: 500;
}
.personal-details-container {
  max-width: 480px;
  margin: 0 auto;
  padding: 24px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.personal-details-heading {
  font-size: 20px;
  font-weight: 500;
  color: #1e293b;
  margin: 0;
  text-align: left;
}

/* Profile Card */
.profile-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(135deg, #6e8efb, #a777e3);
  border-radius: 16px;
  padding: 18px;
  color: white;
  margin-bottom: 24px;
  box-shadow: 0 6px 18px rgba(102, 126, 234, 0.25);
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  z-index: 1;
}

.profile-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.35);
}

.profile-info {
  display: flex;
  align-items: center;
  gap: 14px;
}

.user-icon-container {
  background: rgba(255, 255, 255, 0.2);
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.user-icon {
  font-size: 20px;
}

.profile-text {
  overflow: hidden;
}

.profile-name {
  font-size: 18px;
  font-weight: 700;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.profile-details {
  font-size: 14px;
  margin: 4px 0 0;
  opacity: 0.9;
}

.dropdown-icon {
  font-size: 22px;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.dropdown-icon.expanded {
  transform: rotate(180deg);
}

/* Expanded Profile Content */
.profile-expanded-content {
  margin-top: -12px;
  padding: 24px 18px 18px;
  background: white;
  border-radius: 0 0 16px 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  border: 1px solid #edf2f7;
  border-top: none;
  position: relative;
  z-index: 0;
}

.users-list {
  margin-bottom: 20px;
}

.user-item {
  display: flex;
  align-items: center;
  padding: 12px;
  border-radius: 12px;
  margin-bottom: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.user-item:hover {
  background: #f7fafc;
}

.user-item.active {
  background: #ebf4ff;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  color: #4a5568;
  flex-shrink: 0;
}

.user-details {
  flex: 1;
  min-width: 0;
}

.user-name {
  display: block;
  font-weight: 600;
  color: #2d3748;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.user-meta {
  font-size: 13px;
  color: #718096;
}

.remove-user-btn {
  background: none;
  border: none;
  color: #e53e3e;
  font-size: 20px;
  cursor: pointer;
  padding: 4px;
  margin-left: 8px;
  opacity: 0.7;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.remove-user-btn:hover {
  opacity: 1;
  transform: scale(1.1);
}

/* Add User Form */
.add-user-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 12px;
  background: #f7fafc;
  border: 1px dashed #cbd5e0;
  border-radius: 12px;
  color: #4a5568;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.add-user-btn:hover {
  background: #edf2f7;
  border-color: #a0aec0;
}

.add-user-btn svg {
  margin-right: 8px;
}

.add-user-form {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #e2e8f0;
}

.add-user-form h3 {
  margin: 0 0 16px;
  color: #2d3748;
}

.form-group {
  margin-bottom: 16px;
}

.form-row {
  display: flex;
  gap: 16px;
}

.form-row .form-group {
  flex: 1;
}

.add-user-form label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #4a5568;
  margin-bottom: 6px;
}

.add-user-form input,
.add-user-form select {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  transition: all 0.2s ease;
}

.add-user-form input:focus,
.add-user-form select:focus {
  outline: none;
  border-color: #a3bffa;
  box-shadow: 0 0 0 3px rgba(164, 202, 254, 0.45);
}

.form-actions {
  display: flex;
  gap: 12px;
  margin-top: 20px;
}

.cancel-btn,
.save-btn {
  flex: 1;
  padding: 12px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.cancel-btn {
  background: #f7fafc;
  border: 1px solid #e2e8f0;
  color: #4a5568;
}

.cancel-btn:hover {
  background: #edf2f7;
}

.save-btn {
  background: #4299e1;
  border: none;
  color: white;
}

.save-btn:hover {
  background: #3182ce;
}

.save-btn:disabled {
  background: #bee3f8;
  cursor: not-allowed;
}

/* Input Form */
.personal-details-form {
  margin-top: 16px;
}

.input-section {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 24px;
}

.input-box {
  flex: 1;
}

.input-label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #4a5568;
  margin-bottom: 8px;
}

.detail-input {
  width: 100%;
  padding: 12px 14px;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  font-size: 15px;
  background: white;
  transition: all 0.2s ease;
}

.detail-input:focus {
  outline: none;
  border-color: #a3bffa;
  box-shadow: 0 0 0 3px rgba(164, 202, 254, 0.45);
}

.button-wrapper {
  width: 100%;
  margin-top: 8px;
}

/* Responsive */
@media (max-width: 480px) {
  .personal-details-container {
    padding: 20px;
    border-radius: 16px;
  }

  .personal-details-heading {
    font-size: 20px;
  }

  .input-section {
    flex-direction: column;
    gap: 16px;
  }

  .form-row {
    flex-direction: column;
    gap: 16px;
  }
}
`}
      </style>
    </div>
  );
};

export default PersonalDetails;
