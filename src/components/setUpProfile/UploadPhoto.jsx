import { useState } from "react";
import FormElement from "../../reusable-code/FormElement";
import Button from "../../reusable-code/Button";
import { saveProfilePicture } from "../../redux/onboardingSlice";

const UploadPhoto = () => {
  const [profilePicture, setProfilePicture] = useState();
  const onChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      return console.log("No file");
    }
    console.log(file);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    console.log(reader);

    reader.addEventListener("load", (e) => {
      setProfilePicture(e.target.result);
    });
  };

  return (
    <>
      <FormElement
        type="file"
        id="profilePhoto"
        name="profilePhoto"
        accept="image/*"
        label="Upload profile photo"
        callback={onChange}
      />
      {profilePicture && (
        <img
          src={profilePicture}
          alt="profile picture"
          className="profilePhoto"
        />
      )}
      <Button
        className="upload"
        text="upload"
        onClick={() => {
          saveProfilePicture(profilePicture);
        }}
      />
    </>
  );
};

export default UploadPhoto;
