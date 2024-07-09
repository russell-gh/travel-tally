import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import AddExpense from "./components/AddExpense";
import Login from "./components/Login";
import Onboarding from "./components/onboarding/Onboarding";
import Signup from "./components/Signup";
import Dashboard from "./components/dashboard/Dashboard";
import { selectPopUp, setData } from "./redux/homeSlice";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { getStore } from "./localStorage";
import SetUpProfile from "./components/setUpProfile/SetUpProfile";
import "./css/headerFooter.scss";
import DeletePopUp from "./components/dashboard/DeletePopUp";
import { useState } from "react";

const App = () => {
  const dispatch = useDispatch();
  const popUp = useSelector(selectPopUp);
  const [_popUp, _setPopUp] = useState("");

  useEffect(() => {
    if (_popUp && !popUp.component) {
      //animation here
      setTimeout(() => {
        _setPopUp(false);
      }, 3000);
    } else {
      _setPopUp(popUp.component);
      console.log(_popUp);
    }
  }, [popUp]);

  const stringToComponent = {
    DeletePopUp: <DeletePopUp />,
    EditExpense: "EditExpense", //add component here
  };

  useEffect(() => {
    getApiData();
  }, []);

  const getApiData = async () => {
    const homeSlice = getStore("homeSlice");
    const onboardingSlice = getStore("onboardingSlice");
    if (homeSlice || onboardingSlice) {
      return;
    }
    {
      const { data } = await axios.get(`fakeCurrencies.json`);
      dispatch(setData({ text: "currencies", data: data.rates }));
    }
    {
      const { data } = await axios.get(`currencyCodes.json`);
      dispatch(setData({ text: "currencyCodes", data }));
    }
    {
      const { data } = await axios.get(`fakeExpenseData.json`);
      dispatch(setData({ text: "trips", data }));
    }
  };

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/setupprofile/*" element={<SetUpProfile />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-expense" element={<AddExpense />} />
          <Route path="*" element={<p>No page selected</p>} />
        </Routes>
        {stringToComponent[_popUp]}
      </main>
      <Footer />
    </>
  );
};

export default App;
