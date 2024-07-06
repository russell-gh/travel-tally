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
            Overspend previous days: {homeCurrencySymbol}
            {Math.abs(selectedDay.cumulativeDifference / 100).toFixed(2)}
          </>
        ) : (
          <>
            Saved previous days: {homeCurrencySymbol}
            {addDecimals(selectedDay.cumulativeDifference)}
          </>
        )}
      </p>
    </>
  );
};

export default CummulativeDifference;
