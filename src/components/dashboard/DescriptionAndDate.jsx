import { unixToDate } from "../../utils/utils";

const DescriptionAndDate = ({ description, category, startDate, endDate }) => {
  if (!startDate || !endDate) {
    return;
  }

  return (
    <div>
      <h2>{description ? description : category}</h2>
      <p>
        {" "}
        {unixToDate(startDate)}
        {/* {startDate === endDate ? unixToDate(startDate) : "Something went wrong"} */}
      </p>
    </div>
  );
};

export default DescriptionAndDate;
