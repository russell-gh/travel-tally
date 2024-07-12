import { useSelector } from "react-redux";
import {
  selectSelectedTripId,
  selectHideFutureExpenses,
  selectTrips,
  selectOrder,
  selectFilter,
  selectFilterDate,
} from "../../redux/homeSlice";
import { findItem, getIndex } from "../../utils/utils";
import Expenses from "./Expenses";
import Title from "./Title";
import "../../css/dashboard.scss";
import {
  getSortedandFiltered,
  filterCategories,
} from "../../utils/getSortedandFiltered";
import ControlsExpenses from "./ControlsExpenses";
import BudgetInfo from "./BudgetInfo";
import { createExpensesArray } from "../../utils/createExpensesArray";
import { useMemo } from "react";
import SplashPage from "../SplashPage";

const Dashboard = () => {
  const trips = useSelector(selectTrips);
  const selectedTripId = useSelector(selectSelectedTripId);
  const order = useSelector(selectOrder);
  const filter = useSelector(selectFilter);
  const filterDate = useSelector(selectFilterDate);
  const hideFutureExpenses = useSelector(selectHideFutureExpenses);

  if (!trips || trips.length === 0) {
    return <SplashPage />;
  }

  const trip = findItem(trips, selectedTripId);

  const { details, expenses } = trip;
  const { destination, homeCurrencySymbol, dates } = details;
  const { startDate, endDate, startDateIncluded, endDateIncluded } = dates;

  const actualStartDate = !startDateIncluded ? startDate + 86400000 : startDate;
  const actualEndDate = !endDateIncluded ? endDate - 86400000 : endDate;

  let _expenses = [...trip.expenses].reverse();

  const expensesCategories = filterCategories(expenses, filter); // filters expenses on activities so daily budget can be filtered with activities

  let expensesArray = createExpensesArray(
    expensesCategories,
    actualStartDate,
    actualEndDate
  );

  const filtered = getSortedandFiltered(
    _expenses,
    order,
    filter,
    filterDate,
    hideFutureExpenses
  );

  return (
    <div className="dashboard">
      <div className="dashboardFixed">
        <Title
          destination={destination}
          startDate={startDate}
          endDate={endDate}
          details={details}
        />
        <BudgetInfo
          expensesCategories={expensesCategories}
          expenses={_expenses}
          details={details}
          homeCurrencySymbol={homeCurrencySymbol}
          startDate={startDate}
          endDate={endDate}
          expensesArray={expensesArray}
          actualStartDate={actualStartDate}
          actualEndDate={actualEndDate}
        />
        <ControlsExpenses
          expensesCategories={expensesCategories}
          expenses={expenses}
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
