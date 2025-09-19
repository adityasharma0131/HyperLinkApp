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
    </div>
  );
};

export default Profile;
