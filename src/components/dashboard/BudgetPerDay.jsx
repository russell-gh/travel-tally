import {
  addDecimals,
  getSpendPerDay,
  getBudget,
  getSpendSelectedDay,
} from "../../utils/utilsBudget";
import { useSelector } from "react-redux";
import { selectFilter, selectFilterDate } from "../../redux/homeSlice";
import CategoryGauge from "./CategoryGauge";
import DailyDifference from "./DailyDifference";
import CummulativeDifference from "./CummulativeDifference";

const BudgetPerDay = ({
  expensesArray,
  homeCurrencySymbol,
  details,
  amountOfDays,
}) => {
  const filter = useSelector(selectFilter);
  const filterDate = useSelector(selectFilterDate);

  const budget = getBudget(details, filter);
  const budgetPerDay = addDecimals((budget * 100) / amountOfDays);
  const data = getSpendPerDay((budget * 100) / amountOfDays, expensesArray);
  const selectedDay = getSpendSelectedDay(data, filterDate, budgetPerDay);
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
        <DailyDifference
          homeCurrencySymbol={homeCurrencySymbol}
          difference={difference}
        />
        <CummulativeDifference
          homeCurrencySymbol={homeCurrencySymbol}
          selectedDay={selectedDay}
        />
      </div>
    </>
  );
};

export default BudgetPerDay;