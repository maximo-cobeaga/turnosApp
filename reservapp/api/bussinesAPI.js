import axios from "axios";

const baseUrl =
  "https://7624-2803-9800-9991-7493-70dd-bb07-3fcb-b2c0.ngrok-free.app/";

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
