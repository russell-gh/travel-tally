import { createSlice } from "@reduxjs/toolkit";

const initialState = { trips: [], user: [], pass: [], profile: {} };

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
    saveProfile: (state, { payload }) => {
      const { value, key } = payload;
      console.log(value, key);
      state.profile[key] = value;
      console.log(state.profile.userName);
    },
  },
});

export const selectTrip = (state) => state.onboarding.trip; //or state.trip?
export const selectUser = (state) => state.onboarding.user;
export const selectProfilePictureSrc = (state) =>
  state.onboarding.profile.profilePictureSrc;
export const selectUserName = (state) => state.onboarding.profile.userName;
export const { addTrip, addUser, saveProfile } = onboardingSlice.actions;

export default onboardingSlice.reducer;
