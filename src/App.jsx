import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import AddExpense from "./components/AddExpense";
import Login from "./components/Login";
import Onboarding from "./components/Onboarding/Onboarding";
import Signup from "./components/Signup";
import Dashboard from "./components/dashboard/Dashboard";
import { selectPopUp, setData } from "./redux/tripsSlice";

const App = () => {
  const dispatch = useDispatch();
  const popUp = useSelector(selectPopUp);

  useEffect(() => {
    getApiData();
  }, []);

  const getApiData = async () => {
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

  // useEffect(()=> {
  //   if (popUp) {}
  // })

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
