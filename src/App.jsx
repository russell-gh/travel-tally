import React, { useEffect } from "react";
import "./css/App.css";
import AddExpense from "./components/AddExpense";
import { getCurrencyData } from "./utils/axios";

const App = () => {
  useEffect(() => {
    getCurrencyData("GBP");
  }, []);

  return (
    <>
      <AddExpense />
    </>
  );
};

export default App;
