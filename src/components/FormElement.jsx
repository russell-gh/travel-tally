import React from "react";

//FormElement supports input of text, number, email, password, file, date, checkbox and select with a label created for all inputs.
//Required params for all input types: id, label, type, name.
//Callbacks are accepted but optional
//Date inputs can additionally accept minDate and/or maxDate as a string in the format yyyy-mm-dd
//Number inputs can additionally accept minValue and/or maxValue
//Select inputs require an options parameter as an array of objects with a value property and name property. An option can be given a defaultValue
//Select inputs require an options parameter as an array of objects with a value property and name property
//File uploads have been set to only accept image files for the profile picture

const FormElement = ({
  type,
  label,
  id,
  name,
  minDate,
  maxDate,
  minValue,
  maxValue,
  options,
  callback,
  defaultValue,
}) => {
  switch (type) {
    case "text":
    case "email":
    case "password":
      return (
        <>
          <label htmlFor={id}>{label}:</label>
          <input
            type={type}
            id={id}
            name={name}
            onChange={(e) => callback(e, id)}
          />
        </>
      );
    case "number":
      return (
        <>
          <label htmlFor={id}>{label}:</label>
          <input
            type={type}
            id={id}
            name={name}
            onChange={(e) => callback(e, id)}
            min={minValue}
            max={maxValue}
          />
        </>
      );

    case "file":
      return (
        <>
          <label htmlFor={id}>{label}:</label>
          <input
            type={type}
            id={id}
            name={name}
            accept="image/*"
            onChange={(e) => callback(e, id)}
          />
        </>
      );
    case "date":
      return (
        <>
          <label htmlFor={id}>{label}:</label>
          <input
            type={type}
            id={id}
            name={name}
            min={minDate}
            max={maxDate}
            onChange={(e) => callback(e, id)}
          />
        </>
      );
    case "checkbox":
      return (
        <>
          <input
            type={type}
            id={id}
            name={name}
            onChange={(e) => callback(e, id)}
          />
          <label htmlFor={id}>{label}</label>
        </>
      );
    case "select":
      return (
        <>
          <label htmlFor={id}>{label}:</label>
          <select
            defaultValue={defaultValue}
            name={name}
            id={id}
            onChange={(e) => callback(e, id)}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            ))}
          </select>
        </>
      );
    case "button":
      return (
        <button id={id} type="submit" onClick={(e) => callback(e)}>
          {label}
        </button>
      );
  }
};

export default FormElement;
