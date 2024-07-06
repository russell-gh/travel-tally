import dayjs from "dayjs";

export function unixToDate(unix) {
  if (!unix) {
    console.log("unix is undefined");
    return;
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

export function getArrayOfDates(data) {
  let copy = [...data];
  //makes an array of the dates
  copy = copy.map((item) => {
    return item.startDate;
  });

  // removes duplicates
  copy = [...new Set(copy)];
  // get dates in right order
  copy.sort((a, b) => {
    if (a < b) {
      return 1;
    } else if (a > b) {
      return -1;
    }
    return 0;
  });

  // turns unixCode to timestamp
  copy = copy.map((item) => {
    return unixToDate(item);
  });

  //add All Dates as first element
  copy.unshift("All Dates");

  return copy;
}
