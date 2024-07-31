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
        <button
          className={`takePhotoBtn btn ${
            photoChoice === "takePhoto" ? "focus" : ""
          }`}
          onClick={() => setPhotoChoice("takePhoto")}
        >
          <span>Take Photo</span>
        </button>
        <button
          className={`uploadPhotoBtn btn ${
            photoChoice === "uploadPhoto" ? "focus" : ""
          }`}
          onClick={() => setPhotoChoice("uploadPhoto")}
        >
          <span>Upload Photo</span>
        </button>
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
