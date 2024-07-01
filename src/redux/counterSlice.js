import { createSlice } from "@reduxjs/toolkit";
import { handleData } from "../utils/expenseData";
const initialState = { homeCurrency: "GBP", expenses: [], currencies: [] };
export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setCurrencyApiData: (state, { payload }) => {
      state.currencyApiData = payload;

      const currencies = Object.keys(payload);
      const favs = ["EUR", "USD", "GBP"];
      favs.forEach((item) => {
        const found = currencies.findIndex((el) => el === item);
        currencies.splice(found, 1);
        currencies.unshift(item);
      });
      state.currencies = currencies;
    },
    addExpenseData: (state, { payload }) => {
      let result = handleData(
        { ...payload },
        state.homeCurrency,
        state.currencyApiData
      );
      state.expenses.push(result);
    },
  },
});

export const { setCurrencyApiData, addExpenseData } = counterSlice.actions;

export const selectCount = (state) => state.counter.value;
export const selectCurrencyAPIData = (state) => state.counter.currencyApiData;
export const selectCurrencies = (state) => state.counter.currencies;
export const selectHomeCurrency = (state) => state.counter.homeCurrency;

export default counterSlice.reducer;
