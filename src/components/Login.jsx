import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectTrips, setData } from "../redux/homeSlice";
import { validate } from "../validation/validate";
import "../css/login.scss";
import "../css/app.scss";
import FormElement from "../reusable-code/FormElement";
import Button from "../reusable-code/Button";
import axios from "axios";
import { useDispatch } from "react-redux";
//==========================================
//=======Displays Login Data================
//==========================================
const Login = () => {
  const redirect = useNavigate();
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const trips = useSelector(selectTrips);
  const dispatch = useDispatch();
  const onInput = async (e) => {
    const _formData = { ...formData, [e.target.id]: e.target.value };
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setFormData(_formData);
    const errObj = await validate(_formData, "login");
    setErrors(errObj);
    // console.log(errors, formData);
  };
  const localUser = JSON.parse(localStorage.getItem("user"));

  //============================================
  //====Compares Credentials to Local Storage===
  //============================================
  const onSubmit = async (e) => {
    const { data } = await axios.post(
      `http://localhost:6001/user/login`,
      formData
    );

    const next = trips.length ? "/dashboard" : "/setup-profile";

    if (data.status) {
      dispatch(setData({ text: "token", data: data.token }));
      redirect(next);
      return;
    }

    //message the user
    console.log(errors, formData, localUser);
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
        <Button onClick={onSubmit} className="loginBTN" text="Login" />

        <p className="signup-text">
          Don't have an account? <a href="/signup"> Sign up! </a>
        </p>
      </div>
    </>
  );
};

export default Login;
