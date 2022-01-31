import axios from "axios";

export const axiosV1 = axios.create({
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
  baseURL: process.env.REACT_APP_API_URL,
});
