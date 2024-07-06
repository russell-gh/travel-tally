import {
  addDecimals,
  getSpendPerDay,
  getBudget,
  getSpendSelectedDay,
} from "../../utils/utilsBudget";
import { useSelector } from "react-redux";
import { selectFilter, selectFilterDate } from "../../redux/homeSlice";
import CategoryGauge from "./CategoryGauge";

const BudgetPerDay = ({
  expensesArray,
  homeCurrencySymbol,
  details,
  amountOfDays,
  startDate,
  endDate,
}) => {
  const filter = useSelector(selectFilter);
  const filterDate = useSelector(selectFilterDate);

  const budget = getBudget(details, filter);
  const budgetPerDay = addDecimals((budget * 100) / amountOfDays);

  const data = getSpendPerDay(
    (budget * 100) / amountOfDays,
    expensesArray,
    filter
  );

  const selectedDay = getSpendSelectedDay(data, filterDate);

  const difference = addDecimals(
    budgetPerDay * 100 - selectedDay.totalSpendPerDay
  );
  return (
    <>
      <div className="chartDay">
        <p>Daily budget</p>
        <CategoryGauge
          budget={budgetPerDay}
          spend={addDecimals(selectedDay.totalSpendPerDay)}
        />
      </div>
      <div className="dayBudget">
        <p>
          Budget per day: {homeCurrencySymbol}
          {budgetPerDay}
        </p>
        <p>
          Spend Today: {homeCurrencySymbol}
          {addDecimals(selectedDay.totalSpendPerDay)}
        </p>
        {difference < 0 ? (
          <p className="negative">
            Overspend: {homeCurrencySymbol}
            {Math.abs(difference).toFixed(2)}
          </p>
        ) : difference === 0 ? (
          <p className="neutral">
            Money left: {homeCurrencySymbol}
            {difference}
          </p>
        ) : (
          <p className="positive">
            Money left: {homeCurrencySymbol}
            {difference}
          </p>
        )}
        {selectedDay.cumulativeDifference > 0 ? (
          <p className="positive">
            Saved previous days: {homeCurrencySymbol}
            {addDecimals(selectedDay.cumulativeDifference)}
          </p>
        ) : selectedDay.cumulativeDifference === 0 ? (
          <p className="neutral">
            Saved previous days: {homeCurrencySymbol}
            {addDecimals(selectedDay.cumulativeDifference)}
          </p>
        ) : (
          <p className="negative">
            Overspend previous days: {homeCurrencySymbol}
            {Math.abs(selectedDay.cumulativeDifference / 100).toFixed(2)}
          </p>
        )}
      </div>
    </>
  );
};

export default BudgetPerDay;
