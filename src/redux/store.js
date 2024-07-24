import { combineReducers, configureStore } from "@reduxjs/toolkit";
import onboardingReducer from "./onboardingSlice";
import homeReducer from "./homeSlice";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";

const reducers = combineReducers({
  home: homeReducer,
  onboarding: onboardingReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(
  persistConfig, reducers
);

export const store = configureStore(persistedReducer);
export const persistor = persistStore(store);
