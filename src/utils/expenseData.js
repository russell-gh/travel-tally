import { stringToTimestamp } from "../components/Onboarding/utils";
import { nanoid } from "nanoid";

export function handleData(expense, home, data) {
  let { date, description, category, amount, currency, split } = expense;
  let unix = stringToTimestamp(expense.date);

  // Creates object that replaces amount in original expense obj
  let newAmount = {
    fromValue: 0,
    toValue: 0,
    fromCurrency: "",
    toCurrency: { home },
  };

  // Fills data for amount from input
  newAmount.fromCurrency = currency;
  newAmount.toCurrency = home;
  newAmount.fromValue = Number(amount * 100);
  newAmount.toValue = newAmount.fromValue;

  // Converts currency if neccesary
  if (currency != home) {
    newAmount.toValue = convertCurrency(newAmount.fromValue, currency, data);
  }

  // Tidies object up, adds unique id and unix time
  expense.amount = newAmount;
  delete expense.currency;
  expense.date = unix;
  expense.id = `expense_${nanoid()}`;

  return expense;
}

export function convertCurrency(fromValue, fromCurrency, data) {
  const origin = fromValue;
  const rate = data[fromCurrency];
  const result = origin / rate;
  return result;
}
