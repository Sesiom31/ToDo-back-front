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
    return Promise.reject(err)
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
    return Promise.reject(err)
  }
};

export const logoutUserRequest = async () => {
  try {
    const res = await axios.post("/logout");
    console.log("res", res.data);
    return res.data;
  } catch (err) {
    console.log(err);
    return Promise.reject(err)
  }
};
