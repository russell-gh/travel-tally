import axios from "axios";
import { API_URL } from "../config";

export async function addExpenseRemotely(payload) {
  const { token } = payload;
  if (payload.element) {
    payload.expense = payload.element;
    delete payload.element;
  }
  // console.log(payload);
  try {
    const results = await axios.post(`${API_URL}/expenses`, payload, {
      headers: { token },
    });
    // console.log(results, "Add expense");
  } catch (e) {
    // console.log(e);
  }
}

export async function addSplitRemotely(payload) {
  // console.log("PAYLOAD", payload);
  const { token } = payload;
  if (payload.element) {
    payload.billSplit = payload.element;
    delete payload.element;
  }
  if (!payload.billSplit.name || payload.billSplit.name === "") {
    return;
  }
  // console.log(payload);
  try {
    const results = await axios.post(`${API_URL}/splits`, payload, {
      headers: { token },
    });
    // console.log(results, "add split");
  } catch (e) {
    // console.log(e);
  }
}

export async function deleteByID(payload) {
  try {
    // console.log("PAYLOAD", payload.id);
    const id = payload.id;
    const { token } = payload;
    if (payload.type === "shared") {
      axios.delete(`${API_URL}/expenses/shared/${id}`, {
        headers: { token },
      });
      // console.log(results, "sharedExpense");
    } else if (payload.type === "single") {
      axios.delete(`${API_URL}/expenses/${id}`, {
        headers: { token },
      });
      // console.log(results, "singleExpense");
    } else if (payload.type === "singleSplit") {
      axios.delete(`${API_URL}/splits/${id}`, {
        headers: { token },
      });
      // console.log(results, "singleSplit");
    } else if (payload.type === "sharedSplit") {
      axios.delete(`${API_URL}/splits/shared/${id}`, {
        headers: { token },
      });
      // console.log(results, "sharedSplit");
    }
  } catch (e) {
  }
}

export async function updatePaidDB(id, name, token) {
  try {
    const results = await axios.patch(
      `${API_URL}/splits/paid/${id}/${name}`,
      {},
      { headers: { token } }
    );
  } catch (e) {
    // console.log(e);
  }
}
