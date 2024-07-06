import dayjs from "dayjs";
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
    </div>
  );
};

export default TripInfo;
