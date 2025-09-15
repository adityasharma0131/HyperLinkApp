import React, { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { IoIosAdd } from "react-icons/io";

import UploadOptionsTray from "./UploadOptionsTray"; // Adjust path
import UploadFileTray from "./UploadFileTray"; // Adjust path

import healthrecordsaddrecords from "../../../../assets/healthrecordsaddrecords.svg";
import healthrecordslockrecords from "../../../../assets/healthrecordslockrecords.svg";
import healthrecordswellness from "../../../../assets/healthrecordswellness.svg";
import healthrecordstestreportbg from "../../../../assets/healthrecordstestreportbg.svg";
import healthrecordsprescriptionbg from "../../../../assets/healthrecordsprescriptionbg.svg";
import healthrecordsvaccinationcertificatesbg from "../../../../assets/healthrecordsvaccinationcertificatesbg.svg";
import healthrecordsdoctorconsultationbg from "../../../../assets/healthrecordsdoctorconsultationbg.svg";

import "./style.css";

const Home = () => {
  const [isUploadOptionsTrayOpen, setUploadOptionsTrayOpen] = useState(false);
  const [isUploadFileTrayOpen, setUploadFileTrayOpen] = useState(false);
  const [selectedUploadType, setSelectedUploadType] = useState("");

  const openUploadOptionsTray = () => setUploadOptionsTrayOpen(true);
  const closeUploadOptionsTray = () => setUploadOptionsTrayOpen(false);

  const openUploadFileTray = (type) => {
    setSelectedUploadType(type);
    setUploadFileTrayOpen(true);
  };

  const closeUploadFileTray = () => setUploadFileTrayOpen(false);

  return (
    <>
      <div className="health-record-page">
        <div className="health-record-hero">
          <div className="hero-top-bar">
            <button
              className="icon-button"
              onClick={() => window.history.back()}
              aria-label="Go back"
            >
              <FiArrowLeft className="hero-icon" />
            </button>
            <h1 className="hero-title">HEALTH RECORDS</h1>
          </div>
        </div>

        <div className="quick-access">
          <h2 className="quick-access-title">QUICK ACCESS</h2>

          <div className="quick-access-cards">
            {/* Add Records Card – Now Opens UploadOptionsTray */}
            <div
              className="quick-access-item"
              onClick={openUploadOptionsTray}
              style={{ cursor: "pointer" }}
            >
              <div className="quick-access-card">
                <img src={healthrecordsaddrecords} alt="Add Records" />
              </div>
              <p>Add Records</p>
            </div>

            <div className="quick-access-item">
              <div className="quick-access-card">
                <img src={healthrecordslockrecords} alt="Lock Records" />
              </div>
              <p>Lock Records</p>
            </div>

            <div className="quick-access-item">
              <div className="quick-access-card">
                <img src={healthrecordswellness} alt="Wellness" />
              </div>
              <p>Wellness</p>
            </div>
          </div>
        </div>

        <div className="records-container">
          <div className="records-header">
            <div>
              <h1 className="records-title">RECORDS</h1>
              <p className="records-subtitle">What are you looking for?</p>
            </div>
            {/* Clicking this button also opens UploadOptionsTray */}
            <button className="add-btn" onClick={openUploadOptionsTray}>
              <IoIosAdd size={26} />
            </button>
          </div>

          <div className="records-grid">
            {[
              {
                type: "Test Reports",
                img: healthrecordstestreportbg,
                title: "Test Reports",
                meta: "Total 1",
                updated: "Updated on 20th June 2025",
              },
              {
                type: "Prescriptions",
                img: healthrecordsprescriptionbg,
                title: "Prescriptions",
                meta: "Upload your Prescription",
                updated: null,
              },
              {
                type: "Vaccination Certificates",
                img: healthrecordsvaccinationcertificatesbg,
                title: "Vaccination Certificates",
                meta: "Total 1",
                updated: "Updated on 20th June 2025",
              },
              {
                type: "Doctor Consultations",
                img: healthrecordsdoctorconsultationbg,
                title: "Doctor Consultations",
                meta: "Total 1",
                updated: "Updated on 20th June 2025",
              },
            ].map((record) => (
              <div
                key={record.type}
                className="record-card"
                onClick={() => openUploadFileTray(record.type)}
                style={{ cursor: "pointer" }}
              >
                <img src={record.img} alt={record.title} />
                <h2 className="record-title">{record.title}</h2>
                <p className="record-meta">{record.meta}</p>
                {record.updated && (
                  <p className="record-updated">{record.updated}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upload Options Tray */}
      <UploadOptionsTray
        isOpen={isUploadOptionsTrayOpen}
        onClose={closeUploadOptionsTray}
        onSelectOption={(option) => {
          closeUploadOptionsTray();
          openUploadFileTray(option);
        }}
      />

      {/* Upload File Tray */}
      {isUploadFileTrayOpen && (
        <UploadFileTray
          uploadType={selectedUploadType}
          onClose={closeUploadFileTray}
        />
      )}

      <style>
        {`
   .health-record-page {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

.health-record-hero {
  background: linear-gradient(to bottom, #6ea6e7 0%, #daeffe 50%, #e0d3ff 80%);
  padding: 20px;
  border-radius: 0 0 32px 32px;
  color: white;
  position: relative;
  box-shadow: 0 10px 30px rgba(103, 108, 255, 0.2);
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
  color: #553fb5;
}

.hero-title {
  font-size: 16px;
  color: #553fb5;
  font-weight: 700;
  margin: 0;
  line-height: 1.2;
  text-align: left;
  letter-spacing: 1px;
}

.quick-access {
  padding: 20px;
  font-family: Arial, sans-serif;
}

.quick-access-title {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 15px;
  color: #000;
}

.quick-access-cards {
  display: flex;
  gap: 20px;
  align-items: flex-end;
}

.quick-access-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 120px;
}

.quick-access-card {
  background: #fff;
  border-radius: 15px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  padding: 20px 15px;
  width: 100%;
  text-align: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
}

.quick-access-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.quick-access-card img {
  max-width: 60px;
}

.quick-access-item p {
  margin-top: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #333;
  text-align: center;
}

.records-container {
  padding: 20px;
}

.records-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
}

.records-title {
  font-size: 20px;
  font-weight: 700;
  margin: 0;
}

.records-subtitle {
  font-size: 14px;
  color: #555;
  margin: 5px 0 0 0;
}

.add-btn {
  background: #f5f6fa;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.records-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* Always 2 columns */
  gap: 20px;
}

.record-card {
  background: #fff;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  text-align: left;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.record-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
}

.record-card img {
  max-width: 60px;
  margin-bottom: 12px;
}

.record-title {
  font-size: 16px;
  font-weight: 600;
  color: #0066cc;
  margin: 0 0 6px 0;
}

.record-meta {
  font-size: 13px;
  color: #444;
  margin: 0 0 4px 0;
}

.record-updated {
  font-size: 12px;
  color: #888;
  margin: 0;
}

`}
      </style>
    </>
  );
};

export default Home;
