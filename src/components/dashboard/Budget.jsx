import { addDecimals, calculateTotalSpend } from "../../utils/utils";
import { useSelector } from "react-redux";
import { selectFilter } from "../../redux/tripsSlice";
import { getBudget } from "../../utils/utils";
import { ProgressBar } from "react-bootstrap";

const Budget = ({ expenses, homeCurrencySymbol, details }) => {
  const filter = useSelector(selectFilter);

  if (!expenses) {
    return;
  }

  const totalSpend = calculateTotalSpend(expenses);
  const budget = getBudget(details, filter);
  const difference = addDecimals(budget * 100 - totalSpend * 100);

  return (
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
      <ProgressBar>
        <ProgressBar striped variant="success" now={35} key={1} />
        <ProgressBar variant="warning" now={20} key={2} />
        <ProgressBar striped variant="danger" now={10} key={3} />
      </ProgressBar>
    </div>
  );
};

export default Budget;
