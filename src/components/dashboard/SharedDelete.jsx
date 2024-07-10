import { useDispatch } from "react-redux";
import Button from "../../reusable-code/Button";
import { deleteExpense, togglePopUp } from "../../redux/homeSlice";

const SharedDelete = ({ title }) => {
  const dispatch = useDispatch();
  return (
    <>
      <p>{`"${title}" is part of a group. Do you want to delete all or just this expense?`}</p>
      <div className="containerBtnPopUpMulti">
        <Button
          text="cancel"
          className="cancelBtn"
          animation={true}
          onClick={() => dispatch(togglePopUp())}
        />
        <Button
          text="delete all"
          className="deleteBtn"
          animation={true}
          onClick={() => {
            dispatch(deleteExpense("all"));
          }}
        />
        <Button
          text="delete single expense"
          className="deleteBtn"
          animation={true}
          onClick={() => {
            dispatch(deleteExpense());
          }}
        />
      </div>
    </>
  );
};

export default SharedDelete;
