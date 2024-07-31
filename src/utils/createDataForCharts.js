import { getBudget } from "../utils/utilsBudget";
import { filterCategories } from "./getSortedandFiltered";
import { calculateTotalSpend } from "../utils/utilsBudget";
import { addDecimals } from "../utils/utilsBudget";
import { createExpensesArray } from "./createExpensesArray";
import { getSpendPerDay, getSpendSelectedDay } from "../utils/utilsBudget";

export function createDataForCharts(
  details,
  expenses,
  splits,
  filterDate,
  actualEndDate,
  actualStartDate,
  amountOfBudgetDays
) {
  //create empty array with three empty arrays inside it [[labels], [spend], [left], [overspend]]
  let dataArray = new Array(3).fill(null).map(() => []);
  let totalBudgetArray = [];
  let spendArray = [];

  const orderOfData = ["Activities", "Food", "Transport", "Hotel", "Other"];

  dataArray.unshift(orderOfData); //add labels to data

  if (!filterDate) {
    //gets the total budget and spend for everything and per category and puts it in arrays
    orderOfData.forEach((category) => {
      totalBudgetArray.push(getBudget(details, category));

      const expensesCategories = filterCategories(expenses, category); // filters expenses on categories so totalspend can be calculated per category
      const totalSpend =
        expensesCategories.length === 0
          ? 0
          : calculateTotalSpend(expensesCategories, splits);

      spendArray.push(totalSpend);
    });
  }

  if (filterDate) {
    //gets the total budget and spend for that day and per category and puts it in arrays
    orderOfData.forEach((category) => {
      const budget = getBudget(details, category);
      const budgetPerDay = addDecimals((budget * 100) / amountOfBudgetDays);
      totalBudgetArray.push(budgetPerDay);

      const expensesCategories = filterCategories(expenses, category); // filters expenses on categories so totalspend can be calculated per category
      const expensesArray = createExpensesArray(
        expensesCategories,
        actualStartDate,
        actualEndDate
      );
      const data = getSpendPerDay(
        (budget * 100) / amountOfBudgetDays,
        expensesArray,
        splits
      );
      const selectedDay = getSpendSelectedDay(data, filterDate, budgetPerDay);

      spendArray.push(addDecimals(selectedDay.totalSpendPerDay));
    });
  }

  //compare the budget and spend to get the difference
  for (let i = 0; i < spendArray.length; i++) {
    let difference = totalBudgetArray[i] * 100 - spendArray[i] * 100;
    if (difference > 0 || difference === 0) {
      dataArray[1].push(spendArray[i]);
      dataArray[2].push(addDecimals(difference));
      dataArray[3].push(0);
    } else if (difference < 0) {
      dataArray[1].push(totalBudgetArray[i]);
      dataArray[2].push(0);
      dataArray[3].push(Math.abs(difference / 100).toFixed(2));
    } else {
      console.log(
        "something went wrong with collecting the data for the graphs"
      );
    }
  }
  return dataArray;
}

export function createDateIncludingOwed(splits, expenses, chartData) {
  //make copy of chartData
  let _chartData = JSON.parse(JSON.stringify(chartData));

  //function scope variable
  let totalOwedArr = [];

  // get the expenses that are bill splitting
  const splitBillExpenses = expenses.filter((expense) => {
    return expense.split;
  });

  const orderOfData = ["Activities", "Food", "Transport", "Hotel", "Other"];

  orderOfData.forEach((category) => {
    const expensesCategories = filterCategories(splitBillExpenses, category); // filters expenses on categories so totalspend can be calculated per category

    const totalOwed =
      expensesCategories.length === 0
        ? 0
        : getTotalOwed(expensesCategories, splits);

    totalOwedArr.push(totalOwed);
  });

  // add total owed to the data for chart
  _chartData.push(totalOwedArr);

  //take owed away from left or overspend
  // let arrayLeft = _chartData[2];
  // let arrayOverspend = _chartData[3];

  // for (let i = 0; i < arrayLeft.length; i++) {
  //   if (arrayLeft[i] !== 0) {
  //     const leftAfterOwed = arrayLeft[i] * 100 - totalOwedArr[i] * 100;
  //     if (leftAfterOwed > 0) {
  //       arrayLeft[i] = addDecimals(leftAfterOwed);
  //     } else if (leftAfterOwed <= 0) {
  //       arrayLeft[i] = 0;
  //     }
  //   } else if (arrayLeft[i] === 0) {
  //     const leftAfterOwed = arrayOverspend[i] * 100 - totalOwedArr[i] * 100;
  //     if (leftAfterOwed > 0) {
  //       arrayOverspend[i] = addDecimals(leftAfterOwed);
  //     } else if (leftAfterOwed <= 0) {
  //       arrayOverspend[i] = 0;
  //     }
  //   }
  // }

  // _chartData[2] = arrayLeft;
  // _chartData[3] = arrayOverspend;

  return _chartData;
}

export function getTotalOwed(expenses, splits) {
  let totalOwedArr = [];

  //calculates total owed per split bill
  expenses.forEach((expense) => {
    const arrayOfSplits = splits.filter((split) => {
      return split.expenseId === expense.id && !split.paid;
    });
    const totalOwedPerSplit = arrayOfSplits.reduce((acc, value) => {
      return acc + value.amount.toValue;
    }, 0);
    totalOwedArr.push(totalOwedPerSplit);
  });

  //calculates total of all owed
  const totalOwed = totalOwedArr.reduce((acc, value) => {
    return acc + value;
  }, 0);

  return addDecimals(totalOwed);
}
