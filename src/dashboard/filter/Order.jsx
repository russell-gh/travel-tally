import { useDispatch } from "react-redux";
import { formEvent } from "../../redux/tripsSlice";
import FormElement from "../../reusable-code/FormElement";

const Sort = () => {
  const dispatch = useDispatch();

  return (
    <div className="dropdown order">
      <FormElement
        type="select"
        id="order"
        name="order"
        callback={(e) => {
          dispatch(formEvent({ id: e.target.id, value: e.target.value }));
        }}
        options={[
          { value: "Newest first", name: "Newest first" },
          { value: "Price: high to low", name: "Price: high to low" },
          { value: "Price: low to high", name: "Price: low to high" },
        ]}
      />
    </div>
  );
};

export default Sort;
