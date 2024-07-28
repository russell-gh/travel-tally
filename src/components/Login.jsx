import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectTrips, setData } from "../redux/homeSlice";
import { validate } from "../validation/validate";
import "../css/login.scss";
import "../css/app.scss";
import FormElement from "../reusable-code/FormElement";
import Button from "../reusable-code/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../css/toastifyVariables.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { selectToken } from "../redux/homeSlice";

//=======Displays Login Data================

const Login = () => {
  const redirect = useNavigate();
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const trips = useSelector(selectTrips);
  const token = useSelector(selectToken);
  const dispatch = useDispatch();

  const onInput = async (e) => {
    const _formData = { ...formData, [e.target.id]: e.target.value };
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setFormData(_formData);
    const errObj = await validate(_formData, "login");
    setErrors(errObj);
    // console.log(errors, formData);
  };

  //====Compares Credentials to Local Storage===
  const onSubmit = async (e) => {
    try {
      const { data } = await axios.post(
        `http://localhost:6001/user/login`,
        formData
      );

      if (data.status) {
        dispatch(setData({ text: "token", data: data.token }));
        getTripsTryOut(data.token);
        return;
      }
    } catch (e) {
      console.log(e);
      toast.error("Incorrect Credentials!");
    }

    //message the user
    // console.log(errors, formData, localUser);
  };

  const getTripsTryOut = async (token) => {
    console.log("HERE");
    try {
      const { data } = await axios.get(`http://localhost:6001/trips`, {
        headers: { token },
      });
      if (data.status) {
        dispatch(setData({ text: "trips", data: data.tripsComplete }));
        const next = data.tripsComplete.length
          ? "/dashboard"
          : "/setup-profile";
        redirect(next);
      }
    } catch (e) {
      console.log(e);
    }

    // const getProfileTryOut = async () => {
    //   try {
    //     const { data } = await axios.get(
    //       `http://api.holidough.uk/profile/${1}`
    //     );
    //     console.log(data);
    //     dispatch(saveProfile(data));
    //   } catch (e) {
    //     console.log(e);
    //   }
    // };

    return (
      <>
        <div
          style={{
            position: "absolute",
            top: 0,
            borderRadius: "8px",
            fontFamily: "pt sans",
          }}
        >
          <ToastContainer
            position="top-center"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition:Bounce
            progressStyle={{ background: "#235b89" }}
          />
        </div>
        <div className="loginInput">
          <p className="signup-text">Don't have an account?</p>
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
          <Button
            onClick={onSubmit}
            className="logsignBTN"
            animation={true}
            text="Login"
          />

          <p className="signup-text">
            Don't have an account? <a href="/signup"> Sign up! </a>
          </p>
        </div>
      </>
    );
  };

  const getProfileTryOut = async () => {
    try {
      const { data } = await axios.get(`http://api.holidough.uk/profile/${1}`);
      console.log(data);
      dispatch(saveProfile(data));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div
        style={{
          position: "absolute",
          top: 0,
          borderRadius: "8px",
          fontFamily: "pt sans",
        }}
      >
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition:Bounce
          progressStyle={{ background: "#235b89" }}
        />
      </div>
      <div className="loginInput">
        <p className="login-title">Login to Your Account</p>
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
        <Button
          onClick={onSubmit}
          className="logsignBTN"
          animation={true}
          text="Login"
        />

        <p className="signup-text">
          Don't have an account? <a href="/signup"> Sign up! </a>
        </p>
      </div>
    </>
  );
};

export default Login;
