import { useDispatch } from "react-redux";
import { formEvent } from "../../../redux/homeSlice";
import FormElement from "../../../reusable-code/FormElement";
import { getArrayOfValues } from "../../../utils/utils";

const FilterDate = ({ expenses, expensesCategories }) => {
  const dispatch = useDispatch();

  if (!expenses || !expensesCategories) {
    return;
  }

  let arrDates = getArrayOfValues(expenses, "startDate");
  let arrDatesCategories = getArrayOfValues(expensesCategories, "startDate");

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
