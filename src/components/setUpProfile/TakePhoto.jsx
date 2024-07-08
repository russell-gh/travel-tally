import Webcam from "react-webcam";
import { useState } from "react";
import StageOfPhoto from "./StagesOfPhoto";
import Message from "../../reusable-code/Message";
import { useEffect } from "react";

const videoConstraints = {
  facingMode: "user",
};

const TakePhoto = () => {
  const [profilePicture, setProfilePicture] = useState();
  const [hasPermission, setHasPermission] = useState(null);

  const handleCapture = (getScreenshot) => {
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
    <div className="webcamContainer">
      {hasPermission === null && (
        <Message message="Checking for webcam permissions..." />
      )}
      {hasPermission === false && (
        <Message message="Webcam access denied. Please enable it in your browser settings." />
      )}
      {hasPermission && !profilePicture && (
        <Webcam
          audio={false}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
          className="webcam"
        >
          {({ getScreenshot }) => (
            <button
              onClick={() => {
                handleCapture(getScreenshot);
              }}
            >
              Capture photo
            </button>
          )}
        </Webcam>
      )}
      <StageOfPhoto profilePicture={profilePicture} />
    </div>
  );
};

export default TakePhoto;
