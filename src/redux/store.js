import { configureStore } from "@reduxjs/toolkit";
import expensesReducer from "./expensesSlice";
import onboardingReducer from "./onboardingSlice";

export const store = configureStore({
  reducer: {
    expenses: expensesReducer,
    onboarding: onboardingReducer,
  },
});
