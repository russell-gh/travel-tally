import Filter from "./filter/Filter";
import Order from "./filter/order";
import FilterDate from "./filter/FilterDate";
import ShowFutureExpenses from "./filter/ShowFutureExpenses";
import dayjs from "dayjs";
import { includesFutureExpenses } from "../../utils/utilsDates";

const ControlsExpenses = ({
  expenses,
  expensesCategories,
  startDate,
  endDate,
}) => {
  if (!startDate || !endDate) {
    return;
  }
  startDate = dayjs(startDate);
  endDate = dayjs(endDate);
  const includesFuture = includesFutureExpenses(expenses);
  return (
    <>
      <div className="controlsExpenses">
        <Filter />
        <Order />
        <FilterDate
          expenses={expenses}
          expensesCategories={expensesCategories}
        />
      </div>
      {includesFuture && <ShowFutureExpenses />}
    </>
  );
};

export default ControlsExpenses;
