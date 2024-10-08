import BillSplitItems from "./BillSplitItems";
import { useSelector } from "react-redux";
import { selectCurrencyCodes } from "../../redux/homeSlice";
import Message from "../../reusable-code/Message";
import BillSplitExpense from "./BillSplitExpense";

const BillSplits = ({ splits, homeCurrencySymbol, expenses, filtered }) => {
  const currencyCodes = useSelector(selectCurrencyCodes);

  if (!splits) {
    return;
  }

  if (splits.length === 0) {
    return (
      <Message
        message="You have no splits yet."
        className="message"
        classNameContainer="messageContainer"
      />
    );
  }

  const index = filtered.findIndex((expense) => {
    return expense.split;
  });

  if (index === -1) {
    return (
      <Message
        message="There are no matches"
        className="message"
        classNameContainer="messageContainer"
      />
    );
  }

  return (
    <div className="billSplits">
      {filtered.map((expense) => {
        if (expense.split) {
          return (
            <div key={expense.id}>
              <BillSplitExpense
                homeCurrencySymbol={homeCurrencySymbol}
                splitExpense={expense}
                splits={splits}
                expenseId={expense.id}
                expenses={expenses}
              />
              <BillSplitItems
                splits={splits}
                homeCurrencySymbol={homeCurrencySymbol}
                currencyCodes={currencyCodes}
                expenses={expenses}
                filtered={filtered}
                expenseId={expense.id}
                tabBillSplit={true}
              />
            </div>
          );
        }
      })}
    </div>
  );
};

export default BillSplits;
