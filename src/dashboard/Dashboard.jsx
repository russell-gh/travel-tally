import { useSelector } from "react-redux";
import { selectTrips } from "../redux/tripsSlice";
import Button from "../reusable-code/Button";
import Budget from "./Budget";
import Expenses from "./Expenses";
import Image from "./Image";
import Title from "./Title";
import Filter from "./filter/Filter";
import FilterDate from "./filter/FilterDate";
import Order from "./filter/order";

const Dashboard = () => {
  const trips = useSelector(selectTrips);

  if (!trips || trips.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <div className="dashboard">
      <div className="dashboardFixed">
        <Title />
        <Image src={"../src/img/piechart.png"} alt="piechart" />
        <Budget />
        <Button className="addExpense" text="Add an expense" />
        <div className="controlsExpenses">
          <Filter />
          <Order />
          <FilterDate />
        </div>
      </div>
      <Expenses />
    </div>
  );
};

export default Dashboard;
