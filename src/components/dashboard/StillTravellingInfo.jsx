import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { selectFilter } from "../../redux/homeSlice";
import { getBudget, addDecimals } from "../../utils/utilsBudget";

const StillTravellingInfo = ({ endDate }) => {
  const filter = useSelector(selectFilter);

  return (
    <div className="containerTravellingInfo">
      <p>Days left: {endDate.diff(dayjs(), "day")} days</p>
    </div>
  );
};

export default StillTravellingInfo;
