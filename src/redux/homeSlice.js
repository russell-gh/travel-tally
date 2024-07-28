import { createSlice } from "@reduxjs/toolkit";
import { handleData } from "../utils/expenseData";
import { getIndex } from "../utils/utils";
import { getCurrencySymbol } from "../utils/utilsBudget";
import { initialState } from "./InitialState";
import { getStore, saveStore } from "../localStorage";
import {
  addExpenseRemotely,
  addSplitRemotely,
  deleteByID,
} from "../utils/sync";

const dataFromDisc = getStore("homeSlice");
export const homeSlice = createSlice({
  name: "home",
  initialState: dataFromDisc ? dataFromDisc : initialState,
  reducers: {
    addTrip: (state, action) => {
      state.trips.push(action.payload.data);
      state.selectedTripId = state.trips[state.trips.length - 1].id;
      saveStore("homeSlice", state);
    },

    setData: (state, action) => {
      const { text, data } = action.payload;
      state[text] = data;

      if (state.trips.length) {
        state.selectedTripId = state.trips[state.trips.length - 1].id;
      }

      //set homecurrencySymbol inside each trip
      if (state.trips.length && state.currencyCodes) {
        state.trips.map((item, index) => {
          item.details.homeCurrencySymbol = getCurrencySymbol(
            { ...state.currencyCodes },
            state.trips[index].details.homeCurrency
          );
        });
      }

      if (text === "currencies") {
        const currencies = Object.keys(data);
        const favs = ["EUR", "USD", "GBP"];
        favs.forEach((item) => {
          const found = currencies.findIndex((el) => el === item);
          currencies.splice(found, 1);
          currencies.unshift(item);
        });
        state.currencyRates = data;
        state.currencyNames = currencies;
      }
      saveStore("homeSlice", state);
    },
    deleteExpense: (state, { payload }) => {
      //get index of the current trip
      const indexTrip = getIndex(state.trips, state.selectedTripId, "id");
      const expenses = state.trips[indexTrip].expenses;
      const splits = state.trips[indexTrip].splits;
      console.log(state.popUp.sharedId, "POP UP IN SLICE");
      if (!payload) {
        //get index of clicked expense
        const index = getIndex(expenses, state.popUp.id, "id");
        // delete expense
        expenses.splice(index, 1);

        //if there are splits linked to the expense delete these as well
        if (state.popUp.split) {
          let indexesSplits = [];
          for (let i = 0; i < splits.length; i++) {
            if (splits[i].expenseId === state.popUp.id) {
              indexesSplits.unshift(i);
            }
          }
          console.log(indexesSplits);
          for (const index of indexesSplits) {
            splits.splice(index, 1);
          }
        }

        //delete the expense/split from backend
        const id = state.popUp.id;
        deleteByID({ id, type: "single" });
        deleteByID({ id, type: "split" });
      }

      //get indexes of all items with sharedId
      if (payload === "all") {
        let indexes = [];
        for (let i = 0; i < expenses.length; i++) {
          if (expenses[i].sharedId === state.popUp.sharedId) {
            indexes.push(i);
          }
        }

        //delete the expenses
        expenses.splice(indexes[0], indexes.length);
        //delete the expense/split from backend
        const id = state.popUp.sharedId;
        console.log(id, "POP UP IN SLICE");
        deleteByID({ id, type: "shared" });
        deleteByID({ id, type: "split" });
      }

      //set popUp to empty so popUp disappears
      state.popUp = {};
      saveStore("homeSlice", state);
    },
    togglePopUp: (state, { payload }) => {
      // Clear splitData to prevent duplicate data (it's eventually stored elsewhere)
      state.splitData = [{ amount: 0, name: "", paid: false }];
      state.splitMax = 0;
      if (!payload) {
        state.popUp = {};
        saveStore("homeSlice", state);
        return;
      }

      const { config, component } = payload;
      const { id, title, sharedId, split } = config;
      state.popUp.showPopUp = !state.popUp.showPopUp;
      state.popUp.id = id;
      state.popUp.sharedId = sharedId;
      state.popUp.title = title;
      state.popUp.component = component;
      state.popUp.split = split;
      saveStore("homeSlice", state);
    },
    formEvent: (state, { payload }) => {
      state[payload.id] = payload.value;

      saveStore("homeSlice", state);

      // resets the filters when switching between trips
      if (payload.id === "selectedTripId") {
        state.filter = "Show All";
        state.order = "Newest first";
        state.filterDate = "All Dates";
      }
      saveStore("homeSlice", state);
    },
    addExpenseData: (state, { payload }) => {
      const tripID = state.selectedTripId;
      // Close expense popup
      state.popUp = {};
      // Find index of trip from id
      const indexOf = state.trips.findIndex((trip) => {
        return trip.id === state.selectedTripId;
      });
      // Create variable for the correct trip
      const thisTrip = state.trips[indexOf];
      // Send data to be converted into the preferred format (uses function in expenseData.js)
      let result = handleData({ ...payload }, thisTrip.details.homeCurrency, {
        ...state.currencyRates,
      });
      let expense = result.expense || result.allExpenses;
      let billSplit = result.billSplit;
      // Push data into expenses array
      if (Array.isArray(expense)) {
        expense.forEach((element) => {
          state.trips[indexOf].expenses.push(element);
          addExpenseRemotely({ element, tripID });
        });
      } else {
        state.trips[indexOf].expenses.push(expense);
        addExpenseRemotely({ expense, tripID });
      }
      // Push data to split array
      console.log("IN SLICE", billSplit);
      if (billSplit) {
        console.log(">>>>>>", billSplit, tripID);
        // billSplit is always an array. So this if else statemement is unnecesary.
        if (Array.isArray(billSplit)) {
          billSplit.forEach((element) => {
            state.trips[indexOf].splits.push(element);
            addSplitRemotely({ element, tripID });
          });
        } else {
          state.trips[indexOf].splits.push(billSplit);
          addSplitRemotely({ billSplit, tripID });
        }
        // Clear splitData to prevent duplicate data (it's eventually stored elsewhere)
        state.splitData = [];
      }
      // addExpenseRemotely({expense, tripID});
      saveStore("homeSlice", state);
    },

    toggleDisplay: (state, { payload }) => {
      state[payload.key] = payload.value;
      saveStore("homeSlice", state);
    },

    deleteToEdit: (state, { payload }) => {
      state.splitData = [];
      // const { expenseIndex } = payload;
      const expenseIndex = payload.index;
      const splitIndex = payload.splitIndex;
      //get index of the current trip
      const indexTrip = getIndex(state.trips, state.selectedTripId, "id");
      // If its an array then delete multiple from the first index
      // Expense index first
      if (Array.isArray(expenseIndex)) {
        state.trips[indexTrip].expenses.splice(
          expenseIndex[0],
          expenseIndex.length
        );
      } else {
        // Otherwise, delete single expense
        state.trips[indexTrip].expenses.splice(expenseIndex, 1);
      }
      // Split index next
      if (Array.isArray(splitIndex)) {
        state.trips[indexTrip].splits.splice(splitIndex[0], splitIndex.length);
      } else {
        // Otherwise, delete single expense
        state.trips[indexTrip].splits.splice(splitIndex, 1);
      }
      saveStore("homeSlice", state);
    },

    setSplitMax: (state, { payload }) => {
      state.splitMax = Number(payload.value); // Sets the expense value in the store so it is in the global scope
    },

    setPaid: (state, { payload }) => {
      const indexTrip = getIndex(state.trips, state.selectedTripId, "id");

      if (payload.sharedId) {
        const splits = state.trips[indexTrip].splits;
        let indexesSplits = [];
        for (let i = 0; i < splits.length; i++) {
          if (
            splits[i].sharedId === payload.sharedId &&
            splits[i].name === payload.name
          ) {
            indexesSplits.push(i);
          }
        }

        for (const index of indexesSplits) {
          state.trips[indexTrip].splits[index].paid = true;
        }
      }

      const index = getIndex(payload.data, payload.id, "id");
      state.trips[indexTrip].splits[index].paid = true;

      //this needs to be send to database as change
    },
    setSplitData: (state, { payload }) => {
      if (payload.tag === -1) {
        state.splitData.splice(state.splitData.length - 1, 1);
        return;
      }
      if (payload.tag === -2) {
        state.splitData.push({ amount: 0, name: "", paid: false });
      }
      if (state.splitData.length === 0) {
        state.splitData.push(payload.data);
      } else {
        state.splitData[payload.tag] = payload.data;
      }
      const total = state.splitData.reduce((a, b) => a + b.amount, 0);
      const maxRemaining = state.splitMax - (total - payload.data.amount);

      if (total > state.splitMax) {
        //over budget
        state.splitData[payload.tag] = {
          ...payload.data,
          amount: maxRemaining,
        };
      } else {
        state.splitData[payload.tag] = payload.data;
      }

      saveStore("homeSlice", state);
    },
  },
});

