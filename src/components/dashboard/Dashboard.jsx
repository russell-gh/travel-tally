import { useSelector } from "react-redux";
import { selectDestinationId, selectTrips } from "../../redux/tripsSlice";
import Button from "../../reusable-code/Button";
import { findItem, getIndex } from "../../utils/utils";
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

  const index = getIndex(trips, destinationId);
  const trip = findItem(trips, destinationId);

  return (
    <div className="dashboard">
      <div className="dashboardFixed">
        <Title destination={trip.details.destination} />
        <Image src={"../src/img/piechart.png"} alt="piechart" />
        <Budget
          expenses={trip.expenses}
          budgetTotal={trip.details.budgetTotal}
          homeCurrencySymbol={trip.details.homeCurrencySymbol}
        />
        <Button className="addExpense" text="Add an expense" />
        <div className="controlsExpenses">
          <Filter />
          <Order />
          <FilterDate />
        </div>
      </div>
      <Expenses
        expenses={trip.expenses}
        homecurrency={trip.details.homecurrency}
      />
    </div>
  );
};

export default Dashboard;
