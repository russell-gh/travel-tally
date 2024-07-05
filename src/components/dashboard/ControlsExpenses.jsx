import Filter from "./filter/Filter";
import Order from "./filter/order";
import FilterDate from "./filter/FilterDate";

const ControlsExpenses = ({ expenses, expensesCategories }) => {
  return (
    <div className="controlsExpenses">
      <Filter />
      <Order />
      <FilterDate expenses={expenses} expensesCategories={expensesCategories} />
    </div>
  );
};

export default ControlsExpenses;
