import { createSlice } from "@reduxjs/toolkit";

const initialState = { trips: [], user: [], pass: [] };

export const onboardingSlice = createSlice({
  name: "onboarding",
  initialState,
  reducers: {
    addTrip: (state, { payload }) => {
      console.log(payload);
      state.trips.push(payload);
    },
    addUser: (state, { payload }) => {
      state.user = payload;
    },
  },
});

export const testSelector = (state) => state.onboarding.trips; //renamed to avoid conflicts
export const selectUser = (state) => state.onboarding.user;
export const { addTrip, addUser, addPass } = onboardingSlice.actions;

export default onboardingSlice.reducer;
