import axios from "axios";

export const getCountryCurrency = async (callback) => {
  try {
    const { data } = await axios.get(
      "https://countriesnow.space/api/v0.1/countries/currency"
    );
    callback(data.data);
  } catch (error) {
    console.log(error);
  }
};
