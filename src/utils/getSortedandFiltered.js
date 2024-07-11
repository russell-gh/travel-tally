import { unixToDate } from "./utilsDates";
import dayjs from "dayjs";

export const getSortedandFiltered = (
  data,
  order,
  filter,
  filterDate,
  hideFutureExpenses
) => {
  let filtered = [...data];

  // select
  switch (order) {
    case "Newest first":
      filtered.sort((a, b) => {
        if (a.date < b.date) {
          return 1;
        } else if (a.date > b.date) {
          return -1;
        }
        return 0;
      });
      break;
    case "Price: high to low":
      filtered.sort((a, b) => {
        if (a.amount.toValue < b.amount.toValue) {
          return 1;
        } else if (a.amount.toValue > b.amount.toValue) {
          return -1;
        }
        return 0;
      });
      break;
    case "Price: low to high":
      filtered.sort((a, b) => {
        if (a.amount.toValue > b.amount.toValue) {
          return 1;
        } else if (a.amount.toValue < b.amount.toValue) {
          return -1;
        }
        return 0;
      });
      break;
    default:
      console.log("something went wrong with the sorting");
      break;
  }

  filtered = filterCategories(filtered, filter);

  //filterDate
  if (filterDate === "All Dates") {
    ("everything stays the same");
  } else {
    filtered = filtered.filter((item) => {
      return unixToDate(item.date) === filterDate;
    });
    if (filtered.length === 0) {
      console.log("Something went wrong with filtering the date");
    }
  }

  //toggle show future expenses
  if (hideFutureExpenses === true) {
    filtered = filtered.filter((item) => {
      return dayjs(item.date).isBefore(dayjs());
    });
  }

  return filtered;
};

export const filterCategories = (data, filter) => {
  //filter
  switch (filter) {
    case "Show All":
      break;
    case "Activities":
    case "Food":
    case "Transport":
    case "Hotel":
    case "Other":
      data = data.filter((item) => {
        return item.category === filter;
      });
      break;
    default:
      console.log("something went wrong with the filtering");
      break;
  }
  return data;
};
