const TabsBudget = ({ changeDisplay, display, showBillSplits }) => {
  return (
    <>
      <button
        className={`totalBudgetBtn ${display === "totalBudget" ? "focus" : ""}`}
        onClick={() => changeDisplay("totalBudget")}
      >
        <span>Total budget</span>
      </button>
      {showBillSplits ? (
        <button
          className={`billSplitsGraphBtn ${
            display === "billSplits" ? "focus" : ""
          }`}
          onClick={() => changeDisplay("billSplits")}
        >
          <span>Bill splits</span>
        </button>
      ) : (
        <button
          className={`dailyBudgetBtn ${
            display === "dailyBudget" ? "focus" : ""
          }`}
          onClick={() => changeDisplay("dailyBudget")}
        >
          <span>Daily budget</span>
        </button>
      )}
    </>
  );
};

export default TabsBudget;
