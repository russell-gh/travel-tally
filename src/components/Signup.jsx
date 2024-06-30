import { useState } from "react";
const Signup = () => {
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
      <input type="email" name="email" id="signup-email" placeholder="email" />
      <input
        type="password"
        name="password"
        id="signup-password1"
        placeholder="new password"
      />
      <input
        type="password"
        name="password"
        id="signup-password2"
        placeholder="confirm password"
      />
      <button onClick={onSubmit}>Sign Up</button>
    </div>
  );
};

export default Signup;
