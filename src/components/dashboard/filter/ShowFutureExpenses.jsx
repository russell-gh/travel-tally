import FormElement from "../../../reusable-code/FormElement";

const ShowFutureExpenses = () => {
  return (
    <>
      <FormElement
        type="checkbox"
        id="showFutureExpenses"
        label="show future expenses"
      />
    </>
  );
};

export default ShowFutureExpenses;
