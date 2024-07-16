import Expenses from "./Expenses";
import BillSplits from "./BillSplits";
import { useState } from "react";
import Button from "../../reusable-code/Button";
import { toggleDisplay } from "../../redux/homeSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectShowBillSplits } from "../../redux/homeSlice";
import ShowPaidSplitBills from "./ShowPaidSplitBills";
import { includesFutureExpenses } from "../../utils/utilsDates";
import ShowFutureExpenses from "./filter/ShowFutureExpenses";

const ExpensesAndSplits = ({
  filtered,
  expenses,
  homeCurrencySymbol,
  splits,
}) => {
  const dispatch = useDispatch();
  const showBillSplits = useSelector(selectShowBillSplits);

  const includesFuture = includesFutureExpenses(expenses);

  return (
    <div
      className={`containerExpensesAndSplits ${
        includesFuture ? "" : "noCheckbox"
      }`}
    >
      {showBillSplits ? (
        <ShowPaidSplitBills />
      ) : includesFuture ? (
        <ShowFutureExpenses />
      ) : (
        ""
      )}
      {splits.length > 0 && (
        <div className="tabsExpensesAndSplitsContainer">
          <Button
            text="Expenses"
            className={`expensesBtn ${!showBillSplits ? "focus" : ""}`}
            onClick={() => {
              dispatch(toggleDisplay({ key: "showBillSplits", value: false }));
            }}
          />
          <Button
            text="Bill splits"
            className={`billSplitBtn ${showBillSplits ? "focus" : ""}`}
            onClick={() => {
              dispatch(toggleDisplay({ key: "showBillSplits", value: true }));
            }}
          />
        </div>
      )}
      {!showBillSplits && (
        <Expenses
          filtered={filtered}
          expenses={expenses}
          homeCurrencySymbol={homeCurrencySymbol}
          splits={splits}
        />
      )}
      {showBillSplits && (
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
