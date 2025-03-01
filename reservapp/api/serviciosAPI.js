import axios from "axios";

const freeURL = axios.create({
  baseURL: "https://86ffe54c8fa1.ngrok.app/api/v1/getFree/",
});

export const getFreeBooks = (access, date, bussines, servicio) => {
  return freeURL.get(
    `/?fecha=${date}&bussines=${bussines}&servicio=${servicio}`,
    {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    }
  );
};

const makeBookURL = axios.create({
  baseURL: "https://86ffe54c8fa1.ngrok.app/api/v1/makeBook",
});

export const makeBook = (
  access,
  bussines,
  prestador,
  servicio,
  fecha,
  hora
) => {
  const params = {
    bussines: Number(bussines),
    prestador: Number(prestador),
    servicio: Number(servicio),
    fecha: fecha,
    hora: hora,
  };
  return makeBookURL.post("/", params, {
    headers: {
      Authorization: `Bearer ${access}`,
    },
  });
};

const getBooksURL = axios.create({
  baseURL: "https://86ffe54c8fa1.ngrok.app/api/v1/getBooks/",
});

export const obtainBooks = (access) =>
  getBooksURL.get("/", {
    headers: {
      Authorization: `Bearer ${access}`,
    },
  });
