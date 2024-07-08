import { useDispatch, useSelector } from "react-redux";
import { formEvent, selectTrips } from "../../../redux/homeSlice";
import FormElement from "../../../reusable-code/FormElement";

const FilterTrip = () => {
  const dispatch = useDispatch();
  const trips = useSelector(selectTrips);

  if (!trips) {
    return;
  }

  const arrDestinations = trips.map((item, index) => {
    return { key: index, name: item.details.destination, value: item.id };
  });

  return (
    <>
      <FormElement
        type="select"
        id="selectedTripId"
        name="destination"
        callback={(e) => {
          dispatch(formEvent({ id: e.target.id, value: e.target.value }));
        }}
        options={arrDestinations.reverse()}
      />
    </>
  );
};

export default FilterTrip;
