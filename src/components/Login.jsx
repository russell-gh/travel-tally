import { useState } from "react";
import { selectUser } from "../redux/onboardingSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectTrips } from "../redux/homeSlice";
import Joi from "joi";
import { validate } from "../validation/validate";
import "./login.css";
import FormElement from "../reusable-code/FormElement";
import Button from "../reusable-code/Button";
//=======Displays Login Data================
const Login = () => {
  const user = useSelector(selectUser);
  const redirect = useNavigate();
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const trips = useSelector(selectTrips);
  const onInput = async (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value }); //BUG Why is state not synced?
    const errObj = await validate(formData, "login");
    setErrors(errObj);
    console.log(errors, formData);
  };
  // console.log(formData, user);
  const localUser = JSON.parse(localStorage.getItem("user")); // selects "email" part of object. Turns back into object.
  //=======Compares Credentials to Local Storage================
  const onSubmit = async (e) => {
    console.log(errors, formData);
    Object.keys(errors).length
      ? alert("Form Incomplete!")
      : !(
          (
            formData.password === localUser.password &&
            formData.email === localUser.email
          ) //TODO Change to state credentials
        )
      ? alert("wrong email/password") //TODO Change to toast?
      : trips.length
      ? redirect("/dashboard")
      : redirect("/onboarding");
    // if (errors.password || errors.email) {
    //   console.log(errors);
    // } else {
    //   if (
    //     formData.password === localUser.password &&
    //     formData.email === localUser.email
    //   ) {
    //     console.log("form submitted", user);
    //     if (trips.length) {
    //       redirect("/dashboard");
    //     } else redirect("/onboarding");
    //   } else {
    //     console.log("wrong email/password");
    //   }
    // }
  };

  return (
    <>
      <div>
        <FormElement
          callback={onInput}
          type="email"
          name="email"
          id="email"
          placeholder="email"
        />

        <p className="errortext">{errors.email}</p>
        <FormElement
          callback={onInput}
          type="password"
          name="password"
          id="password"
          placeholder="password"
        />

        <p className="errortext">{errors.password}</p>

        <Button onClick={onSubmit} text="Login" />
      </div>
    </>
  );
};

export default Login;
