const SplitBillIcon = ({ toggleDisplaySplit, expenseId }) => {
  return (
    <div
      className="containerIcon"
      onClick={() => {
        toggleDisplaySplit(expenseId);
      }}
    >
      <img
        src={`/split-bill.svg`}
        alt={`split bill icon`}
        className="splitBillIcon"
      />
    </div>
  );
};

export default SplitBillIcon;
