import React, { useEffect, useRef, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import {
  FiX,
  FiUpload,
  FiCalendar,
  FiLock,
  FiCheck,
  FiEye,
} from "react-icons/fi";
import { GiLoveInjection } from "react-icons/gi";
import AppButton from "../../../../Components/AppButton";

const statusConfig = {
  completed: {
    icon: <FiCheck className="badge-icon" />,
    text: "Completed",
    className: "completed",
  },
  pending: {
    icon: <FiCalendar className="badge-icon" />,
    text: "Pending",
    className: "pending",
  },
  locked: {
    icon: <FiLock className="badge-icon" />,
    text: "Locked",
    className: "blocked",
  },
  default: {
    text: "Upcoming",
    className: "upcoming",
  },
};

const DoseTray = ({
  isOpen,
  handleClose,
  vaccine = {
    name: "Vaccine Name",
    type: "ESSENTIAL",
    doses: [
      {
        number: 1,
        status: "",
        date: "",
        completionDate: "",
        note: "",
        certificateUrl: "",
      },
    ],
  },
  userDoses = [],
  onScheduleDose,
  onUploadCertificate,
  onViewCertificate,
}) => {
  const trayRef = useRef(null);
  const backdropRef = useRef(null);

  /** Process doses once */
  const processedDoses = useMemo(() => {
    return vaccine.doses.map((dose) => {
      const userDoseData = userDoses.find((d) => d.number === dose.number);

      if (userDoseData?.status === "completed") {
        return { ...dose, status: "completed", ...userDoseData };
      }

      if (
        dose.number > 1 &&
        !userDoses.some(
          (d) => d.number === dose.number - 1 && d.status === "completed"
        )
      ) {
        return { ...dose, status: "locked" };
      }

      return { ...dose, status: dose.status || "pending" };
    });
  }, [vaccine.doses, userDoses]);

  /** Lock body scroll and animate tray */
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    trayRef.current?.classList.toggle("tray-open", isOpen);
    backdropRef.current?.classList.toggle("backdrop-open", isOpen);

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const getOrdinalLabel = (number) => {
    const suffixes = ["th", "st", "nd", "rd"];
    const remainder = number % 100;
    return `${number}${
      suffixes[(remainder - 20) % 10] || suffixes[remainder] || suffixes[0]
    }`;
  };

  const getStatusBadge = (status) => {
    const config = statusConfig[status] || statusConfig.default;
    return (
      <div className={`dose-status-badge ${config.className}`}>
        {config.icon}
        {config.text}
      </div>
    );
  };

  const getDoseActions = useCallback(
    (dose) => {
      switch (dose.status) {
        case "completed":
          return (
            dose.certificateUrl && (
              <div className="dose-actions dual-buttons">
                <AppButton
                  text="View Certificate"
                  icon={FiEye}
                  variant="secondary"
                  onClick={() => onViewCertificate(dose.certificateUrl)}
                  fullWidth
                />
              </div>
            )
          );
        case "pending":
          return (
            <div className="dose-actions dual-buttons">
              <AppButton
                text="Schedule Now"
                icon={FiCalendar}
                onClick={() => onScheduleDose(dose.number)}
              />
              <AppButton
                text="Upload Certificate"
                icon={FiUpload}
                variant="secondary"
                onClick={() => onUploadCertificate(dose.number)}
              />
            </div>
          );
        case "locked":
          return (
            <div className="dose-actions">
              <div className="locked-message">
                <FiLock className="meta-icon" />
                Complete previous dose to unlock
              </div>
            </div>
          );
        default:
          return null;
      }
    },
    [onScheduleDose, onUploadCertificate, onViewCertificate]
  );

  /** Subtitle computed once */
  const subtitle = useMemo(() => {
    const completedDoses = processedDoses.filter(
      (d) => d.status === "completed"
    ).length;
    const totalDoses = processedDoses.length;

    if (completedDoses === 0)
      return "Start your vaccination schedule by completing the first dose";
    if (completedDoses === totalDoses)
      return "Congratulations! You've completed all doses";

    return `Continue your vaccination schedule by completing ${getOrdinalLabel(
      completedDoses + 1
    )} dose`;
  }, [processedDoses]);

  const getDoseTitle = (number) => {
    const titles = { 1: "First Dose", 2: "Second Dose", 3: "Third Dose" };
    return titles[number] || `${getOrdinalLabel(number)} Dose`;
  };

  return (
    <>
      <div
        ref={backdropRef}
        className="dose-tray-backdrop"
        onClick={handleClose}
      />

      <div ref={trayRef} className="dose-tray">
        <div className="dose-tray-handle" onClick={handleClose}>
          <div className="dose-tray-handle-bar" />
        </div>

        <div className="dose-tray-header">
          <div className="vaccine-icon-wrapper">
            <GiLoveInjection className="vaccine-icon" />
          </div>
          <div className="dose-tray-header-text">
            <h2 className="dose-tray-title">{vaccine.name}</h2>
            <div className={`vaccine-tag ${vaccine.type.toLowerCase()}`}>
              {vaccine.type}
            </div>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="dose-tray-close-btn"
            aria-label="Close tray"
          >
            <FiX className="dose-tray-close-icon" />
          </button>
        </div>

        <div className="dose-tray-content">
          <p className="dose-tray-subtitle">{subtitle}</p>

          <div className="dose-steps">
            {processedDoses.map((dose, index) => (
              <div key={dose.number} className={`dose-step ${dose.status}`}>
                <div className="dose-step-indicator">
                  <div className="dose-circle">
                    {dose.status === "locked" ? (
                      <FiLock className="lock-icon" />
                    ) : (
                      dose.number
                    )}
                  </div>
                  {index < processedDoses.length - 1 && (
                    <div className="dose-connector" />
                  )}
                </div>

                <div className="dose-content">
                  <div className="dose-header">
                    <h3>{getDoseTitle(dose.number)}</h3>
                    {getStatusBadge(dose.status)}
                  </div>

                  <div className="dose-meta">
                    {dose.date && (
                      <div className="dose-estimate">
                        <FiCalendar className="meta-icon" />
                        Scheduled: {dose.date}
                      </div>
                    )}
                    {dose.status === "completed" && dose.completionDate && (
                      <div className="dose-completed">
                        <FiCheck className="meta-icon" />
                        Completed: {dose.completionDate}
                      </div>
                    )}
                  </div>

                  {getDoseActions(dose)}

                  {dose.note && (
                    <div className="dose-note">
                      <p>{dose.note}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <style jsx>{`
          /* Backdrop */
          .dose-tray-backdrop {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 999;
            opacity: 0;
            transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            pointer-events: none;
          }

          .dose-tray-backdrop.backdrop-open {
            opacity: 1;
            pointer-events: auto;
          }

          /* Tray Container */
          .dose-tray {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            max-height: 85vh;
            background: #ffffff;
            border-radius: 16px 16px 0 0;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
            z-index: 1001;
            transform: translateY(100%);
            transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            display: flex;
            flex-direction: column;
            overflow: hidden;
          }

          .dose-tray.tray-open {
            transform: translateY(0);
          }

          /* Handle */
          .dose-tray-handle {
            padding: 12px 0;
            display: flex;
            justify-content: center;
            cursor: pointer;
            transition: transform 0.2s ease;
          }

          .dose-tray-handle:hover {
            transform: translateY(-2px);
          }

          .dose-tray-handle-bar {
            width: 40px;
            height: 4px;
            background: #e2e8f0;
            border-radius: 9999px;
            transition: all 0.2s ease;
          }

          .dose-tray-handle:hover .dose-tray-handle-bar {
            background: #cbd5e1;
            transform: scaleX(1.1);
          }

          /* Header */
          .dose-tray-header {
            align-items: center;
            padding: 0 20px 12px;
            border-bottom: 1px solid #e2e8f0;
            display: flex;
            gap: 16px;
          }

          .vaccine-icon-wrapper {
            width: 56px;
            height: 56px;
            background: linear-gradient(135deg, #f3f4ff, #e0e7ff);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            box-shadow: 0 2px 8px rgba(124, 58, 237, 0.12);
            transition: transform 0.2s ease, box-shadow 0.2s ease;
          }

          .vaccine-icon-wrapper:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(124, 58, 237, 0.16);
          }

          .vaccine-icon {
            color: #7c3aed;
            font-size: 24px;
            transition: transform 0.2s ease;
          }

          .vaccine-icon-wrapper:hover .vaccine-icon {
            transform: scale(1.1);
          }

          .dose-tray-header-text {
            flex: 1;
          }

          .dose-tray-title {
            font-size: 22px;
            font-weight: 700;
            color: #1e293b;
            margin: 0 0 6px 0;
            line-height: 1.3;
            letter-spacing: -0.3px;
            transition: color 0.2s ease;
          }

          .vaccine-tag {
            display: inline-block;
            padding: 4px 10px;
            border-radius: 6px;
            font-size: 11px;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            transition: all 0.2s ease;
          }

          .vaccine-tag.essential {
            background: #e9f7ef;
            color: #2e7d32;
          }

          .vaccine-tag.essential:hover {
            background: #d4edda;
          }

          .vaccine-tag.recommended {
            background: #e0f2fe;
            color: #0369a1;
          }

          .vaccine-tag.recommended:hover {
            background: #bae6fd;
          }

          .vaccine-tag.optional {
            background: #f3f4ff;
            color: #4f46e5;
          }

          .vaccine-tag.optional:hover {
            background: #e0e7ff;
          }

          .dose-tray-close-btn {
            background: none;
            border: none;
            width: 36px;
            height: 36px;
            border-radius: 9999px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #64748b;
            cursor: pointer;
            transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          }

          .dose-tray-close-btn:hover {
            background: #f8fafc;
            color: #1e293b;
            transform: rotate(90deg);
          }

          /* Content */
          .dose-tray-content {
            padding: 16px 20px;
            overflow-y: auto;
            flex: 1;
          }

          .dose-tray-subtitle {
            font-size: 14px;
            color: #64748b;
            margin: 0 0 20px 0;
            line-height: 1.5;
          }

          /* Dose Steps */
          .dose-steps {
            display: flex;
            flex-direction: column;
            gap: 24px;
          }

          .dose-step {
            display: flex;
            gap: 16px;
            transition: opacity 0.3s ease;
          }

          .dose-step-indicator {
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .dose-circle {
            width: 28px;
            height: 28px;
            border-radius: 9999px;
            background: #f8fafc;
            color: #475569;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            font-weight: 600;
            flex-shrink: 0;
            border: 1px solid #e2e8f0;
            position: relative;
            z-index: 1;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }

          .dose-step.pending .dose-circle {
            background: #6d28d9;
            color: white;
            border-color: #8b5cf6;
            transform: scale(1.1);
          }

          .dose-step.completed .dose-circle {
            background: #4cc9a9;
            color: white;
            border-color: #4cc9a9;
            transform: scale(1.1);
          }

          .dose-connector {
            flex: 1;
            width: 2px;
            background: #e2e8f0;
            margin: 4px 0;
            transition: background 0.3s ease;
          }

          .dose-step.completed .dose-connector {
            background: #4cc9a9;
          }

          .dose-step.pending .dose-connector {
            background: linear-gradient(to bottom, #4cc9a9, #6d28d9);
          }

          .dose-content {
            flex: 1;
            padding-bottom: 8px;
          }

          .dose-header {
            display: flex;
            align-items: center;
            margin-bottom: 6px;
          }

          .dose-header h3 {
            font-size: 16px;
            font-weight: 600;
            color: #1e293b;
            margin: 0 8px 0 0;
            transition: color 0.2s ease;
          }

          .dose-status-badge {
            font-size: 12px;
            font-weight: 500;
            padding: 2px 8px;
            border-radius: 9999px;
            display: flex;
            align-items: center;
            gap: 4px;
            transition: all 0.2s ease;
          }

          .badge-icon {
            font-size: 12px;
            transition: transform 0.2s ease;
          }

          .dose-status-badge:hover .badge-icon {
            transform: scale(1.2);
          }

          .dose-status-badge.completed {
            background: #e6f8f3;
            color: #4cc9a9;
          }

          .dose-status-badge.completed:hover {
            background: #d1f2e9;
          }

          .dose-status-badge.pending {
            background: #fef3e6;
            color: #f8961e;
          }

          .dose-status-badge.pending:hover {
            background: #fde8d1;
          }

          .dose-status-badge.upcoming {
            background: #f8fafc;
            color: #64748b;
          }

          .dose-status-badge.upcoming:hover {
            background: #f1f5f9;
          }

          .dose-meta {
            display: flex;
            align-items: center;
            margin-bottom: 12px;
            font-size: 13px;
            color: #64748b;
          }

          .meta-icon {
            margin-right: 6px;
            font-size: 14px;
            transition: transform 0.2s ease;
          }

          .dose-meta:hover .meta-icon {
            transform: scale(1.2);
          }

          .dose-actions {
            margin: 16px 0;
          }

          .dose-note {
            font-size: 13px;
            color: #64748b;
            line-height: 1.5;
            margin: 8px 0;
            transition: color 0.2s ease;
          }

          /* Blocked/Locked dose styles */
          .dose-step.locked {
            opacity: 0.6;
          }

          .dose-step.locked:hover {
            opacity: 0.8;
          }

          .dose-step.locked .dose-circle {
            background: #f8fafc;
            color: #94a3b8;
            border-color: #e2e8f0;
          }

          .dose-step.locked .dose-content h3,
          .dose-step.locked .dose-meta,
          .dose-step.locked .dose-note {
            color: #94a3b8;
          }

          .lock-icon {
            font-size: 14px;
            color: #94a3b8;
          }

          .dose-status-badge.blocked {
            background: #f8fafc;
            color: #94a3b8;
            border: 1px solid #e2e8f0;
          }

          .dose-status-badge.blocked:hover {
            background: #f1f5f9;
          }

          /* Dual buttons layout */
          .dose-actions.dual-buttons {
            display: flex;
            gap: 12px;
            margin: 16px 0;
          }

          /* Completed dose styles */
          .dose-step.completed .dose-content h3,
          .dose-step.completed .dose-meta,
          .dose-step.completed .dose-note {
            color: #4cc9a9;
          }

          .dose-step.completed .dose-meta .meta-icon {
            color: #4cc9a9;
          }

          /* Scrollbar styling */
          .dose-tray-content::-webkit-scrollbar {
            width: 6px;
          }

          .dose-tray-content::-webkit-scrollbar-track {
            background: #f1f5f9;
          }

          .dose-tray-content::-webkit-scrollbar-thumb {
            background: #cbd5e1;
            border-radius: 3px;
          }

          .dose-tray-content::-webkit-scrollbar-thumb:hover {
            background: #94a3b8;
          }
        `}</style>
      </div>
    </>
  );
};

DoseTray.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  vaccine: PropTypes.shape({
    name: PropTypes.string,
    type: PropTypes.oneOf(["ESSENTIAL", "RECOMMENDED", "OPTIONAL"]),
    doses: PropTypes.arrayOf(
      PropTypes.shape({
        number: PropTypes.number.isRequired,
        status: PropTypes.oneOf(["completed", "pending", "locked"]),
        date: PropTypes.string,
        completionDate: PropTypes.string,
        note: PropTypes.string,
        certificateUrl: PropTypes.string,
      })
    ).isRequired,
  }),
  userDoses: PropTypes.arrayOf(
    PropTypes.shape({
      number: PropTypes.number.isRequired,
      status: PropTypes.oneOf(["completed", "pending"]).isRequired,
      completionDate: PropTypes.string,
      certificateUrl: PropTypes.string,
    })
  ),
  onScheduleDose: PropTypes.func,
  onUploadCertificate: PropTypes.func,
  onViewCertificate: PropTypes.func,
};

DoseTray.defaultProps = {
  userDoses: [],
  onScheduleDose: () => {},
  onUploadCertificate: () => {},
  onViewCertificate: () => {},
};

export default DoseTray;
