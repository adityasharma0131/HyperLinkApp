import React from "react";
import PropTypes from "prop-types";

const Button = ({ text = "I Understand & Agree", onClick, className = "" }) => {
  return (
    <button className="primary-button" onClick={onClick}>
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default Button;
