import React from "react";
import { useState } from "react";
import FormElement from "../reusable-code/FormElement";
import { useSelector } from "react-redux";
import { selectCurrencyNames, selectCurrencyRates } from "../redux/homeSlice";
import { convertCurrency } from "../utils/expenseData";

const Converter = () => {
  const currencies = useSelector(selectCurrencyNames);
  const rates = useSelector(selectCurrencyRates);
  const [formData, setFormData] = useState({
    from: 0,
    fromCurrency: "USD",
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
    // if (target === "from" || "to") {
    //   value = Number(value);
    // }
    setFormData({ ...formData, [target]: value });
    console.log(target, value);
  };

  //   function convertCurrency(from, fromCurrency, data) {
  //     const origin = from;
  //     const rate = data[fromCurrency];
  //     const result = origin / rate;
  //     return result;
  //   }

  return (
    <>
      <div className="flex">
        <FormElement
          type={"number"}
          label={"From"}
          name={"from"}
          id={"fromAmount"}
          minValue={0}
          callback={dataInput}
        />
        <FormElement
          type={"select"}
          name={"fromCurrency"}
          id={"fromCurrencySelect"}
          options={currency}
          callback={dataInput}
        />
      </div>
      <div className="flex">
        <FormElement
          type={"number"}
          label={"To home currency"}
          name={"to"}
          id={"toAmount"}
          value={convertCurrency(formData.from, formData.fromCurrency, rates)}
          callback={dataInput}
        />
      </div>
    </>
  );
};

export default Converter;
