import { addDecimals, getCurrencySymbol } from "../../utils/utilsBudget";

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
  console.log("expesenAmoutn", splits);
  let { fromCurrency, toValue, fromValue } = amount;

  console.log(splitBill, splits);

  if (splitBill && splits) {
    console.log("you get here", expenseId);
    const arrayOfPaidSplits = splits.filter((split) => {
      return split.expenseID === expenseId && split.paid === true;
    });
    arrayOfPaidSplits.forEach((split) => {
      toValue -= split.amount.toValue;
      fromValue -= split.amount.fromValue;
    });
  }
  return (
    <div>
      <p>
        {homeCurrencySymbol}
        {addDecimals(toValue)}
      </p>
      <p className="foreignAmount">
        {getCurrencySymbol(currencyCodes, fromCurrency)}
        {addDecimals(fromValue)}
      </p>
    </div>
  );
};

export default ExpenseAmount;
