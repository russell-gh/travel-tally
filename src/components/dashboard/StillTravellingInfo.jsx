import { addDecimals } from "../../utils/utils";
import dayjs from "dayjs";

const StillTravellingInfo = ({ endDate, details, amountOfDays }) => {
  const { budgetTotal, homeCurrencySymbol } = details;

  return (
    <div className="containerTravellingInfo">
      <p>Days left: {endDate.diff(dayjs(), "day")} days</p>
      <p>
        Budget per day: {homeCurrencySymbol}
        {addDecimals(budgetTotal / amountOfDays)}
      </p>
    </div>
  );
};

export default StillTravellingInfo;
