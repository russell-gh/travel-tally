import axios from "axios";
import { selectUser } from "../redux/onboardingSlice";
import { useSelector } from "react-redux";

export async function addExpenseRemotely(payload) {
  const user = useSelector(selectUser);
  if (payload.element) {
    payload.expense = payload.element;
    delete payload.element;
  }
  console.log(payload);
  const results = await axios.post("http://127.0.0.1:6001/expenses", payload);
  console.log(results, "Add expense");
}

export async function addSplitRemotely(payload) {
  console.log("PAYLOAD", payload);
  if (payload.element) {
    payload.billSplit = payload.element;
    delete payload.element;
  }
  console.log(payload);
  const results = await axios.post("http://127.0.0.1:6001/splits", payload);
  console.log(results, "add split");
}

export async function deleteByID(payload) {
  console.log("PAYLOAD", payload.id);
  const id = payload.id;
  if (payload.type === "shared") {
    const results = await axios.delete(
      `http://127.0.0.1:6001/expenses/shared/${id}`
    );
    console.log(results);
  } else if (payload.type === "single") {
    const results = await axios.delete(
      `http://127.0.0.1:6001/expenses/id/${id}`
    );
    console.log(results);
  } else if (payload.type === "split") {
    const results = await axios.delete(`http://127.0.0.1:6001/splits/id/${id}`);
    console.log(results);
  }
}
