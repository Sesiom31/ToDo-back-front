import { makeRequest } from "./axios";

export const registerUserRequest = (data) =>
  makeRequest({ method: "post", url: "/register", data });

export const loginUserRequest = (data) =>
  makeRequest({ method: "post", url: "/login", data });

export const logoutUserRequest = () => makeRequest({ method: "post", url: "/logout" });

export const verifyUserRequest = () => makeRequest({ method: "get", url: "/verify" });

export const profileUserRequest = () => makeRequest({ method: "get", url: "/profile" });

export const getCategoriesRequest = () =>
  makeRequest({ method: "get", url: "/getCategories" });

export const addCategoryRequest = (data) =>
  makeRequest({ method: "patch", url: "/addCategorie", data });

export const deleteCategorieRequest = (data) =>
  makeRequest({ method: "patch", url: "/deleteCategorie", data });
