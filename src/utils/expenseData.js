import { stringToTimestamp, generateId } from "../components/onboarding/utils";

export function handleData(expense, home, data) {
  let { date, endDate, description, category, amount, currency, split } =
    expense;
  let start = stringToTimestamp(expense.date);
  let end = stringToTimestamp(expense.endDate);

  console.log(expense, "inside handle");

  // Wipes any existing id's if the expense is being edited
  if (expense.id) {
    delete expense.id;
    delete expense.sharedID;
  }

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
  expense.date = start;
  expense.endDate = end;
  if (expense.multiDay === true) {
    let allExpenses = splitExpenseDays(expense);
    return allExpenses;
  }
  delete expense.multiDay;
  delete expense.endDate;
  expense.id = generateId("expense");
  console.log(expense, "PROCESSED EXPENSE");

  return expense;
}

export function convertCurrency(fromValue, fromCurrency, data) {
  const origin = fromValue;
  const rate = data[fromCurrency];
  const result = origin / rate;
  return result;
}

export function splitExpenseDays(expense) {
  let { date, endDate, description, category, amount, currency, split } =
    expense;
  let { fromValue, toValue } = amount;
  let allExpenses = [];
  delete expense.multiDay;
  const days = (endDate - date) / 1000 / 60 / 60 / 24;
  const newFrom = fromValue / days;
  const newTo = toValue / days;
  expense.sharedID = generateId("sharedID");
  console.log(days, endDate, date, "JUST BEFORE SPLIT");

  // splits up the expense object and puts in the right part of array
  for (let j = 0; j < days; j++) {
    const newDate = new Date(date);
    const currentDate = new Date(newDate.setDate(newDate.getDate() + j));
    let unix = Math.round(currentDate.getTime());
    const copy = {
      ...expense,
      id: generateId("expense"),
      date: unix,
      amount: {
        ...expense.amount,
        fromValue: newFrom,
        toValue: newTo,
      },
    };
    delete copy.endDate;
    allExpenses.push(copy);
  }
  console.log(allExpenses, "Handing in split days");
  return allExpenses;
}

export function mergeExpenseDays(expense, allExpenses) {
  let expenseArray = [];
  let indexs = [];
  let newExpense = {};

  if (expense.sharedID) {
    allExpenses.forEach((thisExpense, index) => {
      // Finds each expense with matching sharedID
      if (thisExpense.sharedID) {
        indexs.push(index);
        expenseArray.push(thisExpense); // Adds all of them to and array
      }
    });

    const total = expenseArray.length; // Counts how many in array
    const sorted = expenseArray.sort(function (a, b) {
      // Sorts by unix timestamp
      return a.date - b.date;
    });

    const startDate = new Date(expenseArray[0].date).toLocaleDateString(
      "en-CA"
    ); // Gets earliest date from beginning of sorted array

    const endDate = new Date(
      expenseArray[expenseArray.length - 1].date
    ).toLocaleDateString("en-CA"); // Gets latest date from last index

    const totalAmount = expenseArray[0].amount.fromValue * total; // Finds the original total of shared expense

    newExpense = {
      date: startDate, // Creates a new object with combined information
      endDate: endDate,
      split: expenseArray[0].split,
      category: expenseArray[0].category,
      description: expenseArray[0].description,
      multiDay: true,
      currency: expenseArray[0].amount.fromCurrency,
      amount: Math.round(totalAmount) / 100,
    };
    console.log(sorted, total, newExpense, "sorted");
  }
  console.log(newExpense, indexs, "PRERETURN");
  return { newExpense, indexs };
}

export function getExpenseList(tripID, trips) {
  const indexOf = trips.findIndex((trip) => {
    return trip.id === tripID;
  });
  // Create variable for the correct trip
  const thisTrip = trips[indexOf];
  return thisTrip.expenses;
}

export function getThisExpense(expenseList, id) {
  const indexOf = expenseList.findIndex((expense) => {
    return expense.id === id;
  });
  // Create variable for the correct trip
  const thisExpense = expenseList[indexOf];
  // const multi = mergeExpenseDays(thisExpense, expenseList)
  let result = { thisExpense, indexOf };
  return result;
}
