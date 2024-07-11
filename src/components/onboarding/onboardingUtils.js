import axios from "axios";
import { API_KEY } from "./secrets";

export const getCountryCurrency = async (city, limit) => {
  try {
    const { data } = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=${limit}&appid=${API_KEY}`);
    console.log(data)
  } catch (error) {
    console.log(error);
  }
};
