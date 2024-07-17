import Message from "../../reusable-code/Message";
import { useSelector } from "react-redux";
import { selectTrips } from "../../redux/homeSlice";
import Dashboard from "./Dashboard";
import { selectUser } from "../../redux/onboardingSlice";
import { useNavigate } from "react-router-dom";

const CheckTrips = () => {
  const trips = useSelector(selectTrips);
  const user = useSelector(selectUser);
  const redirect = useNavigate();

  if (!user || user.length === 0) {
    redirect("/login");
  }

  if (!trips || trips.length === 0) {
    return <Message message="Loading...." />;
  }

  return <Dashboard />;
};

export default CheckTrips;
