import axios from "axios";

const baseUrl = "https://13741c69c6eb.ngrok.app/";

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
export const getBussinesById = (access, id) => {
  return bussinesURL.get(`/?id=${id}`, {
    headers: {
      Authorization: `Bearer ${access}`,
    },
  });
};
