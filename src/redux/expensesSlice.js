import { createSlice } from "@reduxjs/toolkit";
import { handleData } from "../utils/expenseData";
import { getCurrencySymbol, getIndex } from "../utils/utils";
import { initialState } from "./InitialState";

export const expensesSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    setData: (state, action) => {
      const { text, data } = action.payload;
      state[text] = data; // Dynamically set the state property
      if (text === "travelInfo" && state.currencyCodes) {
        state.travelInfo.homeCurrencySymbol = getCurrencySymbol(
          state.currencyCodes,
          state.travelInfo.homeCurrency
        );
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
      const index = getIndex(state.expenses, state.PopUp.id);
      state.expenses.splice(index, 1);
      state.PopUp.showPopUp = !state.PopUp.showPopUp; // would've preferred to keep this in toggelShowPopUp, could not call two dispatces with one click
    },
    toggleShowPopUp: (state, { payload }) => {
      const { id, title } = payload;
      state.PopUp.showPopUp = !state.PopUp.showPopUp;
      state.PopUp.id = id;
      state.PopUp.title = title;
    },
    formEvent: (state, { payload }) => {
      state[payload.id] = payload.value;
    },
    addExpenseData: (state, { payload }) => {
      let result = handleData({ ...payload }, state.homeCurrency, {
        ...state.currencyRates,
      });
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
} = expensesSlice.actions;

export const selectExpenses = (state) => state.expenses.expenses;
export const selectTravelInfo = (state) => state.expenses.travelInfo;
export const selectPopUp = (state) => state.expenses.PopUp;
export const selectCurrencyCodes = (state) => state.expenses.currencyCodes;
export const selectHomeCurrencySymbol = (state) =>
  state.expenses.travelInfo.homeCurrencySymbol;
export const selectOrder = (state) => state.expenses.order;
export const selectFilter = (state) => state.expenses.filter;
export const selectFilterDate = (state) => state.expenses.filterDate;
export const selectCurrencyRates = (state) => state.expenses.currencyRates;
export const selectCurrencyNames = (state) => state.expenses.currencyNames;
export const selectHomeCurrency = (state) => state.expenses.homeCurrency;

export default expensesSlice.reducer;
