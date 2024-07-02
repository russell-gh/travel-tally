import { useSelector } from "react-redux";
import { selectDestinationId, selectTrips } from "../redux/tripsSlice";
import Button from "../reusable-code/Button";
import { findIndex } from "../utils/utils";
import Budget from "./Budget";
import Expenses from "./Expenses";
import Image from "./Image";
import Title from "./Title";
import Filter from "./filter/Filter";
import FilterDate from "./filter/FilterDate";
import Order from "./filter/order";

const Dashboard = () => {
  const trips = useSelector(selectTrips);
  const destinationId = useSelector(selectDestinationId);

  if (!trips || trips.length === 0) {
    return <p>Loading...</p>;
  }

  const index = findIndex(trips, destinationId);

  return (
    <div className="dashboard">
      <div className="dashboardFixed">
        <Title index={index} />
        <Image src={"../src/img/piechart.png"} alt="piechart" />
        <Budget index={index} />
        <Button className="addExpense" text="Add an expense" />
        <div className="controlsExpenses">
          <Filter />
          <Order />
          <FilterDate />
        </div>
      </div>
      <Expenses index={index} />
    </div>
  );
};

export default Dashboard;
