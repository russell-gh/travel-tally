import Message from "../../reusable-code/Message";
import { useSelector } from "react-redux";
import { selectToken, selectTrips } from "../../redux/homeSlice";
import Dashboard from "./Dashboard";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const CheckTrips = () => {
  const trips = useSelector(selectTrips);
  const token = useSelector(selectToken);
  const redirect = useNavigate();

  useEffect(() => {
    if (!token) {
      redirect("/login");
      return;
    }

    if (!trips || trips.length === 0) {
      redirect("/onboarding");
      return;
    }
  }, [token, trips]);

  if (!token || !trips || trips.length === 0) {
    return <Message message="Loading..." />;
  }

  return <Dashboard />;
};

export default CheckTrips;
