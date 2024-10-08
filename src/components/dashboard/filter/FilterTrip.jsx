import { useDispatch, useSelector } from "react-redux";
import { formEvent, selectTrips } from "../../../redux/homeSlice";
import FormElement from "../../../reusable-code/FormElement";
import { selectSelectedTripId } from "../../../redux/homeSlice";
import { useNavigate } from "react-router-dom";

const FilterTrip = () => {
  const dispatch = useDispatch();
  const redirect = useNavigate();
  const trips = useSelector(selectTrips);
  const selectedTripId = useSelector(selectSelectedTripId);

  if (!trips) {
    return;
  }

  const arrDestinations = trips.map((item, index) => {
    return { key: index, name: item.details.destination, value: item.id };
  });

  arrDestinations.unshift({
    key: "addTrip",
    name: "Add Trip +",
    value: "addTrip",
  });

  const handleSelectChange = (e) => {
    const value = e.target.value;
    if (value === "addTrip") {
      redirect("/onboarding");
      return;
    } else {
      dispatch(formEvent({ id: e.target.id, value: value }));
    }
  };

  return (
    <>
      <FormElement
        type="select"
        id="selectedTripId"
        name="destination"
        className="dropDownTrips"
        value={selectedTripId}
        callback={handleSelectChange}
        options={arrDestinations.reverse()}
        typed={true}
      />
    </>
  );
};

export default FilterTrip;
