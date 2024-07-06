import dayjs from "dayjs";
import { addDecimals } from "../../utils/utilsBudget";
import StillTravellingInfo from "./StillTravellingInfo";

const TripInfo = ({ startDate, endDate, details, amountOfDays }) => {
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
