import React from "react";
import Interface from "./Interface";
import { useEffect, useState } from "react";

const App = () => {
  const [online, setOnline] = useState(true);

  useEffect(() => {
    window.addEventListener("online", () => {
      setOnline(true);
    });

    window.addEventListener("offline", () => {
      setTimeout(() => {
        setOnline(false);
      }, 2000);
    });
  }, []);

  return (
    <>
      <p>Hello</p>
      {!online && (
        <div
          style={{
            backgroundColor: "red",
            color: "white",
            position: "fixed",
            top: "0",
            left: "0",
          }}
        >
          Internet offline
        </div>
      )}
      {/* <Interface /> */}
    </>
  );
};

export default App;
