import Budget from "./Budget";
import { useState } from "react";
import BudgetPerDay from "./BudgetPerDay";
import dayjs from "dayjs";
import Button from "../../reusable-code/Button";

const BudgetInfo = ({
  expenses,
  details,
  homeCurrencySymbol,
  expensesArray,
  actualStartDate,
  actualEndDate,
  startDate,
  endDate,
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
          details={details}
          homeCurrencySymbol={homeCurrencySymbol}
        />
      )}
      {/* if today is during traveltime, daily budget is calculated */}
      {stillTravelling && display === "dailyBudget" && (
        <BudgetPerDay
          expensesArray={expensesArray}
          details={details}
          homeCurrencySymbol={homeCurrencySymbol}
          amountOfBudgetDays={amountOfBudgetDays}
        />
      )}
    </div>
  );
};

export default BudgetInfo;
