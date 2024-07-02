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

const Expenses = ({ expenses, homeCurrencySymbol }) => {
  const trips = useSelector(selectTrips);
  const popUp = useSelector(selectPopUp);
  const currencyCodes = useSelector(selectCurrencyCodes);
  const order = useSelector(selectOrder);
  const filter = useSelector(selectFilter);
  const filterDate = useSelector(selectFilterDate);
  const dispatch = useDispatch();

  const stringToComponent = { DeletePopUp: <DeletePopUp /> };

  if (!currencyCodes || !trips) {
    return;
  }

  if (expenses.length === 0) {
    return <p className="mt">You have no expenses yet.</p>;
  }
  const _expenses = [...expenses].reverse();
  const filtered = getSortedandFiltered(_expenses, order, filter, filterDate);

  if (filtered.length === 0) {
    return <p className="mt">There are no matches</p>;
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
                    config: { title: description, id: expenseId },
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