export const {
  setData,
  deleteExpense,
  togglePopUp,
  formEvent,
  addExpenseData,
  toggleDisplay,
  deleteToEdit,
  addSplitData,
  setSplitData,
  addTrip,
  setSplitMax,
  calculateSplitMax,
  setPaid,
} = homeSlice.actions;

export const selectTrips = (state) => state.home.trips;
// export const selectExpenses = (state) => state.home.trips[0].expenses;
export const selectPopUp = (state) => state.home.popUp;
export const selectCurrencyCodes = (state) => state.home.currencyCodes;
export const selectHomeCurrencySymbol = (state) =>
  state.home.travelInfo.homeCurrencySymbol;
export const selectOrder = (state) => state.home.order;
export const selectFilter = (state) => state.home.filter;
export const selectFilterDate = (state) => state.home.filterDate;
export const selectCurrencyRates = (state) => state.home.currencyRates;
export const selectCurrencyNames = (state) => state.home.currencyNames;
export const selectHomeCurrency = (state) => state.home.homeCurrency;
export const selectSelectedTripId = (state) => state.home.selectedTripId;
export const selectHideFutureExpenses = (state) =>
  state.home.hideFutureExpenses;
export const selectHidePaidSplitBills = (state) =>
  state.home.hidePaidSplitBills;
export const selectShowBillSplits = (state) => state.home.showBillSplits;
export const selectSplitData = (state) => state.home.splitData;
export const selectCountries = (state) => state.home.countries;
export const selectSplitMax = (state) => state.home.splitMax;
export const selectSplitValues = (state) => state.home.splitValues;
export const selectToken = (state) => state.home.token;

export default homeSlice.reducer;
