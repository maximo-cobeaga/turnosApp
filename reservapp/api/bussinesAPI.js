import axios from "axios";

const baseUrl =
  "https://a693-2803-9800-9991-7493-84b3-214b-5e00-2307.ngrok-free.app/";

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
