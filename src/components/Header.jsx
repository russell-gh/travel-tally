import Logo from "./Logo";
import Profile from "./setUpProfile/Profile";

export const Header = () => {
  return (
    <header>
      <Logo />
      <h1>holiDough</h1>
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
