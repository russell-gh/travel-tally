import React from "react";
import Interface from "./Interface";
import { useEffect, useState } from "react";
import Redirect from "./components/Redirect";

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
      <Redirect />
      <Interface />
    </>
  );
};

export default App;
