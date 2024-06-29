export function handleData(expense, home) {
  const { date, description, category, amount, currency, split } = expense;
  let newAmount = { amount: 0, homeCurrency: 0 };
  if (currency === home) {
    newAmount.homeCurrency = amount * 100;
    newAmount.amount = amount * 100;
    expense.amount = newAmount;
  } else if (currency !== home) {
    convertCurrency(amount, currency);
  }
}
