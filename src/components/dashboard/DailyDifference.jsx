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
            Overspend: {homeCurrencySymbol}
            {Math.abs(difference).toFixed(2)}
          </>
        ) : (
          <>
            Money left: {homeCurrencySymbol}
            {difference}
          </>
        )}
      </p>
    </>
  );
};

export default DailyDifference;
