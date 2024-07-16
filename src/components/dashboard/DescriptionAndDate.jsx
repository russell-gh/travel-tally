import { unixToDate } from "../../utils/utilsDates";
import { getArrayOfValues } from "../../utils/utils";
import { getColourForSharedId } from "../../utils/utils";

const DescriptionAndDate = ({
  description,
  category,
  date,
  sharedId,
  expenses,
}) => {
  if (!date) {
    return;
  }
  let dotStyle;

  if (expenses) {
    const arrSharedId = getArrayOfValues(expenses, "sharedId");

    //set style with the right colour
    dotStyle = {
      backgroundColor: getColourForSharedId(arrSharedId, sharedId),
    };
  }

  return (
    <div className="containerDescriptionAndDate">
      <h2>
        {sharedId && <span className="dot" style={dotStyle}></span>}
        {description ? description : category}
      </h2>
      <p>{unixToDate(date)}</p>
    </div>
  );
};

export default DescriptionAndDate;
