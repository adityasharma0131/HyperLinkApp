import React from "react";
import Logo from "../assets/hyperlinklogo.png";

const Loading = () => {
  return (
    <div className="loader-container">
      <img src={Logo} alt="Loading Logo" className="logo-loader" />
    </div>
  );
};

export default Loading;
