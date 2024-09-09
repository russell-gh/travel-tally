import { useSelector } from "react-redux";
import { selectTrips } from "../../redux/homeSlice";
import FilterTrip from "./filter/FilterTrip";
import dayjs from "dayjs";
import TripInfo from "./TripInfo";

const Title = ({ destination, startDate, endDate, details }) => {
  const trips = useSelector(selectTrips);

  startDate = dayjs(startDate);
  endDate = dayjs(endDate);
  const amountOfDays = endDate.diff(startDate, "day") + 1;

  if (!trips) {
    return;
  }

  return (
    <div className="containerTop">
      <div className="containerTrips">
        <FilterTrip />
        {dayjs().isBefore(endDate) && startDate.isBefore(dayjs()) && (
          <img
            src="/travelling.svg"
            alt="plane icon"
            className="travellingIcon"
          />
        )}
      </div>
      <TripInfo
        startDate={startDate}
        endDate={endDate}
        details={details}
        amountOfDays={amountOfDays}
      />
    </div>
  );
};

export default Title;
