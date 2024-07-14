import React, { useEffect } from "react";
import FormElement from "../reusable-code/FormElement";
import { useState } from "react";

const SplitInput = ({ amount, tag, parentCallback, data }) => {
  const [formData, setFormData] = useState({
    paid: false,
    name: "",
    amount: 0,
  });

  useEffect(() => {
    if (data) {
      setFormData(data);
    }
  }, []);

  const dataInput = (e) => {
    let target = e.target.name;
    let value;

    if (e.target.type === "checkbox") {
      value = e.target.checked;
    } else {
      value = e.target.value;
    }
    let input = { ...formData, [target]: value };
    // setFormData({ ...formData, [target]: value });
    setFormData({ ...formData, [target]: value });
    parentCallback(input, tag);
  };

  return (
    <>
      <FormElement
        type={"text"}
        label={"Name"}
        name={"name"}
        id={"nameSplit" + tag}
        value={formData.name}
        // error={errors["description"]}
        // list={"descriptionOptions"}
        callback={dataInput}
      />
      <FormElement
        type={"number"}
        label={"Amount"}
        name={`amount`}
        id={`splitAmount` + tag}
        minValue={0}
        maxValue={amount}
        value={formData.amount}
        //   error={errors["amount"]}
        callback={dataInput}
      />
      <FormElement
        type={"checkbox"}
        label={"Paid"}
        name={`paid`}
        id={`paidCheck` + tag}
        value={formData.paid}
        callback={dataInput}
      />
    </>
  );
};

export default SplitInput;
