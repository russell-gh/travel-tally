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
import TripInfo from "./TripInfo";
import "../../css/dashboard.css";
import { getSortedandFiltered } from "../../utils/getSortedandFiltered";
import {
  selectOrder,
  selectFilter,
  selectFilterDate,
} from "../../redux/tripsSlice";

const Dashboard = () => {
  const trips = useSelector(selectTrips);
  const selectedTripId = useSelector(selectSelectedTripId);
  const popUp = useSelector(selectPopUp);
  const order = useSelector(selectOrder);
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);
  const filterDate = useSelector(selectFilterDate);

  const stringToComponent = { AddExpense: <AddExpense /> };

  if (!trips || trips.length === 0) {
    return <p>Loading...</p>;
  }

  const index = getIndex(trips, selectedTripId);
  const trip = findItem(trips, selectedTripId);
  const { details, expenses } = trip;
  const { destination, homeCurrencySymbol, startDate, endDate } = details;

  if (expenses.length === 0) {
    return <p className="mt">You have no expenses yet.</p>;
  }
  const _expenses = [...expenses].reverse();
  const filtered = getSortedandFiltered(_expenses, order, filter, filterDate);

  if (filtered.length === 0) {
    return <p className="mt">There are no matches</p>;
  }

  return (
    <div className="dashboard">
      <div className="dashboardFixed">
        <Title
          destination={destination}
          startDate={startDate}
          endDate={endDate}
        />
        <Image src={"../src/img/piechart.png"} alt="piechart" />
        <div className="containerBudget">
          <Budget
            expenses={filtered}
            details={details}
            homeCurrencySymbol={homeCurrencySymbol}
          />
          <TripInfo startDate={startDate} endDate={endDate} details={details} />
        </div>
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
      <Expenses filtered={filtered} homeCurrencySymbol={homeCurrencySymbol} />
    </div>
  );
};

export default Dashboard;
