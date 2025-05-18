import axios from "axios";

export const backendService = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_SERVICE_URL ?? "",
  withCredentials: true,
  timeout: 100000,
  headers: {
    "Content-Type": "application/json",
  },
});
