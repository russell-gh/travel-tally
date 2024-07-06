import dayjs from "dayjs";

const StillTravellingInfo = ({ endDate }) => {
  return (
    <div className="containerTravellingInfo">
      <p>Days left: {endDate.diff(dayjs(), "day")} days</p>
    </div>
  );
};

export default StillTravellingInfo;
