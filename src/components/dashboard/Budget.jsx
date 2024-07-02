import { addDecimals, calculateTotalSpend } from "../../utils/utils";

const Budget = ({ expenses, homeCurrencySymbol, budgetTotal }) => {
  if (!expenses) {
    return;
  }

  const totalSpend = calculateTotalSpend(expenses);
  const _budgetTotal = addDecimals(budgetTotal);

  return (
    <div className="budget">
      <p>
        Spend: {homeCurrencySymbol}
        {totalSpend}
      </p>
      <p>
        Total budget: {homeCurrencySymbol}
        {_budgetTotal}
      </p>
      <p>
        Money left: {homeCurrencySymbol}
        {_budgetTotal - totalSpend}
      </p>
    </div>
  );
};

export default Budget;
