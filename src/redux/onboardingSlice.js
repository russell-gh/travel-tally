import { createSlice } from "@reduxjs/toolkit";
import { saveStore, getStore } from "../localStorage";

const dataFromDisc = getStore("onboardingSlice");
const initialState = { trips: [], user: [], pass: [], profile: {} };

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
    saveProfile: (state, { payload }) => {
      if (!payload) {
        state.profile = {};
      } else {
        const { value, key } = payload;
        state.profile[key] = value;
      }
      saveStore("onboardingSlice", state);
    },
  },
});

export const selectTrip = (state) => state.onboarding.trips; //or state.trip?
export const selectUser = (state) => state.onboarding.user;
export const selectProfilePictureSrc = (state) =>
  state.onboarding.profile.profilePictureSrc;
export const selectUserName = (state) => state.onboarding.profile.userName;
export const { addTrip, addUser, saveProfile } = onboardingSlice.actions;

export default onboardingSlice.reducer;
