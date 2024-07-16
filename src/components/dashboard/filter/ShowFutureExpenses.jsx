import FormElement from "../../../reusable-code/FormElement";
import {
  selectHideFutureExpenses,
  toggleDisplay,
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
          dispatch(
            toggleDisplay({
              value: e.target.checked,
              key: "hideFutureExpenses",
            })
          );
        }}
      />
    </div>
  );
};

export default ShowFutureExpenses;
