import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectTrips } from "../redux/homeSlice";
import { validate } from "../validation/validate";
import "../css/login.css";
import "../css/app.css";
import FormElement from "../reusable-code/FormElement";
import Button from "../reusable-code/Button";
//==========================================
//=======Displays Login Data================
//==========================================
const Login = () => {
  const redirect = useNavigate();
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const trips = useSelector(selectTrips);
  const onInput = async (e) => {
    const _formData = { ...formData, [e.target.id]: e.target.value };
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setFormData(_formData);
    const errObj = await validate(_formData, "login");
    setErrors(errObj);
    // console.log(errors, formData);
  };
  //BUG Error Timing is ugly

  const localUser = JSON.parse(localStorage.getItem("user"));

  //============================================
  //====Compares Credentials to Local Storage===
  //============================================
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
      ? alert("wrong email/password")
      : trips.length
      ? redirect("/dashboard")
      : redirect("/onboarding");
  };

  return (
    <>
      <div className="loginInput">
        <FormElement
          callback={onInput}
          type="email"
          name="email"
          id="email"
          placeholder="email"
          className="logsign-input"
        />

        <p className="errortext">{errors.email}</p>
        <FormElement
          callback={onInput}
          type="password"
          name="password"
          id="password"
          placeholder="password"
          className="logsign-input"
        />

        <p className="errortext">{errors.password}</p>

        <Button onClick={onSubmit} text="Login" />
      </div>
    </>
  );
};

export default Login;
