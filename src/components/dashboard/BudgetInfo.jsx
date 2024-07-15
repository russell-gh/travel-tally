import Budget from "./Budget";
import { useState } from "react";
import BudgetPerDay from "./BudgetPerDay";
import dayjs from "dayjs";
import Button from "../../reusable-code/Button";

const BudgetInfo = ({
  expenses,
  expensesCategories,
  details,
  homeCurrencySymbol,
  expensesArray,
  actualStartDate,
  actualEndDate,
  startDate,
  endDate,
  splits,
}) => {
  const [display, setDisplay] = useState("totalBudget");
  // converts and calculates days traveling
  startDate = dayjs(startDate);
  endDate = dayjs(endDate);
  const stillTravelling =
    dayjs().isBefore(endDate) && startDate.isBefore(dayjs());
  const amountOfBudgetDays =
    dayjs(actualEndDate).diff(dayjs(actualStartDate), "day") + 1;

  const changeDisplay = (input) => {
    setDisplay(input);
  };

  return (
    <div
      className={`containerBudget ${
        stillTravelling ? "containerBudgetWhilst" : "containerBudgetAfter"
      }`}
    >
      {!stillTravelling && (
        <Budget
          expenses={expenses}
          expensesCategories={expensesCategories}
          details={details}
          homeCurrencySymbol={homeCurrencySymbol}
          splits={splits}
        />
      )}
      {stillTravelling && (
        <>
          <Button
            text="Total budget"
            className={`totalBudgetBtn ${
              display === "totalBudget" ? "focus" : ""
            }`}
            onClick={() => changeDisplay("totalBudget")}
          />
          <Button
            text="Daily budget"
            className={`dailyBudgetBtn ${
              display === "dailyBudget" ? "focus" : ""
            }`}
            onClick={() => changeDisplay("dailyBudget")}
          />
        </>
      )}
      {display === "totalBudget" && (
        <Budget
          expenses={expenses}
          expensesCategories={expensesCategories}
          details={details}
          homeCurrencySymbol={homeCurrencySymbol}
          splits={splits}
        />
      )}
      {/* if today is during traveltime, daily budget is calculated */}
      {stillTravelling && display === "dailyBudget" && (
        <BudgetPerDay
          expensesArray={expensesArray}
          details={details}
          homeCurrencySymbol={homeCurrencySymbol}
          amountOfBudgetDays={amountOfBudgetDays}
          actualEndDate={actualEndDate}
          actualStartDate={actualStartDate}
          expenses={expenses}
          splits={splits}
        />
      )}
    </div>
  );
};

export default BudgetInfo;
