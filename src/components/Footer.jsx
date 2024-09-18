import { useNavigate } from "react-router-dom";
import { selectToken } from "../redux/homeSlice";
import { useSelector } from "react-redux";

export const Footer = () => {
  const redirect = useNavigate();
  const token = useSelector(selectToken);

  return (
    <>
      <footer>
        <p>Created by FT5 - The Original Russell Group 2024 &copy;</p>{" "}
        {token && (
          <button
            className="btn"
            onClick={() => {
              localStorage.clear();
              redirect("/");
              location.reload();
            }}
          >
            Log Out
          </button>
        )}
      </footer>
    </>
  );
};
