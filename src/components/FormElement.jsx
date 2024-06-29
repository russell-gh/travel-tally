//FormElement supports input of text, email, password, file, date, checkbox and select with a label created for all inputs.
//Required params for all input types: id, label, type, name
//Date inputs can additionally accept minDate and maxDate as a string in the format yyyy-mm-dd
//Select inputs require an options parameter as an array of objects with a value property and name property
//File uploads have been set to only accept image files for the profile picture

const FormElement = ({ type, label, id, name, minDate, maxDate, options }) => {
  switch (type) {
    case "text":
    case "email": //no name in email?
    case "password":
      return (
        <>
          <label for={id}>{label}:</label>
          <input type={type} id={id} name={name} />
        </>
      );
    case "file":
      return (
        <>
          <label for={id}>{label}:</label>
          <input type={type} id={id} name={name} accept="image/*" />
        </>
      );
    case "date":
      return (
        <>
          <label for={id}>{label}:</label>
          <input type={type} id={id} name={name} min={minDate} max={maxDate} />
        </>
      );
    case "checkbox":
      return (
        <>
          <input type={type} id={id} name={name} />
          <label for={id}>{label}</label>
        </>
      );
    case "select":
      return (
        <>
          <label for={id}>{label}:</label>
          <select name={name} id={id}>
            {options.map((option) => (
              <option value={option.value}>{option.name}</option>
            ))}
          </select>
        </>
      );
    case "button":
      return <button type="submit">Submit</button>;
  }
};

export default FormElement;
