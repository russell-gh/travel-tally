import { useSelector } from "react-redux";
import { addDecimals } from "../../utils/utils";
import dayjs from "dayjs";
import { selectFilter } from "../../redux/homeSlice";
import { getBudget } from "../../utils/utils";

const StillTravellingInfo = ({ endDate }) => {
  const filter = useSelector(selectFilter);

  return (
    <div className="containerTravellingInfo">
      <p>Days left: {endDate.diff(dayjs(), "day")} days</p>
    </div>
  );
};

export default StillTravellingInfo;
