import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import * as SecureStore from "expo-secure-store";
import { obtainPairRefresh, getProfile } from "@/api/userAPI";
import { getBussinesFun } from "@/api/bussinesAPI";
import { obtainBooks } from "@/api/serviciosAPI";

export interface Book {
  bussines: Bussines;
  servicio: {
    id: number;
    tiempo: number;
    nombre: string;
    precio: number;
    bussines: number;
  };
  prestador: {
    id: number;
    nombre: string;
    apertura: string;
    cierre: string;
    bussines: number;
  };
  fecha: string;
  hora: string;
  nota: string | null;
}

interface Bussines {
  id: number;
  nombre: string;
  categoria: number;
  codigo_postal: number;
  direccion: string;
  image: string;
  latitud: number;
  longitud: number;
}

interface User {
  email: string;
  nombre: string;
  apellido: string;
  telefono: string;
  nacimiento: string;
}

interface AuthContextProps {
  user: User | null;
  setUser: (user: User | null) => void;
  bussines: Bussines[];
  books: Book[];
  refreshBooks: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [bussines, setBussines] = useState<Bussines[]>([]);
  const [books, setBooks] = useState<Book[]>([]);

  const refreshToken = async () => {
    const refresh = await SecureStore.getItemAsync("refresh");
    if (refresh) {
      try {
        const response = await obtainPairRefresh({ refresh: refresh });
        await SecureStore.setItemAsync("access", response.data.access);
        await SecureStore.setItemAsync("refresh", response.data.refresh);
        return response.data.access;
      } catch (errors) {
        console.log("Hubo un error en refresh token context");
        console.log(errors);
      }
    }
  };

  const refreshBooks = async () => {
    const access = await refreshToken();
    const response = await obtainBooks(access);
    setBooks(response.data.books);
  };

  useEffect(() => {
    const getData = async () => {
      const access = await refreshToken();
      const responseBussines = await getBussinesFun(access);
      setBussines(responseBussines.data.bussines);
      const responseBooks = await obtainBooks(access);
      setBooks(responseBooks.data.books);
      const responseUser = await getProfile(access);
      setUser(responseUser.data.user);
    };

    getData();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, setUser, bussines, books, refreshBooks }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};
