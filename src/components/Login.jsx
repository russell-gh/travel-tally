import { useState } from "react";
import { selectUser } from "../redux/onboardingSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectTrips } from "../redux/homeSlice";
import Joi from "joi";
import { validate } from "./onboarding/validation/validate";
//=======Displays Login Data================
const Login = () => {
  const user = useSelector(selectUser);
  const redirect = useNavigate();
  const [formData, setFormData] = useState({});
  const trips = useSelector(selectTrips);
  const onInput = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  // console.log(formData, user);
  const localUser = JSON.parse(localStorage.getItem("user")); // selects "email" part of object. Turns back into object.

  //=======Compares Credentials to Local Storage================
  const onSubmit = async (e) => {
    const errObj = await validate(formData, "signup");
    if (errObj.password || errObj.email) {
      console.log(errObj);
    } else {
      if (
        formData.password === localUser.password1 &&
        formData.email === localUser.email
      ) {
        console.log("form submitted", formData);
        if (trips.length) {
          redirect("/dashboard");
        } else redirect("/onboarding");
      } else {
        console.log("wrong email/password");
      }
    }
  };

  return (
    <div onInput={onInput}>
      <input type="email" name="email" id="email" placeholder="email" />
      <input
        type="password"
        name="password"
        id="password"
        placeholder="password"
      />
      <button onClick={onSubmit}>Login</button>
    </div>
  );
};

export default Login;
