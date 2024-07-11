import { useDispatch, useSelector } from "react-redux";
import { formEvent, selectOrder } from "../../../redux/homeSlice";
import FormElement from "../../../reusable-code/FormElement";

const Sort = () => {
  const dispatch = useDispatch();
  const order = useSelector(selectOrder);

  return (
    <div className="dropdown order">
      <FormElement
        type="select"
        id="order"
        name="order"
        value={order}
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
