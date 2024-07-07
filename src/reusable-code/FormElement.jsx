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
  value,
  choose,
  list,
  className = [],
  onKeyDown,
}) => {
  switch (type) {
    case "text":
    case "email":
    case "password":
      return (
        <>
          {label && <label htmlFor={id}>{label}:</label>}
          <input
            type={type}
            id={id}
            name={name}
            value={value}
            list={list}
            onChange={(e) => {
              callback(e, id);
            }}
            onKeyDown={(e) => {
              onKeyDown(e, id);
            }}
          />
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
            value={value}
            onChange={(e) => {
              callback(e, id);
            }}
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
            value={value}
            accept="image/*"
            onChange={(e) => {
              callback(e, id);
            }}
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
            value={value}
            min={minDate}
            max={maxDate}
            onChange={(e) => {
              callback(e, id);
            }}
          />
          {error && <p>{error}</p>}
        </>
      );
    case "checkbox":
      return (
        <>
          <input
            type={type}
            id={id}
            name={name}
            value={value}
            onChange={(e) => {
              callback(e, id);
            }}
          />
          {label && <label htmlFor={id}>{label}:</label>}
          {error && <p>{error}</p>}
        </>
      );
    case "select":
      return (
        <>
          {label && <label htmlFor={id}>{label}:</label>}
          <select
            name={name}
            id={id}
            onChange={(e) => {
              callback(e, id);
            }}
          >
            {choose && (
              <option disabled value="">
                Please choose from the below
              </option>
            )}
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                className={
                  className.includes(option.name) ? "includes" : "excludes"
                }
              >
                {option.name}
              </option>
            ))}
          </select>
          {error && <p>{error}</p>}
        </>
      );
    case "button":
      return (
        <button type="submit" onClick={(e) => callback(e)}>
          Submit
        </button>
      );
  }
};

export default FormElement;
