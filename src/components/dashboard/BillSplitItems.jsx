import { unixToDate } from "../../utils/utilsDates";
import { addDecimals, getCurrencySymbol } from "../../utils/utilsBudget";
import FormElement from "../../reusable-code/FormElement";
import { useDispatch } from "react-redux";
import { setPaid } from "../../redux/homeSlice";

const BillSplitItems = ({
  splits,
  expenseId,
  homeCurrencySymbol,
  currencyCodes,
}) => {
  const dispatch = useDispatch();
  const arrayOfSplits = splits.filter((split) => {
    return split.expenseID === expenseId;
  });

  return (
    <>
      {arrayOfSplits.map((split) => {
        const { id, amount, paid, description, date, name } = split;
        const { fromCurrency, toValue, fromValue } = amount;
        return (
          <div className="billSplitItem" key={id}>
            <img
              src={`../src/img/${paid ? "paid" : "unpaid"}.svg`}
              alt={paid ? "paid icon" : "unpaid icon"}
              className="paidIcon"
            />
            <div className="containerNameAndDate">
              <h2>{name}</h2>
              <p>{unixToDate(date)}</p>
            </div>
            <div>
              <p>
                {homeCurrencySymbol}
                {addDecimals(toValue)}
              </p>
              <p className="foreignAmount">
                {getCurrencySymbol(currencyCodes, fromCurrency)}
                {addDecimals(fromValue)}
              </p>
            </div>
            {!paid && (
              <FormElement
                type="checkbox"
                label="paid"
                id="paid"
                name="paid"
                callback={() => {
                  dispatch(setPaid({ data: splits, id: id }));
                }}
              />
            )}
          </div>
        );
      })}
    </>
  );
};

export default BillSplitItems;
