import axios from "axios";

const baseUrl = "https://13741c69c6eb.ngrok.app/";

const logInUrl = axios.create({
  baseURL: `${baseUrl}api/v1/token`,
});
export const logInFun = (params) => logInUrl.post("/", params);

const registerUrl = axios.create({
  baseURL: `${baseUrl}api/v1/register`,
});
export const registerFun = (params) => registerUrl.post("/", params);

const refreshUrl = axios.create({
  baseURL: `${baseUrl}api/v1/token/refresh`,
});
export const obtainPairRefresh = (refresh) => refreshUrl.post("/", refresh);
