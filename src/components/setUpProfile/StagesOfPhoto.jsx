import ProfileCropper from "./ProfileCropper";
import Button from "../../reusable-code/Button";
import { useDispatch, useSelector } from "react-redux";
import { saveProfile, selectUser } from "../../redux/onboardingSlice";
import { selectProfilePictureSrc } from "../../redux/onboardingSlice";
import { selectUserName } from "../../redux/onboardingSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const StageOfPhoto = ({ profilePicture, handleCapture }) => {
  const redirect = useNavigate();
  const profilePictureSrc = useSelector(selectProfilePictureSrc);
  const userName = useSelector(selectUserName);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const clickHandler = async () => {
    try {
      await axios.post("http://localhost:6001/profile", {
        profilePictureSrc,
        userName,
        userID: user.userID,
      });
      redirect("/onboarding");
    } catch (e) {
      console.log("There was an error posting to the database", e);
    }
  };

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
              animation={true}
              onClick={() => {
                dispatch(saveProfile());
                redirect("/setup-profile");
              }}
            />
            <Button text="Finish" animation={true} onClick={clickHandler} />
          </div>
        </>
      )}
    </>
  );
};

export default StageOfPhoto;
