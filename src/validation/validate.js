import Joi from "joi";
import {
  expenseSchema,
  tripSchema,
  signupSchema,
  loginSchema,
  setUpProfileSchema,
  splitSchema,
} from "./schemas";

//pass through form data as obj, schema as string and any callback which needs to occur on successful tests.
//the func will return an empty obj on success or obj of err messages on failure
export const validate = async (formData, schema) => {
  const _joi = schemaObjFromString(schema);

  try {
    await _joi.validateAsync(formData, { abortEarly: true });
    return {};
  } catch (err) {
    //if tests are unsuccessful send err obj to errObj func below
    return errObj(err);
  }
};

//take name of schema (string), find corresponding schema and create joi object
const schemaObjFromString = (schema) => {
  switch (schema) {
    case "trip": {
      return Joi.object(tripSchema);
    }
    case "signup": {
      return Joi.object(signupSchema);
    }
    case "login": {
      return Joi.object(loginSchema);
    }
    case "expense": {
      return Joi.object(expenseSchema);
    }
    case "split": {
      return Joi.object(splitSchema);
    }
  }
};

//accepts err obj and maps over to create new obj with more user-friendly details
const errObj = (err) => {
  const errs = {};
  err.details.forEach((err) => {
    errs[err.context.key] = err.message;
  });
  return errs;
};
