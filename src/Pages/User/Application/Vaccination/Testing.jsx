// import React, { useState } from "react";
// import DoseTray from "./DoseTray";

// const Testing = () => {
//   const [isTrayOpen, setIsTrayOpen] = useState(true);
//   const [userDoses, setUserDoses] = useState([
//     {
//       number: 1,
//       status: "completed",
//       date: "2023-01-15",
//       note: "Initial priming dose",
//       certificateUrl: "https://example.com/certificates/1",
//     },
//     {
//       number: 2,
//       status: "completed",
//       date: "2023-02-12",
//       note: "Secondary priming dose (4 weeks after first)",
//       certificateUrl: "https://example.com/certificates/2",
//     },
//     {
//       number: 3,
//       status: "pending",
//       date: "",
//       note: "First booster dose (3 months after second)",
//     },
//   ]);

//   // Sample vaccine data with 5 doses
//   const vaccine = {
//     name: "COVID-19 Vaccine (Extended Protocol)",
//     type: "ESSENTIAL",
//     doses: [
//       {
//         number: 1,
//         status: "completed",
//         date: "2023-01-15",
//         note: "Initial priming dose",
//         certificateUrl: "https://example.com/certificates/1",
//       },
//       {
//         number: 2,
//         status: "completed",
//         date: "2023-02-12",
//         note: "Secondary priming dose (4 weeks after first)",
//         certificateUrl: "https://example.com/certificates/2",
//       },
//       {
//         number: 3,
//         status: "pending",
//         date: "",
//         note: "First booster dose (3 months after second)",
//       },
//       {
//         number: 4,
//         status: "locked",
//         date: "",
//         note: "Second booster dose (6 months after third)",
//       },
//       {
//         number: 5,
//         status: "locked",
//         date: "",
//         note: "Annual maintenance dose",
//       },
//     ],
//   };

//   const handleViewCertificate = (certificateUrl) => {
//     // In a real app, you would open the certificate in a viewer or new tab
//     console.log(`Viewing certificate at ${certificateUrl}`);
//     window.open(certificateUrl, "_blank");
//   };

//   const handleCloseTray = () => {
//     setIsTrayOpen(false);
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <button
//         onClick={() => setIsTrayOpen(true)}
//         style={{ padding: "10px 20px" }}
//       >
//         Open Vaccine Tray
//       </button>

//       <DoseTray
//         isOpen={isTrayOpen}
//         handleClose={handleCloseTray}
//         vaccine={vaccine}
//         userDoses={userDoses}
//         onViewCertificate={handleViewCertificate}
//       />
//     </div>
//   );
// };

// export default Testing;

import React, { useState } from "react";
import NewUserTray from "./NewUserTray";

const Testing = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Tray</button>
      {isOpen && <NewUserTray onClose={() => setIsOpen(false)} />}
    </>
  );
};

export default Testing;
