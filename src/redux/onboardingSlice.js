import { createSlice } from "@reduxjs/toolkit";
import { saveStore, getStore } from "../localStorage";

const dataFromDisc = getStore("onboardingSlice");
const initialState = { trips: [], user: [], pass: [], profile: {} };

export const onboardingSlice = createSlice({
  name: "onboarding",
  initialState: dataFromDisc ? dataFromDisc : initialState,
  reducers: {
    addUser: (state, { payload }) => {
      state.user = payload;
      saveStore("onboardingSlice", state);
    },
    saveProfile: (state, { payload }) => {
      if (!payload) {
        state.profile = {};
      } else if (payload.value) {
        const { value, key } = payload;
        state.profile[key] = value;
      } else {
        state.profile = payload;
      }
      saveStore("onboardingSlice", state);
    },
  },
});

export const selectProfile = (state) => state.onboarding.profile;
export const selectUser = (state) => state.onboarding.user;
export const selectProfilePictureSrc = (state) =>
  state.onboarding.profile.profilePictureSrc;
export const selectUserName = (state) => state.onboarding.profile.userName;
export const { addUser, saveProfile } = onboardingSlice.actions;

export default onboardingSlice.reducer;
