import Webcam from "react-webcam";
import { useState } from "react";
import StageOfPhoto from "./StagesOfPhoto";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};

const TakePhoto = () => {
  const [profilePicture, setProfilePicture] = useState();

  const handleCapture = (getScreenshot) => {
    const imageSrc = getScreenshot();
    setProfilePicture(imageSrc);
  };

  return (
    <>
      {!profilePicture && (
        <Webcam
          audio={false}
          height={720}
          screenshotFormat="image/jpeg"
          width={1280}
          videoConstraints={videoConstraints}
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
    </>
  );
};

export default TakePhoto;
