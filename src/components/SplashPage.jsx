import { useRef } from "react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(MotionPathPlugin);

const SplashPage = () => {
  const planeRef = useRef();
  const pathRef = useRef();
  const lineRef = useRef();

  useGSAP(() => {
    const plane = planeRef.current;
    const path = pathRef.current;
    const line = lineRef.current;

    gsap.to(plane, {
      duration: 15,
      repeat: 1,
      ease: "power1.inOut",
      motionPath: {
        path: path,
        align: path,
        autoRotate: true,
      },
    });

    gsap.to(line, {
      // Corrected: use line instead of lineRef
      delay: 0.5,
      duration: 15,
      repeat: 1,
      ease: "power1.inOut",
      motionPath: {
        path: path,
        align: path,
        autoRotate: true,
      },
    });
  }, []);

  return (
    <div className="splashPage">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0"
        y="0"
        viewBox="0 0 64 64"
        xmlSpace="preserve"
        className="plane"
        ref={planeRef}
        overflow="visible"
      >
        <g transform="rotate(45), translate(-50, 10)">
          <path
            d="M52.593 19.312a11.873 11.873 0 0 0 3.358-6.611 4.032 4.032 0 0 0-1.146-3.508 4.034 4.034 0 0 0-3.506-1.144 11.875 11.875 0 0 0-6.611 3.357l-5.579 5.579-3.34-.727a2.235 2.235 0 0 0-.285-2.804 2.233 2.233 0 0 0-3.153 0l-1.687 1.687-3.958-.862.276-.276a2.232 2.232 0 0 0 0-3.152c-.839-.842-2.308-.843-3.152 0l-2.3 2.3-8.192-1.784a1.928 1.928 0 0 0-1.778.522l-1.649 1.649c-.433.433-.633 1.03-.547 1.637s.443 1.125.98 1.422l19.239 10.628-9.739 10.656-9.891.526-1.532 1.531a1.366 1.366 0 0 0 .48 2.243l9.363 3.576 3.577 9.364A1.362 1.362 0 0 0 23.1 56c.358 0 .704-.141.965-.401l1.53-1.53.526-9.892 10.656-9.739L47.398 53.67c.296.537.814.894 1.421.98a1.923 1.923 0 0 0 1.637-.547l1.65-1.649a1.925 1.925 0 0 0 .522-1.777l-1.781-8.184 2.303-2.302c.421-.421.653-.981.653-1.577s-.232-1.156-.653-1.577a2.233 2.233 0 0 0-3.153 0l-.277.277-.861-3.958 1.688-1.688c.421-.421.653-.981.653-1.577s-.232-1.156-.652-1.576c-.735-.735-1.948-.828-2.804-.281l-.728-3.345 5.579-5.579z"
            fill="#d6ee79"
            opacity="1"
            data-original="#000000"
          ></path>
        </g>
      </svg>

      <svg
        width="10"
        height="2"
        viewBox="0 0 5 2"
        xmlns="http://www.w3.org/2000/svg"
        className="line"
        ref={lineRef}
      >
        <path d="M 0 1 H 10" stroke="#D6EE79" strokeWidth="2" />
      </svg>

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
  );
};

export default SplashPage;
