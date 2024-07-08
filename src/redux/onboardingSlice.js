import { createSlice } from "@reduxjs/toolkit";
import { saveStore, getStore } from "../localStorage";

const initialState = { trips: [], user: [], pass: [] };
const dataFromDisc = getStore("onboardingSlice");

export const onboardingSlice = createSlice({
  name: "onboarding",
  initialState: dataFromDisc ? dataFromDisc : initialState,
  reducers: {
    addTrip: (state, { payload }) => {
      console.log(payload);
      state.trips.push(payload);
      saveStore("onboardingSlice", state);
    },
    addUser: (state, { payload }) => {
      state.user = payload;
      saveStore("onboardingSlice", state);
    },
  },
});

export const selectTrip = (state) => state.onboarding.trips; //or state.trip?
export const selectUser = (state) => state.onboarding.user;
export const { addTrip, addUser } = onboardingSlice.actions;

export default onboardingSlice.reducer;
