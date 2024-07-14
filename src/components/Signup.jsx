import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../redux/onboardingSlice";
import { useNavigate } from "react-router-dom";
import { validate } from "../validation/validate";
import FormElement from "../reusable-code/FormElement";
import Button from "../reusable-code/Button";
import { generateId } from "../utils/utils";

const Signup = () => {
  //Sends Errors + Creds to State
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const onInput = async (e) => {
    const _formData = { ...formData, [e.target.id]: e.target.value };
    setFormData(_formData);
    const errObj = await validate(_formData, "signup");
    //BUG Error Timing is ugly
    setErrors(errObj);
  };
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const redirect = useNavigate();
  //==========================================
  //=========Validates credentials============
  //==========================================
  const onSubmit = async (e) => {
    const errObj = await validate(formData, "signup");
    setErrors(errObj);

    if (errObj.password || errObj.email) {
      console.log(">>>", errObj);
    } else if (formData.password === formData.passwordConfirm) {
      formData.userID = generateId("user");
      dispatch(addUser(formData));
      localStorage.setItem("user", JSON.stringify(formData));
      console.log(formData);
      redirect("/login"); //TODO Change to SetupProfile
    } else {
      alert("passwords don't match", formData);
    }
  };

  return (
    <div onInput={onInput} className="loginInput">
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
        placeholder="new password"
      />
      <p className="errortext">{errors.password}</p>

      <FormElement
        callback={onInput}
        type="password"
        name="passwordConfirm"
        id="passwordConfirm"
        placeholder="confirm new password"
      />
      <p className="errortext">{errors.passwordConfirm}</p>
      <Button onClick={onSubmit} text="Sign Up" />
    </div>
  );
};

export default Signup;
