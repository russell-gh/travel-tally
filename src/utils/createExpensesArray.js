import dayjs from "dayjs";
import { unixToDate } from "./utilsDates";

export const createExpensesArray = (expenses, details) => {
  const { startDate, endDate } = details;

  // calculate days of trip
  const startDateTrip = dayjs(startDate);
  const endDateTrip = dayjs(endDate);
  const amountOfDaysTrip = endDateTrip.diff(startDateTrip, "day") + 1;

  //make array with empty arrays inside. Same amount as travel days
  let expensesArray = new Array(amountOfDaysTrip).fill(null).map(() => []);

  // puts same day expenses in the same array
  expenses.map((item) => {
    if (item.startDate === item.endDate) {
      for (let i = 0; i < amountOfDaysTrip; i++) {
        const date = unixToDate(startDateTrip.add(i, "day"));
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
        const currentDate = itemStartDate.add(j, "day").unix() * 1000;
        const copy = {
          ...item,
          startDate: currentDate,
          endDate: currentDate,
          amount: {
            ...item.amount,
            fromValue: dailyAmount.fromValue,
            toValue: dailyAmount.toValue,
          },
          id: `${item.id} ${item.id}${j}`,
        };
        for (let k = 0; k < amountOfDaysTrip; k++) {
          const date = unixToDate(startDateTrip.add(k, "day"));
          if (date === unixToDate(copy.startDate)) {
            expensesArray[k].push(copy);
            break;
          }
        }
      }
    }
  });

  return expensesArray;
};
