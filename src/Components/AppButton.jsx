import React from "react";
import PropTypes from "prop-types";

const AppButton = ({
  text,
  icon: Icon,
  onClick,
  variant = "primary",
  fullWidth = false,
}) => {
  const classNames = [
    "app-btn",
    variant === "secondary" ? "app-btn-secondary" : "app-btn-primary",
    fullWidth ? "app-btn-full" : "",
  ].join(" ");

  return (
    <button className={classNames} onClick={onClick}>
      {Icon && <Icon className="app-btn-icon" />}
      {text}
    </button>
  );
};

AppButton.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.elementType,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(["primary", "secondary"]),
  fullWidth: PropTypes.bool,
};

export default AppButton;
