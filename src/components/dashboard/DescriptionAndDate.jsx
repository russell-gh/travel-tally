import { unixToDate } from "../../utils/utilsDates";

const DescriptionAndDate = ({ description, category, startDate, endDate }) => {
  if (!startDate || !endDate) {
    return;
  }

  return (
    <div>
      <h2>{description ? description : category}</h2>
      <p>{unixToDate(startDate)}</p>
    </div>
  );
};

export default DescriptionAndDate;
