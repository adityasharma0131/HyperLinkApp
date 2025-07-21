import React from "react";
import PropTypes from "prop-types";

const AppButton = ({ text, icon: Icon, onClick }) => {
  return (
    <button className="app-button" onClick={onClick}>
      {text}
      {Icon && <Icon size={16} />}
    </button>
  );
};

AppButton.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.elementType, // Accepts a React component (e.g., FaArrowRight)
  onClick: PropTypes.func,
};

export default AppButton;
