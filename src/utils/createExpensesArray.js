import dayjs from "dayjs";
import { unixToDate } from "./utils";

export const createExpensesArray = (expenses, details) => {
  const { startDate, endDate } = details;

  // calculate days of trip
  const startDateTrip = dayjs(startDate);
  const endDateTrip = dayjs(endDate);
  const amountOfDays = endDateTrip.diff(startDateTrip, "day");

  //make array with empty arrays inside. Same amount as travel days
  let expensesArray = new Array(amountOfDays + 1).fill(null).map(() => []);

  // puts same day expenses in the same array
  expenses.map((item) => {
    if (item.startDate === item.endDate) {
      for (let i = 0; i < amountOfDays + 1; i++) {
        const date = unixToDate(startDateTrip.add(i, "day"));
        console.log(date === unixToDate(item.startDate));
        if (date === unixToDate(item.startDate)) {
          expensesArray[i].push(item);
          break;
        }
      }
    } else if (item.startDate !== item.endDate) {
      const itemStartDate = dayjs(item.startDate);
      const itemEndDate = dayjs(item.endDate);
      const amountOfDays = itemEndDate.diff(itemStartDate, "day") + 1;

      // divides the budget throught the amount of days
      const dailyAmount = {
        fromValue: item.amount.fromValue / amountOfDays,
        toValue: item.amount.toValue / amountOfDays,
      };

      // splits up the expense object and puts in the right part of array
      for (let j = 0; j < amountOfDays; j++) {
        const currentDate = itemStartDate.add(j, "day");
        const copy = {
          ...item,
          startDate: currentDate.toISOString(),
          endDate: currentDate.toISOString(),
          amount: { ...item.amount, dailyAmount },
        };
        for (let k = 0; k < amountOfDays; k++) {
          const date = unixToDate(startDateTrip.add(k, "day"));
          if (date === unixToDate(currentDate)) {
            console.log(expensesArray[k]);
            expensesArray[k].push(copy);
            break;
          }
        }
      }
    }
  });

  console.log(expensesArray);
  return expensesArray;
};
