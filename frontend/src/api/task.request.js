import axios from "./axios.js";

export const getAllTasksRequest = async () => {
  try {
    const res = await axios.get("/tasks");
    console.log(res);
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const createTaskRequest = async (data) => {
  try {
    const res = await axios.post("/tasks", data, {
      headers: { "Content-Type": "application/json" },
    });

    console.log(res);
    return res;
  } catch (err) {
    return Promise.reject(err);
  }
};
