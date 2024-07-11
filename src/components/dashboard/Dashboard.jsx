import { useSelector } from "react-redux";
import {
  selectSelectedTripId,
  selectHideFutureExpenses,
  selectTrips,
} from "../../redux/homeSlice";
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
import Message from "../../reusable-code/Message";
import { createExpensesArray } from "../../utils/createExpensesArray";
import { filterCategories } from "../../utils/getSortedandFiltered";
import { useMemo } from "react";

const Dashboard = () => {
  const trips = useSelector(selectTrips);
  const selectedTripId = useSelector(selectSelectedTripId);
  const order = useSelector(selectOrder);
  const filter = useSelector(selectFilter);
  const filterDate = useSelector(selectFilterDate);
  const hideFutureExpenses = useSelector(selectHideFutureExpenses);

  if (!trips || trips.length === 0) {
    return <Message message="Loading.." />;
  }

  const trip = useMemo(() => {
    return findItem(trips, selectedTripId);
  }, [trips, selectedTripId]);

  const { details, expenses } = trip;
  const { destination, homeCurrencySymbol, dates } = details;
  const { startDate, endDate, startDateIncluded, endDateIncluded } = dates;

  const actualStartDate = useMemo(() => {
    return !startDateIncluded ? startDate + 86400000 : startDate;
  }, [startDateIncluded, startDate]);
  const actualEndDate = useMemo(() => {
    return !endDateIncluded ? endDate - 86400000 : endDate;
  }, [endDateIncluded, endDate]);

  let _expenses = useMemo(() => {
    return [...trip.expenses].reverse();
  }, [trip.expenses]);

  const expensesCategories = useMemo(() => {
    return filterCategories(expenses, filter);
  }, [expenses, filter]); // filters expenses on activities so daily budget can be filtered with activities

  let expensesArray = useMemo(() => {
    return createExpensesArray(
      expensesCategories,
      actualStartDate,
      actualEndDate
    );
  }, [expensesCategories, actualStartDate, actualEndDate]); //should this be in a useEffect?

  const filtered = useMemo(() => {
    return getSortedandFiltered(
      _expenses,
      order,
      filter,
      filterDate,
      hideFutureExpenses
    );
  }, [_expenses, order, filter, filterDate, hideFutureExpenses]);

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
