import { useSelector } from "react-redux";
import { selectPopUp } from "../../redux/homeSlice";
import OneItemDelete from "./OneItemDelete";
import SharedDelete from "./SharedDelete";

const DeletePopUp = () => {
  const popUp = useSelector(selectPopUp);

  if (!popUp) {
    return;
  }
  const { id, title, sharedId } = popUp;

  return (
    <div className="deletePopUp">
      {!sharedId ? (
        <OneItemDelete title={title} />
      ) : (
        <SharedDelete title={title} />
      )}
    </div>
  );
};

export default DeletePopUp;
