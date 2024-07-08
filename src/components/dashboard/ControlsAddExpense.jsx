import Button from "../../reusable-code/Button";
import { useDispatch, useSelector } from "react-redux";
import { selectPopUp } from "../../redux/homeSlice";
import AddExpense from "../AddExpense";
import { togglePopUp } from "../../redux/homeSlice";

const ControlsAddExpense = () => {
  const popUp = useSelector(selectPopUp);
  const dispatch = useDispatch();
  const stringToComponent = { AddExpense: <AddExpense /> };

  return (
    <>
      <Button
        className="addExpense"
        text="Add an expense"
        onClick={() => {
          dispatch(
            togglePopUp({
              config: {},
              component: "AddExpense",
            })
          );
        }}
      />
      {stringToComponent[popUp.component]}
    </>
  );
};

export default ControlsAddExpense;
