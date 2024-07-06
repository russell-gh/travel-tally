import { unixToDate } from "../../utils/utilsDates";
import { getArrayOfValues } from "../../utils/utilsDates";
import { getColourForSharedId } from "../../utils/utils";

const DescriptionAndDate = ({
  description,
  category,
  startDate,
  endDate,
  sharedId,
  expenses,
}) => {
  if (!startDate || !endDate) {
    return;
  }

  const arrSharedId = getArrayOfValues(expenses, "sharedId");

  //set style with the right colour
  const dotStyle = {
    backgroundColor: getColourForSharedId(arrSharedId, sharedId),
  };

  return (
    <div>
      <h2>
        {description ? description : category}
        {sharedId && <span className="dot" style={dotStyle}></span>}
      </h2>
      <p>{unixToDate(startDate)}</p>
    </div>
  );
};

export default DescriptionAndDate;
