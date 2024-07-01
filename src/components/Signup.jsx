import { useState } from "react";
const Signup = () => {
  const [formData, setFormData] = useState({});
  const onInput = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  // console.log(formData);

  const onSubmit = (e) => {
    // console.log("form submitted", formData);

    if (formData.signupPassword1 === formData.signupPassword2) {
      console.log("form submitted", formData);
    } else {
      console.log("passwords don't match");
    }
  };
  return (
    <div onInput={onInput}>
      <input type="email" name="email" id="signup-email" placeholder="email" />
      <input
        type="password"
        name="password"
        id="signupPassword1"
        placeholder="new password"
      />
      <input
        type="password"
        name="password"
        id="signupPassword2"
        placeholder="confirm password"
      />
      <button onClick={onSubmit}>Sign Up</button>
    </div>
  );
};

export default Signup;
