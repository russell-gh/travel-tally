import FormElement from "../reusable-code/FormElement";

const SplitInput = ({ tag, parentCallback, data, splitErrors }) => {
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
    parentCallback({ ...data, [target]: value }, tag);
  };

  const tagIndex = tag;
  const nameError =
    splitErrors && splitErrors[tagIndex]
      ? splitErrors[tagIndex]["name"]
      : undefined;
  const amountError =
    splitErrors && splitErrors[tagIndex]
      ? splitErrors[tagIndex]["amount"]
      : undefined;

  console.log(splitErrors, nameError, tag);

  return (
    <div className="containerSplitPerson">
      <div className="flex">
        <FormElement
          type={"text"}
          label={"Name"}
          name={"name"}
          id={"nameSplit" + tag}
          value={data && data.name ? data.name : ""}
          error={nameError}
          // list={"descriptionOptions"}
          callback={dataInput}
          typed={true}
        />
      </div>
      <div className="flex containerAmountSplit">
        <FormElement
          type={"number"}
          label={"Amount"}
          name={`amount`}
          id={`splitAmount${tag} splitAmount`}
          minValue={0}
          value={data && data.amount ? data.amount : ""}
          error={amountError}
          callback={dataInput}
          typed={true}
        />
        <div className="paidContainer">
          <FormElement
            type={"checkbox"}
            checked={data ? data.paid : false}
            label={"Paid"}
            name={`paid`}
            id={`paidCheck` + tag}
            value={data && data.paid ? data.paid : false}
            callback={dataInput}
            typed={true}
          />
        </div>
      </div>
    </div>
  );
};

export default SplitInput;
