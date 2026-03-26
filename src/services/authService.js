// src/services/authService.js
import axios from "../utils/axiosInstance";

export const signup = (data) => axios.post("/auth/signup", data);

export const login = async (data) => {
  const res = await axios.post("/auth/login", data);
  localStorage.setItem("token", res.data.access_token);
  return res;
};

export const logout = async () => {
  await axios.post("/auth/logout");
  localStorage.removeItem("token");
};