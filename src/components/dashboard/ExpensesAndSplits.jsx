import Expenses from "./Expenses";
import BillSplits from "./BillSplits";
import Button from "../../reusable-code/Button";
import { toggleDisplay, selectShowBillSplits } from "../../redux/homeSlice";
import { useDispatch, useSelector } from "react-redux";
import ShowPaidSplitBills from "./ShowPaidSplitBills";
import { includesFutureExpenses } from "../../utils/utilsDates";
import ShowFutureExpenses from "./filter/ShowFutureExpenses";
import { useEffect, useState } from "react";

const ExpensesAndSplits = ({
  filtered,
  expenses,
  homeCurrencySymbol,
  splits,
}) => {
  const dispatch = useDispatch();
  const showBillSplits = useSelector(selectShowBillSplits);

  const includesFuture = includesFutureExpenses(expenses);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
          width={windowWidth}
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
