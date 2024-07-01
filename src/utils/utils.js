export function calculateTotalSpend(expenses) {
  const _expenses = [...expenses];
  const priceArr = _expenses.map((item) => {
    return item.amount.homeCurrency;
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
    return item.expenseId === id;
  });
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
    return item.date;
  });

  // removes duplicates
  copy = [...new Set(copy)];

  //add All Dates as first element
  copy.unshift("All Dates");

  return copy;
}
