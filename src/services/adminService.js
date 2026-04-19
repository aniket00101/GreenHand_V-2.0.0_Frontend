import axios from "axios";

const BASE = import.meta.env.VITE_API_BASE_URL;

export const getAllUsers    = ()          => axios.get(`${BASE}/admin/users`);
export const getUser        = (id)        => axios.get(`${BASE}/admin/users/${id}`);
export const createUser     = (data)      => axios.post(`${BASE}/admin/users`, data);
export const updateUser     = (id, data)  => axios.put(`${BASE}/admin/users/${id}`, data);
export const deleteUser     = (id)        => axios.delete(`${BASE}/admin/users/${id}`);

export const getAllFeedbacks = ()  => axios.get(`${BASE}/admin/feedbacks`);
export const deleteFeedback  = (id) => axios.delete(`${BASE}/admin/feedbacks/${id}`);