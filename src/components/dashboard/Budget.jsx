import {
  addDecimals,
  calculateTotalSpend,
  getBudget,
} from "../../utils/utilsBudget";
import { useSelector } from "react-redux";
import { selectFilter } from "../../redux/homeSlice";
import ControlsAddExpense from "./ControlsAddExpense";
import Difference from "./Difference";
import { createDataForCharts } from "../../utils/createDataForCharts";
import ChartBudget from "./ChartBudget";
import { useMemo } from "react";

const Budget = ({
  expenses,
  homeCurrencySymbol,
  details,
  expensesCategories,
}) => {
  const filter = useSelector(selectFilter);

  const dataChart = useMemo(() => {
    return createDataForCharts(details, expenses);
  }, [details, expenses]);

  const totalSpend =
    expensesCategories.length === 0
      ? 0
      : calculateTotalSpend(expensesCategories);
  const budget = getBudget(details, filter);
  const difference = addDecimals(budget * 100 - totalSpend * 100);

  const component = useMemo(() => {
    return <ChartBudget dataChart={dataChart} />;
  }, [dataChart]);

  return (
    <>
      <div className="chart">{component}</div>
      <div className="containerBottomRowGrid">
        <div className="budget">
          <p>Budget: </p>
          <p className="bold">
            {homeCurrencySymbol}
            {budget}
          </p>
          <p>Spend: </p>
          <p className="bold">
            {homeCurrencySymbol}
            {totalSpend}
          </p>
          <Difference
            homeCurrencySymbol={homeCurrencySymbol}
            difference={difference}
          />
        </div>
        <ControlsAddExpense />
      </div>
    </>
  );
};
export default Budget;
