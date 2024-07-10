import { useRef } from "react";
import { Cropper } from "react-cropper";
import "cropperjs/dist/cropper.css";
import Button from "../../reusable-code/Button";
import { saveProfile } from "../../redux/onboardingSlice";
import { useDispatch } from "react-redux";

const ProfileCropper = ({ src }) => {
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
        style={{ height: 400, width: "100%" }}
        initialAspectRatio={1 / 1}
        guides={true}
        crop={onCrop}
        ref={cropperRef}
      />
      <Button
        className="upload"
        text="upload"
        onClick={() => {
          dispatch(saveProfile({ key: "profilePictureSrc", value: onCrop() }));
        }}
      />
    </>
  );
};

export default ProfileCropper;
