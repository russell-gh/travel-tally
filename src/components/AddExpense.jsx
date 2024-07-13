import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "../css/expense.scss";
import {
  addExpenseData,
  selectCurrencyNames,
  selectSelectedTripId,
  selectTrips,
  togglePopUp,
} from "../redux/homeSlice";
import Button from "../reusable-code/Button";
import FormElement from "../reusable-code/FormElement";
import { useState, useEffect } from "react";
import { validate } from "../validation/validate";
import { date } from "joi";
import { getExpenseList } from "../utils/expenseData";
import SplitInput from "./SplitInput";

export const AddExpense = () => {
  const dispatch = useDispatch();
  const tripID = useSelector(selectSelectedTripId);
  const trips = useSelector(selectTrips);
  let expenses = getExpenseList(tripID, trips).expenses;
  const [formData, setFormData] = useState({
    multiDay: false,
    date: new Date().toLocaleDateString("en-CA"),
    endDate: new Date().toLocaleDateString("en-CA"),
    amount: 0,
    split: false,
    currency: "GBP",
    category: "Food",
  });
  const [errors, setErrors] = useState({});
  let [multi, setMulti] = useState(false);
  const [splitData, setSplitData] = useState([])
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
    if (Object.keys(errors).length) {
      console.log(formData, "FAIL", errors);
      return;
    }
    if (formData.description && formData.amount) {
       const result = {formData, splitData} 
       console.log(result, "pass");
      dispatch(addExpenseData(result));
    } else {
      console.log("FAIL FINAL");
      return;
    }
  };

  
  const multiDay = () => {
    setMulti((multi = !multi));
    const inverted = !formData.multiDay;
    setFormData({ ...formData, multiDay: inverted });
  };
  const renderMultiDay = () => {
    if (multi) {
      return (
        <FormElement
          type={"date"}
          label={"End date"}
          name={"endDate"}
          value={formData.endDate}
          id={"endDatePicker"}
          error={errors["endDate"]}
          callback={dataInput}
        />
      );
    } else {
      return <></>;
    }
  };

  let handleAddPerson = () => {
    setSplit([...split,<SplitInput amount={formData.amount} tag={split.length} parentCallback={getSplitData} />]);
}
let handleRemovePerson = () => {
  setSplit(split.splice(split.length -1, 1));
}

const getSplitData = (data, tag) => {
  const dataCopy = Array.from(splitData);
  dataCopy.splice(tag, 1, data);
  setSplitData(dataCopy);
  console.log('IM TRYING', data, splitData, dataCopy)
};
const [split,setSplit] = useState([<SplitInput amount={formData.amount} tag={0} parentCallback={getSplitData} />])
  const renderSplit = () => {
    if(formData.split === true) {
      return <div>
        {split}
        <Button onClick={handleAddPerson} text={"Add Person"} className={"splitAddPerson"} />
        <Button onClick={handleRemovePerson} text={"Remove Person"} className={"splitRemovePerson"} />
      </div>
    }
  }
  
  return (
    <div className="expenseContainer">
      <div>
        <FormElement
          type={"date"}
          label={"Date"}
          name={"date"}
          value={formData.date}
          id={"datePicker"}
          callback={dataInput}
        />
        {renderMultiDay()}
        <FormElement
          type={"checkbox"}
          label={"Multiple days"}
          name={"dateCheck"}
          id={"dateCheck"}
          callback={multiDay}
        />
      </div>
      <FormElement
        type={"text"}
        label={"Description"}
        name={"description"}
        id={"expenseDescription"}
        error={errors["description"]}
        list={"descriptionOptions"}
        callback={dataInput}
      />
      <datalist id="descriptionOptions">
        {expenses.map((expense) => {
          return <option value={expense.description}></option>;
        })}
      </datalist>
      <FormElement
        type={"select"}
        label={"Category"}
        name={"category"}
        id={"categorySelectExpense"}
        options={categories}
        error={errors["category"]}
        callback={dataInput}
      />
      <div>
        <FormElement
          type={"number"}
          label={"Amount"}
          name={"amount"}
          id={"expenseAmount"}
          minValue={0}
          error={errors["amount"]}
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
      {renderSplit()}

      <Button onClick={handleSubmit} text={"Add"} className={"expenseSubmit"} />
      <Button
        text="Cancel"
        className="cancelBtn"
        animation={true}
        onClick={() => dispatch(togglePopUp())}
      />
    </div>
  );
};

export default AddExpense;
