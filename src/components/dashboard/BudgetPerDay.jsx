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
  amountOfBudgetDays,
}) => {
  const filter = useSelector(selectFilter);
  const filterDate = useSelector(selectFilterDate);
  const budget = getBudget(details, filter);
  const budgetPerDay = addDecimals((budget * 100) / amountOfBudgetDays);
  const data = getSpendPerDay(
    (budget * 100) / amountOfBudgetDays,
    expensesArray
  );
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
          Budget per day:{" "}
          <span className="bold">
            {homeCurrencySymbol}
            {budgetPerDay}
          </span>
        </p>
        <p>
          Spend Today:{" "}
          <span className="bold">
            {homeCurrencySymbol}
            {addDecimals(selectedDay.totalSpendPerDay)}
          </span>
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
