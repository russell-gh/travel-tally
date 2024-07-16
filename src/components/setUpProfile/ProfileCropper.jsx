import { useRef } from "react";
import { Cropper } from "react-cropper";
import "cropperjs/dist/cropper.css";
import Button from "../../reusable-code/Button";
import { saveProfile } from "../../redux/onboardingSlice";
import { useDispatch } from "react-redux";

const ProfileCropper = ({ src, handleCapture }) => {
  const cropperRef = useRef(null);
  const dispatch = useDispatch();

  const onCrop = () => {
    const cropper = cropperRef.current?.cropper;
    if (cropper) {
      const croppedCanvas = cropper.getCroppedCanvas({
        width: 260,
        height: 260,
      });
      const profilePicture = croppedCanvas.toDataURL();
      return profilePicture;
    }
  };

  return (
    <>
      <Cropper
        src={src}
        style={{ height: "auto", width: "auto", maxWidth: 835 }}
        initialAspectRatio={1 / 1}
        guides={true}
        crop={onCrop}
        ref={cropperRef}
      />

      <div className="setUpProfileBtnContainer">
        {handleCapture && (
          <Button
            className="retakeBtn"
            animation={true}
            text="retake"
            onClick={() => {
              handleCapture();
            }}
          />
        )}
        <Button
          className="uploadBtn"
          animation={true}
          text="upload"
          onClick={() => {
            dispatch(
              saveProfile({ key: "profilePictureSrc", value: onCrop() })
            );
          }}
        />
      </div>
    </>
  );
};

export default ProfileCropper;
