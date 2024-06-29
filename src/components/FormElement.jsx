//FormElement supports input of text, email, password, file, date, checkbox and select with a label created for all inputs.
//Required params for all input types: id, label, type, name.
//Callbacks are accepted but optional
//Date inputs can additionally accept minDate and maxDate as a string in the format yyyy-mm-dd
//Select inputs require an options parameter as an array of objects with a value property and name property
//File uploads have been set to only accept image files for the profile picture


const FormElement = ({
  type,
  label,
  id,
  name,
  minDate,
  maxDate,
  options,
  callback,
}) => {
  switch (type) {
    case "text":
    case "email":
    case "password":
      return (
        <>
          <label htmlFor={id}>{label}:</label>
          <input type={type} id={id} name={name} onChange={callback} />
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
            onChange={callback}
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
            onChange={callback}
          />
        </>
      );
    case "checkbox":
      return (
        <>
          <input type={type} id={id} name={name} onChange={callback} />
          <label htmlFor={id}>{label}</label>
        </>
      );
    case "select":
      return (
        <>
          <label htmlFor={id}>{label}:</label>
          <select name={name} id={id} onChange={callback}>
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
        <button type="submit" onChange={callback}>
          Submit
        </button>
      );
  }
};

export default FormElement;
