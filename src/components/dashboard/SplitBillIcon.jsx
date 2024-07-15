const SplitBillIcon = ({ toggleDisplaySplit, expenseId }) => {
  return (
    <div
      className="containerIcon"
      onClick={() => {
        toggleDisplaySplit(expenseId);
      }}
    >
      <img
        src={`../src/img/split-bill.svg`}
        alt={`split bill icon`}
        className="splitBillIcon"
      />
    </div>
  );
};

export default SplitBillIcon;
