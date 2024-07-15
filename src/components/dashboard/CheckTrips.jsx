import Message from "../../reusable-code/Message";
import { useSelector } from "react-redux";
import { selectTrips } from "../../redux/homeSlice";
import Dashboard from "./Dashboard";

const CheckTrips = () => {
  const trips = useSelector(selectTrips);
  if (!trips || trips.length === 0) {
    return <Message message="Loading...." />;
  }

  return <Dashboard />;
};

export default CheckTrips;
