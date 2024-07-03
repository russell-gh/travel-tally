import Filter from "./filter/Filter";
import Order from "./filter/order";
import FilterDate from "./filter/FilterDate";

const ControlsExpenses = ({ filtered }) => {
  return (
    <div className="controlsExpenses">
      <Filter />
      <Order />
      <FilterDate filtered={filtered} />
    </div>
  );
};

export default ControlsExpenses;
