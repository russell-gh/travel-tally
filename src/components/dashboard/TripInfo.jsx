import dayjs from "dayjs";
import { addDecimals } from "../../utils/utils";
import StillTravellingInfo from "./StillTravellingInfo";

const TripInfo = ({ startDate, endDate, details }) => {
  // converts and calculates days traveling
  startDate = dayjs(startDate);
  endDate = dayjs(endDate);
  const amountOfDays = endDate.diff(startDate, "day") + 1;

  return (
    <div className="tripInfo">
      <p>Travel time: {amountOfDays} days</p>
      {dayjs().isBefore(endDate) && startDate.isBefore(dayjs()) && (
        <StillTravellingInfo
          endDate={endDate}
          details={details}
          amountOfDays={amountOfDays}
        />
      )}
      {/* checks if today is during the traveltime and creates extra info in case of true */}
    </div>
  );
};

export default TripInfo;
