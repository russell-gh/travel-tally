import { configureStore } from "@reduxjs/toolkit";
import expensesReducer from "./expensesSlice";
import onboardingReducer from "./onboardingSlice";
import counterReducer from "./counterSlice";

export const store = configureStore({
  reducer: {
    expenses: expensesReducer,
    onboarding: onboardingReducer,
    counter: counterReducer,
  },
});
