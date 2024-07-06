import Filter from "./filter/Filter";
import Order from "./filter/order";
import FilterDate from "./filter/FilterDate";
import ShowFutureExpenses from "./filter/ShowFutureExpenses";
import dayjs from "dayjs";

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
  const stillTravelling =
    dayjs().isBefore(endDate) && startDate.isBefore(dayjs());
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
      {stillTravelling && <ShowFutureExpenses />}
    </>
  );
};

export default ControlsExpenses;
