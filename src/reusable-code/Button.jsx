import React from "react";
import { Link } from "react-router-dom";

const Button = ({ onClick, text, className }) => {
  return (
    <Link to="/add-expense">
      <button
        className={`btn ${className}`}
        onClick={() => {
          onClick();
        }}
      >
        {text}
      </button>
    </Link>
  );
};

export default Button;
