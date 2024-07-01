import { useState } from "react";

const Login = () => {
  const [formData, setFormData] = useState({});
  const onInput = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  console.log(formData);

  const onSubmit = (e) => {
    console.log("form submitted", formData);
  };

  return (
    <div onInput={onInput}>
      <input type="email" name="email" id="login-email" placeholder="email" />
      <input
        type="password"
        name="password"
        id="login-password"
        placeholder="password"
      />
      <button onClick={onSubmit}>Login</button>
    </div>
  );
};

export default Login;
