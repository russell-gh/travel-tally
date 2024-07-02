import { useDispatch, useSelector } from "react-redux";
import { formEvent, selectTrips } from "../../redux/tripsSlice";
import FormElement from "../../reusable-code/FormElement";
import { getArrayOfDetails } from "../../utils/utils";

const FilterDate = () => {
  const dispatch = useDispatch();
  const trips = useSelector(selectTrips);

  if (!trips) {
    return;
  }

  let arrDestinations = getArrayOfDetails(trips, "destination");

  arrDestinations = arrDestinations.map((item, index) => {
    return { key: index, name: item, value: item.trim().split(" ")[0] }; // sends id as value
  });

  return (
    <>
      <FormElement
        label="Trips"
        type="select"
        id="destinationId"
        name="destination"
        callback={(e) => {
          dispatch(formEvent({ id: e.target.id, value: e.target.value }));
        }}
        options={arrDestinations.reverse()}
      />
    </>
  );
};

export default FilterDate;
