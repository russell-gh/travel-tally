import Button from "../../reusable-code/Button";
import FormElement from "../../reusable-code/FormElement";
import { Link } from "react-router-dom";
import { saveProfile } from "../../redux/onboardingSlice";
import { useDispatch } from "react-redux";

const UserName = () => {
  const dispatch = useDispatch();

  let value = "";
  const onChange = (e) => {
    value = e.target.value;
  };

  return (
    <>
      <FormElement
        type="text"
        label="Username"
        id="userName"
        name="userName"
        callback={(e) => {
          onChange(e);
        }}
        //makes it so you can input the username with enter
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            dispatch(saveProfile({ key: "userName", value: e.target.value }));
          }
        }}
      />
      <br />
      <Link to="/setupprofile/profilepicture">
        <Button
          className="next"
          text="next"
          onClick={() => {
            dispatch(saveProfile({ key: "userName", value: value }));
          }}
        />
      </Link>
    </>
  );
};

export default UserName;
