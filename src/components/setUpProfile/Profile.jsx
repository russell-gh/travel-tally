import {
  selectProfilePictureSrc,
  selectUserName,
} from "../../redux/onboardingSlice";
import Message from "../../reusable-code/Message";
import { useSelector } from "react-redux";

const Profile = () => {
  const profilePictureSrc = useSelector(selectProfilePictureSrc);
  const userName = useSelector(selectUserName);

  return (
    <div className="profile">
      {profilePictureSrc && userName && (
        <>
          <img
            src={profilePictureSrc}
            alt="profile picture"
            className="profilePicture"
          />
          <Message message={userName} className="userName" />
        </>
      )}
    </div>
  );
};

export default Profile;
