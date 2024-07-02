export function handleData(expense, home, data) {
  console.log(expense, home, data);
  let { date, description, category, amount, currency, split } = expense;
  let newAmount = {
    fromValue: 0,
    toValue: 0,
    fromCurrency: "",
    toCurrency: "",
  };
  newAmount.fromValue = Number(amount * 100);

  if (currency === home) {
    newAmount.toValue = newAmount.fromValue;
    newAmount.fromCurrency = currency;
    newAmount.toCurrency = currency;
  } else if (currency != home) {
    newAmount.toValue = convertCurrency(newAmount.fromValue, currency, data);
    newAmount.fromCurrency = currency;
    newAmount.toCurrency = home;
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
