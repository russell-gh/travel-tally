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
    case "number":
      return (
        <>
          <label htmlFor={id}>{label}:</label>
          <input
            type={type}
            id={id}
            name={name}
            onChange={callback}
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
