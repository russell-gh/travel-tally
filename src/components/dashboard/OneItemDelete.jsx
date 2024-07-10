import { useDispatch } from "react-redux";
import Button from "../../reusable-code/Button";
import { deleteExpense, togglePopUp } from "../../redux/homeSlice";

const OneItemDelete = ({ title, animatingOut }) => {
  const dispatch = useDispatch();
  return (
    <>
      <p>{`Are you sure you want to delete "${title}"?`}</p>
      <div className="containerBtnPopUp">
        <Button
          text="cancel"
          className="cancelBtn"
          animation={true}
          onClick={() => dispatch(togglePopUp())}
          disabled={animatingOut}
        />
        <Button
          text="delete"
          className="deleteBtn"
          animation={true}
          onClick={() => {
            dispatch(deleteExpense());
          }}
          disabled={animatingOut}
        />
      </div>
    </>
  );
};

export default OneItemDelete;
