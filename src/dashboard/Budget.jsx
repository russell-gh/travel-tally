import { useSelector } from "react-redux";
import { selectCurrencyCodes, selectTrips } from "../redux/tripsSlice";
import { addDecimals, calculateTotalSpend } from "../utils/utils";

const Budget = () => {
  const trips = useSelector(selectTrips);
  const currencyCodes = useSelector(selectCurrencyCodes);

  if (!trips || trips.length === 0) {
    return;
  }

  const expenses = trips[0].expenses;
  const totalSpend = calculateTotalSpend(expenses);

  if (!currencyCodes || !trips) {
    return;
  }
  const currencySymbol = trips[0].details.homeCurrencySymbol;

  const budgetTotal = addDecimals(trips[0].details.budgetTotal);

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
