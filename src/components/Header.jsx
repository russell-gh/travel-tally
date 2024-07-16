import Logo2 from "./Logo2";
import Profile from "./setUpProfile/Profile";
import { useLocation } from "react-router-dom";

export const Header = () => {
  const location = useLocation();
  console.log(location);

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
      <Profile />
    </header>
  );
};
