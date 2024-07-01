import Joi from "joi";
import { tripSchema } from "./schemas";

//pass through form data as obj, schema as string and any callback which needs to occur on successful tests. 
//the func will return an empty obj on success or obj of err messages on failure
export const validate = async (formData, schema, callback) => {
  const _joi = schemaObjFromString(schema);

  try {
    await _joi.validateAsync(formData, { abortEarly: false });
    callback(true);

    return {};
  } catch (err) {
    //if tests are unsuccessful send err obj to errObj func below
    console.log(errObj(err));
    return errObj(err);
  }
};

//take name of schema (string), find corresponding schema and create joi object
const schemaObjFromString = (schema) => {
  switch (schema) {
    case "trip": {
      return Joi.object(tripSchema);
    }
    case "login": {
      return Joi.object(loginSchema);
    }
  }
};

//accepts err obj and maps over to create new obj with more user-friendly details
const errObj = (err) => {
  const errs = {};
  err.details.map((err) => {
    errs[err.context.key] = err.message;
  });
  return errs;
};
