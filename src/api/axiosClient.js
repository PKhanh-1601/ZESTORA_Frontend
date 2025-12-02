import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://zestora-2zcr.onrender.com", // chỉ backend, không thêm /api
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
