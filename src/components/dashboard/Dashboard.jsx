import { useDispatch, useSelector } from "react-redux";
import {
  selectPopUp,
  selectSelectedTripId,
  selectTrips,
  togglePopUp,
} from "../../redux/tripsSlice";
import Button from "../../reusable-code/Button";
import { findItem, getIndex } from "../../utils/utils";
import AddExpense from "../AddExpense";
import Budget from "./Budget";
import Expenses from "./Expenses";
import Image from "./Image";
import Title from "./Title";
import Filter from "./filter/Filter";
import FilterDate from "./filter/FilterDate";
import Order from "./filter/order";

const Dashboard = () => {
  const trips = useSelector(selectTrips);
  const selectedTripId = useSelector(selectSelectedTripId);
  const popUp = useSelector(selectPopUp);
  const dispatch = useDispatch();

  const stringToComponent = { AddExpense: <AddExpense /> };

  if (!trips || trips.length === 0) {
    return <p>Loading...</p>;
  }

  const index = getIndex(trips, selectedTripId);
  const trip = findItem(trips, selectedTripId);

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
        <Button
          className="addExpense"
          text="Add an expense"
          onClick={() => {
            dispatch(
              togglePopUp({
                config: {},
                component: "AddExpense",
              })
            );
          }}
        />
        {stringToComponent[popUp.component]}
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
