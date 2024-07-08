import { addDecimals } from "../../utils/utilsBudget";

const CummulativeDifference = ({ homeCurrencySymbol, selectedDay }) => {
  return (
    <>
      <p
        className={
          selectedDay.cumulativeDifference > 0
            ? "positive"
            : selectedDay.cumulativeDifference === 0
            ? "neutral"
            : "negative"
        }
      >
        {selectedDay.cumulativeDifference < 0 ? (
          <>
            Overspend previous days:{" "}
            <span className="bold">
              {homeCurrencySymbol}
              {Math.abs(selectedDay.cumulativeDifference / 100).toFixed(2)}
            </span>
          </>
        ) : (
          <>
            Saved previous days:{" "}
            <span className="bold">
              {homeCurrencySymbol}
              {addDecimals(selectedDay.cumulativeDifference)}
            </span>
          </>
        )}
      </p>
    </>
  );
};

export default CummulativeDifference;
