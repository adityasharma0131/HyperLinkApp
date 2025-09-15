import React, { useState, useRef, useEffect } from "react";
import {
  FiShare2,
  FiTrash2,
  FiDownload,
  FiBookmark,
  FiEdit2,
  FiMove,
  FiMoreHorizontal,
} from "react-icons/fi";

export default function BottomOps() {
  const [expanded, setExpanded] = useState(false);
  const trayRef = useRef(null);

  // Detect click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (trayRef.current && !trayRef.current.contains(event.target)) {
        setExpanded(false);
      }
    }

    if (expanded) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [expanded]);

  return (
    <div className={`bottom-tray ${expanded ? "expanded" : ""}`} ref={trayRef}>
      <div className="tray-content">
        <button className="tray-item">
          <FiShare2 className="icon" />
          <span className="label">Share</span>
        </button>
        <button className="tray-item">
          <FiTrash2 className="icon" />
          <span className="label">Delete</span>
        </button>

        {expanded && (
          <>
            <button className="tray-item">
              <FiDownload className="icon" />
              <span className="label">Save</span>
            </button>
            <button className="tray-item">
              <FiBookmark className="icon" />
              <span className="label">Bookmark</span>
            </button>
            <button className="tray-item">
              <FiEdit2 className="icon" />
              <span className="label">Edit</span>
            </button>
            <button className="tray-item">
              <FiMove className="icon" />
              <span className="label">Move</span>
            </button>
          </>
        )}

        {!expanded && (
          <button className="tray-item" onClick={() => setExpanded(true)}>
            <FiMoreHorizontal className="icon" />
            <span className="label">More</span>
          </button>
        )}
      </div>

      <style>{`
        .bottom-tray {
          position: fixed;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%) scale(1);
          background: #f3f0ff; /* light purple tint */
          border-radius: 30px;
          padding: 12px 24px;
          display: flex;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          z-index: 1000;
          opacity: 0.95;
          transition: all 0.3s ease;
        }

        .bottom-tray.expanded {
          transform: translateX(-50%) scale(1.05);
          background: #e9e5ff;
        }

        .tray-content {
          display: flex;
          gap: 25px;
          transition: gap 0.3s ease;
        }

        .tray-item {
          background: none;
          border: none;
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
          color: #553fb5;
          font-size: 10px;
          transition: transform 0.2s ease, opacity 0.2s ease;
        }

        .tray-item .icon {
          font-size: 17px;
          margin-bottom: 4px;
          transition: transform 0.2s ease;
        }

        .tray-item:hover {
          opacity: 0.8;
          transform: translateY(-2px);
        }

        .tray-item:hover .icon {
          transform: scale(1.15);
        }
      `}</style>
    </div>
  );
}
