import { useDispatch, useSelector } from "react-redux";
import { formEvent, selectTrips } from "../../../redux/homeSlice";
import FormElement from "../../../reusable-code/FormElement";
import { getArrayOfDates } from "../../../utils/utils";

const FilterDate = ({ expenses }) => {
  const dispatch = useDispatch();

  if (!expenses) {
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
