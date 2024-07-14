import { getBudget } from "../utils/utilsBudget";
import { filterCategories } from "./getSortedandFiltered";
import { calculateTotalSpend } from "../utils/utilsBudget";
import { addDecimals } from "../utils/utilsBudget";
import { createExpensesArray } from "./createExpensesArray";
import { getSpendPerDay, getSpendSelectedDay } from "../utils/utilsBudget";

export function createDataForCharts(
  details,
  expenses,
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
          : calculateTotalSpend(expensesCategories);

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
        expensesArray
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