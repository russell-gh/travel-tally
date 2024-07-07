import UploadPhoto from "./UploadPhoto";
import "../../css/setUpProfile.scss";
import UserName from "./UserName";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserName } from "../../redux/onboardingSlice";

const SetUpProfile = () => {
  const userName = useSelector(selectUserName);
  return (
    <div className="setUpProfile">
      {!userName ? <UserName /> : <UploadPhoto />}

      {/* <Routes>
        <Route path="/profilepicture" element={<UploadPhoto />} />
      </Routes> */}
    </div>
  );
};

export default SetUpProfile;
