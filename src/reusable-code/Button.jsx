import React from "react";

const Button = ({ onClick, text, className }) => {
  return (
    <button
      className={`btn ${className}`}
      onClick={() => {
        if (onClick) {
          onClick();
        }
      }}
    >
      {text}
    </button>
  );
};

export default Button;
