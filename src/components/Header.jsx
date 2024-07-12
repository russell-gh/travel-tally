import Logo from "./Logo";
import Profile from "./setUpProfile/Profile";

export const Header = () => {
  return (
    <header>
      <h1>holiDough</h1>
      <Logo />
      <button
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
