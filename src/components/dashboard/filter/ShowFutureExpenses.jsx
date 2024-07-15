import FormElement from "../../../reusable-code/FormElement";
import {
  selectHideFutureExpenses,
  toggleHideFutureExpenses,
} from "../../../redux/homeSlice";
import { useDispatch, useSelector } from "react-redux";

const ShowFutureExpenses = () => {
  const dispatch = useDispatch();
  const hideFutureExpenses = useSelector(selectHideFutureExpenses);

  return (
    <div className="hideFutureExpenseContainer">
      <FormElement
        type="checkbox"
        id="hideFutureExpenses"
        label="hide future expenses"
        checked={hideFutureExpenses}
        callback={(e) => {
          dispatch(toggleHideFutureExpenses(e.target.checked));
        }}
      />
    </div>
  );
};

export default ShowFutureExpenses;
