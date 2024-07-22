import { describe, test, expect } from "vitest";
import { unixToDate } from "./utilsDates";

test("converts unix to a date format dd/mm/yyyy", () => {
  expect(unixToDate(1721516400000)).toBe("21/07/2024");
  expect(unixToDate(undefined)).toBe(console.log("unix is undefined"));
});

function unixToDateExample(unix) {
  if (!unix) {
    console.log("unix is undefined");
    return;
  }
  const date = new Date(unix); //converts unix back to object
  const options = { year: "numeric", month: "numeric", day: "numeric" };
  const formattedDate = new Intl.DateTimeFormat("en-GB", options).format(date);
  return formattedDate;
}
