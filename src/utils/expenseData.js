import { stringToTimestamp, generateId } from "../components/Onboarding/utils";

export function handleData(expense, home, data) {
  let { startDate, endDate, description, category, amount, currency, split } =
    expense;
  let start = stringToTimestamp(expense.startDate);
  let end = stringToTimestamp(expense.endDate);

  console.log(expense, "inside handle");

  // Creates object that replaces amount in original expense obj
  let newAmount = {
    fromValue: 0,
    toValue: 0,
    fromCurrency: "",
    toCurrency: { home },
  };

  // Fills data for amount from input
  newAmount.fromCurrency = currency;
  newAmount.toCurrency = home;
  newAmount.fromValue = Number(amount * 100);
  newAmount.toValue = newAmount.fromValue;

  // Converts currency if neccesary
  if (currency != home) {
    newAmount.toValue = convertCurrency(newAmount.fromValue, currency, data);
  }

  // Tidies object up, adds unique id and unix time
  expense.amount = newAmount;
  delete expense.currency;
  expense.startDate = start;
  expense.endDate = end;
  if (expense.multiDay === true) {
    let allExpenses = splitExpenseDays(expense);
    return allExpenses;
  }
  delete expense.multiDay;
  expense.id = generateId("expense");
  console.log(expense, "beyond func");

  return expense;
}

export function convertCurrency(fromValue, fromCurrency, data) {
  const origin = fromValue;
  const rate = data[fromCurrency];
  const result = origin / rate;
  return result;
}

export function getExpenseList(tripID, trips) {
  const indexOf = trips.findIndex((trip) => {
    return trip.id === tripID;
  });
  console.log(indexOf);
  // Create variable for the correct trip
  const thisTrip = trips[indexOf];
  return thisTrip.expenses;
}

export function splitExpenseDays(expense) {
  let { startDate, endDate, description, category, amount, currency, split } =
    expense;
  let { fromValue, toValue } = amount;
  let allExpenses = [];
  delete expense.multiDay;
  const days = (endDate - startDate) / 1000 / 60 / 60 / 24;
  const newFrom = fromValue / days;
  const newTo = toValue / days;
  expense.sharedID = generateId("sharedID");

  // splits up the expense object and puts in the right part of array
  for (let j = 0; j < days; j++) {
    const date = new Date(startDate);
    const currentDate = new Date(date.setDate(date.getDate() + j));
    let unix = Math.round(currentDate.getTime());
    const copy = {
      ...expense,
      id: generateId("expense"),
      startDate: unix,
      endDate: unix,
      amount: {
        ...expense.amount,
        fromValue: newFrom,
        toValue: newTo,
      },
    };
    allExpenses.push(copy);
  }
  return allExpenses;
}
