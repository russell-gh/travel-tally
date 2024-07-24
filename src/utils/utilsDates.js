import dayjs from "dayjs";

export function unixToDate(unix) {
  if (!unix) {
    console.log("unix is undefined");
    return "unknown date";
  }
  const date = new Date(unix); //converts unix back to object
  const options = { year: "numeric", month: "numeric", day: "numeric" };
  const formattedDate = new Intl.DateTimeFormat("en-GB", options).format(date);
  return formattedDate;
}

export function getUnixfromDate(str1) {
  var dt1 = parseInt(str1.substring(0, 2));
  var mon1 = parseInt(str1.substring(3, 5));
  var yr1 = parseInt(str1.substring(6, 10));
  var date1 = new Date(yr1, mon1 - 1, dt1);
  return date1;
}

export function includesFutureExpenses(data) {
  let includesFutureExpenses;
  data.forEach((item) => {
    if (dayjs().isBefore(dayjs(item.date))) {
      includesFutureExpenses = true;
    }
  });
  return includesFutureExpenses;
}

export const getActualStartDate = (startDateIncluded, startDate) => {
  return !startDateIncluded ? startDate + 86400000 : startDate;
};
export const getActualEndDate = (endDateIncluded, endDate) => {
  return !endDateIncluded ? endDate - 86400000 : endDate;
};

export function getDateForForm(unix) {
  let date = new Date(unix);
  let formattedDate =
    date.getFullYear() +
    "-" +
    (date.getMonth() + 1).toString().padStart(2, "0") +
    "-" +
    date.getDate().toString().padStart(2, "0");
  return formattedDate;
}

export function getStartDateForMultiDay(inputDate) {
  // Create a new Date object from the date string
  let date = new Date(inputDate);

  // Add one day to the date
  date.setDate(date.getDate() + 1);
  let startDate = getDateForForm(date);
  return startDate;
}
