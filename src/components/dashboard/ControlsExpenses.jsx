import Filter from "./filter/Filter";
import Order from "./filter/order";
import FilterDate from "./filter/FilterDate";
import ShowFutureExpenses from "./filter/ShowFutureExpenses";
import { includesFutureExpenses } from "../../utils/utilsDates";

const ControlsExpenses = ({ expenses, expensesCategories }) => {
  if (!expenses || expenses.length === 0) {
    return;
  }
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
