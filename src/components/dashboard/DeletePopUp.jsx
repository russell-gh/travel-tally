import OneItemDelete from "./OneItemDelete";
import SharedDelete from "./SharedDelete";

const DeletePopUp = ({ popUp, animatingOut }) => {
  if (!popUp) {
    return;
  }
  const { title, sharedId } = popUp;

  return (
    <div className="deletePopUp">
      {!sharedId ? (
        <OneItemDelete title={title} animatingOut={animatingOut} />
      ) : (
        <SharedDelete title={title} animatingOut={animatingOut} />
      )}
    </div>
  );
};

export default DeletePopUp;
