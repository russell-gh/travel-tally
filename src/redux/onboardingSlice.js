import { createSlice } from "@reduxjs/toolkit";

const initialState = { trip: [], user: [], pass: [] };

export const onboardingSlice = createSlice({
  name: "onboarding",
  initialState,
  reducers: {
    addTrip: (state, { payload }) => {
      state.trip = [...state.trip, payload];
    },
    addUser: (state, { payload }) => {
      state.user = payload; //TODO check if need to spread
    },
    addPass: (state, { payload }) => {
      state.pass = payload; //TODO check if need to spread
    },
  },
});

export const { addTrip, addUser, addPass } = onboardingSlice.actions;
export const selectTrip = (state) => state.onboarding.trip; //or state.trip?
export default onboardingSlice.reducer;
