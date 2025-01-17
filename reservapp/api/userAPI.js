import axios from "axios";

const baseUrl =
  "https://a693-2803-9800-9991-7493-84b3-214b-5e00-2307.ngrok-free.app";

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
