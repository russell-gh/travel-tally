import { useDispatch, useSelector } from "react-redux";
import {
  formEvent,
  selectFilterDate,
  selectHideFutureExpenses,
} from "../../../redux/homeSlice";
import FormElement from "../../../reusable-code/FormElement";
import { getArrayOfValues } from "../../../utils/utils";

const FilterDate = ({ expenses, expensesCategories }) => {
  const dispatch = useDispatch();
  const hideFutureExpenses = useSelector(selectHideFutureExpenses);
  const filterDate = useSelector(selectFilterDate);

  if (!expenses || !expensesCategories) {
    return;
  }

  let arrDates = getArrayOfValues(expenses, "date", hideFutureExpenses);
  let arrDatesCategories = getArrayOfValues(expensesCategories, "date");

  if (!arrDatesCategories) {
    return;
  }

  arrDates = arrDates.map((item) => {
    return { key: item, value: item, name: item };
  });

  return (
    <div className="dropdown filterDate">
      <FormElement
        type="select"
        id="filterDate"
        name="filterDate"
        value={filterDate}
        className={arrDatesCategories}
        callback={(e) => {
          dispatch(formEvent({ id: e.target.id, value: e.target.value }));
        }}
        options={arrDates}
      />
    </div>
  );
};

export default FilterDate;
