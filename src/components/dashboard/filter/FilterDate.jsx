import { useDispatch, useSelector } from "react-redux";
import { formEvent, selectTrips } from "../../../redux/homeSlice";
import FormElement from "../../../reusable-code/FormElement";
import { getArrayOfDates } from "../../../utils/utils";

const FilterDate = ({ index }) => {
  const dispatch = useDispatch();
  const trip = useSelector(selectTrips);

  if (!trip) {
    return;
  }

  const expenses = trip[index].expenses;

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
