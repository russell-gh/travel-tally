import Joi from "joi";

export const tripSchema = {
  destination: Joi.string().min(1).max(58).required(),
  dates: {
    startDate: Joi.date().required(),
    endDate: Joi.date().greater(Joi.ref("startDate")).required(),
    startDateIncluded: Joi.boolean(),
    endDateIncluded: Joi.boolean(),
  },
  budgetTotal: Joi.number().min(1).required(), //include max budget?
  homeCurrency: Joi.string().length(3).required(),
  budgetHotel: Joi.number().min(0).max(Joi.ref("budgetTotal")).required(),
  budgetFood: Joi.number().min(0).max(Joi.ref("budgetTotal")).required(),
  budgetTransport: Joi.number().min(0).max(Joi.ref("budgetTotal")).required(),
  budgetActivities: Joi.number().min(0).max(Joi.ref("budgetTotal")).required(),
  budgetOther: Joi.number().min(0).max(Joi.ref("budgetTotal")).required(),
};

export const expenseSchema = {
  date: Joi.date().required(),
  description: Joi.string().min(3).max(58).required(),
  amount: Joi.number().min(0).required(),
};
