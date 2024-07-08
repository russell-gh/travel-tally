const DailyDifference = ({ homeCurrencySymbol, difference }) => {
  return (
    <>
      <p
        className={
          difference > 0
            ? "positive"
            : difference === 0
            ? "neutral"
            : "negative"
        }
      >
        {difference < 0 ? (
          <>
            Overspend:{" "}
            <span className="bold">
              {homeCurrencySymbol}
              {Math.abs(difference).toFixed(2)}
            </span>
          </>
        ) : (
          <>
            Money left:{" "}
            <span className="bold">
              {homeCurrencySymbol}
              {difference}
            </span>
          </>
        )}
      </p>
    </>
  );
};

export default DailyDifference;
