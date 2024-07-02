import { createSlice } from "@reduxjs/toolkit";
import { handleData } from "../utils/expenseData";
import { getCurrencySymbol, getIndex } from "../utils/utils";
import { initialState } from "./InitialState";

export const tripsSlice = createSlice({
  name: "trips",
  initialState,
  reducers: {
    setData: (state, action) => {
      const { text, data } = action.payload;
      state[text] = data; // Dynamically set the state property
      if (state.trips) {
        state.destinationId = state.trips.length;
      }
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
      const index = getIndex(state.expenses, state.popUp.id, expenseId);
      state.expenses.splice(index, 1);
      state.popUp.showPopUp = !state.popUp.showPopUp; // would've preferred to keep this in toggelShowPopUp, could not call two dispatces with one click
    },
    toggleShowPopUp: (state, { payload }) => {
      const { id, title } = payload;
      state.popUp.showPopUp = !state.popUp.showPopUp;
      state.popUp.id = id;
      state.popUp.title = title;
    },
    formEvent: (state, { payload }) => {
      console.log(payload.id, payload.value);
      state[payload.id] = payload.value;
    },
    addExpenseData: (state, { payload }) => {
      let result = handleData(
        { ...payload },
        state.homeCurrency,
        state.currencyRates
      );
      state.expenses.push(result);
    },
  },
});

export const {
  setData,
  deleteExpense,
  toggleShowPopUp,
  formEvent,
  addExpenseData,
} = tripsSlice.actions;

export const selectTrips = (state) => state.trips.trips;
// export const selectExpenses = (state) => state.trips.trips[0].expenses;
export const selectPopUp = (state) => state.trips.popUp;
export const selectCurrencyCodes = (state) => state.trips.currencyCodes;
export const selectHomeCurrencySymbol = (state) =>
  state.trips.travelInfo.homeCurrencySymbol;
export const selectOrder = (state) => state.trips.order;
export const selectFilter = (state) => state.trips.filter;
export const selectFilterDate = (state) => state.trips.filterDate;
export const selectCurrencyRates = (state) => state.trips.currencyRates;
export const selectCurrencyNames = (state) => state.trips.currencyNames;
export const selectHomeCurrency = (state) => state.trips.homeCurrency;
export const selectDestinationId = (state) => state.trips.destinationId;

export default tripsSlice.reducer;
