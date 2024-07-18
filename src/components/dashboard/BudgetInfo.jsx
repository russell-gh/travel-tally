import Budget from "./Budget";
import { useState } from "react";
import BudgetPerDay from "./BudgetPerDay";
import dayjs from "dayjs";
import Button from "../../reusable-code/Button";
import { useSelector } from "react-redux";
import { selectShowBillSplits } from "../../redux/homeSlice";
import InfoBillSplits from "./InfoBillSplits";
import { useEffect } from "react";

const BudgetInfo = ({
  expenses,
  expensesCategories,
  details,
  homeCurrencySymbol,
  actualStartDate,
  actualEndDate,
  startDate,
  endDate,
  splits,
  dataSpendPerDay,
  amountOfBudgetDays,
}) => {
  const [display, setDisplay] = useState("totalBudget");
  const showBillSplits = useSelector(selectShowBillSplits);

  // converts and calculates if still travelling
  startDate = dayjs(startDate);
  endDate = dayjs(endDate);
  const stillTravelling =
    dayjs().isBefore(endDate) && startDate.isBefore(dayjs());

  const changeDisplay = (input) => {
    setDisplay(input);
  };

  // make sure you can only see dailybudget and bill split when you are in the right tab
  useEffect(() => {
    if (showBillSplits && display === "dailyBudget") {
      setDisplay("totalBudget");
    }
    if (!showBillSplits && display === "billSplits") {
      setDisplay("totalBudget");
    }
  }, [showBillSplits, display]);

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
          {showBillSplits ? (
            <Button
              text="Bill splits"
              className={`billSplitsGraphBtn ${
                display === "billSplits" ? "focus" : ""
              }`}
              onClick={() => changeDisplay("billSplits")}
            />
          ) : (
            <Button
              text="Daily budget"
              className={`dailyBudgetBtn ${
                display === "dailyBudget" ? "focus" : ""
              }`}
              onClick={() => changeDisplay("dailyBudget")}
            />
          )}
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
      {display === "billSplits" && (
        <InfoBillSplits
          splits={splits}
          homeCurrencySymbol={homeCurrencySymbol}
        />
      )}
      {/* if today is during traveltime, daily budget is calculated */}
      {stillTravelling && display === "dailyBudget" && (
        <BudgetPerDay
          dataSpendPerDay={dataSpendPerDay}
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
