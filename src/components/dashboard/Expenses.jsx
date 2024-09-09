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
import { motion, AnimatePresence } from "framer-motion";

const Expenses = ({
  filtered,
  homeCurrencySymbol,
  expenses,
  splits,
  width,
}) => {
  const trips = useSelector(selectTrips);
  const currencyCodes = useSelector(selectCurrencyCodes);
  const [displaySplit, setDisplaySplit] = useState([]);
  const dispatch = useDispatch();

  if (!currencyCodes || !trips) {
    return;
  }

  if (expenses.length === 0) {
    return (
      <Message
        message="You have no expenses yet."
        className="message"
        classNameContainer="messageContainerExpenses"
      />
    );
  }

  if (filtered.length === 0) {
    return (
      <Message
        message="There are no matches"
        className="message"
        classNameContainer="messageContainer"
      />
    );
  }

  const toggleDisplaySplit = (expenseId) => {
    setDisplaySplit((prevDisplaySplit) =>
      prevDisplaySplit.includes(expenseId)
        ? prevDisplaySplit.filter((id) => id !== expenseId)
        : [...prevDisplaySplit, expenseId]
    );
  };

  return (
    <div className={`expenses mt ${splits.length > 0 ? "expensesSplits" : ""}`}>
      {filtered.map((item) => {
        const { description, id, category, date, amount, sharedId, split } =
          item;
        const isFuture = dayjs(date).isAfter(dayjs());
        const hasBillSplit = splits.filter((split) => {
          if (split.expenseId === id) {
            return split;
          }
        });
        return (
          <div key={id}>
            <div
              className={`expenseItem ${isFuture ? "future" : ""} ${
                split && width < 450 ? "smallExpenseWithSplit" : ""
              }`}
              onClick={() => {
                if (split && width < 450) {
                  toggleDisplaySplit(id);
                }
              }}
            >
              <CategoryIcon category={category} />
              <DescriptionAndDate
                description={description}
                category={category}
                date={date}
                sharedId={sharedId}
                expenses={expenses}
              />
              <div
                className={
                  hasBillSplit.length > 0 && width > 450
                    ? "containerAmountAndBillSplit"
                    : ""
                }
              >
                {split && width > 450 ? (
                  <SplitBillIcon
                    toggleDisplaySplit={toggleDisplaySplit}
                    expenseId={id}
                  />
                ) : (
                  ""
                )}
                <ExpenseAmount
                  homeCurrencySymbol={homeCurrencySymbol}
                  amount={amount}
                  currencyCodes={currencyCodes}
                  split={split}
                  splits={splits}
                  expenseId={id}
                />
              </div>
              <img
                src="/edit.svg"
                alt="edit"
                className="edit"
                onClick={() => {
                  dispatch(
                    togglePopUp({
                      config: {
                        title: description,
                        id: id,
                        sharedId: sharedId,
                        split: split,
                      },
                      component: "EditExpense",
                    })
                  );
                }}
              />
              <img
                src="/delete.svg"
                alt="delete"
                className="delete"
                onClick={() => {
                  dispatch(
                    togglePopUp({
                      config: {
                        title: description,
                        id: id,
                        sharedId: sharedId,
                        split: split,
                      },
                      component: "DeletePopUp",
                    })
                  );
                }}
              />
            </div>
            <AnimatePresence>
              {displaySplit.includes(id) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  style={{ overflow: "hidden" }} // Ensure content is hidden during animation
                  className="animationContainerSplit"
                >
                  <BillSplitItems
                    expenseId={id}
                    splits={splits}
                    homeCurrencySymbol={homeCurrencySymbol}
                    currencyCodes={currencyCodes}
                    expenses={expenses}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

export default Expenses;
