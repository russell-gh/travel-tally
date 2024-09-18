import React from "react";
import { useState } from "react";
import FormElement from "../reusable-code/FormElement";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrencyNames, selectCurrencyRates } from "../redux/homeSlice";
import { convertCurrency } from "../utils/expenseData";
import Button from "../reusable-code/Button";
import { togglePopUp } from "../redux/homeSlice";
import "../css/converter.scss";

const Converter = ({ animatingOut }) => {
  const currencies = useSelector(selectCurrencyNames);
  const rates = useSelector(selectCurrencyRates);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    from: 0,
    fromCurrency: "GBP",
    to: 0,
    toCurrency: "GBP",
  });

  if (!currencies) {
    return <p>Loading</p>;
  }

  const currency = currencies.map((code) => ({ value: code, name: code }));

  const dataInput = (e) => {
    let target = e.target.name;
    let value = e.target.value;
    setFormData({ ...formData, [target]: value });
    // console.log(target, value);
  };

  const convertedValue = convertCurrency(
    formData.from,
    formData.fromCurrency,
    rates
  );

  return (
    <div className="converterContainer">
      <h2>Convert here</h2>
      <div className="flex fromContainer">
        <FormElement
          type={"number"}
          label={"From"}
          name={"from"}
          id={"fromAmount"}
          minValue={0}
          callback={dataInput}
          typed={true}
        />
        <FormElement
          type={"select"}
          name={"fromCurrency"}
          id={"fromCurrencySelect"}
          options={currency}
          callback={dataInput}
          typed={true}
        />
      </div>
      <div className="flex">
        <FormElement
          type={"number"}
          label={"To home currency"}
          name={"to"}
          id={"toAmount"}
          value={convertCurrency(formData.from, formData.fromCurrency, rates).toFixed(2)}
          callback={dataInput}
          typed={true}
        />
        <Button
          text="Close"
          className="closeBtn"
          animation={true}
          onClick={() => dispatch(togglePopUp())}
          disabled={animatingOut}
        />
      </div>
    </div>
  );
};

export default Converter;
