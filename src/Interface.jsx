import axios from "axios";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import AddExpense from "./components/AddExpense";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Onboarding from "./components/onboarding/Onboarding";
import { selectPopUp, selectToken, setData } from "./redux/homeSlice";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { getStore } from "./localStorage";
import SetUpProfile from "./components/setUpProfile/SetUpProfile";
import "./css/app.scss";
import "./css/splashPage.scss";
import DeletePopUp from "./components/dashboard/DeletePopUp";
import { useState } from "react";
import EditExpense from "./components/EditExpense";
import { animationPopUp } from "./animations/animations";
import SplashPage from "./components/SplashPage";
import CheckTrips from "./components/dashboard/CheckTrips";
import Converter from "./components/Converter";
import { saveProfile } from "./redux/onboardingSlice";

const Interface = () => {
  const dispatch = useDispatch();
  const popUpRef = useRef();
  const popUp = useSelector(selectPopUp);
  const [_popUp, _setPopUp] = useState(null);

  useEffect(() => {
    getApiData();
  }, []);

  // Do we need to make this call at a different time? We need to know the homecurrency of the trip.
  // const getCurrencyConversion = async () =>{
  //   try {
  //     const { data } = await axios.get(`http://api.holidough.uk/conversion/${101}`);
  //     dispatch(setData({ text: "currencies", data }));
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }

  const getApiData = async () => {
    const homeSlice = getStore("homeSlice");
    const onboardingSlice = getStore("onboardingSlice");
    if (homeSlice || onboardingSlice) {
      return;
    }
    {
      const { data } = await axios.get(`/fakeCurrencies.json`);
      dispatch(setData({ text: "currencies", data: data.rates }));
    }
    {
      const { data } = await axios.get(`/currencyCodes.json`);
      dispatch(setData({ text: "currencyCodes", data }));
    }
    // {
    //   const { data } = await axios.get(`fakeExpenseData.json`);
    //   dispatch(setData({ text: "trips", data }));
    // }
    {
      const { data } = await axios.get(`/countryInfo.json`);
      dispatch(setData({ text: "countries", data }));
    }
  };

  const closePopUp = () => {
    _setPopUp(false);
  };

  useEffect(() => {
    if (_popUp && !popUp.component) {
      animationPopUp(popUpRef.current, "reverse", closePopUp);
    } else if (popUp.component) {
      _setPopUp(popUp);
      animationPopUp(popUpRef.current);
    }
  }, [popUp]);

  const stringToComponent = {
    DeletePopUp: <DeletePopUp popUp={_popUp} animatingOut={!popUp.component} />,
    EditExpense: <EditExpense animatingOut={!popUp.component} />,
    AddExpense: <AddExpense animatingOut={!popUp.component} />,
    Converter: <Converter animatingOut={!popUp.component} />,
  };

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/setup-profile/*" element={<SetUpProfile />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/dashboard" element={<CheckTrips />} />
          <Route path="/converter" element={<Converter />} />
          <Route path="*" element={<SplashPage />} />
        </Routes>
        <div ref={popUpRef} className="popUpContainer">
          {_popUp && stringToComponent[_popUp.component]}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Interface;
