import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../redux/onboardingSlice";
import { useNavigate } from "react-router-dom";
import { validate } from "../validation/validate";
import FormElement from "../reusable-code/FormElement";
import Button from "../reusable-code/Button";
import { generateId } from "../utils/utils";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../css/toastifyVariables.css";
import axios from "axios";
import { API_URL } from "../config";

const Signup = () => {
  //Sends Errors + Creds to State
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const onInput = async (e) => {
    const _formData = { ...formData, [e.target.id]: e.target.value };
    setFormData(_formData);
    const errObj = await validate(_formData, "signup");
    setErrors(errObj);
  };
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const redirect = useNavigate();
  //=========Validates credentials============
  const onSubmit = async (e) => {
    const errObj = await validate(formData, "signup");
    setErrors(errObj);

    if (errObj.password || errObj.email) {
    } else if (formData.password === formData.passwordConfirm) {
      formData.userID = generateId("user");
      const now = Date.now();
      try {
        const { data } = await axios.post(
          `${API_URL}/user/signup`,
          formData
        );

        if (data.status) {
          redirect("/login");
        } else {
          toast.error("Failed to add user");
        }
      } catch (e) {
        toast.error("Error creating account");
      }
    } else {
      toast.error("Passwords do not match!");
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
      <div onInput={onInput} className="loginInput">
        <p className="signin-title">Create an Account</p>
        <FormElement
          callback={onInput}
          type="email"
          name="email"
          id="email"
          placeholder="email"
          typed={true}
        />
        <p className="errortext">{errors.email}</p>

        <FormElement
          callback={onInput}
          type="password"
          name="password"
          id="password"
          placeholder="new password"
          typed={true}
        />
        <p className="errortext">{errors.password}</p>

        <FormElement
          callback={onInput}
          type="password"
          name="passwordConfirm"
          id="passwordConfirm"
          placeholder="confirm new password"
          typed={true}
        />
        <p className="errortext">{errors.passwordConfirm}</p>
        <Button
          onClick={onSubmit}
          text="Sign Up"
          className="logsignBTN"
          animation={true}
        />

        <p className="signup-text">
          Already have an account? <a onClick={()=> redirect("/login")}> Login! </a>
        </p>
      </div>
    </>
  );
};

export default Signup;
