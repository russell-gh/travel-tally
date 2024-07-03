import { configureStore } from "@reduxjs/toolkit";
import onboardingReducer from "./onboardingSlice";
import homeReducer from "./homeSlice";

export const store = configureStore({
  reducer: {
    home: homeReducer,
    onboarding: onboardingReducer,
  },
});
