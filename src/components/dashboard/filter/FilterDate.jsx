import { useDispatch } from "react-redux";
import { formEvent } from "../../../redux/homeSlice";
import FormElement from "../../../reusable-code/FormElement";
import { getArrayOfDates } from "../../../utils/utilsDates";

const FilterDate = ({ expenses, expensesCategories }) => {
  const dispatch = useDispatch();

  if (!expenses || !expensesCategories) {
    return;
  }

  let arrDates = getArrayOfDates(expenses);
  let arrDatesCategories = getArrayOfDates(expensesCategories);

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
