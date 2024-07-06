import { useSelector } from "react-redux";
import { selectSelectedTripId, selectTrips } from "../../redux/homeSlice";
import { findItem, getIndex } from "../../utils/utils";
import Expenses from "./Expenses";
import Title from "./Title";
import "../../css/dashboard.scss";
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
import { createExpensesArray } from "../../utils/createExpensesArray";
import { filterCategories } from "../../utils/getSortedandFiltered";

const Dashboard = () => {
  const trips = useSelector(selectTrips);
  const selectedTripId = useSelector(selectSelectedTripId);
  const order = useSelector(selectOrder);
  const filter = useSelector(selectFilter);
  const filterDate = useSelector(selectFilterDate);

  if (!trips || trips.length === 0) {
    return <Message message="Loading.." />;
  }

  const index = getIndex(trips, selectedTripId, "id");
  const trip = findItem(trips, selectedTripId);
  const { details, expenses } = trip;
  const { destination, homeCurrencySymbol, startDate, endDate } = details;
  let _expenses = [...trip.expenses].reverse();

  const expensesCategories = filterCategories(expenses, filter); // filters expenses on activities so daily budget ca be filtered with activities
  let expensesArray = createExpensesArray(expensesCategories, details); //should this be in a useEffect?
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
          expenses={expensesCategories}
          details={details}
          homeCurrencySymbol={homeCurrencySymbol}
          startDate={startDate}
          endDate={endDate}
          expensesArray={expensesArray}
        />
        <ControlsAddExpense />
        <ControlsExpenses
          expensesCategories={expensesCategories}
          expenses={expenses}
          startDate={startDate}
          endDate={endDate}
        />
      </div>
      <Expenses
        filtered={filtered}
        expenses={_expenses}
        homeCurrencySymbol={homeCurrencySymbol}
      />
    </div>
  );
};

export default Dashboard;
