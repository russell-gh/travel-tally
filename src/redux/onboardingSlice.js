import { createSlice } from "@reduxjs/toolkit";

const initialState = { trips: [], user: [], pass: [] };


export const onboardingSlice = createSlice({
  name: "onboarding",
  initialState,
  reducers: {

    addTrip: (state, { payload }) => {
      console.log(payload)
      state.trips.push(payload);
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
export const selectTrips = (state) => state.onboarding.trips; 

export default onboardingSlice.reducer;
