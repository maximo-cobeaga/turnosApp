import axios from "axios";

const logInUrl = axios.create({
  baseURL:
    "https://b59f-2803-9800-9991-8751-55af-e6f-7e5f-b9a9.ngrok-free.app/api/v1/token",
});
export const logInFun = (params) => logInUrl.post("/", params);

const registerUrl = axios.create({
  baseURL:
    "https://b59f-2803-9800-9991-8751-55af-e6f-7e5f-b9a9.ngrok-free.app/api/v1/register",
});
export const registerFun = (params) => registerUrl.post("/", params);
