import { useState } from "react";
import { selectUser } from "../redux/onboardingSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const user = useSelector(selectUser);
  const redirect = useNavigate();
  const [formData, setFormData] = useState({});
  const onInput = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  console.log(formData, user);

  const onSubmit = (e) => {
    // if (formData.password === state.user.password) {
    //   console.log("form submitted", formData);
    //   redirect("/dashboard");
    // } else {
    //   console.log("wrong password");
    // }

    console.log(user);
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
