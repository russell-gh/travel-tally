import { unixToDate } from "../../utils/utils";

const DescriptionAndDate = ({ description, category, date }) => {
  return (
    <div>
      <h2>{description ? description : category}</h2>
      <p>{unixToDate(date)}</p>
    </div>
  );
};

export default DescriptionAndDate;
