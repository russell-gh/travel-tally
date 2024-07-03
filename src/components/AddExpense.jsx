import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "../css/expense.css";
import {
  addExpenseData,
  selectCurrencyNames,
  selectCurrencyRates,
  selectHomeCurrency,
} from "../redux/homeSlice";
import Button from "../reusable-code/Button";
import FormElement from "../reusable-code/FormElement";
import { useState, useEffect } from "react";
import { validate } from "./Onboarding/validation/validate";

export const AddExpense = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    split: false,
    currency: "GBP",
    category: "Food",
  });
  const [errors, setErrors] = useState({});
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

  const dataInput = (e) => {
    getValidationResult();
    let target = e.target.name;
    let value = e.target.value;
    if (value === "true") value = true;
    if (value === "false") value = false;
    setFormData({ ...formData, [target]: value });
  };

  const getValidationResult = async () => {
    if (!Object.values(formData).length) {
      return;
    }
    const result = await validate(formData, "expense");
    setErrors(result); //result returns promise
    console.log(errors);
  };

  const handleSubmit = () => {
    console.log("hello world");
    dispatch(addExpenseData(formData));
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
          minValue={0}
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
