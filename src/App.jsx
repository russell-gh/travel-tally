import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { currencyCodes } from "./Data/currencyCodes";
import { expenses, travelInfo } from "./Data/fakeExpenseData";
import "./css/App.css";
import Dashboard from "./dashboard/Dashboard";
import { setData } from "./redux/expensesSlice";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setData({ text: "expenses", data: expenses }));
    dispatch(setData({ text: "travelInfo", data: travelInfo }));
    dispatch(setData({ text: "currencyCodes", data: currencyCodes }));
  }, [expenses, travelInfo, currencyCodes]);

  return (
    <div>
      <Dashboard />
    </div>
  );
}
