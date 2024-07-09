const Difference = ({ homeCurrencySymbol, difference }) => {
  return (
    <>
      {difference < 0 ? (
        <>
          <p className="negative">Overspend:</p>
          <p className="bold negative">
            {homeCurrencySymbol}
            {Math.abs(difference).toFixed(2)}
          </p>
        </>
      ) : (
        <>
          <p className={difference === 0 ? "neutral" : "positive"}>
            Money left:
          </p>
          <p className={`bold ${difference === 0 ? "neutral" : "positive"}`}>
            {homeCurrencySymbol}
            {difference}
          </p>
        </>
      )}
    </>
  );
};

export default Difference;
