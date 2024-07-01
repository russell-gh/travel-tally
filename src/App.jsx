import React, { useState } from "react";
import Login from "./components/login";
import Signup from "./components/signup";
import "./css/App.css";
import Onboarding from "./components/Onboarding/Onboarding.jsx";

const App = () => {
  return (
    <>
      <Login />
      <Signup />
      <Onboarding />
    </>
  );
};

export default App;

