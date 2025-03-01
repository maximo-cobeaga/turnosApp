import axios from "axios";

const baseUrl = "https://86ffe54c8fa1.ngrok.app/users/v1";

const logInUrl = axios.create({
  baseURL: `${baseUrl}/token`,
});
export const logInFun = (params) => logInUrl.post("/", params);

const registerUrl = axios.create({
  baseURL: `${baseUrl}/register`,
});
export const registerFun = (params) => registerUrl.post("/", params);

const refreshUrl = axios.create({
  baseURL: `${baseUrl}/token/refresh`,
});
export const obtainPairRefresh = (refresh) => refreshUrl.post("/", refresh);

const profileUrl = axios.create({
  baseURL: `${baseUrl}/profile`,
});
export const getProfile = (access) =>
  profileUrl.get("/", {
    headers: {
      Authorization: `Bearer ${access}`,
    },
  });
