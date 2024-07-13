import React from "react";
import { generateId } from "../components/onboarding/utils";

export function splitExpenseBill(splitData, expense) {
  if (!splitData) {
    return;
  }
  console.log(splitData, expense, "inside split bill");
  let allSplits = [];

  splitData.forEach((bill) => {
    const formatted = {
      amount: Number(bill.amount * 100),
      name: bill.name,
      paid: bill.paid,
      expenseID: expense.id || expense.sharedID,
      id: generateId("billSplit"),
      description: expense.description,
      date: expense.date,
      totalExpense: expense.amount.fromValue,
      currency: expense.amount.fromCurrency,
    };
    allSplits.push(formatted);
  });

  return allSplits;
}
