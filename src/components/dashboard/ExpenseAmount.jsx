import {
  addDecimals,
  getCurrencySymbol,
  nFormatter,
} from "../../utils/utilsBudget";

const ExpenseAmount = ({
  homeCurrencySymbol,
  amount,
  currencyCodes,
  splits,
  split,
  expenseId,
}) => {
  if (!amount) {
    return;
  }

  let { fromCurrency, toValue, fromValue } = amount;

  if (split && splits) {
    const arrayOfPaidSplits = splits.filter((split) => {
      return split.expenseId === expenseId && split.paid === true;
    });
    arrayOfPaidSplits.forEach((split) => {
      toValue -= split.amount.toValue;
      fromValue -= split.amount.fromValue;
    });
  }

  fromValue = addDecimals(fromValue);
  toValue = addDecimals(toValue);
  const currencySymbol = getCurrencySymbol(currencyCodes, fromCurrency);

  return (
    <div className="amountContainer">
      <p>
        {homeCurrencySymbol}
        {nFormatter(toValue)}
      </p>
      <p className="foreignAmount">
        {currencySymbol}
        {nFormatter(fromValue)}
      </p>
    </div>
  );
};

export default ExpenseAmount;
