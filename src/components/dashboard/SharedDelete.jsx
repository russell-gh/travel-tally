import { useDispatch } from "react-redux";
import Button from "../../reusable-code/Button";
import { deleteExpense, togglePopUp } from "../../redux/homeSlice";

const SharedDelete = ({ title }) => {
  const dispatch = useDispatch();
  return (
    <>
      <p>{`"${title}" is part of a group. Do you want to delete all or just this expense?`}</p>
      <div className="containerBtnPopUp">
        <Button text="cancel" onClick={() => dispatch(togglePopUp())} />
        <Button
          text="delete single expense"
          onClick={() => {
            dispatch(deleteExpense());
          }}
        />
        <Button
          text="delete all"
          onClick={() => {
            dispatch(deleteExpense("all"));
          }}
        />
      </div>
    </>
  );
};

export default SharedDelete;
