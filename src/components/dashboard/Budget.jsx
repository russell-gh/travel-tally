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

const Budget = ({ expenses, homeCurrencySymbol, details }) => {
  const filter = useSelector(selectFilter);

  const totalSpend = expenses.length === 0 ? 0 : calculateTotalSpend(expenses);
  const budget = getBudget(details, filter);
  const difference = addDecimals(budget * 100 - totalSpend * 100);

  return (
    <>
      <div className="chartAll">
        <CategoryGauge budget={budget} spend={totalSpend} />
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
