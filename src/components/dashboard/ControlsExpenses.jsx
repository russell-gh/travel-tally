import Filter from "./filter/Filter";
import Order from "./filter/order";
import FilterDate from "./filter/FilterDate";

const ControlsExpenses = ({ index }) => {
  return (
    <div className="controlsExpenses">
      <Filter />
      <Order />
      <FilterDate index={index} />
    </div>
  );
};

export default ControlsExpenses;
