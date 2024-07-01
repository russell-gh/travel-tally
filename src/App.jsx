import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import AddExpense from "./components/AddExpense";
import Login from "./components/Login";
import Onboarding from "./components/Onboarding/Onboarding";
import Signup from "./components/Signup";
import "./css/App.css";
import Dashboard from "./dashboard/Dashboard";
import { setData } from "./redux/expensesSlice";

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
      dispatch(setData({ text: "currencies", data: data.rates }));
    }
  };

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-expense" element={<AddExpense />} />
        <Route path="*" element={<p>No page selected</p>} />
      </Routes>
    </>
  );
};

export default App;
