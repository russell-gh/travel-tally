import {
  addDecimals,
  calculateTotalSpend,
  getSpendPerDay,
} from "../../utils/utils";
import { useSelector } from "react-redux";
import { selectFilter } from "../../redux/homeSlice";
import { getBudget } from "../../utils/utils";
import BudgetPieChart from "./BudgetPieChart";
import CategoryGauge from "./CategoryGauge";
import dayjs from "dayjs";
import { getSpendToday } from "../../utils/utils";

const BudgetPerDay = ({
  expensesArray,
  homeCurrencySymbol,
  details,
  amountOfDays,
  startDate,
  endDate,
}) => {
  const filter = useSelector(selectFilter);
  const totalSpend = getSpendToday(startDate, expensesArray);
  const budget = getBudget(details, filter);
  const budgetPerDay = addDecimals((budget * 100) / amountOfDays);
  const difference = addDecimals(budgetPerDay * 100 - totalSpend * 100);
  getSpendPerDay((budget * 100) / amountOfDays, expensesArray);

  return (
    <div className="dayBudget">
      <p>
        Budget per day: {homeCurrencySymbol}
        {budgetPerDay}
      </p>
      <p>
        Spend Today: {homeCurrencySymbol}
        {totalSpend}
      </p>
      {difference < 0 ? (
        <p className="negative">
          Overspend: {homeCurrencySymbol}
          {Math.abs(difference).toFixed(2)}
        </p>
      ) : (
        <p className="positive">
          Money left: {homeCurrencySymbol}
          {difference}
        </p>
      )}
      {/* {difference > 0 ? (
        <p className="positive">
          Saved previous days: {homeCurrencySymbol}
          {difference}
        </p>
      ) : (
        <p className="negative">
          Overspend previous days: {homeCurrencySymbol}
          {Math.abs(difference)}
        </p>
      )} */}
    </div>
  );
};

export default BudgetPerDay;
