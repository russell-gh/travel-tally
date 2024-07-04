import { createSlice } from "@reduxjs/toolkit";
import { handleData } from "../utils/expenseData";
import { getCurrencySymbol, getIndex } from "../utils/utils";
import { initialState } from "./InitialState";

export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    setData: (state, action) => {
      const { text, data } = action.payload;
      state[text] = data; // Dynamically set the state property

      // set selectedTripId
      if (state.trips) {
        state.selectedTripId = state.trips[state.trips.length - 1].id;
      }

      //set homecurrencySymbol inside each trip
      if (state.trips && state.currencyCodes) {
        state.trips.map((item, index) => {
          item.details.homeCurrencySymbol = getCurrencySymbol(
            { ...state.currencyCodes },
            state.trips[index].details.homeCurrency
          );
        });
      }

      if (text === "currencies") {
        const currencies = Object.keys(data);
        const favs = ["EUR", "USD", "GBP"];
        favs.forEach((item) => {
          const found = currencies.findIndex((el) => el === item);
          currencies.splice(found, 1);
          currencies.unshift(item);
        });
        state.currencyRates = data;
        state.currencyNames = currencies;
      }
    },
    deleteExpense: (state) => {
      //get index of the current trip
      const indexTrip = getIndex(state.trips, state.selectedTripId);
      //get index of clicked expense
      const index = getIndex(state.trips[indexTrip].expenses, state.popUp.id);
      // delete expense
      state.trips[indexTrip].expenses.splice(index, 1);
      //set popUp to empty so popUp disappears
      state.popUp = {};
    },
    togglePopUp: (state, { payload }) => {
      if (!payload) {
        state.popUp = {};
        return;
      }

      const { config, component } = payload;
      const { id, title } = config;
      state.popUp.showPopUp = !state.popUp.showPopUp;
      state.popUp.id = id;
      state.popUp.title = title;
      state.popUp.component = component;
    },
    formEvent: (state, { payload }) => {
      state[payload.id] = payload.value;
    },
    addExpenseData: (state, { payload }) => {
      // Close expense popup
      state.popUp = {};
      // Find index of trip from id
      const indexOf = state.trips.findIndex((trip) => {
        return trip.id === state.selectedTripId;
      });
      // Create variable for the correct trip
      const thisTrip = state.trips[indexOf];
      // Send data to be converted into the preferred format (uses function in expenseData.js)
      let result = handleData({ ...payload }, thisTrip.details.homeCurrency, {
        ...state.currencyRates,
      });
      // Push data into expenses array
      if (Array.isArray(result)) {
        result.forEach((element) => {
          console.log(element);
          state.trips[indexOf].expenses.push(element);
        });
      } else {
        state.trips[indexOf].expenses.push(result);
      }
    },
  },
});

export const {
  setData,
  deleteExpense,
  togglePopUp,
  formEvent,
  addExpenseData,
} = homeSlice.actions;

export const selectTrips = (state) => state.home.trips;
// export const selectExpenses = (state) => state.home.trips[0].expenses;
export const selectPopUp = (state) => state.home.popUp;
export const selectCurrencyCodes = (state) => state.home.currencyCodes;
export const selectHomeCurrencySymbol = (state) =>
  state.home.travelInfo.homeCurrencySymbol;
export const selectOrder = (state) => state.home.order;
export const selectFilter = (state) => state.home.filter;
export const selectFilterDate = (state) => state.home.filterDate;
export const selectCurrencyRates = (state) => state.home.currencyRates;
export const selectCurrencyNames = (state) => state.home.currencyNames;
export const selectHomeCurrency = (state) => state.home.homeCurrency;
export const selectSelectedTripId = (state) => state.home.selectedTripId;

export default homeSlice.reducer;