import { useSelector } from "react-redux";
import { selectTrips } from "../../redux/tripsSlice";
import FilterTrip from "./filter/FilterTrip";

const Title = ({ destination }) => {
  const trips = useSelector(selectTrips);

  if (!trips) {
    return;
  }

  return (
    <div>
      <h1>{destination}</h1>
      <FilterTrip />
    </div>
  );
};

export default Title;
