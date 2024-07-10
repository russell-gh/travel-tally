import Button from "../../reusable-code/Button";
import FormElement from "../../reusable-code/FormElement";
import { Link } from "react-router-dom";
import { saveProfile } from "../../redux/onboardingSlice";
import { useDispatch } from "react-redux";
import { setUpProfileSchema } from "../../validation/schemas";
import { useState } from "react";
import Joi from "joi";

const UserName = () => {
  const dispatch = useDispatch();
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
    <>
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
      <br />
      <Link to={error ? "#" : "/setupprofile/profilepicture"}>
        <Button
          className="next"
          text="next"
          onClick={() => {
            if (!error) {
              dispatch(saveProfile({ key: "userName", value: value }));
            }
          }}
          disabled={!!error}
        />
      </Link>
    </>
  );
};

export default UserName;
