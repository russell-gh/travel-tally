export function handleData(expense, home, data) {
  const { date, description, category, amount, currency, split } = expense;
  let newAmount = { amount: 0, homeCurrency: 0 };
  if (currency === home) {
    newAmount.homeCurrency = Number(amount);
    newAmount.amount = amount;
    expense.amount = newAmount;
  } else if (currency != home) {
    newAmount.homeCurrency = convertCurrency(amount, currency, data);
    newAmount.amount = Number(amount);
    expense.amount = newAmount;
    console.log(expense);
  }
  return expense;
}

export function convertCurrency(originAmount, originCurrency, data) {
  const origin = originAmount * 100;
  const rate = data[originCurrency];
  const result = Math.round(origin / rate);
  return result / 100;
}
