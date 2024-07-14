import dayjs from "dayjs";
import { unixToDate } from "./utilsDates";

export const createExpensesArray = (expenses, startDate, endDate) => {
  // calculate days of trip
  const startDateTrip = dayjs(startDate);
  const endDateTrip = dayjs(endDate);
  const amountOfDaysTrip = endDateTrip.diff(startDateTrip, "day") + 1;

  //make array with empty arrays inside. Same amount as travel days
  let expensesArray = new Array(amountOfDaysTrip).fill(null).map(() => []);

  // puts same day expenses in the same array
  expenses.map((item) => {
    if (item.date) {
      for (let i = 0; i < amountOfDaysTrip; i++) {
        const date = unixToDate(startDateTrip.add(i, "day"));
        if (date === unixToDate(item.date)) {
          expensesArray[i].push(item);
          break;
        }
      }
    }
  });

  return expensesArray;
};
