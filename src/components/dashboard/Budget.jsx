import {
  addDecimals,
  calculateTotalSpend,
  getBudget,
} from "../../utils/utilsBudget";
import { useSelector } from "react-redux";
import { selectFilter } from "../../redux/homeSlice";
import CategoryGauge from "./CategoryGauge";
import ControlsAddExpense from "./ControlsAddExpense";

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
          <p>
            Budget:{" "}
            <span className="bold">
              {homeCurrencySymbol}
              {budget}
            </span>
          </p>
          <p>
            Spend:{" "}
            <span className="bold">
              {homeCurrencySymbol}
              {totalSpend}
            </span>
          </p>
          <p
            className={
              difference < 0
                ? "negative"
                : difference === 0
                ? "neutral"
                : "positive"
            }
          >
            {difference < 0 ? (
              <>
                Overspend:{" "}
                <span className="bold">
                  {homeCurrencySymbol}
                  {Math.abs(difference).toFixed(2)}
                </span>
              </>
            ) : (
              <>
                Money left:{" "}
                <span className="bold">
                  {homeCurrencySymbol}
                  {difference}
                </span>
              </>
            )}
          </p>
        </div>
        <ControlsAddExpense />
      </div>
    </>
  );
};

export default Budget;
