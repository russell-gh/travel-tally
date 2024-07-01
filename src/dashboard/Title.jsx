import { useSelector } from "react-redux";
import { selectTravelInfo } from "../redux/expensesSlice";

const Title = () => {
  const travelInfo = useSelector(selectTravelInfo);

  if (!travelInfo || travelInfo.length === 0) {
    return;
  }

  return <h1>{travelInfo.destination}</h1>;
};

export default Title;
