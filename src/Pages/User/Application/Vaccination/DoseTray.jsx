import React, { useState } from "react";
import { FiX, FiUpload, FiCalendar, FiLock } from "react-icons/fi";
import { GiLoveInjection } from "react-icons/gi";

import AppButton from "../../../../Components/AppButton";
import "./style.css";

const DoseTray = ({ isOpen, handleClose }) => {
  return (
    <>
      <div
        className={`dose-tray-backdrop ${isOpen ? "visible" : ""}`}
        onClick={handleClose}
      />
      <div className={`dose-tray ${isOpen ? "visible" : ""}`}>
        <div className="dose-tray-handle" onClick={handleClose}>
          <div className="dose-tray-handle-bar"></div>
        </div>

        <div className="dose-tray-header">
          <div className="vaccine-icon-wrapper">
            <GiLoveInjection className="vaccine-icon" />
          </div>
          <div className="dose-tray-header-text">
            <h2 className="dose-tray-title">Human papillomavirus (HPV)</h2>
            <div className="vaccine-tag recommended">ESSENTIAL</div>
          </div>
          <button
            onClick={handleClose}
            className="dose-tray-close-btn"
            aria-label="Close tray"
          >
            <FiX className="dose-tray-close-icon" />
          </button>
        </div>

        <div className="dose-tray-content">
          <p className="dose-tray-subtitle">
            Start your vaccination schedule by completing the first dose
          </p>

          <div className="dose-steps">
            <div className="dose-step active">
              <div className="dose-step-indicator">
                <div className="dose-circle">1</div>
                <div className="dose-connector"></div>
              </div>
              <div className="dose-content">
                <div className="dose-header">
                  <h3>First Dose</h3>
                  <div className="dose-status-badge pending">Pending</div>
                </div>
                <div className="dose-meta">
                  <div className="dose-estimate">
                    <FiCalendar className="meta-icon" />
                    Available now
                  </div>
                </div>

                <div className="dose-actions dual-buttons">
                  <AppButton text={"Schedule Now"} icon={FiCalendar} />
                  <AppButton
                    text={"Upload Certificate"}
                    icon={FiUpload}
                    variant="secondary"
                  />
                </div>

                <div className="dose-note">
                  <p>Complete your first dose to unlock subsequent doses.</p>
                </div>
              </div>
            </div>

            <div className="dose-step blocked">
              <div className="dose-step-indicator">
                <div className="dose-circle">
                  <FiLock className="lock-icon" />
                </div>
                <div className="dose-connector"></div>
              </div>
              <div className="dose-content">
                <div className="dose-header">
                  <h3>Second Dose</h3>
                  <div className="dose-status-badge blocked">Locked</div>
                </div>
                <div className="dose-meta">
                  <div className="dose-estimate">
                    <FiCalendar className="meta-icon" />
                    Available after first dose
                  </div>
                </div>

                <div className="dose-note">
                  <p>
                    Your second dose will be available 4 weeks after completing
                    the first dose.
                  </p>
                </div>
              </div>
            </div>

            <div className="dose-step blocked">
              <div className="dose-step-indicator">
                <div className="dose-circle">
                  <FiLock className="lock-icon" />
                </div>
              </div>
              <div className="dose-content">
                <div className="dose-header">
                  <h3>Third Dose</h3>
                  <div className="dose-status-badge blocked">Locked</div>
                </div>
                <div className="dose-meta">
                  <div className="dose-estimate">
                    <FiCalendar className="meta-icon" />
                    Available after second dose
                  </div>
                </div>

                <div className="dose-note">
                  <p>The final dose completes your HPV vaccination series.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DoseTray;
