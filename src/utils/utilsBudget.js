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
  console.log();

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
    console.log("run");
    console.log(data);
    //filterDate
    if (filterDate === "All Dates") {
      const now = unixToDate(new Date());
      const index = data.findIndex((item) => {
        console.log(unixToDate(item.date), now);
        return unixToDate(item.date) === now;
      });
      console.log(index);
      if (index !== -1) {
        date = data[index];
      } else {
        const cumulativeDifference = getClosestCumulativeDifference(data, now);
        date = {
          budgetPerDay: data[0].budgetPerDay,
          cumulativeDifference: cumulativeDifference,
          totalSpendPerDay: 0,
          difference: data[0].budgetPerDay,
        };
      }
    } else {
      const index = data.findIndex((item) => {
        return unixToDate(item.date) === filterDate;
      });
      if (index !== -1) {
        date = data[index];
      } else {
        const cumulativeDifference = getClosestCumulativeDifference(
          data,
          filterDate
        );
        date = {
          budgetPerDay: data[0].budgetPerDay,
          cumulativeDifference: cumulativeDifference,
          totalSpendPerDay: 0,
          difference: data[0].budgetPerDay,
        };
      }
    }
  }

  return date;
}

export function getClosestCumulativeDifference(data, filterDate) {
  const unixFilterDate = getUnixfromDate(filterDate);
  const filterDateDayJs = dayjs(unixFilterDate);

  let index;
  for (let i = 1; i < 50; i++) {
    let previousDate = filterDateDayJs.subtract(i, "day");
    index = data.findIndex((item) => {
      return unixToDate(item.date) === unixToDate(previousDate);
    });
    if (index !== -1) {
      break;
    }
  }
  if (index === -1) {
    return 0;
  }
  console.log(data, index);
  return data[index].cumulativeDifference;
}

export function getSpendPerDay(budgetPerDay, data) {
  //take out empty days (a.k.a. empty arrays)
  let filteredData = data.filter((subArray) => subArray.length > 0);

  let arr = filteredData.map((Arr) =>
    Arr.map((item) => ({
      amount: item.amount.toValue,
      date: item.date,
    }))
  );

  // Create array with totalspend, budgetperday, difference and differences from days before
  let cumulativeDifference = 0;
  let arrValues = [];

  arr.forEach((values) => {
    if (values.length === 0) {
      return;
    }
    const totalSpendPerDay = values.reduce(
      (acc, value) => acc + value.amount,
      0
    );
    const difference = budgetPerDay - totalSpendPerDay;
    const cumulativeDifferenceForDay = cumulativeDifference;
    cumulativeDifference += difference;
    const date = values[0].date; // Assuming all items in the same day have the same startDate

    arrValues.push({
      totalSpendPerDay,
      budgetPerDay,
      difference,
      cumulativeDifference: cumulativeDifferenceForDay,
      date: date,
    });
  });

  return arrValues;
}
