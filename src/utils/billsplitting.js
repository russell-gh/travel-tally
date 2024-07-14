import React from "react";
import { generateId } from "./utils";
import { convertCurrency } from "./expenseData";

export function splitExpenseBill(splitData, expense) {
  if (!splitData) {
    return;
  }
  let allSplits = [];

  splitData.forEach((bill) => {
    let newAmount = {
      fromValue: Number(bill.amount * 100),
      toValue: Number(bill.converted * 100),
      fromCurrency: expense.amount.fromCurrency,
      toCurrency: expense.amount.toCurrency,
    };

    const formatted = {
      amount: newAmount,
      name: bill.name,
      paid: bill.paid,
      expenseID: expense.id || expense.sharedID,
      id: generateId("billSplit"),
      description: expense.description,
      date: expense.date,
    };
    allSplits.push(formatted);
  });

  return allSplits;
}
