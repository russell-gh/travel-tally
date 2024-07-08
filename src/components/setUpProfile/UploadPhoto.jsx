import { useState } from "react";
import FormElement from "../../reusable-code/FormElement";
import { selectProfilePictureSrc } from "../../redux/onboardingSlice";
import { useSelector } from "react-redux";
import StageOfPhoto from "./StagesOfPhoto";

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
      <StageOfPhoto profilePicture={profilePicture} />
    </>
  );
};

export default UploadPhoto;
