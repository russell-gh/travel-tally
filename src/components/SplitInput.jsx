import React, { useEffect } from "react";
import FormElement from "../reusable-code/FormElement";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  calculateSplitMax,
  selectSplitMax,
  selectSplitValues,
} from "../redux/homeSlice";

const SplitInput = ({ tag, parentCallback, data }) => {
  console.log(data);
  const splitMax = useSelector(selectSplitMax);
  const splitValues = useSelector(selectSplitValues);
  // const dispatch = useDispatch();
  // const [formData, setFormData] = useState({
  //   paid: false,
  //   name: "",
  //   amount: "",
  // });
  let remaining = splitValues.remaining;

  // useEffect(() => {
  //   if (data) {
  //     setFormData(data);
  //   }
  // }, []);

  const dataInput = (e) => {
    let target = e.target.name;
    let value;

    if (e.target.type === "checkbox") {
      value = e.target.checked;
    } else {
      value = e.target.value;
    }
    if (target === "amount") {
      value = e.target.value;
    }
    // let input = { ...formData, [target]: value };
    // // setFormData({ ...formData, [target]: value });
    // setFormData({ ...formData, [target]: value });
    parentCallback({ ...data, [target]: value }, tag);
  };
  console.log(remaining);

  return (
    <>
      <div className="flex">
        <FormElement
          type={"text"}
          label={"Name"}
          name={"name"}
          id={"nameSplit" + tag}
          value={data && data.name ? data.name : ""}
          // error={errors["description"]}
          // list={"descriptionOptions"}
          callback={dataInput}
        />
      </div>
      <div className="flex">
        <FormElement
          type={"number"}
          label={"Amount"}
          name={`amount`}
          id={`splitAmount` + tag}
          minValue={0}
          maxValue={splitMax}
          value={data && data.amount ? data.amount : ""}
          //   error={errors["amount"]}
          callback={dataInput}
        />
        <div className="paidContainer">
          <FormElement
            type={"checkbox"}
            label={"Paid"}
            name={`paid`}
            id={`paidCheck` + tag}
            value={data && data.paid ? data.paid : false}
            callback={dataInput}
          />
        </div>
      </div>
    </>
  );
};

export default SplitInput;
