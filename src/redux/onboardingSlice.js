import { createSlice } from "@reduxjs/toolkit";

const initialState = {trips:[]};

export const onboardingSlice = createSlice({
  name: "onboarding",
  initialState,
  reducers: {
    addTrip: (state, {payload}) => {
        state.trips.push(payload)

    },
  },
});

export const { addTrip } = onboardingSlice.actions;
export const selectTrips = (state) => state.onboarding.trips; 
export default onboardingSlice.reducer;
