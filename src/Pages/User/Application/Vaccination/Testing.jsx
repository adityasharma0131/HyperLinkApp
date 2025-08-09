import React, { useState } from "react";
import DoseTray from "./DoseTray";

const Testing = () => {
  const [isTrayOpen, setIsTrayOpen] = useState(false);

  // Example user vaccination progress
  const userDoses = [
    {
      number: 1,
      status: "pending",
      note: "Initial priming dose",
    },
  ];

  // Vaccine details (can come from API)
  const vaccine = {
    name: "COVID-19 Vaccine (Extended Protocol)",
    type: "ESSENTIAL",
    doses: [
      {
        number: 1,
        note: "Initial priming dose",
      },
      {
        number: 2,
        note: "Secondary priming dose (4 weeks after first)",
      },
      {
        number: 3,
        note: "First booster dose (3 months after second)",
      },
      {
        number: 4,
        note: "Second booster dose (6 months after third)",
      },
      {
        number: 5,
        note: "Annual maintenance dose",
      },
    ],
  };

  // Handlers
  const handleViewCertificate = (url) => window.open(url, "_blank");
  const handleScheduleDose = (doseNumber) =>
    alert(`Schedule Dose ${doseNumber}`);
  const handleUploadCertificate = (doseNumber) =>
    alert(`Upload certificate for Dose ${doseNumber}`);

  return (
    <div className="demo-container">
      <button className="open-tray-btn" onClick={() => setIsTrayOpen(true)}>
        Open Vaccine Tray
      </button>

      <DoseTray
        isOpen={isTrayOpen}
        handleClose={() => setIsTrayOpen(false)}
        vaccine={vaccine}
        userDoses={userDoses}
        onViewCertificate={handleViewCertificate}
        onScheduleDose={handleScheduleDose}
        onUploadCertificate={handleUploadCertificate}
      />
    </div>
  );
};

export default Testing;

// import React, { useState } from "react";
// import NewUserTray from "./NewUserTray";

// const Testing = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <>
//       <button onClick={() => setIsOpen(true)}>Open Tray</button>
//       {isOpen && <NewUserTray onClose={() => setIsOpen(false)} />}
//     </>
//   );
// };

// export default Testing;
