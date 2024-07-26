import Logo2 from "./Logo2";
import Profile from "./setUpProfile/Profile";
import LogoText from "./LogoText";
import { useLocation } from "react-router-dom";
import Button from "../reusable-code/Button";
import { useDispatch } from "react-redux";
import { togglePopUp } from "../redux/homeSlice";

export const Header = ({ animatingOut }) => {
  const dispatch = useDispatch();
  const url = useLocation();

  return (
    <header className={url.pathname === "/dashboard" ? "dashboardHeader" : ""}>
      <div className="logo-text-container">
        <Logo2 />
        <LogoText />
      </div>
      <div className="profile-reset-container">
        <Profile />
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
        <button
          className="btn"
          onClick={() => {
            localStorage.clear();
            location.reload();
          }}
        >
          Reset
        </button>
      </div>
    </header>
  );
};
