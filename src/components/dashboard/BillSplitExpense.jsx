import { useSelector } from "react-redux";
import { selectCurrencyCodes } from "../../redux/homeSlice";
import CategoryIcon from "./CategoryIcon";
import DescriptionAndDate from "./DescriptionAndDate";
import ExpenseAmount from "./ExpenseAmount";
import BillSplitItems from "./BillSplitItems";

const BillSplitExpense = ({
  filtered,
  homeCurrencySymbol,
  expenses,
  splits,
  expenseId,
  splitExpense,
}) => {
  const currencyCodes = useSelector(selectCurrencyCodes);

  if (!splitExpense) {
    return;
  }

  return (
    <div className="expenseItem">
      <CategoryIcon category={splitExpense.category} />
      <DescriptionAndDate
        description={splitExpense.description}
        category={splitExpense.category}
        date={splitExpense.date}
        sharedId={splitExpense.sharedId}
        expenses={expenses}
      />
      <ExpenseAmount
        homeCurrencySymbol={homeCurrencySymbol}
        amount={splitExpense.amount}
        currencyCodes={currencyCodes}
        split={false}
        expenseId={expenseId}
      />
      <ExpenseAmount
        homeCurrencySymbol={homeCurrencySymbol}
        amount={splitExpense.amount}
        currencyCodes={currencyCodes}
        split={true}
        expenseId={expenseId}
        splits={splits}
      />
      <BillSplitItems
        expenseId={expenseId}
        splits={splits}
        homeCurrencySymbol={homeCurrencySymbol}
        currencyCodes={currencyCodes}
        expenses={expenses}
      />
    </div>
  );
};

export default BillSplitExpense;
