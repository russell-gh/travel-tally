import React from "react";
import { generateId } from "./utils";

export function splitExpenseBill(splitData, expense) {
  if (!splitData) {
    return;
  }
  console.log(splitData, "IN SPLIT");
  let allSplits = [];

  splitData.forEach((bill) => {
    if (!bill.paid) {
      bill.paid = false;
    }
    if (!bill.converted) {
      bill.converted = bill.amount;
    }

    let newAmount = {
      fromValue: Number(bill.amount),
      toValue: Number(bill.converted),
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

  console.log(allSplits, "END SPLIT");

  return allSplits;
}
