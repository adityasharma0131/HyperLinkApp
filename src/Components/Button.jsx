import React from "react";
import PropTypes from "prop-types";

const Button = ({
  type = "primary",
  children,
  onClick,
  className = "",
  icon,
  disabled = false,
  ...props
}) => {
  return (
    <button
      className={`button ${type}-button ${className} ${
        disabled ? "disabled" : ""
      }`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="button-icon">{icon}</span>}
      {children}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.oneOf(["primary", "secondary"]),
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
  icon: PropTypes.node,
  disabled: PropTypes.bool,
};

export default Button;
