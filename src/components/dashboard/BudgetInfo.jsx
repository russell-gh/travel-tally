import Budget from "./Budget";
import TripInfo from "./TripInfo";
import BudgetPerDay from "./BudgetPerDay";
import dayjs from "dayjs";

const BudgetInfo = ({
  expenses,
  details,
  homeCurrencySymbol,
  startDate,
  endDate,
  expensesArray,
}) => {
  // converts and calculates days traveling
  startDate = dayjs(startDate);
  endDate = dayjs(endDate);
  const amountOfDays = endDate.diff(startDate, "day") + 1;

  return (
    <div className="containerBudget">
      <Budget
        expenses={expenses}
        details={details}
        homeCurrencySymbol={homeCurrencySymbol}
      />
      {/* if today is during traveltime, daily budget is calculated */}
      {dayjs().isBefore(endDate) && startDate.isBefore(dayjs()) && (
        <BudgetPerDay
          expensesArray={expensesArray}
          details={details}
          homeCurrencySymbol={homeCurrencySymbol}
          amountOfDays={amountOfDays}
          startDate={startDate}
          endDate={endDate}
        />
      )}
      <TripInfo
        startDate={startDate}
        endDate={endDate}
        details={details}
        amountOfDays={amountOfDays}
      />
    </div>
  );
};

export default BudgetInfo;
