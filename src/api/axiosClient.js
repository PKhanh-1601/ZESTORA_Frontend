import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:3000", // chỉ backend, không thêm /api
  headers: {
    "Content-Type": "application/json",
  },
});

// interceptor để luôn gửi token
axiosClient.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default axiosClient;
