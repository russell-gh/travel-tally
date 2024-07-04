import Filter from "./filter/Filter";
import Order from "./filter/order";
import FilterDate from "./filter/FilterDate";

const ControlsExpenses = ({ expenses }) => {
  return (
    <div className="controlsExpenses">
      <Filter />
      <Order />
      <FilterDate expenses={expenses} />
    </div>
  );
};

export default ControlsExpenses;
