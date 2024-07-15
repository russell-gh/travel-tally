import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrencyCodes,
  selectTrips,
  togglePopUp,
} from "../../redux/homeSlice";
import CategoryIcon from "./CategoryIcon";
import Message from "../../reusable-code/Message";
import DescriptionAndDate from "./DescriptionAndDate";
import ExpenseAmount from "./ExpenseAmount";
import dayjs from "dayjs";
import SplitBillIcon from "./SplitBillIcon";
import BillSplitItems from "./BillSplitItems";
import { useState } from "react";

const Expenses = ({ filtered, homeCurrencySymbol, expenses, splits }) => {
  const trips = useSelector(selectTrips);
  const currencyCodes = useSelector(selectCurrencyCodes);
  const dispatch = useDispatch();
  const [displaySplit, setDisplaySplit] = useState(false);

  if (!currencyCodes || !trips) {
    return;
  }

  if (expenses.length === 0) {
    return <Message message="You have no expenses yet." className="message" />;
  }

  if (filtered.length === 0) {
    return <Message message="There are no matches" className="message" />;
  }

  const toggleDisplaySplit = () => {
    setDisplaySplit(!displaySplit);
  };

  return (
    <div className="expenses mt">
      {filtered.map((item) => {
        const { description, id, category, date, amount, sharedId, splitBill } =
          item;
        const isFuture = dayjs(date).isAfter(dayjs());
        return (
          <div key={id}>
            <div className={`expenseItem ${isFuture ? "future" : ""}`} key={id}>
              <CategoryIcon category={category} />
              <DescriptionAndDate
                description={description}
                category={category}
                date={date}
                sharedId={sharedId}
                expenses={expenses}
              />
              <div className="containerAmountAndBillSplit">
                {splitBill && (
                  <SplitBillIcon toggleDisplaySplit={toggleDisplaySplit} />
                )}
                <ExpenseAmount
                  homeCurrencySymbol={homeCurrencySymbol}
                  amount={amount}
                  currencyCodes={currencyCodes}
                  splitBill={splitBill}
                  splits={splits}
                  expenseId={id}
                />
              </div>
              <img
                src="../src/img/edit.svg"
                alt="edit"
                className="edit"
                onClick={() => {
                  dispatch(
                    togglePopUp({
                      config: {
                        title: description,
                        id: id,
                        sharedId: sharedId,
                      },
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
                      config: {
                        title: description,
                        id: id,
                        sharedId: sharedId,
                      },
                      component: "DeletePopUp",
                    })
                  );
                }}
              />
            </div>
            {displaySplit && (
              <BillSplitItems
                expenseId={id}
                splits={splits}
                homeCurrencySymbol={homeCurrencySymbol}
                currencyCodes={currencyCodes}
                expenses={expenses}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Expenses;
