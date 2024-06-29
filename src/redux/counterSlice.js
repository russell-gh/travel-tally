import { createSlice } from "@reduxjs/toolkit";
const initialState = { homeCurrency: "GBP" };
export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setCurrencyApiData: (state, { payload }) => {
      const currencies = Object.keys(payload);
      const favs = ["EUR", "USD", "GBP"];
      favs.forEach((item) => {
        const found = currencies.findIndex((el) => el === item);
        currencies.splice(found, 1);
        currencies.unshift(item);
      });
      state.currencyApiData = payload;
      state.currencies = currencies;
    },
  },
});

export const { setCurrencyApiData } = counterSlice.actions;

export const selectCount = (state) => state.counter.value;
export const selectCurrencyAPIData = (state) => state.counter.currencyAPIData;
export const selectCurrencies = (state) => state.counter.currencies;
export const selectHomeCurrency = (state) => state.counter.homeCurrency;

export default counterSlice.reducer;
