import axios from "axios";
import { API_KEY } from "./secrets";

export const getCountryCurrency = async (city, limit) => {
  try {
    const { data } = await axios.get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=${limit}&appid=${API_KEY}`
    );
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export const checkFormSectionErrors = (currentFormSection, errors) => {
  switch (currentFormSection) {
    case 1:
      if (errors.destination) {
        return true;
      }
      return false;

    case 2:
      if (
        errors.startDate ||
        errors.endDate ||
        errors.startDateIncluded ||
        errors.endDateIncluded
      ) {
        return true;
      }
      return false;

    case 3:
      if (errors.budgetTotal || errors.homeCurrency) {
        return true;
      }
      return false;
  }
};
