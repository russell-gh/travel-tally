import OneItemDelete from "./OneItemDelete";
import SharedDelete from "./SharedDelete";

const DeletePopUp = ({ popUp }) => {
  if (!popUp) {
    return;
  }
  const { title, sharedId } = popUp;

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
