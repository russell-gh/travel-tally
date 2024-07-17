import Logo2 from "./Logo2";
import Profile from "./setUpProfile/Profile";
import LogoText from "./LogoText";

export const Header = () => {
  return (
    <header>
      <div className="logo-text-container">
        <Logo2 />
        <LogoText />
      </div>
      <Profile />
      <button
        className="btn"
        onClick={() => {
          localStorage.clear();
          location.reload();
        }}
      >
        Reset
      </button>
    </header>
  );
};
