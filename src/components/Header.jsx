import Logo2 from "./Logo2";
import Profile from "./setUpProfile/Profile";

export const Header = () => {
  return (
    <header>
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
