import React from "react";
import { FiArrowLeft } from "react-icons/fi";

{
  /* Profile Content */
}
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

            <AppButton text={"View on Map"} icon={FiMapPin} />
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
    </div>
  );
};

export default DoctorProfile;
