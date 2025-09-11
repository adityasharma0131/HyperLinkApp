import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { FiX } from "react-icons/fi";

// Sample datasets
const dataSets = {
  Daily: [
    { time: "6AM", value: 110 },
    { time: "10AM", value: 160 },
    { time: "2PM", value: 95 },
    { time: "4PM", value: 70 },
    { time: "6PM", value: 200 },
    { time: "9PM", value: 130 },
  ],
  Weekly: [
    { time: "Mon", value: 180 },
    { time: "Tue", value: 120 },
    { time: "Wed", value: 210 },
    { time: "Thu", value: 95 },
    { time: "Fri", value: 200 },
    { time: "Sat", value: 140 },
    { time: "Sun", value: 220 },
  ],
  Monthly: [
    { time: "Week 1", value: 115 },
    { time: "Week 2", value: 190 },
    { time: "Week 3", value: 85 },
    { time: "Week 4", value: 230 },
  ],
};

const CholesterolTray = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState("Daily");

  const handleAddData = () => {
    console.log("Add Data Clicked");
    onClose();
  };

  return (
    <div>
      {" "}
      {/* Overlay */}
      {isOpen && <div className="overlay" onClick={onClose} />}
      {/* Bottom Tray */}
      <div className={`bottom-tray ${isOpen ? "show" : ""}`}>
        <div className="bottom-tray-handle">
          <div className="bottom-tray-handle-bar"></div>
        </div>

        {/* Header */}
        <div className="tray-header">
          <h2>Cholesterol Insights</h2>
          <button
            onClick={onClose}
            className="tray-close-btn"
            aria-label="Close tray"
          >
            <FiX className="tray-close-icon" />
          </button>
        </div>

        {/* Content */}
        <div className="tray-content">
          {/* Tabs */}
          <div className="tabs">
            {["Daily", "Weekly", "Monthly"].map((tab) => (
              <button
                key={tab}
                className={`tab ${activeTab === tab ? "active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Card */}
          <div className="chart-cardcard">
            <p className="label">CHOLESTEROL</p>
            <h1 className="value">200</h1>
            <p className="subtext">
              {activeTab} <span className="negative">-1.5%</span>
            </p>

            {/* Chart */}
            <div className="chart-wrapper">
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={dataSets[activeTab]}>
                  <XAxis
                    dataKey="time"
                    axisLine={false}
                    tickLine={false}
                    interval="preserveStartEnd"
                    padding={{ left: 20, right: 20 }}
                  />
                  <YAxis hide />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      borderRadius: "10px",
                      border: "none",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                    }}
                    labelStyle={{ color: "#374151", fontWeight: 500 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="url(#colorGradient)"
                    strokeWidth={3}
                    dot={false}
                  />
                  <defs>
                    <linearGradient
                      id="colorGradient"
                      x1="0"
                      y1="0"
                      x2="1"
                      y2="0"
                    >
                      <stop offset="0%" stopColor="#6366f1" />
                      <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                  </defs>
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Actions */}
          <div className="actions">
            <button className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button className="add-btn" onClick={handleAddData}>
              Add Data
            </button>
          </div>
        </div>
      </div>
      {/* Styles */}
      <style jsx>{`
        .testlist-page {
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: flex-end;
          background: #f3f4f6;
          padding: 20px;
          position: relative;
        }

        /* Floating Action Button */
        .fab-btn {
          position: fixed;
          bottom: 24px;
          right: 24px;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          border: none;
          background: linear-gradient(135deg, #4f46e5, #6366f1);
          color: #fff;
          font-size: 22px;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .fab-btn:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25);
        }

        /* Overlay */
        .overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 9;
        }

        /* Bottom Tray */
        .bottom-tray {
          position: fixed;
          left: 0;
          right: 0;
          bottom: -100%;
          background: #fff;
          border-top-left-radius: 20px;
          border-top-right-radius: 20px;
          box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.15);
          transition: bottom 0.35s ease-in-out;
          z-index: 10;
          max-height: 80vh;
          overflow-y: auto;
        }

        .bottom-tray.show {
          bottom: 0;
        }

        /* Handle bar */
        .bottom-tray-handle {
          display: flex;
          justify-content: center;
          padding: 16px 0 12px;
        }

        .bottom-tray-handle-bar {
          width: 56px;
          height: 4px;
          background-color: rgba(0, 0, 0, 0.08);
          border-radius: 9999px;
        }

        .tray-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 20px;
          border-bottom: 1px solid #e5e7eb;
        }

        .tray-header h2 {
          margin: 0;
          font-size: 18px;
          font-weight: 600;
          color: #111827;
        }

        /* Close button */
        .tray-close-btn {
          position: absolute;
          top: 16px;
          right: 20px;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.03);
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s;
        }

        .tray-close-btn:hover {
          background: rgba(0, 0, 0, 0.08);
          transform: rotate(90deg);
        }

        .tray-close-icon {
          width: 20px;
          height: 20px;
          color: #64748b;
        }
        .tray-content {
          padding: 20px;
        }

        /* Tabs */
        .tabs {
          display: flex;
          gap: 12px;
          width: 100%;
          margin-bottom: 20px;
          background: #f3f4f6;
          border-radius: 14px;
          padding: 4px;
          /* width: fit-content; */
          justify-content: space-around;
        }

        .tab {
          padding: 8px 18px;
          border: none;
          border-radius: 12px;
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
          background: transparent;
          color: #6b7280;
        }

        .tab.active {
          background: #fff;
          color: #111827;
          font-weight: 600;
          box-shadow: 0 2px 10px rgba(99, 102, 241, 0.15);
        }

        /* Card */
        .chart-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          padding: 24px;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
          margin-bottom: 24px;
        }

        .label {
          font-size: 14px;
          color: #6b7280;
          margin-bottom: 8px;
        }

        .value {
          font-size: 36px;
          font-weight: 700;
          margin: 0;
          color: #111827;
        }

        .subtext {
          font-size: 15px;
          margin-top: 6px;
          color: #374151;
        }

        .negative {
          color: #ef4444;
          font-weight: 600;
        }

        .chart-wrapper {
          margin-top: 20px;
        }

        /* Actions */
        .actions {
          display: flex;
          gap: 14px;
          margin-top: 20px;
        }

        .cancel-btn,
        .add-btn {
          flex: 1;
          padding: 14px;
          border-radius: 14px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .cancel-btn {
          background: #fff;
          border: 1px solid #e5e7eb;
          color: #374151;
        }

        .cancel-btn:hover {
          background: #f9fafb;
        }

        .add-btn {
          background: linear-gradient(135deg, #6366f1, #2563eb);
          color: #fff;
          border: none;
          box-shadow: 0 4px 14px rgba(37, 99, 235, 0.35);
        }

        .add-btn:hover {
          background: linear-gradient(135deg, #4f46e5, #1d4ed8);
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  );
};

export default CholesterolTray;
