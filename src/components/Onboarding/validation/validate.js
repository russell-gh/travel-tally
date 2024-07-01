import Joi from "joi";
import { tripSchema } from "./schemas";

export const validate = async (formData, schema, callback) => {
  const _joi = schemaObjFromString(schema);

  try {
    await _joi.validateAsync(formData, { abortEarly: false });
    if (callback) {
      callback(true);
    }
    return {};
  } catch (e) {
    console.log(errObj(e));
    return errObj(e);
  }
};

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
const errObj = (e) => {
  const errs = {};
  e.details.map((err) => {
    errs[err.context.key] = err.message;
  });
  return errs;
};
