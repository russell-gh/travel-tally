import { unixToDate } from "./utilsDates";
import { getUnixfromDate } from "./utilsDates";
import dayjs from "dayjs";

export function calculateTotalSpend(expenses, splits) {
  if (!expenses || expenses.length === 0) {
    return;
  }
  if (!splits) {
    return;
  }

  //calculates only your part of an expense if it is a splitbill
  const _expenses = [...expenses];
  const priceArr = _expenses.map((item) => {
    let toValue = item.amount.toValue;
    if (item.split === true) {
      const arrayOfSplits = splits.filter((split) => {
        return split.expenseId === item.id;
      });

      arrayOfSplits.forEach((split) => {
        toValue -= split.amount.toValue;
      });
    }

    return toValue;
  });

  if (priceArr.length !== 0) {
    let totalSpend = priceArr.reduce((acc, value) => {
      return acc + value;
    });

    if (isNaN(totalSpend)) {
      // console.log("Something went wrong with calculating total.");
      return "";
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
    // console.log("something went wrong with getting the currency symbol");
    return "";
  }

  if (currencyCodes[currencyCode].hexCode) {
    const currencySymbol = parseInt(currencyCodes[currencyCode].hexCode, 16);
    return String.fromCharCode(currencySymbol);
  }

  return currencyCodes[currencyCode].symbol_native;
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
      // console.log("something went wrong with getting the budget");
      break;
  }

  return addDecimals(budget);
}

export function getSpendSelectedDay(data, filterDate, budgetPerDay) {
  let date;

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
      const now = unixToDate(Date.now());
      const index = data.findIndex((item) => {
        return unixToDate(item.date) === now;
      });
      if (index !== -1) {
        date = data[index];
      } else {
        // console.log("something went wrong with finding the right day budget");
      }
    } else {
      const index = data.findIndex((item) => {
        return unixToDate(item.date) === filterDate;
      });
      if (index !== -1) {
        date = data[index];
      } else {
        // console.log("something went wrong with finding the right day budget");
      }
    }
  }

  return date;
}

export function getSpendPerDay(budgetPerDay, data, splits) {
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

    // if there are no expenses for that day
    if (!values[0].amount) {
      totalSpendPerDay = 0;
    }

    // adds all the expensese for the day together. Takes away the billsplits amounts to just show your part
    if (values[0].amount) {
      for (const expense of values) {
        let toValue = expense.amount.toValue;
        if (expense.split === true) {
          const arrayOfSplits = splits.filter((split) => {
            return split.expenseId === expense.id;
          });
          arrayOfSplits.forEach((split) => {
            toValue -= split.amount.toValue;
          });
          expense.amount.toValue = toValue;
        }
      }
      totalSpendPerDay = values.reduce((acc, value) => {
        return acc + value.amount.toValue;
      }, 0); // Initial value of 0 for the accumulator
    }

    //set the rest of the values
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

export function nFormatter(num) {
  const lookup = [
    { value: 1, symbol: "", digits: 2 },
    { value: 1e3, symbol: "k", digits: 1 },
    { value: 1e6, symbol: "M", digits: 1 },
    { value: 1e9, symbol: "B", digits: 1 },
    { value: 1e12, symbol: "T", digits: 1 },
    { value: 1e15, symbol: "Q", digits: 1 },
  ];

  if (num < 1 && num > 0) {
    // Convert the number to a string
    const numStr = num.toString();
    // Regular expression to check if the number has exactly two digits after the decimal
    const twoDecimalPattern = /^\d*\.?\d{0,2}$/;
    if (twoDecimalPattern.test(numStr)) {
      return numStr;
    }
    return num.toFixed(2);
  }

  // const regexp = /\.0+$|(?<=\.[0-9]*[1-9])0+$/;
  const item = lookup.findLast((item) => num >= item.value);
  return item
    ? (num / item.value).toFixed(item.digits).concat(item.symbol)
    : "0";
}
