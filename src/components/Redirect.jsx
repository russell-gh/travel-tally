import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { selectToken, selectTrips } from "../redux/homeSlice";
import { useSelector } from "react-redux";
import { selectProfile } from "../redux/onboardingSlice";

const Redirect = () => {
  const redirect = useNavigate();
  const location = useLocation();
  const token = useSelector(selectToken);
  const trips = useSelector(selectTrips);
  const profile = useSelector(selectProfile);

  useEffect(() => {
    const { pathname } = location;
    // console.log(pathname, token, profile, trips);
    //go to splashpage if there is no path
    if (pathname === "/") {
      return;
    }

    //you are on login or signup and you do not have a token. This is correct.
    if ((pathname === "/login" || pathname === "/signup") && !token) {
      return;
    }

    if (pathname === "/onboarding" && !token) {
      redirect("/login");
      return;
    }

    //if you are on dashboard with token
    if (pathname === "/dashboard" && token) {
      return;
    }

    //if you are on login and there is a token, but there is no profile
    if (
      pathname === "/login" &&
      (!profile || Object.keys(profile).length === 0)
    ) {
      redirect("/setup-profile");
      return;
    }

    //if you are on onboarding, but there is no profile
    if (
      pathname === "/onboarding" &&
      (!profile || Object.keys(profile).length === 0)
    ) {
      redirect("/setup-profile");
      return;
    }

    //if you are on login with a token, but there are no trips
    if (pathname === "/login" && (!trips || trips.length === 0)) {
      redirect("/onboarding");
      return;
    }

    //if you are on login and you have a token
    if (pathname === "/login" && token) {
      redirect("/dashboard");
      return;
    }

    //if you are on signup and you have a token
    if (pathname === "/signup" && token) {
      redirect("/dashboard");
      return;
    }

    redirect("/login");
  }, []);

  return <></>;
};

export default Redirect;
