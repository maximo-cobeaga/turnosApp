import axios from "axios";

const baseUrl = "https://af6856d7e8b6.ngrok.app/";

const logInUrl = axios.create({
  baseURL: `${baseUrl}users/v1/token`,
});
export const logInFun = (params) => logInUrl.post("/", params);

const registerUrl = axios.create({
  baseURL: `${baseUrl}users/v1/register`,
});
export const registerFun = (params) => registerUrl.post("/", params);

const refreshUrl = axios.create({
  baseURL: `${baseUrl}users/v1/token/refresh`,
});
export const obtainPairRefresh = (refresh) => refreshUrl.post("/", refresh);
