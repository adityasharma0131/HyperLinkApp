import React, { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { FaUser, FaPlus } from "react-icons/fa";
import { IoIosArrowDown, IoIosClose } from "react-icons/io";
import AppButton from "../../../../Components/AppButton";
import { useNavigate } from "react-router-dom";

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

  const handleNewUserChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  const addNewUser = () => {
    if (newUser.name && newUser.age) {
      const newId = Math.max(...users.map((u) => u.id), 0) + 1;
      const userToAdd = {
        id: newId,
        ...newUser,
        weight: "",
        height: "",
      };
      setUsers((prev) => [...prev, userToAdd]);
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
    <div className="vaccination-details-page">
      {/* Hero Section */}
      <div className="vaccination-details-hero">
        <div className="hero-top-bar">
          <button
            className="icon-button"
            onClick={() => window.history.back()}
            aria-label="Go back"
          >
            <FiArrowLeft className="hero-icon" />
          </button>
          <div className="hero-text">
            <h1 className="hero-title">HPV ASSESSMENT</h1>
            <p className="hero-subtitle">
              Answer a few health questions to check your eligibility
            </p>
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
                    <AppButton
                      text={"Save User"}
                      disabled={!newUser.name || !newUser.age}
                      onClick={addNewUser}
                    />
                    <AppButton
                      text={"Cancel"}
                      variant="secondary"
                      onClick={() => setIsAddingUser(false)}
                    />
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

        <button
          onClick={() => navigate("/app/vaccination/questionnaires")}
          className="start-btn"
        >
          Start Assessment
        </button>
      </div>

      <style>
        {`
        .vaccination-details-page {
  background-color: #f7fafc;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Hero Section */
.vaccination-details-hero {
  background: linear-gradient(135deg, #6e8efb, #a777e3);
  padding: 20px;
  border-radius: 0 0 32px 32px;
  color: white;
  box-shadow: 0 10px 30px rgba(74, 144, 226, 0.2);
}

.hero-top-bar {
  display: flex;
  align-items: center;
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

.hero-text {
  display: flex;
  flex-direction: column;
}

.hero-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0;
  line-height: 1.2;
}

.hero-subtitle {
  margin: 2px 0 0;
  font-size: 10px;
  font-weight: 400;
  opacity: 0.9;
}

/* Page Content */
.page-content {
  flex: 1;
  padding: 20px;
}

.placeholder-text {
  color: #94a3b8;
  text-align: center;
  margin-top: 50px;
  font-size: 0.95rem;
}

.personal-details-container {
  max-width: 480px;
  margin: 0 auto;
  padding: 24px;
  border-radius: 20px;
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


 .start-btn {
            background-color: #553fb5;
            color: #fff;
            border: none;
            display: flex;
            border-radius: 8px;
            padding: 10px 18px;
            font-size: 16px;
            font-weight: 500;
            cursor: pointer;
            width: 100%;
            font-family: "Outfit", sans-serif;
            gap: 5px;
            flex-direction: row;
            justify-content: center;
            align-items: center;
          }
`}
      </style>
    </div>
  );
};

export default PersonalDetails;
