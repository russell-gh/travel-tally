import Logo from "./Logo";

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
    </header>
  );
};
