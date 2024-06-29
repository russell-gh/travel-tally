import { useDispatch, useSelector } from "react-redux";
import { setCurrencyApiData } from "../redux/counterSlice";
import axios from "axios";
export const getCurrencyData = async (base) => {
  // const base = "GBP";
  const key = "zbc6sv4OIbZjw6Dm08f7vBbnb05C6J3d";
  const dispatch = useDispatch();
  const { data } = await axios.get(
    `https://api.currencybeacon.com/v1/latest?api_key=${key}&base=${base}`
  );

  console.log(data.rates, "RAN");

  dispatch(setCurrencyApiData(data.rates));
};
