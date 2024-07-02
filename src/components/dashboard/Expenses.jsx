import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrencyCodes,
  selectFilter,
  selectFilterDate,
  selectOrder,
  selectPopUp,
  selectTrips,
  toggleShowPopUp,
} from "../../redux/tripsSlice";
import { getSortedandFiltered } from "../../utils/getSortedandFiltered";
import { addDecimals, getCurrencySymbol } from "../../utils/utils";
import CategoryIcon from "./CategoryIcon";
import DeletePopUp from "./DeletePopUp";
import Image from "./Image";

const Expenses = ({ index }) => {
  const trips = useSelector(selectTrips);
  const showPopUp = useSelector(selectPopUp).showPopUp;
  const currencyCodes = useSelector(selectCurrencyCodes);
  const order = useSelector(selectOrder);
  const filter = useSelector(selectFilter);
  const filterDate = useSelector(selectFilterDate);
  const dispatch = useDispatch();

  if (!currencyCodes || !trips) {
    return;
  }

  const expenses = trips[index].expenses;

  if (expenses.length === 0) {
    return <p className="mt">You have no expenses yet.</p>;
  }
  const _expenses = [...expenses].reverse();
  const filtered = getSortedandFiltered(_expenses, order, filter, filterDate);
  const homeCurrencySymbol = trips[index].details.homeCurrencySymbol;

  if (filtered.length === 0) {
    return <p className="mt">There are no matches</p>;
  }

  return (
    <div className="expenses mt">
      {filtered.map((item) => {
        const { description, expenseId, category, date, amount } = item;
        return (
          <div className="expenseItem" key={expenseId}>
            <CategoryIcon category={category} />
            <div>
              <h2>{description ? description : category}</h2>
              <p>{date}</p>
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
                  toggleShowPopUp({ title: description, id: expenseId })
                );
              }}
            />
          </div>
        );
      })}
      {showPopUp && <DeletePopUp />}
    </div>
  );
};

export default Expenses;
