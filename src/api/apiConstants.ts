import axios from "axios";

const BASE_URL = import.meta.env.VITE_AUTH_URL as string;

export const sttLiveServiceUrl = import.meta.env
  .VITE_STT_LIVE_SERVICE_URL as string;

// AUTH API
export const loginApi = `${BASE_URL}api/auth/login/`;
export const logoutApi = `${BASE_URL}api/auth/logout/`;
export const refrishApi = `${BASE_URL}api/auth/refresh/`;


export const axiosPrivate = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
