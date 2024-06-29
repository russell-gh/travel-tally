import React from "react";
import Button from "./Button";
import "../css/expense.css";
import FormElement from "./FormElement";
import { handleData } from "../utils/expenseData";
import { useSelector } from "react-redux";
import {
  selectCurrencies,
  selectCurrencyAPIData,
  selectHomeCurrency,
} from "../redux/counterSlice";

export const AddExpense = () => {
  const currencies = useSelector(selectCurrencies);
  const homeCurrency = useSelector(selectHomeCurrency);
  const data = useSelector(selectCurrencyAPIData);
  const categories = [
    { value: "Food", name: "Food" },
    { value: "Accomodation", name: "Accomodation" },
    { value: "Travel", name: "Travel" },
    { value: "Other", name: "Other" },
  ];

  const currency = currencies.map((code) => ({ value: code, name: code }));

  const expense = [
    // { date: "" },
    // { description: "" },
    // { category: "" },
    // { amount: "" },
    // { currency: "" },
    // { split: "" },
  ];
  const dataInput = (e) => {
    let target = e.target.name;
    let value = e.target.value;
    expense[`${target}`] = value;
  };

  const handleSubmit = () => {
    console.log(expense, "TRIED");
    handleData(expense, homeCurrency);
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
          { value: "No", name: "No" },
          { value: "Yes", name: "Yes" },
        ]}
        callback={dataInput}
      />

      <Button
        onClick={handleSubmit}
        text={"Submit"}
        className={"expenseSubmit"}
      />
    </div>
  );
};

export default AddExpense;
