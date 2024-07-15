import { useDispatch, useSelector } from "react-redux";
import { selectCurrencyCodes, togglePopUp } from "../../redux/homeSlice";
import CategoryIcon from "./CategoryIcon";
import DescriptionAndDate from "./DescriptionAndDate";
import ExpenseAmount from "./ExpenseAmount";
import dayjs from "dayjs";
import SplitBillIcon from "./SplitBillIcon";

const BillSplitExpense = ({
  filtered,
  homeCurrencySymbol,
  expenses,
  splits,
  expenseID,
}) => {
  const currencyCodes = useSelector(selectCurrencyCodes);
  const dispatch = useDispatch();

  if (!expenses) {
    return;
  }

  const splitExpense = expenses.filter((expense) => {
    return expense.id === expenseID;
  });

  if (!splitExpense) {
    return;
  }

  return (
    <div>
      <CategoryIcon category={splitExpense[0].category} />
      <DescriptionAndDate
        description={splitExpense[0].description}
        category={splitExpense[0].category}
        date={splitExpense[0].date}
        sharedId={splitExpense[0].sharedId}
        expenses={expenses}
      />
      <ExpenseAmount
        homeCurrencySymbol={homeCurrencySymbol}
        amount={splitExpense[0].amount}
        currencyCodes={currencyCodes}
        splitBill={false}
        expenseId={expenseID}
      />
      {/* <img
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
              /> */}
    </div>
  );
};

export default BillSplitExpense;
