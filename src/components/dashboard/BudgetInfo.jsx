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
  actualStartDate,
  actualEndDate,
}) => {
  // converts and calculates days traveling
  startDate = dayjs(startDate);
  endDate = dayjs(endDate);
  const stillTravelling =
    dayjs().isBefore(endDate) && startDate.isBefore(dayjs());
  const amountOfBudgetDays =
    dayjs(actualEndDate).diff(dayjs(actualStartDate), "day") + 1;
  const amountOfDays = endDate.diff(startDate, "day") + 1;

  ("containerBudget");
  return (
    <div
      className={
        stillTravelling ? "containerBudgetWhilst" : "containerBudgetAfter"
      }
    >
      <Budget
        expenses={expenses}
        details={details}
        homeCurrencySymbol={homeCurrencySymbol}
      />
      {/* if today is during traveltime, daily budget is calculated */}
      {stillTravelling && (
        <BudgetPerDay
          expensesArray={expensesArray}
          details={details}
          homeCurrencySymbol={homeCurrencySymbol}
          amountOfBudgetDays={amountOfBudgetDays}
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
