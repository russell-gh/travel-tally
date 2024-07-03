import { useSelector } from "react-redux";
import { selectSelectedTripId, selectTrips } from "../../redux/homeSlice";
import { findItem, getIndex } from "../../utils/utils";
import Expenses from "./Expenses";
import Title from "./Title";
import "../../css/dashboard.css";
import { getSortedandFiltered } from "../../utils/getSortedandFiltered";
import {
  selectOrder,
  selectFilter,
  selectFilterDate,
} from "../../redux/homeSlice";
import ControlsExpenses from "./ControlsExpenses";
import BudgetInfo from "./BudgetInfo";
import Message from "./Message";
import ControlsAddExpense from "./ControlsAddExpense";

const Dashboard = () => {
  const trips = useSelector(selectTrips);
  const selectedTripId = useSelector(selectSelectedTripId);
  const order = useSelector(selectOrder);
  const filter = useSelector(selectFilter);
  const filterDate = useSelector(selectFilterDate);

  if (!trips || trips.length === 0) {
    return <Message message="Loading.." />;
  }

  const index = getIndex(trips, selectedTripId);
  const trip = findItem(trips, selectedTripId);
  const { details, expenses } = trip;
  const { destination, homeCurrencySymbol, startDate, endDate } = details;

  const _expenses = [...expenses].reverse();
  const filtered = getSortedandFiltered(_expenses, order, filter, filterDate);

  return (
    <div className="dashboard">
      <div className="dashboardFixed">
        <Title
          destination={destination}
          startDate={startDate}
          endDate={endDate}
        />
        <BudgetInfo
          expenses={filtered}
          details={details}
          homeCurrencySymbol={homeCurrencySymbol}
          startDate={startDate}
          endDate={endDate}
        />
        <ControlsAddExpense />
        <ControlsExpenses index={index} />
      </div>
      {}
      <Expenses
        filtered={filtered}
        expenses={expenses}
        homeCurrencySymbol={homeCurrencySymbol}
      />
    </div>
  );
};

export default Dashboard;
