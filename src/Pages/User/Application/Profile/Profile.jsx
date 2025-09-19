import React from "react";
import { FiArrowLeft, FiChevronRight } from "react-icons/fi";
import {
  FaAddressCard,
  FaUsers,
  FaUserMd,
  FaFileMedical,
  FaUserFriends,
  FaUserClock,
  FaFlask,
  FaMoneyBillWave,
  FaCog,
} from "react-icons/fa";
import {
  MdDevicesOther,
  MdLanguage,
  MdFeedback,
  MdSupport,
} from "react-icons/md";
import { PiIdentificationBadge } from "react-icons/pi";
import { RiHealthBookFill, RiFileList2Fill } from "react-icons/ri";

import UserNavigation from "../../../../Components/UserNavigation";
import PictureProfile from "../../../../assets/PictureProfile.png";

import "./style.css";

const Profile = () => {
  // Health Profile Section items
  const items = [
    { icon: <RiHealthBookFill />, label: "My Health360" },
    { icon: <FaFileMedical />, label: "Medical History" },
    { icon: <FaUserMd />, label: "My Doctors" },
    { icon: <MdDevicesOther />, label: "Device & Accounts" },
    { icon: <FaUserFriends />, label: "Health Reports" },
  ];

  // History Section items
  const Hitems = [
    { icon: <FaUserClock />, label: "Consultation History" },
    { icon: <FaFlask />, label: "Lab Booking History" },
    { icon: <FaMoneyBillWave />, label: "Payment History" },
    { icon: <FaCog />, label: "App Settings" },
    { icon: <MdLanguage />, label: "Language Change" },
    { icon: <FaUsers />, label: "Invite Others" },
    { icon: <MdFeedback />, label: "Feedback" },
    { icon: <RiFileList2Fill />, label: "Terms & Conditions" },
    { icon: <MdSupport />, label: "Help & Support" },
  ];

  return (
    <div className="child-vacc-page">
      <div className="child-vacc-hero">
        {/* Top bar */}
        <div className="hero-top-bar">
          <button className="icon-button" onClick={() => window.history.back()}>
            <FiArrowLeft className="hero-icon" />
          </button>
          <div className="hero-texts">
            <h1 className="hero-title">My Profile</h1>
          </div>
        </div>

        {/* Profile Card */}
        <div className="profile-card">
          <img src={PictureProfile} alt="Profile" className="profile-image" />
          <div className="profile-info">
            <h2 className="profile-name">Sakshi Nishad</h2>
            <p className="profile-id">Hyperlink ID: ZXML-1234</p>
          </div>

          <div className="profile-icons">
            <div className="profile-icon">
              <FaAddressCard className="profile-icon-img" />
              <span className="profile-icon-text">My Details</span>
            </div>

            <div className="profile-icon">
              <PiIdentificationBadge className="profile-icon-img" />
              <span className="profile-icon-text">Manage Identity</span>
            </div>

            <div className="profile-icon">
              <FaUsers className="profile-icon-img" />
              <span className="profile-icon-text">My Family</span>
            </div>
          </div>
        </div>
      </div>

      {/* Health Profile Section */}
      <div className="health-profile-container">
        <h1 className="health-profile-title">Health Profile</h1>
        <div className="health-card">
          {items.map((item, index) => (
            <div key={index} className="health-item">
              <div className="health-item-left">
                <div className="health-icon">{item.icon}</div>
                <span className="health-label">{item.label}</span>
              </div>
              <FiChevronRight className="health-arrow" />
            </div>
          ))}
        </div>
      </div>

      {/* History Section */}
      <div className="health-profile-container history-section">
        <h1 className="health-profile-title">History</h1>
        <div className="health-card">
          {Hitems.map((item, index) => (
            <div key={index} className="health-item">
              <div className="health-item-left">
                <div className="health-icon">{item.icon}</div>
                <span className="health-label">{item.label}</span>
              </div>
              <FiChevronRight className="health-arrow" />
            </div>
          ))}
        </div>
      </div>

      <UserNavigation />

      <style>
        {`
        .child-vacc-page {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

.child-vacc-hero {
  background: linear-gradient(to bottom, #6ea6e7 0%, #daeffe 50%, #e0d3ff 80%);
  padding: 20px;
  border-radius: 0 0 32px 32px;
  color: white;
  box-shadow: 0 10px 30px rgba(74, 144, 226, 0.2);
  position: relative;
}

.hero-top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;
}

.hero-texts {
  flex: 1;
  text-align: left;
}

.hero-title {
  font-size: 18px;
  font-weight: 700;
  color: #553fb5;
  margin: 0;
  line-height: 1.2;
}

.hero-subtitle {
  font-size: 12px;
  font-weight: 600;
  color: #000;
  opacity: 0.9;
  cursor: pointer;
}

.icon-button {
  background: rgba(255, 255, 255, 0.25);
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
  background: rgba(255, 255, 255, 0.35);
  transform: translateY(-2px);
}

.hero-icon {
  font-size: 18px;
  color: #553fb5;
}

.profile-heading {
  font-size: 20px;
  font-weight: 700;
  color: #553fb5;
  margin: 1rem 0;
}

.profile-card {
  background: #fff;
  border-radius: 16px;
  padding: 20px;
  text-align: center;
  color: #333;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
}

.profile-image {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 12px;
}

.profile-name {
  font-size: 18px;
  font-weight: 700;
  margin: 0;
  color: #333;
}

.profile-id {
  font-size: 14px;
  color: #666;
  margin-top: 4px;
}
.profile-icons {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 20px;
  flex-direction: row;
}

.profile-icon {
  background: #f8f7ff;
  border-radius: 16px;
  padding: 16px 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #553fb5;
  transition: all 0.3s ease;
  cursor: pointer;
}

.profile-icon:hover {
  background: #e9e6ff;
  transform: translateY(-4px);
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.08);
}

.profile-icon-img {
  font-size: 28px;
  margin-bottom: 8px;
}

.profile-icon-text {
  font-size: 14px;
  font-weight: 600;
  color: #333;
}

.health-profile-container {
  padding: 20px;
  max-width: 400px;
  margin: 0 auto;
}
.health-profile-container.history-section {
  padding-bottom: 5rem; /* ✅ only for 2nd one */
}

.health-profile-title {
  font-size: 20px;
  font-weight: 700;
  color: #222;
  margin-bottom: 16px;
}

.health-card {
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.health-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 18px;
  border-bottom: 1px solid #f0f0f0;
  transition: background 0.2s ease;
  cursor: pointer;
}

.health-item:last-child {
  border-bottom: none;
}

.health-item:hover {
  background: #f9f9ff;
}

.health-item-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.health-icon {
  background: #eef6ff;
  color: #553fb5;
  font-size: 18px;
  padding: 10px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.health-label {
  font-size: 15px;
  font-weight: 600;
  color: #333;
}

.health-arrow {
  color: #999;
  font-size: 18px;
}
`}
      </style>
    </div>
  );
};

export default Profile;
