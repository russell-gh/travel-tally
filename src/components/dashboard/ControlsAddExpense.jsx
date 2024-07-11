import Button from "../../reusable-code/Button";
import { useDispatch, useSelector } from "react-redux";
import { selectPopUp } from "../../redux/homeSlice";
import AddExpense from "../AddExpense";
import { togglePopUp } from "../../redux/homeSlice";

const ControlsAddExpense = () => {
  const popUp = useSelector(selectPopUp);
  const dispatch = useDispatch();

  return (
    <>
      <Button
        animation={true}
        className="addExpense"
        text="Add expense"
        onClick={() => {
          dispatch(
            togglePopUp({
              config: {},
              component: "AddExpense",
            })
          );
        }}
      />
    </>
  );
};

export default ControlsAddExpense;
