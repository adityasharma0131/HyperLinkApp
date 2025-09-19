import React, { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { IoIosSearch } from "react-icons/io";
import { FaMicrophone } from "react-icons/fa";
import { CiBookmark } from "react-icons/ci";
import { CiCircleInfo } from "react-icons/ci";
import { Navigate, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import DoctorList1 from "../../../../assets/doctorlist1.png";
import AppButton from "../../../../Components/AppButton";

const DoctorList = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();

  // Get category name sent from previous page
  const categoryName = location.state?.category || "Specialist";
  const doctors = [
    {
      name: "Dr. Kavita Madhuri",
      degree: "MBBS, MD (General Medicine)",
      regNo: "DMC-7992",
      experience: "10",
      fee: "599",
      image: DoctorList1,
      specialty: "General Physician",
      rating: "4.8",
      reviews: "124",
      hospital: "City Medical Center",
      distance: "2.5",
      availableToday: true,
      nextAvailable: "Tomorrow",
      insuranceAccepted: true,
    },
    {
      name: "Dr. Rajesh Verma",
      degree: "MBBS, MS (Orthopedics)",
      regNo: "DMC-6543",
      experience: "15",
      fee: "899",
      image: DoctorList1,
      specialty: "Orthopedic Surgeon",
      rating: "4.9",
      reviews: "215",
      hospital: "Metro Specialty Hospital",
      distance: "4.2",
      availableToday: false,
      nextAvailable: "Wed, 12 PM",
      insuranceAccepted: false,
    },
  ];
  return (
    <>
      <div className="consultation-doctor-page">
        <div className="consultation-doctor-hero">
          <div className="hero-top-bar">
            <button
              className="icon-button"
              onClick={() => window.history.back()}
              aria-label="Go back"
            >
              <FiArrowLeft className="hero-icon" />
            </button>

            <h1 className="hero-title">{categoryName}</h1>
          </div>

          <div className="search-bar hero-search">
            <IoIosSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search Specialities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FaMicrophone className="mic-icon" />
          </div>
        </div>

        <div className="doctor-appointment-app">
          {/* Doctor List Header */}
          <div className="list-header">
            <h2 className="section-title">Find Your Doctor</h2>
          </div>

          {/* Doctor Cards */}
          <div className="doctor-list-container">
            {doctors.map((doc, index) => (
              <div className="doctor-card" key={index}>
                <div className="doctor-image-container">
                  <img
                    src={doc.image}
                    alt={doc.name}
                    className="doctor-image"
                  />
                </div>

                <div className="doctor-info">
                  <div className="info-header">
                    <div>
                      <h3>{doc.name}</h3>
                      <p className="qualification">{doc.degree}</p>
                    </div>
                  </div>

                  <p className="specialty">
                    {doc.specialty} <br /> {doc.experience} years exp <br />{" "}
                    {doc.regNo}
                  </p>

                  <div className="details-grid">
                    <div className="detail-item">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14 6.66667C14 11.3333 8 15.3333 8 15.3333C8 15.3333 2 11.3333 2 6.66667C2 5.07537 2.63214 3.54925 3.75736 2.42403C4.88258 1.29881 6.4087 0.666672 8 0.666672C9.5913 0.666672 11.1174 1.29881 12.2426 2.42403C13.3679 3.54925 14 5.07537 14 6.66667Z"
                          stroke="#4A5568"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M8 8.66667C9.10457 8.66667 10 7.77124 10 6.66667C10 5.5621 9.10457 4.66667 8 4.66667C6.89543 4.66667 6 5.5621 6 6.66667C6 7.77124 6.89543 8.66667 8 8.66667Z"
                          stroke="#4A5568"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span>{doc.hospital}</span>
                    </div>
                    <div className="detail-item">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 2.66667H3.99999C2.89542 2.66667 1.99999 3.5621 1.99999 4.66667V13.3333C1.99999 14.4379 2.89542 15.3333 3.99999 15.3333H12C13.1046 15.3333 14 14.4379 14 13.3333V4.66667C14 3.5621 13.1046 2.66667 12 2.66667Z"
                          stroke="#4A5568"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M5.33333 1.33333V4"
                          stroke="#4A5568"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M10.6667 1.33333V4"
                          stroke="#4A5568"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M1.99999 6.66667H14"
                          stroke="#4A5568"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span>Mon-Fri • 9AM-6PM</span>
                    </div>
                  </div>

                  <div className="pricing-section">
                    <div>
                      <span className="fee">₹{doc.fee}</span>
                      <span className="fee-label">Consultation Fee</span>
                    </div>
                  </div>

                  <div className="action-buttons">
                    <AppButton
                      text={"Book"}
                      onClick={() => navigate("/app/consultation/scheduling")}
                      icon={CiBookmark}
                    />
                    <AppButton
                      onClick={() =>
                        navigate("/app/consultation/doctor-profile")
                      }
                      variant={"secondary"}
                      text={"Info"}
                      icon={CiCircleInfo}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>
        {`
        .consultation-doctor-page {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

.consultation-doctor-hero {
  background: linear-gradient(to bottom, #4a90e2, #8c60e2);
  padding: 20px;
  border-radius: 0 0 32px 32px;
  color: white;
  position: relative;
  box-shadow: 0 10px 30px rgba(103, 108, 255, 0.2);
}

.hero-top-bar {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  justify-content: flex-start;
  text-align: left;
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
  font-size: 1.5rem;
  font-weight: 500;
  margin: 0;
  flex: 1;
  line-height: 1.2;
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
/* Final Modern Styling */
.doctor-appointment-app {
  max-width: 500px;
  margin: 25px auto;
  padding: 16px;
  background-color: #f7fafc;
  color: #2d3748;
  min-height: 100vh;
}

/* Header Styles */
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  position: relative;
}

.app-title {
  font-size: 22px;
  font-weight: 700;
  color: #1a202c;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

/* Doctor Card */
.doctor-card {
  display: flex;
  background: white;
  border-radius: 16px;
  margin-bottom: 16px;
  padding: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
  gap: 16px;
  border: 1px solid #edf2f7;
}

.doctor-image-container {
  position: relative;
  min-width: 80px;
}

.doctor-image {
  width: 80px;
  height: 80px;
  border-radius: 12px;
  object-fit: cover;
  border: 2px solid #ebf8ff;
}
.doctor-info {
  flex: 1;
  min-width: 0;
}

.info-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.info-header h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  color: #1a202c;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.qualification {
  margin: 2px 0 0 0;
  font-size: 12px;
  color: #718096;
  font-weight: 500;
}

.specialty {
  margin: 0 0 12px 0;
  font-size: 12px;
  color: #718096;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.details-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 8px;
  margin-bottom: 12px;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: #4a5568;
  font-weight: 500;
}

.detail-item svg {
  flex-shrink: 0;
}

.pricing-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.fee {
  font-weight: 700;
  font-size: 16px;
  color: #1a202c;
}

.fee-label {
  font-size: 10px;
  color: #718096;
  font-weight: 500;
  margin-left: 4px;
}

.action-buttons {
  display: flex;
  gap: 8px;
}
`}
      </style>
    </>
  );
};

export default DoctorList;
