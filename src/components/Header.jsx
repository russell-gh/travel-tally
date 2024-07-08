export const Header = () => {
  return (
    <header>
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
