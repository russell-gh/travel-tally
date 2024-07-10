import React from "react";
import gsap from "gsap";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";

const Button = ({ onClick, text, className, animation, disabled }) => {
  const buttonRef = useRef();
  const ripplesRef = useRef();

  const handleClick = (e) => {
    e.preventDefault();
    console.log(e);
    if (animation) {
      // Trigger GSAP animation on click
      gsap.fromTo(buttonRef.current, { scale: 0.9 }, { scale: 1, duration: 1 });
      gsap.fromTo(
        ripplesRef.current,
        {
          border: "1px solid #3c43a5",
          left: e.nativeEvent.offsetX,
          top: e.nativeEvent.offsetY,
          height: 0,
          width: 0,
          opacity: 1,
        },
        {
          border: "0px solid #3c43a5",
          height: 60,
          width: 60,
          opacity: 0,
          duration: 1,
          ease: "power2.out",
          onStart: () => {
            console.log(
              Math.abs(e.target.offsetHeight - e.target.offsetTop),
              e.target.offsetHeight,
              e.target.offsetTop
            );
          },
        }
      );
    }

    // Call the passed onClick function if it exists
    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      ref={buttonRef}
      className={`btn ${className}`}
      onClick={(e)=>handleClick(e)}
      disabled={disabled}
    >
      {text}
      <span ref={ripplesRef} className="ripples"></span>
    </button>
  );
};

export default Button;
