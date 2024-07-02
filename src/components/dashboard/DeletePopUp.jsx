import { useDispatch, useSelector } from "react-redux";
import {
  deleteExpense,
  selectPopUp,
  toggleShowPopUp,
} from "../../redux/tripsSlice";
import Button from "../../reusable-code/Button";

const DeletePopUp = () => {
  const popUp = useSelector(selectPopUp);
  const dispatch = useDispatch();

  if (!popUp) {
    return;
  }
  const { id, title } = popUp;

  return (
    <div className="deletePopUp">
      <p>{`Are you sure you want to delete "${title}"?`}</p>
      <div className="containerBtnPopUp">
        <Button
          text="cancel"
          onClick={() => dispatch(toggleShowPopUp({ id: id, title: title }))}
        />
        <Button
          text="delete"
          onClick={() => {
            dispatch(deleteExpense());
          }}
        />
      </div>
    </div>
  );
};

export default DeletePopUp;
