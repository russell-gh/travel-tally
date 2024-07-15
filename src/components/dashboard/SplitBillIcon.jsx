const SplitBillIcon = ({ toggleDisplaySplit }) => {
  return (
    <div
      className="containerIcon"
      onClick={() => {
        toggleDisplaySplit();
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
