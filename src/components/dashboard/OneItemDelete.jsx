import { useDispatch } from "react-redux";
import Button from "../../reusable-code/Button";
import { deleteExpense, togglePopUp } from "../../redux/homeSlice";

const OneItemDelete = ({ title }) => {
  const dispatch = useDispatch();
  return (
    <>
      <p>{`Are you sure you want to delete "${title}"?`}</p>
      <div className="containerBtnPopUp">
        <Button text="cancel" onClick={() => dispatch(togglePopUp())} />
        <Button
          text="delete"
          onClick={() => {
            dispatch(deleteExpense());
          }}
        />
      </div>
    </>
  );
};

export default OneItemDelete;
