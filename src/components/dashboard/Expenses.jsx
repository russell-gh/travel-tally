import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrencyCodes,
  selectPopUp,
  selectTrips,
  togglePopUp,
} from "../../redux/homeSlice";
import CategoryIcon from "./CategoryIcon";
import DeletePopUp from "./DeletePopUp";
import Image from "./Image";
import Message from "./Message";
import DescriptionAndDate from "./DescriptionAndDate";
import ExpenseAmount from "./ExpenseAmount";

const Expenses = ({ filtered, homeCurrencySymbol, expenses }) => {
  const trips = useSelector(selectTrips);
  const popUp = useSelector(selectPopUp);
  const currencyCodes = useSelector(selectCurrencyCodes);
  const dispatch = useDispatch();

  const stringToComponent = { DeletePopUp: <DeletePopUp /> };

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
        const { description, id, category, date, amount } = item;
        return (
          <div className="expenseItem" key={id}>
            <CategoryIcon category={category} />
            <DescriptionAndDate
              description={description}
              category={category}
              date={date}
            />
            <ExpenseAmount
              homeCurrencySymbol={homeCurrencySymbol}
              amount={amount}
              currencyCodes={currencyCodes}
            />
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
