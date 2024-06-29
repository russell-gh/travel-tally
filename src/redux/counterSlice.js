import { createSlice } from "@reduxjs/toolkit";
const initialState = {};
export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setCurrencyApiData: (state, { payload }) => {
      state.currencyApiData = payload;
    },
  },
});

export const { setCurrencyApiData } = counterSlice.actions;

export const selectCount = (state) => state.counter.value;
export const selectCurrencyAPIData = (state) => state.currencyAPIData;

export default counterSlice.reducer;
