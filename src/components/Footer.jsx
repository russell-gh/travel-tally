import { useNavigate } from "react-router-dom";

export const Footer = () => {

  const redirect = useNavigate();

  return (
    <>
      <footer>
        <p>Created by FT5 - The Original Russell Group 2024 &copy;</p>{" "}
        <button
          className="btn"
          onClick={() => {
            localStorage.clear();
            location.reload();
            redirect('/');
          }}
        >
          Log Out
        </button>
      </footer>
    </>
  );
};
