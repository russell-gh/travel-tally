import React, { useEffect } from "react";
import FormElement from "../reusable-code/FormElement";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { calculateSplitMax, selectSplitMax, selectSplitValues } from "../redux/homeSlice";

const SplitInput = ({ tag, parentCallback, data }) => {
  const splitMax = useSelector(selectSplitMax);
  const splitValues = useSelector(selectSplitValues);
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    paid: false,
    name: "",
    amount: "",
  });
  let remaining = splitValues.remaining;

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
    if (target === 'amount') {
      if (value > remaining) {
        value = remaining;
        dispatch(calculateSplitMax({value, tag}))
      } else {
        dispatch(calculateSplitMax({value, tag}))
      }
      
    }
    let input = { ...formData, [target]: value };
    // setFormData({ ...formData, [target]: value });
    setFormData({ ...formData, [target]: value });
    parentCallback(input, tag);
  };
 console.log(remaining);
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
        maxValue={splitMax}
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
