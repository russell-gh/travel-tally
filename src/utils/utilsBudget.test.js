import { test, expect } from "vitest";
import { nFormatter } from "./utilsBudget";

test("formats numbers correctly", () => {
  expect(nFormatter(0)).toBe("0");
  expect(nFormatter(1)).toBe("1.00");
  expect(nFormatter(10)).toBe("10.00");
  expect(nFormatter(100)).toBe("100.00");
  expect(nFormatter(999)).toBe("999.00");
  expect(nFormatter(1000)).toBe("1.0k");
  expect(nFormatter(1500)).toBe("1.5k");
  expect(nFormatter(10000)).toBe("10.0k");
  expect(nFormatter(1000000)).toBe("1.0M");
  expect(nFormatter(1500000)).toBe("1.5M");
  expect(nFormatter(1000000000)).toBe("1.0B");
  expect(nFormatter(1500000000)).toBe("1.5B");
  expect(nFormatter(1000000000000)).toBe("1.0T");
  expect(nFormatter(1500000000000)).toBe("1.5T");
  expect(nFormatter(1000000000000000)).toBe("1.0Q");
  expect(nFormatter(1500000000000000)).toBe("1.5Q");
});

test("handles negatives", () => {
  expect(nFormatter(-1000)).toBe("0");
  expect(nFormatter(-1500000)).toBe("0");
});

test("returns '0' for invalid or undefined inputs", () => {
  expect(nFormatter(undefined)).toBe("0");
  expect(nFormatter(null)).toBe("0");
  expect(nFormatter(NaN)).toBe("0");
  expect(nFormatter("")).toBe("0");
  expect(nFormatter({})).toBe("0");
});

test("handles decimal numbers correctly", () => {
  expect(nFormatter(0.5)).toBe("0.50");
  expect(nFormatter(0.123456)).toBe("0.12");
  expect(nFormatter(1234.5678)).toBe("1.2k");
});
