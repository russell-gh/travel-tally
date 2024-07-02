import Joi from "joi";

export const tripSchema = {
  destination: Joi.string().min(1).max(58).required(),
  startDate: Joi.date().required(),
  endDate: Joi.date().greater(Joi.ref("startDate")).required(),
  budgetTotal: Joi.number().min(1).required(), //include max budget?
  homeCurrency: Joi.string().required(),
};

export const expenseSchema = {
  date: Joi.date().required(),
  description: Joi.string().min(3).max(58).required(),
  amount: Joi.number().min(0).required(),
};
