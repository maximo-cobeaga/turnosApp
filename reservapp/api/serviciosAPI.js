import axios from "axios";

const freeURL = axios.create({
  baseURL:
    "https://7624-2803-9800-9991-7493-70dd-bb07-3fcb-b2c0.ngrok-free.app/api/v1/getFree/",
});

export const getFreeBooks = (date, bussines, servicio) => {
  return freeURL.get(
    `/?fecha=${date}&bussines=${bussines}&servicio=${servicio}`
  );
};
