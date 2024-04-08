import { createContext } from "react";


export const SessionContext = createContext({
    user: {},
    isLoggedIn: false,
    token:undefined
})