import { useRef } from "react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { useGSAP } from "@gsap/react";
import Logo from "./Logo.jsx";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

gsap.registerPlugin(MotionPathPlugin);

const SplashPage = () => {
  const planeRef = useRef();
  const pathRef = useRef();
  const lineRefs = [useRef(), useRef(), useRef(), useRef(), useRef()];
  const [next, setNext] = useState();
  const redirect = useNavigate();

  useGSAP(() => {
    const plane = planeRef.current;
    const path = pathRef.current;
    const lines = lineRefs.map((ref) => ref.current);

    const duration = 4; // Total duration of the animation
    const visibilityOffset = 0.2; // Offset to delay visibility after motion starts

    // Create a timeline for the plane
    gsap
      .timeline({
        repeat: -1,
        defaults: { duration: duration, ease: "power1.inOut" },
      })
      .to(plane, {
        motionPath: {
          path: path,
          align: path,
          autoRotate: true,
          alignOrigin: [0.5, 0.5],
          duration: duration,
        },
      });

    // Create separate timelines for each line
    lines.forEach((line, index) => {
      const lineDelay = (index + 1) * 0.1; // Initial delay for each line
      const hiddenDelay = 3.7 - lineDelay * 0.1;
      const motionDuration = duration - (lineDelay * 2 + visibilityOffset); // Duration for the motion path animation
      const lineDuration = duration - lineDelay;
      // console.log(hiddenDelay);

      gsap
        .timeline({
          repeat: -1,
          defaults: { duration: lineDuration, ease: "power1.inOut" },
          delay: lineDelay, // Delay for the entire animation cycle of the line
        })
        .set(line, { visibility: "hidden" }) // Initially hidden
        .to(
          line,
          {
            visibility: "inherit",
            duration: 0,
          },
          lineDelay + visibilityOffset
        ) // Make visible after the initial delay and offset
        .to(
          line,
          {
            motionPath: {
              path: path,
              align: path,
              autoRotate: true,
              alignOrigin: [0.5, 0.5],
              duration: motionDuration,
            },
          },
          lineDelay
        )
        .to(
          line,
          {
            visibility: "hidden",
            duration: 0.2,
          },
          hiddenDelay
        ); // Hide the line after motion ends
    });
  }, []);

  // redirect after one circle with plane
  setTimeout(() => {
    setNext(true);
  }, 4000);

  return (
    <>
      {!next && (
        <div className="splashPage">
          <div className="animationContainer">
            <img
              src="/plane.png"
              alt="plane"
              ref={planeRef}
              className="plane"
            />
            {lineRefs.map((lineRef, index) => (
              <img
                key={index}
                ref={lineRef}
                className={`line`}
                src="/dash.png"
                alt="line"
              />
            ))}
            <svg
              viewBox="0 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
              className="path"
            >
              <defs />
              <path
                ref={pathRef}
                className="path"
                d="M 50, 1
          a 49,49 0 1,1 0,98
          a 49,49 0 1,1 0,-98"
              />
            </svg>
            <div className="logoContainer">
              <Logo />
            </div>
          </div>
        </div>
      )}
      {next && redirect("/login")}
    </>
  );
};

export default SplashPage;
