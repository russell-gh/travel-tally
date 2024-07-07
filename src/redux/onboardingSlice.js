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
    saveProfilePicture: (state, { payload }) => {
      state.profile.profilePictureSrc = payload;
    },
  },
});

export const selectTrip = (state) => state.onboarding.trip; //or state.trip?
export const selectUser = (state) => state.onboarding.user;
export const { addTrip, addUser, saveProfilePicture } = onboardingSlice.actions;

export default onboardingSlice.reducer;
