import { useSelector } from "react-redux";
import { selectTrips } from "../../redux/homeSlice";
import FilterTrip from "./filter/FilterTrip";
import dayjs from "dayjs";
import {
  selectProfilePictureSrc,
  selectUserName,
} from "../../redux/onboardingSlice";
import Message from "../../reusable-code/Message";
import TripInfo from "./TripInfo";

const Title = ({ destination, startDate, endDate, details }) => {
  const trips = useSelector(selectTrips);
  const profilePictureSrc = useSelector(selectProfilePictureSrc);
  const userName = useSelector(selectUserName);
  startDate = dayjs(startDate);
  endDate = dayjs(endDate);
  const amountOfDays = endDate.diff(startDate, "day") + 1;

  if (!trips) {
    return;
  }

  return (
    <div className="containerTop">
      <div className="containerTrips">
        {/* <h1>{destination}</h1> */}
        <FilterTrip />
        {dayjs().isBefore(endDate) && startDate.isBefore(dayjs()) && (
          <img
            src="../src/img/travelling.svg"
            alt="plane icon"
            className="travellingIcon"
          />
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
      <TripInfo
        startDate={startDate}
        endDate={endDate}
        details={details}
        amountOfDays={amountOfDays}
      />
    </div>
  );
};

export default Title;
