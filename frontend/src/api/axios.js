import axios from "axios";

const instanceAxios = axios.create({
  baseURL: "http://localhost:5555/api",
  withCredentials: true,
});


export default instanceAxios