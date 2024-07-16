import {
  addDecimals,
  getSpendPerDay,
  getBudget,
  getSpendSelectedDay,
} from "../../utils/utilsBudget";
import { useSelector } from "react-redux";
import { selectFilter, selectFilterDate } from "../../redux/homeSlice";
import DailyDifference from "./Difference";
import CummulativeDifference from "./CummulativeDifference";
import ControlsAddExpense from "./ControlsAddExpense";
import { createDataForCharts } from "../../utils/createDataForCharts";
import ChartBudget from "./ChartBudget";
import { useMemo } from "react";

const BudgetPerDay = ({
  dataSpendPerDay,
  homeCurrencySymbol,
  details,
  amountOfBudgetDays,
  actualEndDate,
  actualStartDate,
  expenses,
  splits,
}) => {
  const filter = useSelector(selectFilter);
  const filterDate = useSelector(selectFilterDate);

  const budget = getBudget(details, filter);
  const budgetPerDay = addDecimals((budget * 100) / amountOfBudgetDays);

  const selectedDay = useMemo(() => {
    return getSpendSelectedDay(dataSpendPerDay, filterDate, budgetPerDay);
  }, [dataSpendPerDay, filterDate, budgetPerDay]);

  const difference = addDecimals(
    budgetPerDay * 100 - selectedDay.totalSpendPerDay
  );

  const dataChart = useMemo(() => {
    return createDataForCharts(
      details,
      expenses,
      splits,
      filterDate,
      actualEndDate,
      actualStartDate,
      amountOfBudgetDays
    );
  }, [
    details,
    expenses,
    filterDate,
    actualEndDate,
    actualStartDate,
    amountOfBudgetDays,
  ]);

  const component = useMemo(() => {
    return <ChartBudget dataChart={dataChart} />;
  }, [dataChart]);

  return (
    <>
      <div className="chart">{component}</div>
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
