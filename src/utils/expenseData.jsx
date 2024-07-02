export function handleData(expense, home, data) {
  console.log(expense, home, data);
  let { date, description, category, amount, currency, split } = expense;

  let newAmount = {
    fromValue: 0,
    toValue: 0,
    fromCurrency: "",
    toCurrency: "",
  };

  newAmount.fromCurrency = currency;
  newAmount.toCurrency = home;
  newAmount.fromValue = Number(amount * 100);
  newAmount.toValue = newAmount.fromValue;

  if (currency != home) {
    newAmount.toValue = convertCurrency(newAmount.fromValue, currency, data);
  }

  expense.amount = newAmount;
  delete expense.currency;

  return expense;
}

export function convertCurrency(originAmount, originCurrency, data) {
  const origin = originAmount;
  const rate = data[originCurrency];
  const result = origin / rate;
  return result;
}
