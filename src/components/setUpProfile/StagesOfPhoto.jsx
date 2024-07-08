import ProfileCropper from "./ProfileCropper";
import Button from "../../reusable-code/Button";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { saveProfile } from "../../redux/onboardingSlice";
import { selectProfilePictureSrc } from "../../redux/onboardingSlice";
import { selectUserName } from "../../redux/onboardingSlice";

const StageOfPhoto = ({ profilePicture }) => {
  const profilePictureSrc = useSelector(selectProfilePictureSrc);
  const userName = useSelector(selectUserName);
  const dispatch = useDispatch();

  return (
    <>
      {profilePicture && !profilePictureSrc && (
        <ProfileCropper src={profilePicture} />
      )}
      {profilePictureSrc && (
        <>
          <img
            src={profilePictureSrc}
            alt="profile picture"
            className="profilePicture"
          />
          <p>Username: {userName}</p>
          <Link to="/setupprofile">
            <Button
              text="Start Over"
              onClick={() => {
                dispatch(saveProfile());
              }}
            />
          </Link>
          <Link to="/dashboard">
            <Button text="Finish" />
          </Link>
        </>
      )}
    </>
  );
};

export default StageOfPhoto;
