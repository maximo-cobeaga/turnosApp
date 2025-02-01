import axios from "axios";

const baseUrl = "https://af6856d7e8b6.ngrok.app/";

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
