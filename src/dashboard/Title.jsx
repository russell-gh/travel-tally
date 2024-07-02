import { useSelector } from "react-redux";
import { selectTrips } from "../redux/tripsSlice";
import FilterTrip from "./filter/FilterTrip";

const Title = ({ index }) => {
  const trips = useSelector(selectTrips);

  if (!trips) {
    return;
  }

  return (
    <div>
      <h1>{trips[index].details.destination}</h1>
      <FilterTrip />
    </div>
  );
};

export default Title;
