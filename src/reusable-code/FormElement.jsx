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
  error,
}) => {
  switch (type) {
    case "text":
    case "email":
    case "password":
      return (
        <>
          {label && <label htmlFor={id}>{label}:</label>}
          <input type={type} id={id} name={name} onChange={callback} />
          {error && <p>{error}</p>}
        </>
      );
    case "number":
      return (
        <>
          {label && <label htmlFor={id}>{label}:</label>}
          <input
            type={type}
            id={id}
            name={name}
            onChange={callback}
            min={minValue}
            max={maxValue}
          />
          {error && <p>{error}</p>}
        </>
      );

    case "file":
      return (
        <>
          {label && <label htmlFor={id}>{label}:</label>}
          <input
            type={type}
            id={id}
            name={name}
            accept="image/*"
            onChange={callback}
          />
          {error && <p>{error}</p>}
        </>
      );
    case "date":
      return (
        <>
          {label && <label htmlFor={id}>{label}:</label>}
          <input
            type={type}
            id={id}
            name={name}
            min={minDate}
            max={maxDate}
            onChange={callback}
          />
          {error && <p>{error}</p>}
        </>
      );
    case "checkbox":
      return (
        <>
          <input type={type} id={id} name={name} onChange={callback} />
          {label && <label htmlFor={id}>{label}:</label>}
          {error && <p>{error}</p>}
        </>
      );
    case "select":
      return (
        <>
          {label && <label htmlFor={id}>{label}:</label>}
          <select name={name} id={id} onChange={callback}>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            ))}
          </select>
          {error && <p>{error}</p>}
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
