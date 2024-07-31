export const Footer = () => {
  return (
    <>
      <footer>
        <p>Created by FT5 - The Original Russell Group 2024 &copy;</p>{" "}
        <button
          className="btn"
          onClick={() => {
            localStorage.clear();
            location.reload();
          }}
        >
          Log Out
        </button>
      </footer>
    </>
  );
};
