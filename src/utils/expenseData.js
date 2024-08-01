import { splitExpenseBill } from "./billsplitting";
import { unixToDate } from "./utilsDates";
import { stringToUnix, generateId } from "./utils";
import { splitMultiExpenseBill } from "./billsplitting";

export function handleData({ formData, splitData }, home, data) {
  // console.log("Start handle data", splitData);
  const expense = formData;
  let splits = [];
  if (splitData) {
    splits = JSON.parse(JSON.stringify(splitData));
    splits.forEach((bill) => {
      bill.amount = bill.amount * 100;
    });
  }
  let billSplit;
  let { date, endDate, description, category, amount, currency, split } =
    expense;
  let start = stringToUnix(expense.date);
  let end = stringToUnix(expense.endDate);

  // Wipes any existing id's if the expense is being edited
  if (expense.id) {
    delete expense.id;
    delete expense.sharedId;
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
    newAmount.toValue = Math.round(
      convertCurrency(newAmount.fromValue, currency, data)
    );

    if (splitData) {
      splits.forEach((bill) => {
        bill.converted = Math.round(
          convertCurrency(bill.amount, currency, data)
        );
      });
    }
  }

  // console.log("middle of handle data", splits);

  // Tidies object up, adds unique id and unix time
  expense.amount = newAmount;
  delete expense.currency;
  expense.date = start;
  expense.endDate = end;

  if (expense.multiDay === true) {
    // console.log("in if statement", splits);
    // If it's a multiday expense, it gets sent to be split
    let allExpenses = splitExpenseDays({ expense, splits });
    // console.log(allExpenses);
    return allExpenses;
  }

  expense.id = generateId("expense");
  delete expense.multiDay;
  delete expense.endDate;
  // console.log("expenseSplit", expense.split, expense);
  if (expense.split) {
    billSplit = splitExpenseBill(splits, expense, data);
    // console.log(billSplit, "IN EXPENSEDATA");
    return { expense, billSplit };
  }

  return { expense };
}

export function convertCurrency(fromValue, fromCurrency, data) {
  const origin = fromValue;
  const rate = data[fromCurrency];
  const result = origin / rate;
  return result;
}

export function splitExpenseDays({ expense, splits }) {
  // console.log("Split expense days", splits);
  let { date, endDate, description, category, amount, currency, split } =
    expense;
  let { fromValue, toValue } = amount;
  let allExpenses = [];

  delete expense.multiDay;
  const days = (endDate - date) / 1000 / 60 / 60 / 24 + 1;
  const newFrom = fromValue / days;
  const newTo = toValue / days;
  expense.sharedId = generateId("sharedId");

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

  //split up the billsplits
  let billSplit;
  if (split === true) {
    billSplit = splitMultiExpenseBill(splits, allExpenses, days);
  }
  // console.log("End split exp", billSplit);
  return { allExpenses, billSplit };
}

export function mergeExpenseDays(expense, allExpenses) {
  let expenseArray = [];
  let indexs = [];
  let newExpense = {};

  if (expense.sharedId) {
    allExpenses.forEach((thisExpense, index) => {
      // Finds each expense with matching sharedId
      if (thisExpense.sharedId === expense.sharedId) {
        indexs.push(index);
        expenseArray.push(thisExpense); // Adds all of them to and array
      }
    });

    const total = expenseArray.length; // Counts how many in array
    const sorted = expenseArray.sort(function (a, b) {
      // Sorts by unix timestamp
      return a.date - b.date;
    });

    const startDate = unixToDateReversed(expenseArray[0].date); // Gets earliest date from beginning of sorted array
    const endDate = unixToDateReversed(
      expenseArray[expenseArray.length - 1].date
    ); // Gets latest date from last index

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
      sharedId: expenseArray[0].sharedId,
    };
  }
  return { newExpense, indexs };
}

export function mergeMultiSplit(splitData, allSplits) {
  let splitArray = []; // These variables are the combination of all people splitting
  let indexs = [];

  splitData.forEach((split) => {
    let internalArr = []; // These variables represent each person in the split
    let internalIndexs = [];
    let newSplit = {};
    // find all splits with same name and sharedID
    allSplits.forEach((thisSplit, index) => {
      if (
        thisSplit.sharedId === split.sharedId &&
        thisSplit.name === split.name
      ) {
        indexs.push(index);
        internalArr.push(thisSplit); // Adds all of them to and array
      }
    });

    const total = internalArr.length; // Counts how many in array
    const totalAmount = internalArr[0].amount.fromValue * total; // Finds the original total of the split
    newSplit = {
      // Creates a new object with combined information
      amount: Math.round(totalAmount) / 100,
      name: internalArr[0].name,
      paid: internalArr[0].paid,
    };
    splitArray.push(newSplit);
  });

  return { splitArray, indexs };
}

export function getExpenseList(tripID, trips) {
  const indexOf = trips.findIndex((trip) => {
    return trip.id === tripID;
  });
  // Create variable for the correct trip
  const thisTrip = trips[indexOf];
  return thisTrip;
}

export function getThisExpense(expenseList, id) {
  const indexOf = expenseList.findIndex((expense) => {
    return expense.id === id;
  });
  // Create variable for the correct trip
  const thisExpense = expenseList[indexOf];
  let result = { thisExpense, indexOf };
  return result;
}

export function getThisSplit(splitList, id) {
  let allSplits = [];
  let allIndexs = [];

  splitList.forEach((thisSplit, index) => {
    // Finds each split with matching ID
    if (thisSplit.expenseId === id) {
      allSplits.push(thisSplit);
      allIndexs.push(index); // Adds all of them to and array
    }
  });

  const result = { allSplits, allIndexs };

  return result;
}

export function unixToDateReversed(unix) {
  if (!unix) {
    // console.log("error finding unix");
    return;
  }

  const date = new Date(unix);
  var yyyy = date.getFullYear().toString();
  var mm = (date.getMonth() + 1).toString();
  var dd = date.getDate().toString();

  var mmChars = mm.split("");
  var ddChars = dd.split("");

  return (
    yyyy +
    "-" +
    (mmChars[1] ? mm : "0" + mmChars[0]) +
    "-" +
    (ddChars[1] ? dd : "0" + ddChars[0])
  );
}
