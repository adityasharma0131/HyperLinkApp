// Testing.jsx
import React, { useState } from "react";
import BookingDetailTray from "./BookingDetailTray";

const Testing = () => {
  const [showTray, setShowTray] = useState(false);

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      {/* Toggle Tray Button */}
      <button className="toggle-btn" onClick={() => setShowTray(!showTray)}>
        {showTray ? "Hide Booking Details" : "Show Booking Details"}
      </button>

      {/* Booking Tray */}
      {showTray && <BookingDetailTray />}
    </div>
  );
};

export default Testing;
