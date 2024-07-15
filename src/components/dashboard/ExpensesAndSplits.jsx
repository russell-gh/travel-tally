import Expenses from "./Expenses";
import BillSplits from "./BillSplits";
import { useState } from "react";
import Button from "../../reusable-code/Button";

const ExpensesAndSplits = ({
  filtered,
  expenses,
  homeCurrencySymbol,
  splits,
}) => {
  const [display, setDisplay] = useState("expenses");

  const changeDisplay = (input) => {
    setDisplay(input);
  };

  return (
    <div className="containerExpensesAndSplits">
      <div className="tabsExpensesAndSplitsContainer">
        <Button
          text="Expenses"
          className={`expensesBtn ${display === "expenses" ? "focus" : ""}`}
          onClick={() => changeDisplay("expenses")}
        />
        <Button
          text="Bill splits"
          className={`billSplitBtn ${display === "billSplit" ? "focus" : ""}`}
          onClick={() => changeDisplay("billSplit")}
        />
      </div>

      {display === "expenses" && (
        <Expenses
          filtered={filtered}
          expenses={expenses}
          homeCurrencySymbol={homeCurrencySymbol}
          splits={splits}
        />
      )}
      {display === "billSplit" && (
        <BillSplits
          splits={splits}
          homeCurrencySymbol={homeCurrencySymbol}
          expenses={expenses}
          filtered={filtered}
        />
      )}
    </div>
  );
};

export default ExpensesAndSplits;
