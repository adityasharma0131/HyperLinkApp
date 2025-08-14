import React, { useState } from "react";
import SchedulingTray from "./SchedulingTray"; // adjust path

const Testing = () => {
  const [showTray, setShowTray] = useState(false);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Testing Page</h1>
      <button onClick={() => setShowTray(true)}>Open Scheduling Tray</button>

      {showTray && <SchedulingTray onClose={() => setShowTray(false)} />}
    </div>
  );
};

export default Testing;
