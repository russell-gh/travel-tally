import axios from "axios";

export async function addExpenseRemotely(payload) {
  if (payload.element) {
    payload.expense = payload.element;
    delete payload.element;
  }
  console.log(payload);
  try {
    const results = await axios.post("http://127.0.0.1:6001/expenses", payload);
    console.log(results, "Add expense");
  } catch (e) {
    console.log(e);
  }
}

export async function addSplitRemotely(payload) {
  console.log("PAYLOAD", payload);
  if (payload.element) {
    payload.billSplit = payload.element;
    delete payload.element;
  }
  if (!payload.billSplit.name || payload.billSplit.name === "") {
    return;
  }
  console.log(payload);
  try {
    const results = await axios.post("http://127.0.0.1:6001/splits", payload);
    console.log(results, "add split");
  } catch (e) {
    console.log(e);
  }
}

export async function deleteByID(payload) {
  console.log("PAYLOAD", payload.id);
  const id = payload.id;
  if (payload.type === "shared") {
    const results = await axios.delete(
      `http://127.0.0.1:6001/expenses/shared/${id}`
    );
    console.log(results, "sharedExpense");
  } else if (payload.type === "single") {
    const results = await axios.delete(`http://127.0.0.1:6001/expenses/${id}`);
    console.log(results, "singleExpense");
  } else if (payload.type === "singleSplit") {
    const results = await axios.delete(`http://127.0.0.1:6001/splits/${id}`);
    console.log(results, "singleSplit");
  } else if (payload.type === "sharedSplit") {
    const results = await axios.delete(
      `http://127.0.0.1:6001/splits/shared/${id}`
    );
    console.log(results, "sharedSplit");
  }
}

export async function updatePaidDB(id, name) {
  try {
    const results = await axios.patch(
      `http://127.0.0.1:6001/splits/paid/${id}/${name}`
    );
  } catch (e) {
    console.log(e);
  }
}
