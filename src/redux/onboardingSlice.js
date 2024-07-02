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
      state.user = payload;
    },
  },
});

export const { addTrip, addUser } = onboardingSlice.actions;
export const selectTrip = (state) => state.onboarding.trip; //or state.trip?
export const selectUser = (state) => state.onboarding.user;

export default onboardingSlice.reducer;
