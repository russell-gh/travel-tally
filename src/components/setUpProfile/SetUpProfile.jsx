import UploadPhoto from "./UploadPhoto";
import "../../css/setUpProfile.scss";
import UserName from "./UserName";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserName } from "../../redux/onboardingSlice";
import TakePhoto from "./TakePhoto";
import ProfilePhoto from "./ProfilePhoto";

const SetUpProfile = () => {
  const userName = useSelector(selectUserName);
  return (
    <div className="setUpProfile">
      {!userName ? <UserName /> : <ProfilePhoto />}
    </div>
  );
};

export default SetUpProfile;
