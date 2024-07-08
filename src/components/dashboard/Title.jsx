import { useSelector } from "react-redux";
import { selectTrips } from "../../redux/homeSlice";
import FilterTrip from "./filter/FilterTrip";
import dayjs from "dayjs";
import {
  selectProfilePictureSrc,
  selectUserName,
} from "../../redux/onboardingSlice";
import Message from "../../reusable-code/Message";

const Title = ({ destination, startDate, endDate }) => {
  const trips = useSelector(selectTrips);
  const profilePictureSrc = useSelector(selectProfilePictureSrc);
  const userName = useSelector(selectUserName);
  startDate = dayjs(startDate);
  endDate = dayjs(endDate);

  if (!trips) {
    return;
  }

  return (
    <div>
      <div className="containerTitle">
        <h1>{destination}</h1>
        {dayjs().isBefore(endDate) && startDate.isBefore(dayjs()) && (
          <Message message="Travelling" className="travellingTitle" />
        )}
        <div className="profile">
          {profilePictureSrc && (
            <img
              src={profilePictureSrc}
              alt="profile picture"
              className="profilePicture"
            />
          )}
          {userName && <Message message={userName} className="userName" />}
        </div>
      </div>
      <FilterTrip />
    </div>
  );
};

export default Title;
