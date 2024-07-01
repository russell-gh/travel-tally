import { createSlice } from "@reduxjs/toolkit";

const initialState = { trip: [] };

export const onboardingSlice = createSlice({
  name: "onboarding",
  initialState,
  reducers: {
    addTrip: (state, { payload }) => {
      state.trip = [...state.trip, payload];
    },
    addUser: (state, { payload }) => {
      state.trip = [...state.trip, payload];
    },
  },
});

export const { addTrip } = onboardingSlice.actions;
export const selectTrip = (state) => state.onboarding.trip; //or state.trip?
export default onboardingSlice.reducer;
