import { useSelector } from "react-redux";
import {
  selectCurrencyCodes,
  selectExpenses,
  selectTravelInfo,
} from "../redux/expensesSlice";
import { addDecimals, calculateTotalSpend } from "../utils/utils";

const Budget = () => {
  const expenses = useSelector(selectExpenses);
  const totalSpend = calculateTotalSpend(expenses);
  const travelInfo = useSelector(selectTravelInfo);
  const currencyCodes = useSelector(selectCurrencyCodes);

  if (!travelInfo || !currencyCodes) {
    return;
  }
  const currencySymbol = travelInfo.homeCurrencySymbol;

  const budgetTotal = addDecimals(travelInfo.budgetTotal);

  return (
    <div className="budget">
      <p>
        Spend: {currencySymbol}
        {totalSpend}
      </p>
      <p>
        Total budget: {currencySymbol}
        {budgetTotal}
      </p>
      <p>
        Money left: {currencySymbol}
        {budgetTotal - totalSpend}
      </p>
    </div>
  );
};

export default Budget;
