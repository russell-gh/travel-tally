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

  const onClick = () => {
    const errorMessage = validate(value);
    if (errorMessage) {
      setError(errorMessage);
    } else {
      dispatch(saveProfile({ key: "userName", value }));
      redirect("/setup-profile/profilepicture");
    }
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
        typed={true}
      />
      <Button
        className="next"
        text="next"
        onClick={onClick}
        disabled={!!error}
        animation={true}
      />
    </div>
  );
};

export default UserName;
