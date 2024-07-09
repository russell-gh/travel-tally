import Logo from "./Logo";

export const Header = () => {
  return (
    <header>
      <Logo />
      <h1>Holidough</h1>
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
