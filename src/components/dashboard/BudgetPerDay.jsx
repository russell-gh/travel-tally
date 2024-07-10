import {
  addDecimals,
  getSpendPerDay,
  getBudget,
  getSpendSelectedDay,
} from "../../utils/utilsBudget";
import { useSelector } from "react-redux";
import { selectFilter, selectFilterDate } from "../../redux/homeSlice";
import CategoryGauge from "./CategoryGauge";
import DailyDifference from "./Difference";
import CummulativeDifference from "./CummulativeDifference";
import ControlsAddExpense from "./ControlsAddExpense";
import ChartAll from "./ChartAll";
import { createDailyDataforCharts } from "../../utils/createDataForCharts";

const BudgetPerDay = ({
  expensesArray,
  homeCurrencySymbol,
  details,
  amountOfBudgetDays,
}) => {
  console.log(expensesArray);
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
  console.log(data);

  createDailyDataforCharts();

  return (
    <>
      <div className="chartDay">
        {/* <ChartAll /> */}
        {/* <CategoryGauge
          budget={budgetPerDay}
          spend={addDecimals(selectedDay.totalSpendPerDay)}
        /> */}
      </div>
      <div className="containerBottomRowGrid">
        <div className="dayBudget">
          <p>Budget per day: </p>
          <p className="bold">
            {homeCurrencySymbol}
            {budgetPerDay}
          </p>
          <p>Spend Today: </p>
          <p className="bold">
            {homeCurrencySymbol}
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
        <ControlsAddExpense />
      </div>
    </>
  );
};

export default BudgetPerDay;
