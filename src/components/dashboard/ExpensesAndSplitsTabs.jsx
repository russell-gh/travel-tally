import { useDispatch } from "react-redux";

const ExpensesAndSplitsTabs = ({ showBillSplits, toggleDisplay }) => {
  const dispatch = useDispatch();

  return (
    <div className="tabsExpensesAndSplitsContainer">
      <button
        className={`expensesBtn ${!showBillSplits ? "focus" : ""}`}
        onClick={() => {
          dispatch(toggleDisplay({ key: "showBillSplits", value: false }));
        }}
      >
        <span>Expenses</span>
      </button>
      <button
        className={`billSplitBtn ${showBillSplits ? "focus" : ""}`}
        onClick={() => {
          dispatch(toggleDisplay({ key: "showBillSplits", value: true }));
        }}
      >
        <span>Bill splits</span>
      </button>
    </div>
  );
};

export default ExpensesAndSplitsTabs;
