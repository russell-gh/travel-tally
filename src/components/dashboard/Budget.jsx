import {
  addDecimals,
  calculateTotalSpend,
  getBudget,
} from "../../utils/utilsBudget";
import { useSelector } from "react-redux";
import { selectFilter } from "../../redux/homeSlice";
import BudgetPieChart from "./BudgetPieChart";
import CategoryGauge from "./CategoryGauge";

const Budget = ({ expenses, homeCurrencySymbol, details }) => {
  const filter = useSelector(selectFilter);

  const totalSpend = expenses.length === 0 ? 0 : calculateTotalSpend(expenses);
  const budget = getBudget(details, filter);
  const difference = addDecimals(budget * 100 - totalSpend * 100);

  return (
    <>
      <div className="chartAll">
        <p>Total budget</p>
        <CategoryGauge budget={budget} spend={totalSpend} />
        {/* {filter === "Show All" ? (
          <BudgetPieChart details={details} />
        ) : (
          <CategoryGauge budget={budget} spend={totalSpend} />
        )} */}
      </div>
      <div className="budget">
        <p>
          Budget: {homeCurrencySymbol}
          {budget}
        </p>
        <p>
          Spend: {homeCurrencySymbol}
          {totalSpend}
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
      </div>
    </>
  );
};

export default Budget;
