import { createContext } from "react";

export const AuthContext = createContext(null);

interface IAuthProvider {
    children: any   // I honestly don't know what is the type here
}

export const AuthProvider = ({ children }: IAuthProvider) => {

}