import {
  addDecimals,
  calculateTotalSpend,
  getBudget,
} from "../../utils/utilsBudget";
import { useSelector } from "react-redux";
import { selectFilter } from "../../redux/homeSlice";
import CategoryGauge from "./CategoryGauge";
import ControlsAddExpense from "./ControlsAddExpense";
import Difference from "./Difference";
import { createDataForCharts } from "../../utils/createDataForCharts";
import ChartBudget from "./ChartBudget";

const Budget = ({
  expenses,
  homeCurrencySymbol,
  details,
  expensesCategories,
}) => {
  const filter = useSelector(selectFilter);
  const dataChart = createDataForCharts(details, expenses);

  const totalSpend =
    expensesCategories.length === 0
      ? 0
      : calculateTotalSpend(expensesCategories);
  const budget = getBudget(details, filter);
  const difference = addDecimals(budget * 100 - totalSpend * 100);

  return (
    <>
      <div className="chart">
        <ChartBudget dataChart={dataChart} />
        {/* <CategoryGauge budget={budget} spend={totalSpend} /> */}
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
