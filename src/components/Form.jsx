//dummy examples

import FormElement from "./FormElement";

const Form = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
  };

  return (
    <form
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <FormElement
        type="text"
        id="name"
        label="Enter your name here"
        name="name"
        callback={(e) => console.log(e.target.value)}
      />
      <FormElement
        type="number"
        id="budget"
        label="Enter your budget here"
        name="budget"
        minValue={10}
        maxValue={100}
        callback={(e) => console.log(e.target.value)}
      />
      <FormElement
        type="email"
        id="email"
        label="Enter your email here"
        name="email"
        callback={(e) => console.log(e.target.value)}
      />
      <FormElement
        type="password"
        id="password"
        label="Enter your password here"
        name="password"
        callback={(e) => console.log(e.target.value)}
      />
      <FormElement
        type="file"
        id="profile-pic"
        label="Choose a picture to upload"
        name="profile-pic"
        callback={(e) => console.log(e.target.files[0])}
      />
      <FormElement
        type="date"
        id="startDate"
        label="Choose the start date of your trip"
        name="startDate"
        minDate={"2000-01-01"}
        maxDate={"2030-12-31"}
        callback={(e) => console.log(e.target.value)}
      />
      <FormElement
        type="checkbox"
        id="t&cs"
        label="Check this box to confirm you have read and agree to the T's & C's"
        name="t&cs"
        callback={(e) => console.log(e.target.checked)}
      />
      <FormElement
        type="select"
        id="currency"
        label="Select your home currency from the dropdown below"
        name="currency"
        options={[
          { value: "GBP", name: "Great British Pounds" },
          { value: "EUR", name: "Euros" },
          { value: "USD", name: "United States Dollars" },
        ]}
        callback={(e) => console.log(e.target.value)}
      />
      <FormElement type="button" />
    </form>
  );
};

export default Form;
