import { selectProfilePictureSrc } from "../../redux/onboardingSlice";
import Button from "../../reusable-code/Button";
import TakePhoto from "./TakePhoto";
import UploadPhoto from "./UploadPhoto";
import { Link, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

const ProfilePhoto = () => {
  const profilePictureSrc = useSelector(selectProfilePictureSrc);
  return (
    <>
      <p>Profile Photo:</p>
      {!profilePictureSrc && (
        <>
          <Link to="./take-photo">
            <Button text="Take Photo" className="takePhoto" />
          </Link>
          <Link to="./upload-photo">
            <Button text="Upload Photo" className="uploadPhoto" />
          </Link>
        </>
      )}
      <Routes>
        <Route path="take-photo" element={<TakePhoto />} />
        <Route path="upload-photo" element={<UploadPhoto />} />
      </Routes>
    </>
  );
};

export default ProfilePhoto;
