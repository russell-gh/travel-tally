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

  return (
    <div>
      <p>
        {homeCurrencySymbol}
        {addDecimals(toValue)}
      </p>
      <p className="foreignAmount">
        {getCurrencySymbol(currencyCodes, fromCurrency)}
        {nFormatter(fromValue)}
      </p>
    </div>
  );
};

export default ExpenseAmount;
