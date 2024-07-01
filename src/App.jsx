import { useEffect } from "react";
import { useDispatch } from "react-redux";
// import { currencyCodes } from "./Data/currencyCodes";
// import { expenses, travelInfo } from "./Data/fakeExpenseData";
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
import axios from "axios";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    // getCurrencyData("GBP");
    getApiData();
  }, []);

  // useEffect(() => {

  // }, [expenses, travelInfo, currencyCodes]);

  const getApiData = async () => {
    {
      const { data } = await axios.get(`currencyCodes.json`);
      dispatch(setData({ text: "currencyCodes", data }));
    }
    {
      const { data } = await axios.get(`fakeExpenseData.json`);
      dispatch(setData({ text: "expenses", data }));
    }
    {
      const { data } = await axios.get(`fakeTravelInfo.json`);
      dispatch(setData({ text: "travelInfo", data }));
    }
    {
      const { data } = await axios.get(`fakeCurrencies.json`);
      dispatch(setData({ text: "fakeCurrencies", data }));
    }
  };

  return (
    <>
      {/* <Login />
      <Signup />
      <Onboarding />
      <Dashboard />
      <AddExpense /> */}
    </>
  );
};

export default App;
