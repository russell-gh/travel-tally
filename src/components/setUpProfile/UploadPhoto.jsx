import { useState } from "react";
import FormElement from "../../reusable-code/FormElement";
import Button from "../../reusable-code/Button";
import { selectProfilePictureSrc } from "../../redux/onboardingSlice";
import ProfileCropper from "./ProfileCropper";
import { useSelector } from "react-redux";

const UploadPhoto = () => {
  const [profilePicture, setProfilePicture] = useState();
  const profilePictureSrc = useSelector(selectProfilePictureSrc);
  const onChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      return console.log("No file");
    }
    console.log(file);
    if (profilePicture) {
      setProfilePicture;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.addEventListener("load", (e) => {
      setProfilePicture(e.target.result);
    });
  };

  return (
    <>
      {!profilePictureSrc && (
        <FormElement
          type="file"
          id="profilePhoto"
          name="profilePhoto"
          accept="image/*"
          label={
            !profilePicture ? "Choose profile photo" : "Choose another photo"
          }
          callback={onChange}
        />
      )}
      {profilePicture && !profilePictureSrc && (
        <ProfileCropper src={profilePicture} />
      )}
      {profilePictureSrc && (
        <img
          src={profilePictureSrc}
          alt="profile picture"
          className="profilePicture"
        />
      )}
    </>
  );
};

export default UploadPhoto;
