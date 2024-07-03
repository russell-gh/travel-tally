import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrencyCodes,
  selectFilter,
  selectFilterDate,
  selectOrder,
  selectPopUp,
  selectTrips,
  togglePopUp,
} from "../../redux/tripsSlice";
import { getSortedandFiltered } from "../../utils/getSortedandFiltered";
import { addDecimals, getCurrencySymbol, unixToDate } from "../../utils/utils";
import CategoryIcon from "./CategoryIcon";
import DeletePopUp from "./DeletePopUp";
import Image from "./Image";

const Expenses = ({ filtered, homeCurrencySymbol }) => {
  const trips = useSelector(selectTrips);
  const popUp = useSelector(selectPopUp);
  const currencyCodes = useSelector(selectCurrencyCodes);
  const dispatch = useDispatch();

  const stringToComponent = { DeletePopUp: <DeletePopUp /> };

  if (!currencyCodes || !trips) {
    return;
  }

  return (
    <div className="expenses mt">
      {filtered.map((item) => {
        const { description, id, category, date, amount } = item;
        return (
          <div className="expenseItem" key={id}>
            <CategoryIcon category={category} />
            <div>
              <h2>{description ? description : category}</h2>
              <p>{unixToDate(date)}</p>
            </div>
            <div>
              <p>
                {homeCurrencySymbol}
                {addDecimals(amount.toValue)}
              </p>
              <p className="foreignAmount">
                {getCurrencySymbol(currencyCodes, amount.fromCurrency)}
                {addDecimals(amount.fromValue)}
              </p>
            </div>
            <Image
              src="../src/img/delete.svg"
              alt="delete"
              onClick={() => {
                dispatch(
                  togglePopUp({
                    config: { title: description, id: id },
                    component: "DeletePopUp",
                  })
                );
              }}
            />
          </div>
        );
      })}
      {stringToComponent[popUp.component]}
    </div>
  );
};

export default Expenses;
