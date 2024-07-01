export function handleData(expense, home, data) {
  let { date, description, category, amount, currency, split } = expense;
  let newAmount = { amount: 0, homeCurrency: 0 };
  amount = Number(amount * 100);
  console.log(amount, currency, data);
  if (currency === home) {
    newAmount.homeCurrency = amount;
    newAmount.amount = amount;
    expense.amount = newAmount;
  } else if (currency != home) {
    newAmount.homeCurrency = convertCurrency(amount, currency, data);
    newAmount.amount = amount;
    expense.amount = newAmount;
    console.log(expense);
  }
  return expense;
}

export function convertCurrency(originAmount, originCurrency, data) {
  const origin = originAmount;
  const rate = data[originCurrency];
  const result = origin / rate;
  return result;
}
