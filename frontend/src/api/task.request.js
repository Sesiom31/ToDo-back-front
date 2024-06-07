import { makeRequest } from "./axios";

export const getAllTasksRequest = () => makeRequest({ method: "get", url: "/tasks" });

export const createTaskRequest = (data) =>
  makeRequest({ method: "post", url: "/tasks", data });

export const updateFieldTaskRequest = (data) =>
  makeRequest({ method: "patch", url: "/task", data });

export const updateTaskRequest = (data) =>
  makeRequest({ method: "put", url: `/task/${data._id}`, data });

export const deleteTaskRequest = (id) =>
  makeRequest({ method: "delete", url: `/task/${id}` });
