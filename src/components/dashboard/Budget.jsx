import { addDecimals, calculateTotalSpend } from "../../utils/utils";
import { useSelector } from "react-redux";
import { selectFilter } from "../../redux/homeSlice";
import { getBudget } from "../../utils/utils";
import BudgetPieChart from "./BudgetPieChart";
import CategoryGauge from "./CategoryGauge";
import { useMemo } from "react";

const Budget = ({ expenses, homeCurrencySymbol, details }) => {
  const filter = useSelector(selectFilter);

  if (!expenses) {
    return;
  }

  // const totalSpend = useMemo(() => {
  //   calculateTotalSpend(expenses);
  // }, [expenses]);
  // const budget = useMemo(() => {
  //   getBudget(details, filter);
  // }, [details, filter]);
  // const difference = useMemo(() => {
  //   addDecimals(budget * 100 - totalSpend * 100);
  // }, [budget, totalSpend]);

  const totalSpend = calculateTotalSpend(expenses);
  const budget = getBudget(details, filter);
  const difference = addDecimals(budget * 100 - totalSpend * 100);

  return (
    <>
      <div className="chart">
        {filter === "Show All" ? (
          <BudgetPieChart details={details} />
        ) : (
          <CategoryGauge budget={budget} spend={totalSpend} />
        )}
      </div>
      <div className="budget">
        <p>
          Spend: {homeCurrencySymbol}
          {totalSpend}
        </p>
        <p>
          Budget: {homeCurrencySymbol}
          {budget}
        </p>
        {difference > 0 ? (
          <p className="positive">
            Money left: {homeCurrencySymbol}
            {difference}
          </p>
        ) : (
          <p className="negative">
            Overspend: {homeCurrencySymbol}
            {Math.abs(difference)}
          </p>
        )}
      </div>
    </>
  );
};

export default Budget;
