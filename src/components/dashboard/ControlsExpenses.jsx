import Filter from "./filter/Filter";
import Order from "./filter/order";
import FilterDate from "./filter/FilterDate";

const ControlsExpenses = ({ expenses, expensesCategories }) => {
  if (!expenses || expenses.length === 0) {
    return;
  }

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
    </>
  );
};

export default ControlsExpenses;
