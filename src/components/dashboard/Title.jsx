import { useSelector } from "react-redux";
import { selectTrips } from "../../redux/homeSlice";
import FilterTrip from "./filter/FilterTrip";
import dayjs from "dayjs";

const Title = ({ destination, startDate, endDate }) => {
  const trips = useSelector(selectTrips);
  startDate = dayjs(startDate);
  endDate = dayjs(endDate);

  if (!trips) {
    return;
  }

  return (
    <div>
      <div className="containerTitle">
        <h1>{destination}</h1>
        <p>
          {dayjs().isBefore(endDate) &&
            startDate.isBefore(dayjs()) &&
            `Travelling`}
        </p>
      </div>
      <FilterTrip />
    </div>
  );
};

export default Title;
