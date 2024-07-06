import FormElement from "../../../reusable-code/FormElement";
import { toggleHideFutureExpenses } from "../../../redux/homeSlice";
import { useDispatch } from "react-redux";

const ShowFutureExpenses = () => {
  const dispatch = useDispatch();

  return (
    <>
      <FormElement
        type="checkbox"
        id="hideFutureExpenses"
        label="hide future expenses"
        callback={(e) => {
          dispatch(toggleHideFutureExpenses(e.target.checked));
        }}
      />
    </>
  );
};

export default ShowFutureExpenses;
