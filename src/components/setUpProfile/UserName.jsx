import Button from "../../reusable-code/Button";
import FormElement from "../../reusable-code/FormElement";
import { Link, redirect } from "react-router-dom";
import { saveProfile } from "../../redux/onboardingSlice";
import { useDispatch } from "react-redux";
import { setUpProfileSchema } from "../../validation/schemas";
import { useState } from "react";
import Joi from "joi";
import { useNavigate } from "react-router-dom";

const UserName = () => {
  const dispatch = useDispatch();
  const redirect = useNavigate();
  const [error, setError] = useState("");
  const [value, setValue] = useState("");

  // let value = "";
  // const onChange = (e) => {
  //   value = e.target.value;
  // };

  const validate = (value) => {
    const { error } = setUpProfileSchema.userName.validate(value);
    return error ? error.details[0].message : null;
  };

  const onChange = (e) => {
    const value = e.target.value;
    setValue(value);
    const errorMessage = validate(value);
    setError(errorMessage);
  };

  return (
    <div className="setUserNameContainer">
      <FormElement
        type="text"
        label="Username"
        id="userName"
        name="userName"
        value={value}
        callback={(e) => {
          onChange(e);
        }}
        //makes it so you can input the username with enter
        onKeyDown={(e) => {
          if (e.key === "Enter" && !error) {
            dispatch(saveProfile({ key: "userName", value: e.target.value }));
          }
        }}
        error={error}
      />
      <Button
        className="next"
        text="next"
        onClick={() => {
          if (!error) {
            dispatch(saveProfile({ key: "userName", value: value }));
          }
          redirect("/setup-profile/profilepicture");
        }}
        disabled={!!error}
      />
    </div>
  );
};

export default UserName;
