import { selectProfilePictureSrc } from "../../redux/onboardingSlice";
import Button from "../../reusable-code/Button";
import TakePhoto from "./TakePhoto";
import UploadPhoto from "./UploadPhoto";
import { Link, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

const ProfilePhoto = () => {
  const [photoChoice, setPhotoChoice] = useState("");
  const profilePictureSrc = useSelector(selectProfilePictureSrc);
  return (
    <>
      <p className="titleProfilePicture">Profile Picture:</p>
      <div className="setProfilePhotoContainer">
        <Button
          text="Take Photo"
          animation={true}
          className={`takePhotoBtn ${
            photoChoice === "takePhoto" ? "focus" : ""
          }`}
          onClick={() => setPhotoChoice("takePhoto")}
        />
        <Button
          text="Upload Photo"
          animation={true}
          className={`uploadPhotoBtn ${
            photoChoice === "uploadPhoto" ? "focus" : ""
          }`}
          onClick={() => setPhotoChoice("uploadPhoto")}
        />
        <div className="photoDisplayContainer">
          {!photoChoice && <p>Choose how to set your profile picture.</p>}
          {photoChoice === "takePhoto" && <TakePhoto />}
          {photoChoice === "uploadPhoto" && <UploadPhoto />}
        </div>
      </div>
    </>
  );
};

export default ProfilePhoto;
