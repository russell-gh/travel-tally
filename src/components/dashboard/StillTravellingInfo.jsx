import { useSelector } from "react-redux";
import { addDecimals } from "../../utils/utils";
import dayjs from "dayjs";
import { selectFilter } from "../../redux/homeSlice";
import { getBudget } from "../../utils/utils";

const StillTravellingInfo = ({ endDate, details, amountOfDays }) => {
  const { homeCurrencySymbol } = details;
  const filter = useSelector(selectFilter);

  const budget = getBudget(details, filter);

  return (
    <div className="containerTravellingInfo">
      <p>Days left: {endDate.diff(dayjs(), "day")} days</p>
      <p>
        Budget per day: {homeCurrencySymbol}
        {addDecimals((budget * 100) / amountOfDays)}
      </p>
    </div>
  );
};

export default StillTravellingInfo;
