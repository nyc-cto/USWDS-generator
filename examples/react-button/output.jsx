import React from "react";
import PropTypes from "prop-types";

function Button(props) {
  const { classes, disabled, htmlType, onclick, text } = props;
  return (
    <button
      className={`usa-button ${classes}`}
      disabled={disabled}
      type={htmlType}
      onClick={onclick}
    >
      {text}
    </button>
  );
}

Button.propTypes = {
  classes: PropTypes.string,
  disabled: PropTypes.bool,
  htmlType: PropTypes.string,
  onclick: PropTypes.func,
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired,
};

Button.defaultProps = {
  onClick: () => {},
};

export default Button;
