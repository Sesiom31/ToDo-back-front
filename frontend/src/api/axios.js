import axios from "axios";

const instanceAxios = axios.create({
  baseURL: "http://localhost:5555/api",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

export const makeRequest = async ({
  method,
  url,
  data = {},
  params = {},
  headers = {},
}) => {
  try {
    const res = await instanceAxios.request({
      method,
      url,
      data,
      params,
      headers,
    });
    return res.data;
  } catch (err) {
    return Promise.reject(err);
  }
};
