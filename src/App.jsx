import React from "react";
import "./css/App.css";
import AddExpense from "./components/AddExpense";
import { getCurrencyData } from "./utils/axios";

export default function App() {
  getCurrencyData("GBP");
  return (
    <>
      <AddExpense />
    </>
  );
}
