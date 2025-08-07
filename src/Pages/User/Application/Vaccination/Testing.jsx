import React, { useState } from "react";
import DoseTray from "./DoseTray";

const Testing = () => {
  const [isTrayOpen, setIsTrayOpen] = useState(true);
  const [userDoses, setUserDoses] = useState([]); // Empty array for new user

  // Sample vaccine data with 5 doses
  const vaccine = {
    name: "COVID-19 Vaccine (Extended Protocol)",
    type: "ESSENTIAL",
    doses: [
      {
        number: 1,
        status: "pending",
        date: "",
        note: "Initial priming dose",
      },
      {
        number: 2,
        status: "locked",
        date: "",
        note: "Secondary priming dose (4 weeks after first)",
      },
      {
        number: 3,
        status: "locked",
        date: "",
        note: "First booster dose (3 months after second)",
      },
      {
        number: 4,
        status: "locked",
        date: "",
        note: "Second booster dose (6 months after third)",
      },
      {
        number: 5,
        status: "locked",
        date: "",
        note: "Annual maintenance dose",
      },
    ],
  };

  const handleScheduleDose = (doseNumber) => {
    console.log(`Scheduling dose ${doseNumber}`);
    // Here you would typically open a scheduling modal or API call
    alert(`Scheduling dose ${doseNumber}`);

    // Example: Mark dose as completed after scheduling (in a real app, this would happen after actual completion)
    if (doseNumber === 1) {
      setUserDoses([
        {
          number: 1,
          status: "completed",
          completionDate: new Date().toISOString().split("T")[0],
          certificateUrl: "https://example.com/cert1.pdf",
        },
      ]);
    }
  };

  const handleUploadCertificate = (doseNumber) => {
    console.log(`Uploading certificate for dose ${doseNumber}`);
    // Here you would typically open a file upload dialog
    alert(`Uploading certificate for dose ${doseNumber}`);
  };

  const handleViewCertificate = (certificateUrl) => {
    console.log(`Viewing certificate at ${certificateUrl}`);
    // Here you would typically open the certificate in a viewer or new tab
    window.open(certificateUrl, "_blank");
  };

  const handleCloseTray = () => {
    setIsTrayOpen(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      <button
        onClick={() => setIsTrayOpen(true)}
        style={{ padding: "10px 20px" }}
      >
        Open Vaccine Tray
      </button>

      <DoseTray
        isOpen={isTrayOpen}
        handleClose={handleCloseTray}
        vaccine={vaccine}
        userDoses={userDoses}
        onScheduleDose={handleScheduleDose}
        onUploadCertificate={handleUploadCertificate}
        onViewCertificate={handleViewCertificate}
      />
    </div>
  );
};

export default Testing;
