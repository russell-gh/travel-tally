import Logo2 from "./Logo2";
import Profile from "./setUpProfile/Profile";
import { useLocation } from "react-router-dom";
import Button from "../reusable-code/Button";
import { useDispatch } from "react-redux";
import { togglePopUp } from "../redux/homeSlice";

export const Header = ({ animatingOut }) => {
  const dispatch = useDispatch();
  const location = useLocation();

  return (
    <header
      className={location.pathname === "/dashboard" ? "dashboardHeader" : ""}
    >
      <Logo2 />
      <button
        className="btn"
        onClick={() => {
          localStorage.clear();
          location.reload();
        }}
      >
        Reset
      </button>
      <Button
        animation={true}
        className="convertBtn"
        text="Convert"
        onClick={() => {
          dispatch(
            togglePopUp({
              config: {},
              component: "Converter",
            })
          );
        }}
      />
      <Profile />
    </header>
  );
};
