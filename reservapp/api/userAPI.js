import axios from "axios";

const baseUrl =
  "https://83a1-2803-9800-9991-7493-b9c6-7494-15b4-8e5e.ngrok-free.app";

const logInUrl = axios.create({
  baseURL: `${baseUrl}/api/v1/token`,
});
export const logInFun = (params) => logInUrl.post("/", params);

const registerUrl = axios.create({
  baseURL: `${baseUrl}/api/v1/register`,
});
export const registerFun = (params) => registerUrl.post("/", params);

const refreshUrl = axios.create({
  baseURL: `${baseUrl}/api/v1/token/refresh`,
});
export const obtainPairRefresh = (refresh) => refreshUrl.post("/", refresh);
