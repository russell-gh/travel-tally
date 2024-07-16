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
  splitBill,
  expenseId,
}) => {
  if (!amount) {
    return;
  }

  let { fromCurrency, toValue, fromValue } = amount;

  if (splitBill && splits) {
    const arrayOfPaidSplits = splits.filter((split) => {
      return split.expenseID === expenseId && split.paid === true;
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
