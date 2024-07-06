import dayjs from "dayjs";

const StillTravellingInfo = ({ endDate }) => {
  const now = dayjs();
  console.log(endDate, now);
  const daysLeft = endDate.diff(now, "day");
  const hoursLeft = endDate.subtract(daysLeft, "day").diff(now, "hour", true);

  return (
    <div className="containerTravellingInfo">
      <p>
        Time left: {daysLeft} days and {Math.round(hoursLeft)} hours
      </p>
    </div>
  );
};

export default StillTravellingInfo;
