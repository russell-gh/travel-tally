import Budget from "./Budget";
import TripInfo from "./TripInfo";

const BudgetInfo = ({
  expenses,
  details,
  homeCurrencySymbol,
  startDate,
  endDate,
}) => {
  return (
    <div className="containerBudget">
      <Budget
        expenses={expenses}
        details={details}
        homeCurrencySymbol={homeCurrencySymbol}
      />
      <TripInfo startDate={startDate} endDate={endDate} details={details} />
    </div>
  );
};

export default BudgetInfo;
