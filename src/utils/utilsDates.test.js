import { test, expect } from "vitest";
import { unixToDate } from "./utilsDates";

test("converts unix to a date format dd/mm/yyyy", () => {
  expect(unixToDate(1721516400000)).toBe("21/07/2024");
  expect(unixToDate(undefined)).toBe("unknown date");
  expect(unixToDate(1)).toBe("01/01/1970");
  expect(unixToDate(1609459200000)).toBe("01/01/2021");
  expect(unixToDate(null)).toBe("unknown date");
  expect(unixToDate("not-a-number")).toBe("unknown date");
  expect(unixToDate("1609459200000")).toBe("unknown date");
  expect(unixToDate(1640995200000)).toBe("01/01/2022");
});
