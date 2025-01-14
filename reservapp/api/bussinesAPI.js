import axios from "axios";

const baseUrl =
  "https://83a1-2803-9800-9991-7493-b9c6-7494-15b4-8e5e.ngrok-free.app/";

const bussinesURL = axios.create({
  baseURL: `${baseUrl}api/v1/getBussines`,
});

export const getBussinesFun = (access) => {
  return bussinesURL.get("/", {
    headers: {
      Authorization: `Bearer ${access}`,
    },
  });
};
