import ProfileCropper from "./ProfileCropper";
import Button from "../../reusable-code/Button";
import { useDispatch, useSelector } from "react-redux";
import { saveProfile } from "../../redux/onboardingSlice";
import { selectProfilePictureSrc } from "../../redux/onboardingSlice";
import { selectUserName } from "../../redux/onboardingSlice";
import { useNavigate } from "react-router-dom";

const StageOfPhoto = ({ profilePicture, handleCapture }) => {
  const redirect = useNavigate();
  const profilePictureSrc = useSelector(selectProfilePictureSrc);
  const userName = useSelector(selectUserName);
  const dispatch = useDispatch();

  return (
    <>
      {profilePicture && !profilePictureSrc && (
        <ProfileCropper src={profilePicture} handleCapture={handleCapture} />
      )}
      {profilePictureSrc && (
        <>
          <img
            src={profilePictureSrc}
            alt="profile picture"
            className="profilePicture"
          />
          <p>Username: {userName}</p>
          <div className="setUpProfileBtnContainer">
            <Button
              text="Start Over"
              onClick={() => {
                dispatch(saveProfile());
                redirect("/setup-profile");
              }}
            />
            <Button
              text="Finish"
              onClick={() => {
                redirect("/dashboard");
              }}
            />
          </div>
        </>
      )}
    </>
  );
};

export default StageOfPhoto;
