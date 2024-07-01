import onboardingReducer from "./onboardingSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    onboarding: onboardingReducer,
  },
});
