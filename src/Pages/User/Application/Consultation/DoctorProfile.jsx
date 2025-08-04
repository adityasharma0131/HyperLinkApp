import React from "react";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import {
  FaBookMedical,
  FaBriefcaseMedical,
  FaClinicMedical,
  FaStar,
  FaRegStar,
  FaRegClock,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { FiMapPin } from "react-icons/fi";

import { IoIosFitness, IoMdNutrition } from "react-icons/io";
import { BsCalendarCheck, BsGenderFemale } from "react-icons/bs";
import { GiMedicines } from "react-icons/gi";
import { MdWorkOutline } from "react-icons/md";

import AppButton from "../../../../Components/AppButton";
import DoctorProf from "../../../../assets/doctorlist1.png";

const DoctorProfile = () => {
  const navigate = useNavigate();
  return (
    <div className="consultation-doctor-page">
      {/* Hero Section */}
      <div className="consultation-doctor-hero">
        <div className="hero-top-bar">
          <button
            className="icon-button"
            onClick={() => window.history.back()}
            aria-label="Go back"
          >
            <FiArrowLeft className="hero-icon" />
          </button>
          <h1 className="hero-title">Dr. Kavita Madhuri</h1>
        </div>
      </div>

      <div className="profileContainer">
        {/* Header with improved styling */}
        <div className="header">
          <div className="avatarContainer">
            <img src={DoctorProf} alt="Dr. Kavita Madhuri" className="avatar" />
            <div className="ratingBadge">
              <FaStar className="starIcon" />
              <span>4.9</span>
            </div>
          </div>
          <h1 className="name">Dr. Kavita Madhuri</h1>
          <p className="specialty">Senior Nutritionist & Dietician</p>

          <div className="statsContainer">
            <div className="statItem">
              <MdWorkOutline className="statIcon" />
              <span>10+ Years Exp</span>
            </div>
            <div className="statItem">
              <FaStar className="statIcon" />
              <span>87 Reviews</span>
            </div>
          </div>
        </div>

        {/* Booking Card - Sticky at the bottom in mobile view */}
        <div className="bookingCard">
          <div className="bookingInfo">
            <div>
              <p className="bookingLabel">Consultation Fee</p>
              <p className="amount">₹479</p>
            </div>
            <div className="availability">
              <FaRegClock className="clockIcon" />
              <span>Available Today</span>
            </div>
          </div>
          <AppButton
            text={"Book Appointment"}
            variant="secondary"
            icon={BsCalendarCheck}
            onClick={() => navigate("/app/consultation/scheduling")}
          />
        </div>

        {/* About Section */}
        <section className="profileSection">
          <h2 className="sectionTitle">About</h2>
          <p className="aboutText">
            Dr. Kavita Madhuri is a senior nutrition expert with over 10 years
            of experience helping patients achieve their wellness goals through
            balanced diets and lifestyle guidance. She specializes in
            personalized nutrition plans for weight management and chronic
            conditions.
          </p>
        </section>

        {/* Specializations with icons */}
        <section className="profileSection">
          <h2 className="sectionTitle">Specializations</h2>
          <div className="specializationsGrid">
            <div className="specializationItem">
              <IoMdNutrition className="specIcon" />
              <span>Clinical Nutrition</span>
            </div>
            <div className="specializationItem">
              <IoIosFitness className="specIcon" />
              <span>Weight Management</span>
            </div>
            <div className="specializationItem">
              <GiMedicines className="specIcon" />
              <span>Diet Planning</span>
            </div>
          </div>
        </section>

        {/* Basic Info */}
        <section className="profileSection">
          <h2 className="sectionTitle">Details</h2>
          <div className="infoGrid">
            <div className="infoItem">
              <BsGenderFemale className="infoIcon" />
              <div>
                <p className="infoLabel">Gender</p>
                <p className="infoValue">Female</p>
              </div>
            </div>
            <div className="infoItem">
              <FaRegClock className="infoIcon" />
              <div>
                <p className="infoLabel">Experience</p>
                <p className="infoValue">10+ years</p>
              </div>
            </div>
          </div>
        </section>

        {/* Education */}
        <section className="profileSection">
          <h2 className="sectionTitle">Education</h2>
          <div className="timeline">
            <div className="timelineItem">
              <div className="timelineDot"></div>
              <div className="timelineContent">
                <h3 className="timelineTitle">Masters in Clinical Nutrition</h3>
                <p className="timelineSubtitle">University of Mumbai</p>
                <p className="timelineDate">2010 - 2012</p>
              </div>
            </div>
            <div className="timelineItem">
              <div className="timelineDot"></div>
              <div className="timelineContent">
                <h3 className="timelineTitle">B.Sc in Nutrition</h3>
                <p className="timelineSubtitle">University of Mumbai</p>
                <p className="timelineDate">2007 - 2010</p>
              </div>
            </div>
          </div>
        </section>

        {/* Experience */}
        <section className="profileSection">
          <h2 className="sectionTitle">Experience</h2>
          <div className="experienceList">
            <div className="experienceItem">
              <div className="expIconContainer">
                <FaBriefcaseMedical className="expIcon" />
              </div>
              <div className="expContent">
                <h3 className="expTitle">Head of Nutrition</h3>
                <p className="expOrg">The Bridge Lifestyle Hub</p>
                <p className="expDuration">2018 - Present</p>
              </div>
            </div>
            <div className="experienceItem">
              <div className="expIconContainer">
                <FaBriefcaseMedical className="expIcon" />
              </div>
              <div className="expContent">
                <h3 className="expTitle">Senior Dietician</h3>
                <p className="expOrg">FitLife Wellness Center</p>
                <p className="expDuration">2012 - 2018</p>
              </div>
            </div>
          </div>
        </section>

        {/* Clinics */}
        <section className="profileSection">
          <h2 className="sectionTitle">Clinics</h2>
          <div className="clinicCard">
            <div className="clinicHeader">
              <FaClinicMedical className="clinicIcon" />
              <h3 className="clinicName">Health360 Clinic</h3>
            </div>
            <div className="clinicAddress">
              <FaMapMarkerAlt className="addressIcon" />
              <p>Mahada, Chandivali, Powai, Mumbai - 400072</p>
            </div>
            <div className="clinicTimings">
              <p className="timingsTitle">Consultation Hours:</p>
              <p className="timingsValue">Mon – Fri, 09:00 AM – 09:00 PM</p>
            </div>

            <AppButton
              text="View on Map"
              icon={FiMapPin}
              onClick={() =>
                window.open(
                  "https://www.google.com/maps?q=19.1032133,72.910085",
                  "_blank"
                )
              }
            />
          </div>
        </section>

        {/* Reviews */}
        <section className="profileSection">
          <h2 className="sectionTitle">Patient Reviews</h2>
          <div className="reviewsContainer">
            {[1, 2].map((_, idx) => (
              <div key={idx} className="reviewCard">
                <div className="reviewHeader">
                  <img
                    src="https://randomuser.me/api/portraits/women/9.jpg"
                    alt="Reviewer"
                    className="reviewerAvatar"
                  />
                  <div className="reviewerInfo">
                    <h4 className="reviewerName">Sakshi Kewat</h4>
                    <div className="reviewStars">
                      {[1, 2, 3, 4, 5].map((star) =>
                        star <= 4 ? (
                          <FaStar key={star} className="filledStar" />
                        ) : (
                          <FaRegStar key={star} className="emptyStar" />
                        )
                      )}
                    </div>
                  </div>
                  <p className="reviewDate">May 21, 2021</p>
                </div>
                <h5 className="reviewTitle">Great Doctor!</h5>
                <p className="reviewText">
                  Dr. Kavita provided excellent guidance for my weight
                  management journey. Her personalized diet plan was easy to
                  follow and showed results within weeks. Highly recommend her
                  expertise in nutrition.
                </p>
              </div>
            ))}
          </div>
          <button className="viewAllReviews">View All 87 Reviews</button>
        </section>
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
  box-shadow: 0 10px 30px rgba(74, 144, 226, 0.2);
}

.hero-top-bar {
  display: flex;
  align-items: center;
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
  font-size: 1rem;
  font-weight: 500;
  margin: 0;
  flex: 1;
  line-height: 1.2;
}

/* Modern CSS Styles */
.profileContainer {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  background-color: #f7fafc;
  border-radius: 20px;
  position: relative;
  color: #333;
}

.header {
  text-align: center;
  margin-bottom: 2.5rem;
  position: relative;
}

.avatarContainer {
  position: relative;
  display: inline-block;
  margin-bottom: 1rem;
}

.avatar {
  width: 140px;
  height: 140px;
  object-fit: cover;
  border-radius: 50%;
  border: 5px solid #fff;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.ratingBadge {
  position: absolute;
  bottom: 10px;
  right: 10px;
  background: linear-gradient(135deg, #4a90e2, #8c60e2);
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  font-weight: 600;
}

.starIcon {
  margin-right: 0.3rem;
  font-size: 0.8rem;
}

.name {
  margin: 0.5rem 0 0.2rem;
  font-size: 1.8rem;
  font-weight: 700;
  color: #2c3e50;
}

.specialty {
  color: #7f8c8d;
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
}

.statsContainer {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 1rem;
}

.statItem {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.95rem;
  color: #555;
}

.statIcon {
  color: #8c60e2;
  font-size: 1.1rem;
}

.profileSection {
  margin-bottom: 2.5rem;
}

.sectionTitle {
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #2c3e50;
  position: relative;
  padding-bottom: 0.5rem;
}

.sectionTitle::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 50px;
  height: 3px;
  background: linear-gradient(90deg, #4a90e2, #8c60e2);
  border-radius: 3px;
}

.aboutText {
  line-height: 1.6;
  color: #555;
  font-size: 1rem;
}

.specializationsGrid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}

.specializationItem {
  background-color: #ffff;
  border-radius: 10px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: transform 0.2s, box-shadow 0.2s;
}

.specializationItem:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.specIcon {
  font-size: 1.8rem;
  color: #8c60e2;
  margin-bottom: 0.5rem;
}

.infoGrid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1.5rem;
}

.infoItem {
  display: flex;
  align-items: center;
  gap: 1rem;
  background-color: #fff;
  padding: 1rem;
  border-radius: 10px;
}

.infoIcon {
  font-size: 1.5rem;
  color: #8c60e2;
}

.infoLabel {
  font-size: 0.85rem;
  color: #7f8c8d;
  margin-bottom: 0.2rem;
}

.infoValue {
  font-weight: 500;
  color: #2c3e50;
}

.timeline {
  position: relative;
  padding-left: 1.5rem;
}

.timeline::before {
  content: "";
  position: absolute;
  left: 7px;
  top: 0;
  bottom: 0;
  width: 2px;
  background-color: #fff;
}

.timelineItem {
  position: relative;
  padding-bottom: 1.5rem;
}

.timelineDot {
  position: absolute;
  left: -1.5rem;
  top: 0;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: #8c60e2;
  border: 3px solid #fff;
  box-shadow: 0 0 0 2px #8c60e2;
}

.timelineTitle {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.3rem;
  color: #2c3e50;
}

.timelineSubtitle {
  font-size: 0.95rem;
  color: #555;
  margin-bottom: 0.2rem;
}

.timelineDate {
  font-size: 0.85rem;
  color: #7f8c8d;
}

.experienceList {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.experienceItem {
  display: flex;
  gap: 1.2rem;
}

.expIconContainer {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.expIcon {
  font-size: 1.3rem;
  color: #8c60e2;
}

.expTitle {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.2rem;
  color: #2c3e50;
}

.expOrg {
  font-size: 0.95rem;
  color: #555;
  margin-bottom: 0.2rem;
}

.expDuration {
  font-size: 0.85rem;
  color: #7f8c8d;
}

.clinicCard {
  background-color: #fff;
  border-radius: 12px;
  padding: 1.5rem;
}

.clinicHeader {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 1rem;
}

.clinicIcon {
  font-size: 1.5rem;
  color: #8c60e2;
}

.clinicName {
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0;
  color: #2c3e50;
}

.clinicAddress {
  display: flex;
  gap: 0.8rem;
  margin-bottom: 1rem;
  color: #555;
}

.addressIcon {
  color: #8c60e2;
  font-size: 1.1rem;
  flex-shrink: 0;
  margin-top: 0.2rem;
}

.clinicTimings {
  background-color: #fff;
  padding: 0.8rem;
  border-radius: 8px;
}

.timingsTitle {
  font-size: 0.9rem;
  color: #7f8c8d;
  margin-bottom: 0.3rem;
}

.timingsValue {
  font-weight: 500;
  color: #2c3e50;
}

.reviewsContainer {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.reviewCard {
  background-color: #fff;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.03);
}

.reviewHeader {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.reviewerAvatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}

.reviewerInfo {
  flex: 1;
}

.reviewerName {
  margin: 0 0 0.2rem;
  font-size: 1rem;
  color: #2c3e50;
}

.reviewStars {
  display: flex;
  gap: 0.2rem;
}

.filledStar {
  color: #ffc107;
  font-size: 0.9rem;
}

.emptyStar {
  color: #e0e0e0;
  font-size: 0.9rem;
}

.reviewDate {
  font-size: 0.85rem;
  color: #7f8c8d;
}

.reviewTitle {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 0.5rem;
  color: #2c3e50;
}

.reviewText {
  line-height: 1.6;
  color: #555;
  font-size: 0.95rem;
}

.viewAllReviews {
  display: block;
  width: 100%;
  background: none;
  border: 1px solid #8c60e2;
  color: #8c60e2;
  padding: 0.8rem;
  border-radius: 8px;
  font-weight: 500;
  margin-top: 1rem;
  cursor: pointer;
  transition: all 0.2s;
}

.viewAllReviews:hover {
  background-color: #e8f0fe;
}

/* Booking Card Styles */
.bookingCard {
  background: linear-gradient(to bottom, #4a90e2, #8c60e2);
  border-radius: 12px;
  padding: 1.5rem;
  color: white;
  margin-bottom: 2.5rem;
  box-shadow: 0 10px 20px rgba(74, 144, 226, 0.2);
}

.bookingInfo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.bookingLabel {
  font-size: 0.9rem;
  margin-bottom: 0.3rem;
  opacity: 0.9;
}

.amount {
  font-size: 1.8rem;
  font-weight: 700;
  margin: 0;
}

.availability {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: rgba(255, 255, 255, 0.2);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
}

.clockIcon {
  font-size: 0.9rem;
}

.bookButton {
  width: 100%;
  background-color: white;
  color: #8c60e2;
  border: none;
  padding: 1rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.bookButton:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.bookIcon {
  font-size: 1.2rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .profileContainer {
    padding: 1.5rem 1rem;
    border-radius: 0;
  }
}

      `}
      </style>
    </div>
  );
};

export default DoctorProfile;
