import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Dashboard</h1>
      <p
        onClick={() => navigate("/app/sleep/goal")}
        style={{ cursor: "pointer", color: "blue" }}
      >
        Set Goal
      </p>
    </div>
  );
};

export default Dashboard;
