import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "../css/expense.css";
import {
  addExpenseData,
  selectCurrencyNames,
  selectCurrencyRates,
  selectHomeCurrency,
} from "../redux/expensesSlice";
import Button from "../reusable-code/Button";
import FormElement from "./FormElement";

export const AddExpense = () => {
  const dispatch = useDispatch();
  const currencies = useSelector(selectCurrencyNames);
  const categories = [
    { value: "Food", name: "Food" },
    { value: "Accomodation", name: "Accomodation" },
    { value: "Travel", name: "Travel" },
    { value: "Other", name: "Other" },
  ];

  if (!currencies) {
    return <p>Loading</p>;
  }

  const currency = currencies.map((code) => ({ value: code, name: code }));

  const expense = {};
  const dataInput = (e) => {
    let target = e.target.name;
    let value = e.target.value;
    expense[target] = value;
  };

  // const handleSubmit = () => {
  //   let result;
  //   result = handleData({ ...expense }, homeCurrency, apiData);
  //   console.log(result, "HERE");
  //   dispatch(addExpenseData(result));
  // };

  const handleSubmit = () => {
    console.log(expense, "PRE");
    dispatch(addExpenseData(expense));
  };
  return (
    <div className="expenseContainer">
      <FormElement
        type={"date"}
        label={"Date"}
        name={"date"}
        id={"datePicker"}
        callback={dataInput}
      />
      <FormElement
        type={"text"}
        label={"Description"}
        name={"description"}
        id={"expenseDescription"}
        callback={dataInput}
      />
      <FormElement
        type={"select"}
        label={"Category"}
        name={"category"}
        id={"categorySelectExpense"}
        options={categories}
        callback={dataInput}
      />
      <div>
        <FormElement
          type={"number"}
          label={"Amount"}
          name={"amount"}
          id={"expenseAmount"}
          callback={dataInput}
        />
        <FormElement
          type={"select"}
          name={"currency"}
          id={"currencySelectExpense"}
          options={currency}
          callback={dataInput}
        />
      </div>

      <FormElement
        type={"select"}
        label={"Split"}
        name={"split"}
        id={"splitExpense"}
        options={[
          { value: false, name: "No" },
          { value: true, name: "Yes" },
        ]}
        callback={dataInput}
      />

      <Button onClick={handleSubmit} text={"Add"} className={"expenseSubmit"} />
    </div>
  );
};

export default AddExpense;
