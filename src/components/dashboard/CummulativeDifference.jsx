import { addDecimals } from "../../utils/utilsBudget";

const CummulativeDifference = ({ homeCurrencySymbol, selectedDay }) => {
  return (
    <>
      {selectedDay.cumulativeDifference < 0 ? (
        <>
          <p className="negative">Previously overspend:</p>
          <p className="bold negative">
            {homeCurrencySymbol}
            {Math.abs(selectedDay.cumulativeDifference / 100).toFixed(2)}
          </p>
        </>
      ) : (
        <>
          <p
            className={
              selectedDay.cumulativeDifference === 0 ? "neutral" : "positive"
            }
          >
            Previously saved:
          </p>
          <p
            className={`bold ${
              selectedDay.cumulativeDifference === 0 ? "neutral" : "positive"
            }`}
          >
            {homeCurrencySymbol}
            {addDecimals(selectedDay.cumulativeDifference)}
          </p>
        </>
      )}
    </>
  );
};

export default CummulativeDifference;
