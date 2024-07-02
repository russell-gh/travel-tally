import { useDispatch } from "react-redux";
import { formEvent } from "../../redux/tripsSlice";
import FormElement from "../../reusable-code/FormElement";

const Filter = () => {
  const dispatch = useDispatch();

  return (
    <div className="dropdown filter">
      <FormElement
        type="select"
        id="filter"
        name="filter"
        callback={(e) => {
          dispatch(formEvent({ id: e.target.id, value: e.target.value }));
        }}
        options={[
          { value: "Show All", name: "Show All" },
          { value: "Activities", name: "Activities" },
          { value: "Food", name: "Food" },
          { value: "Transport", name: "Transport" },
          { value: "Hotel", name: "Hotel" },
          { value: "Other", name: "Other" },
        ]}
      />
    </div>
  );
};

export default Filter;
