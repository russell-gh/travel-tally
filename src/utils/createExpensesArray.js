import dayjs from "dayjs";
import { getUnixfromDate, unixToDate } from "./utilsDates";

export const createExpensesArray = (expenses, startDate, endDate) => {
  //make a copy
  const _expenses = JSON.parse(JSON.stringify(expenses));

  // calculate days of trip
  const startDateTrip = dayjs(startDate);
  const endDateTrip = dayjs(endDate);
  const amountOfDaysTrip = endDateTrip.diff(startDateTrip, "day") + 1;

  //make array with empty arrays inside. Same amount as travel days
  let expensesArray = new Array(amountOfDaysTrip).fill(null).map(() => []);

  //put the date in each box
  for (let i = 0; i < amountOfDaysTrip; i++) {
    let date = startDateTrip.add(i, "day");
    date = date.valueOf();
    expensesArray[i].push({ date: date });
  }

  // puts same day expenses in the same array
  _expenses.map((item) => {
    if (item.date) {
      for (let i = 0; i < amountOfDaysTrip; i++) {
        // console.log(startDateTrip.add(i, "day"));
        // const date = startDateTrip.add(i, "day");
        // const options = { year: "numeric", month: "numeric", day: "numeric" };
        // const formattedDate = new Intl.DateTimeFormat("en-GB", options).format(
        //   date
        // );
        // console.log(formattedDate);
        // if (formattedDate === unixToDate(item.date)) {
        //   expensesArray[i].push(item);
        //   break;
        // }

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
