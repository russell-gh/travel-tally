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
import { getActualEndDate, getActualStartDate } from "../../utils/utilsDates";
import ExpensesAndSplits from "./ExpensesAndSplits";

const Dashboard = () => {
  const trips = useSelector(selectTrips);
  const selectedTripId = useSelector(selectSelectedTripId);
  const order = useSelector(selectOrder);
  const filter = useSelector(selectFilter);
  const filterDate = useSelector(selectFilterDate);
  const hideFutureExpenses = useSelector(selectHideFutureExpenses);

  const trip = useMemo(() => {
    return findItem(trips, selectedTripId);
  }, [trips, selectedTripId]);

  const { details, expenses, splits } = trip;
  const { destination, homeCurrencySymbol, dates } = details;
  const { startDate, endDate, startDateIncluded, endDateIncluded } = dates;

  const actualStartDate = useMemo(() => {
    return getActualStartDate(startDateIncluded, startDate);
  }, [startDateIncluded, startDate]);
  const actualEndDate = useMemo(() => {
    return getActualEndDate(endDateIncluded, endDate);
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
  }, [expensesCategories, actualStartDate, actualEndDate]);

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
          splits={splits}
        />
        <ControlsExpenses
          expensesCategories={expensesCategories}
          expenses={expenses}
        />
      </div>
      <ExpensesAndSplits
        filtered={filtered}
        expenses={_expenses}
        homeCurrencySymbol={homeCurrencySymbol}
        splits={splits}
      />
    </div>
  );
};

export default Dashboard;
