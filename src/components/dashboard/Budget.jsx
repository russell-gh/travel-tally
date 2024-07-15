import {
  addDecimals,
  calculateTotalSpend,
  getBudget,
} from "../../utils/utilsBudget";
import { useSelector } from "react-redux";
import { selectFilter } from "../../redux/homeSlice";
import ControlsAddExpense from "./ControlsAddExpense";
import Difference from "./Difference";
import {
  createDataForCharts,
  createDateIncludingOwed,
} from "../../utils/createDataForCharts";
import ChartBudget from "./ChartBudget";
import { useMemo, useState } from "react";
import CheckboxChartIncludingOwed from "./CheckboxChartIncludingOwed";
import ChartIncludingOwed from "./ChartIncludingOwed";

const Budget = ({
  expenses,
  homeCurrencySymbol,
  details,
  expensesCategories,
  splits,
}) => {
  const filter = useSelector(selectFilter);
  const [includeOwed, setIncludeOwed] = useState(false);

  const dataChart = useMemo(() => {
    return createDataForCharts(details, expenses, splits);
  }, [details, expenses]);
  const dataChartIncludingOwed = useMemo(() => {
    return createDateIncludingOwed(splits, expenses, dataChart);
  }, [splits, expenses, dataChart]);

  const totalSpend =
    expensesCategories.length === 0
      ? 0
      : calculateTotalSpend(expensesCategories, splits);
  const budget = getBudget(details, filter);
  const difference = addDecimals(budget * 100 - totalSpend * 100);

  const chartWithoutOwed = useMemo(() => {
    return <ChartBudget dataChart={dataChart} />;
  }, [dataChart]);

  const chartWithOwed = useMemo(() => {
    return <ChartIncludingOwed dataChart={dataChartIncludingOwed} />;
  }, [dataChartIncludingOwed]);

  const toggleIncludeOwed = () => {
    setIncludeOwed(!includeOwed);
  };

  return (
    <>
      <div className="chart">
        {includeOwed ? chartWithOwed : chartWithoutOwed}
        {splits.length > 0 && (
          <CheckboxChartIncludingOwed toggleIncludeOwed={toggleIncludeOwed} />
        )}
      </div>
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
