import axios from "axios";

const baseUrl =
  "https://7624-2803-9800-9991-7493-70dd-bb07-3fcb-b2c0.ngrok-free.app/";

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
