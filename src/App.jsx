import axios from "axios";
import { useEffect, useRef } from "react";
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
import "./css/splashPage.scss";
import DeletePopUp from "./components/dashboard/DeletePopUp";
import { useState } from "react";
import EditExpense from "./components/EditExpense";
import { animationPopUp } from "./animations";
import SplashPage from "./components/SplashPage";

const App = () => {
  const dispatch = useDispatch();
  const popUpRef = useRef();
  const popUp = useSelector(selectPopUp);
  const [_popUp, _setPopUp] = useState(null);

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

  useEffect(() => {
    if (_popUp && !popUp.component) {
      console.log("you get here");
      animationPopUp(popUpRef.current, "reverse");
      setTimeout(() => {
        _setPopUp(false);
      }, 30000);
    } else if (popUp.component) {
      _setPopUp(popUp);
      animationPopUp(popUpRef.current);
    }
  }, [popUp]);

  const stringToComponent = {
    DeletePopUp: <DeletePopUp popUp={_popUp} animatingOut={!popUp.component} />,
    EditExpense: <EditExpense animatingOut={!popUp.component} />,
    AddExpense: <AddExpense animatingOut={!popUp.component} />,
  };

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/splash-page" element={<SplashPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/setup-profile/*" element={<SetUpProfile />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/dashboard" element={<Dashboard popUp={_popUp} />} />
          <Route path="*" element={<p>No page selected</p>} />
        </Routes>
        <div ref={popUpRef} className="popUpContainer">
          {_popUp && stringToComponent[_popUp.component]}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default App;
