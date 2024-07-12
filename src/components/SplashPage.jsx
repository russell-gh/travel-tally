import { useRef } from "react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { useGSAP } from "@gsap/react";
import Logo from "./Logo.jsx";

gsap.registerPlugin(MotionPathPlugin);

const SplashPage = () => {
  const planeRef = useRef();
  const pathRef = useRef();
  const lineRefs = [useRef(), useRef(), useRef(), useRef(), useRef()];

  useGSAP(() => {
    const plane = planeRef.current;
    const path = pathRef.current;
    const lines = lineRefs.map((ref) => ref.current);

    // Create a timeline for the plane
    const planeTimeline = gsap.timeline({
      repeat: -1,
      defaults: { duration: 5, ease: "power1.inOut" },
    });

    planeTimeline.to(plane, {
      motionPath: {
        path: path,
        align: path,
        autoRotate: true,
        alignOrigin: [0.5, 0.5],
      },
    });

    // Create separate timelines for each line
    lines.forEach((line, index) => {
      gsap
        .timeline({
          repeat: -1,
          defaults: {
            duration: 5,
            ease: "power1.inOut",
          },
          delay: (index + 1) * 0.1,
        })
        .to(line, {
          motionPath: {
            path: path,
            align: path,
            autoRotate: true,
            alignOrigin: [0.5, 0.5],
          },
          visibility: "inherit",
        });
    });
  }, []);

  return (
    <div className="splashPage">
      <div className="animationContainer">
        <img
          src="../src/img/plane.png"
          alt="plane"
          ref={planeRef}
          className="plane"
        />
        {lineRefs.map((lineRef, index) => (
          <img
            key={index}
            ref={lineRef}
            className={`line`}
            src="../src/img/dash.png"
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
      </div>
      <div className="logoContainer">
        <Logo />
      </div>
    </div>
  );
};

export default SplashPage;
