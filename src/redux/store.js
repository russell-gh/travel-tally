import { configureStore } from "@reduxjs/toolkit";
import onboardingReducer from "./onboardingSlice";
import tripsReducer from "./tripsSlice";

export const store = configureStore({
  reducer: {
    trips: tripsReducer,
    onboarding: onboardingReducer,
  },
});
