import { createSlice } from "@reduxjs/toolkit";
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
  },
});

export const { setData, deleteExpense, toggleShowPopUp, formEvent } =
  expensesSlice.actions;

export const selectExpenses = (state) => state.expenses.expenses;
export const selectTravelInfo = (state) => state.expenses.travelInfo;
export const selectPopUp = (state) => state.expenses.PopUp;
export const selectCurrencyCodes = (state) => state.expenses.currencyCodes;
export const selectHomeCurrencySymbol = (state) =>
  state.expenses.travelInfo.homeCurrencySymbol;
export const selectOrder = (state) => state.expenses.order;
export const selectFilter = (state) => state.expenses.filter;
export const selectFilterDate = (state) => state.expenses.filterDate;

export default expensesSlice.reducer;
