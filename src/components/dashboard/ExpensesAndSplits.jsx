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
      <>
        <Button
          text="Expenses"
          animation="animation"
          className={`expensesBtn ${display === "expenses" ? "focus" : ""}`}
          onClick={() => changeDisplay("expenses")}
        />
        <Button
          text="Bill splits"
          animation="animation"
          className={`billSplitBtn ${display === "billSplit" ? "focus" : ""}`}
          onClick={() => changeDisplay("billSplit")}
        />
      </>

      <Expenses
        filtered={filtered}
        expenses={expenses}
        homeCurrencySymbol={homeCurrencySymbol}
        splits={splits}
      />
      <BillSplits
        splits={splits}
        homeCurrencySymbol={homeCurrencySymbol}
        expenses={expenses}
        filtered={filtered}
      />
    </div>
  );
};

export default ExpensesAndSplits;
