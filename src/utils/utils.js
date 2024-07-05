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

export function getIndex(data, id) {
  const indexOf = data.findIndex((item) => {
    return item.id === id;
  });

  if (indexOf === -1) {
    console.log("something went wrong getting the index");
    return;
  }

  return indexOf;
}

export function getCurrencySymbol(currencyCodes, currencyCode) {
  if (!currencyCodes || !currencyCode) {
    console.log("something went wrong with getting the currency symbol");
  }
  return currencyCodes[currencyCode].symbol;
}

export function getArrayOfDates(data) {
  let copy = [...data];
  //makes an array of the dates
  copy = copy.map((item) => {
    return item.startDate;
  });

  // removes duplicates
  copy = [...new Set(copy)];
  // get dates in right order
  copy.sort((a, b) => {
    if (a < b) {
      return 1;
    } else if (a > b) {
      return -1;
    }
    return 0;
  });

  // turns unixCode to timestamp
  copy = copy.map((item) => {
    return unixToDate(item);
  });

  //add All Dates as first element
  copy.unshift("All Dates");

  return copy;
}

export function findItem(data, id) {
  const item = data.find((item) => {
    return item.id === id;
  });

  if (!item) {
    console.log("something went wrong getting the item");
    return;
  }

  return item;
}

export function unixToDate(unix) {
  if (!unix) {
    console.log("unix is undefined");
    return;
  }
  const date = new Date(unix); //converts unix back to object
  const options = { year: "numeric", month: "numeric", day: "numeric" };
  const formattedDate = new Intl.DateTimeFormat("en-GB", options).format(date);
  return formattedDate;
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

// export function getSpendToday(startDate, data) {
//   const now = dayjs();
//   const index = now.diff(startDate, "day");
//   let spendToday = data[index].map((item) => {
//     return item.amount.toValue;
//   });
//   if (spendToday.length === 0) {
//     spendToday = 0;
//   } else if (spendToday.length !== 0) {
//     spendToday = spendToday.reduce((acc, value) => {
//       return acc + value;
//     });

//     if (isNaN(spendToday)) {
//       console.log("Something went wrong with calculating total.");
//       return "Something went wrong with the calculations";
//     }

//     spendToday = Number(spendToday / 100).toFixed(2);
//     return spendToday;
//   }
// }

export function getSpendPerDay(budgetPerDay, data, filter) {
  // Create an array with the expense amounts and unix
  if (!filter) {
    return console.log("there is no filter");
  }
  // console.log(data);
  // console.log(filter);

  // let arr = data.map((arr) => {
  //   arr.filter((item) => {
  //     switch (filter) {
  //       case "Show All":
  //         console.log(item.category);
  //         return true;
  //       case "Activities":
  //       case "Food":
  //       case "Transport":
  //       case "Hotel":
  //       case "Other":
  //         console.log(item.category);
  //         return item.category === filter;
  //       default:
  //         console.log(item);
  //         console.log("Something went wrong with the filtering");
  //         return false;
  //     }
  //   });
  // });

  // console.log(arr);

  // arr = arr.map((item) => ({
  //   amount: item.amount.toValue,
  //   startDate: item.startDate,
  // }));

  let arr = data.map((Arr) =>
    Arr.map((item) => ({
      amount: item.amount.toValue,
      startDate: item.startDate,
    }))
  );

  console.log(arr);

  //sort the dates
  arr.sort((a, b) => {
    if (a[0].startDate > b[0].startDate) {
      return 1;
    } else if (a[0].startDate < b[0].startDate) {
      return -1;
    }
    return 0;
  });

  console.log(arr);

  // Create array with totalspend, budgetperday, difference and differences from days before
  let cumulativeDifference = 0;
  let arrValues = {};

  let actualArrValues = [];

  arr.forEach((values) => {
    const totalSpendPerDay = values.reduce(
      (acc, value) => acc + value.amount,
      0
    );
    const difference = budgetPerDay - totalSpendPerDay;
    const cumulativeDifferenceForDay = cumulativeDifference;
    cumulativeDifference += difference;
    const startDate = values[0].startDate; // Assuming all items in the same day have the same startDate

    arrValues[startDate] = {
      totalSpendPerDay,
      budgetPerDay,
      difference,
      cumulativeDifference: cumulativeDifferenceForDay,
    };
    actualArrValues.push({
      totalSpendPerDay,
      budgetPerDay,
      difference,
      cumulativeDifference: cumulativeDifferenceForDay,
      startDate: startDate,
    });
  });

  console.log(actualArrValues, arrValues);
  return arrValues;
}

export function getSpendSelectedDay(data, filter, filterDate) {
  //filterDate
  if (filterDate === "All Dates") {
    const now = unixToDate(dayjs());
    return data[now];
  } else {
    return data[filterDate];
  }
}
