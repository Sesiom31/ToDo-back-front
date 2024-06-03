import axios from "./axios.js";

export const registerUserRequest = async (user) => {
  try {
    const res = await axios.post("/register", user, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("res", res.data);
    return res.data;
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
};

export const loginUserRequest = async (user) => {
  try {
    const res = await axios.post("/login", user, {
      headers: { "Content-Type": "application/json" },
    });
    console.log("res", res.data);
    return res.data;
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
};

export const logoutUserRequest = async () => {
  try {
    const res = await axios.post("/logout");
    console.log("res", res.data);
    return res.data;
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
};

export const verifyUserRequest = async () => {
  try {
    const res = await axios.get("/verify");
    console.log("res", res.data);
    return res.data;
  } catch (err) {
    return Promise.reject(err);
  }
};

export const profileUserRequest = async () => {
  try {
    const res = await axios.get("/profile");
    return res.data;
  } catch (err) {
    return Promise.reject(err);
  }
};

export const getCategoriesRequest = async () => {
  try {
    const res = await axios.get("/getCategories");
    return res.data;
  } catch (err) {
    return Promise.reject(err);
  }
};

export const addCategoryRequest = async (categorie) => {
  try {
    const res = await axios.patch("/addCategorie", categorie, {
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  } catch (err) {
    return Promise.reject(err);
  }
};

export const deleteCategorieRequest = async (categorie) => {
  try {
    const res = await axios.patch("/deleteCategorie", categorie, {
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  } catch (err) {
    return Promise.reject(err);
  }
};
