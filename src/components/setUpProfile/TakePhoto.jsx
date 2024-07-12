import Webcam from "react-webcam";
import { useState } from "react";
import StageOfPhoto from "./StagesOfPhoto";
import Message from "../../reusable-code/Message";
import { useEffect } from "react";
import { Cropper } from "react-cropper";
import Button from "../../reusable-code/Button";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { saveProfile } from "../../redux/onboardingSlice";
import { useSelector } from "react-redux";
import { selectProfilePictureSrc } from "../../redux/onboardingSlice";

const videoConstraints = {
  facingMode: "user",
};

const TakePhoto = () => {
  const profilePictureSrc = useSelector(selectProfilePictureSrc);
  const [profilePicture, setProfilePicture] = useState();
  const [hasPermission, setHasPermission] = useState(null);

  const handleCapture = (getScreenshot) => {
    if (!getScreenshot) {
      setProfilePicture("");
      return;
    }

    const imageSrc = getScreenshot();
    setProfilePicture(imageSrc);
  };

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(() => setHasPermission(true))
      .catch((error) => {
        console.error("Error accessing webcam: ", error);
        setHasPermission(false);
      });
  }, []);

  return (
    <>
      {hasPermission === null && !profilePictureSrc && (
        <Message message="Checking for webcam permissions..." />
      )}
      {hasPermission === false && !profilePictureSrc && (
        <Message message="Webcam access denied. Please enable it in your browser settings." />
      )}
      {hasPermission && !profilePictureSrc && !profilePicture && (
        <Webcam
          audio={false}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
          className="webcam"
          style={{ maxWidth: 835 }}
        >
          {({ getScreenshot }) => (
            <button
              onClick={() => {
                handleCapture(getScreenshot);
              }}
              className="btn captureBtn"
            >
              Capture photo
            </button>
          )}
        </Webcam>
      )}
      {
        <StageOfPhoto
          profilePicture={profilePicture}
          handleCapture={handleCapture}
        />
      }
    </>
  );
};

export default TakePhoto;
