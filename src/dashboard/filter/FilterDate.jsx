import { useDispatch, useSelector } from "react-redux";
import { formEvent, selectExpenses } from "../../redux/expensesSlice";
import FormElement from "../../reusable-code/FormElement";
import { getArrayOfDates } from "../../utils/utils";

const FilterDate = () => {
  const dispatch = useDispatch();
  const expenses = useSelector(selectExpenses);

  if (!expenses || expenses.length === 0) {
    return;
  }

  let arrDates = getArrayOfDates(expenses);

  arrDates = arrDates.map((item) => {
    return { key: item, value: item, name: item };
  });

  return (
    <div className="dropdown filterDate">
      <FormElement
        type="select"
        id="filterDate"
        name="filterDate"
        callback={(e) => {
          dispatch(formEvent({ id: e.target.id, value: e.target.value }));
        }}
        options={arrDates}
      />
    </div>
  );
};

export default FilterDate;
