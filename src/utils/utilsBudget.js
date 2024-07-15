import { unixToDate } from "./utilsDates";
import { getUnixfromDate } from "./utilsDates";
import dayjs from "dayjs";

export function calculateTotalSpend(expenses) {
  if (!expenses || expenses.length === 0) {
    return;
  }
  const _expenses = [...expenses];
  const priceArr = _expenses.map((item) => {
    return item.amount.toValue;
  });
  if (priceArr.length !== 0) {
    let totalSpend = priceArr.reduce((acc, value) => {
      return acc + value;
    });

    if (isNaN(totalSpend)) {
      console.log("Something went wrong with calculating total.");
      return "<p>Something went wrong with the calculations.</p>";
    }

    totalSpend = Number(totalSpend / 100).toFixed(2);

    return totalSpend;
  }
}

export function addDecimals(number) {
  return Number(number / 100).toFixed(2);
}

export function getCurrencySymbol(currencyCodes, currencyCode) {
  if (!currencyCodes || !currencyCode) {
    console.log("something went wrong with getting the currency symbol");
  }
  return currencyCodes[currencyCode].symbol;
}

export function getBudget(data, value) {
  let budget;

  switch (value) {
    case "Show All":
      budget = data.budgetTotal;
      break;
    case "Hotel":
    case "Food":
    case "Activities":
    case "Transport":
    case "Other":
      let string = "budget" + value;
      budget = data[string];
      break;
    default:
      console.log("something went wrong with getting the budget");
      break;
  }

  return addDecimals(budget);
}

export function getSpendSelectedDay(data, filterDate, budgetPerDay) {
  let date;
  console.log(data);

  // if there are no expenses yet
  if (data.length === 0) {
    date = {
      budgetPerDay: budgetPerDay,
      cumulativeDifference: 0,
      totalSpendPerDay: 0,
      difference: budgetPerDay,
    };
  }

  if (data.length !== 0) {
    //filterDate
    if (filterDate === "All Dates") {
      const now = unixToDate(new Date());
      const index = data.findIndex((item) => {
        return unixToDate(item.date) === now;
      });
      if (index !== -1) {
        date = data[index];
      } else {
        console.log("something went wrong with finding the right day budget");
        // const cumulativeDifference = getClosestCumulativeDifference(data, now);
        // date = {
        //   budgetPerDay: data[0].budgetPerDay,
        //   cumulativeDifference: cumulativeDifference,
        //   totalSpendPerDay: 0,
        //   difference: data[0].budgetPerDay,
        // };
      }
    } else {
      const index = data.findIndex((item) => {
        return unixToDate(item.date) === filterDate;
      });
      if (index !== -1) {
        date = data[index];
      } else {
        console.log("something went wrong with finding the right day budget");
        // const cumulativeDifference = getClosestCumulativeDifference(
        //   data,
        //   filterDate
        // );
        // date = {
        //   budgetPerDay: data[0].budgetPerDay,
        //   cumulativeDifference: cumulativeDifference,
        //   totalSpendPerDay: 0,
        //   difference: data[0].budgetPerDay,
        // };
      }
    }
  }

  return date;
}

export function getSpendPerDay(budgetPerDay, data) {
  //if there is only a date in the object it keeps that. If there are also expenses it deletes the date only object.
  let arr = data.map((array) => {
    if (!array[0].amount && array.length > 1) {
      return array.slice(1, array.length);
    } else if (!array[0].amount && array.length === 1) {
      return array;
    }
  });

  // Create array with totalspend, budgetperday, difference and differences from days before
  let cumulativeDifference = 0;
  let arrValues = [];
  let totalSpendPerDay;

  arr.forEach((values) => {
    if (values.length === 0) {
      return;
    }

    if (!values[0].amount) {
      totalSpendPerDay = 0;
    }

    if (values[0].amount) {
      totalSpendPerDay = values.reduce(
        (acc, value) => acc + value.amount.toValue,
        0
      );
    }
    const difference = budgetPerDay - totalSpendPerDay;
    const cumulativeDifferencePerDay = cumulativeDifference;
    cumulativeDifference += difference;
    const date = values[0].date; // Assuming all items in the same day have the same startDate

    arrValues.push({
      totalSpendPerDay,
      budgetPerDay,
      difference,
      cumulativeDifference: cumulativeDifferencePerDay,
      date: date,
    });
  });

  return arrValues;
}
