import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrencyCodes,
  selectPopUp,
  selectTrips,
  togglePopUp,
} from "../../redux/homeSlice";
import CategoryIcon from "./CategoryIcon";
import DeletePopUp from "./DeletePopUp";
import Message from "../../reusable-code/Message";
import DescriptionAndDate from "./DescriptionAndDate";
import ExpenseAmount from "./ExpenseAmount";
import dayjs from "dayjs";

const Expenses = ({ filtered, homeCurrencySymbol, expenses }) => {
  const trips = useSelector(selectTrips);
  const currencyCodes = useSelector(selectCurrencyCodes);
  const dispatch = useDispatch();

  if (!currencyCodes || !trips) {
    return;
  }

  if (expenses.length === 0) {
    return <Message message="You have no expenses yet." className="mt" />;
  }

  if (filtered.length === 0) {
    return <Message message="There are no matches" className="mt" />;
  }

  return (
    <div className="expenses mt">
      {filtered.map((item) => {
        const { description, id, category, date, amount, sharedId } = item;
        const isFuture = dayjs(date).isAfter(dayjs());
        return (
          <div className={`expenseItem ${isFuture ? "future" : ""}`} key={id}>
            <CategoryIcon category={category} />
            <DescriptionAndDate
              description={description}
              category={category}
              date={date}
              sharedId={sharedId}
              expenses={expenses}
            />
            <ExpenseAmount
              homeCurrencySymbol={homeCurrencySymbol}
              amount={amount}
              currencyCodes={currencyCodes}
            />
            <img
              src="../src/img/edit.svg"
              alt="edit"
              className="edit"
              onClick={() => {
                dispatch(
                  togglePopUp({
                    config: { title: description, id: id, sharedId: sharedId },
                    component: "EditExpense",
                  })
                );
              }}
            />
            <img
              src="../src/img/delete.svg"
              alt="delete"
              className="delete"
              onClick={() => {
                dispatch(
                  togglePopUp({
                    config: { title: description, id: id, sharedId: sharedId },
                    component: "DeletePopUp",
                  })
                );
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Expenses;
