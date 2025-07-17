import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TiHome } from "react-icons/ti";
import { FaFolderPlus, FaHeartbeat, FaUser } from "react-icons/fa";
import { FaRegNewspaper } from "react-icons/fa6";

const navItems = [
  { label: "Home", path: "", icon: TiHome, isPrimary: false },
  { label: "Services", path: "services", icon: FaFolderPlus, isPrimary: false },
  {
    label: "Hyperlink360",
    path: "hyperlink360",
    icon: FaHeartbeat,
    isPrimary: true,
  },
  {
    label: "Health",
    path: "healthfeeds",
    icon: FaRegNewspaper,
    isPrimary: false,
  },
  { label: "Profile", path: "profile", icon: FaUser, isPrimary: false },
];

const UserNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const pathSegments = location.pathname.split("/");
  const currentPath = pathSegments.length > 2 ? pathSegments[2] : "";

  return (
    <nav className="bottom-nav">
      <div className="nav-container">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPath === item.path;

          return (
            <button
              key={item.path || "home"}
              className={`nav-item ${isActive ? "active" : ""} ${
                item.isPrimary ? "primary" : ""
              }`}
              onClick={() => navigate(`/app/${item.path}`)}
              aria-label={item.label}
            >
              <div className="icon-container">
                <Icon className="nav-icon" />
              </div>
              <span className="nav-label">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default UserNavigation;
