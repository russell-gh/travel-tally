import { useSelector } from "react-redux";
import { selectPopUp } from "../../redux/homeSlice";
import OneItemDelete from "./OneItemDelete";
import SharedDelete from "./SharedDelete";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const DeletePopUp = () => {
  const popUp = useSelector(selectPopUp);
  const popUpRef = useRef();

  if (!popUp) {
    return;
  }
  const { title, sharedId } = popUp;

  useGSAP(() => {
    gsap.fromTo(popUpRef.current, { scale: 0 }, { scale: 1, duration: 1 });
  });

  return (
    <div className="deletePopUp" ref={popUpRef}>
      {!sharedId ? (
        <OneItemDelete title={title} />
      ) : (
        <SharedDelete title={title} />
      )}
    </div>
  );
};

export default DeletePopUp;
