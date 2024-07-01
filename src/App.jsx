import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { currencyCodes } from "./Data/currencyCodes";
import { expenses, travelInfo } from "./Data/fakeExpenseData";
import "./css/App.css";
import Dashboard from "./dashboard/Dashboard";
import { setData } from "./redux/expensesSlice";
import React, { useState } from "react";
import Login from "./components/login";
import Signup from "./components/signup";
import "./css/App.css";
import Onboarding from "./components/Onboarding/Onboarding";
import AddExpense from "./components/AddExpense";
import { getCurrencyData } from "./utils/axios";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    getCurrencyData("GBP");
  }, []);

  useEffect(() => {
    dispatch(setData({ text: "expenses", data: expenses }));
    dispatch(setData({ text: "travelInfo", data: travelInfo }));
    dispatch(setData({ text: "currencyCodes", data: currencyCodes }));
  }, [expenses, travelInfo, currencyCodes]);

  return (
    <>
      <Login />
      <Signup />
      <Onboarding />
      <Dashboard />
      <AddExpense />
    </>
  );
};

export default App;
