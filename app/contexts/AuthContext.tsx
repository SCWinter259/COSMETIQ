import { createContext, useContext, useState } from "react";

interface ICreateContext {
    loggedInUser: any;
    setLoggedInUser: ((user: any) => void) | null;
}

// the context stores information (with a dumb default context)
export const AuthContext = createContext<ICreateContext>({
    loggedInUser: null, 
    setLoggedInUser: null
});

interface IAuthProvider {
    children: any;
}

// AuthProvider wraps around other components so that they can
// have access to the context
const AuthProvider = ({ children }: IAuthProvider) => {
    const [loggedInUser, setLoggedInUser] = useState(null);

    return (
        <AuthContext.Provider value={{ loggedInUser, setLoggedInUser }}>
            {children}
        </AuthContext.Provider>
    );
}

// this gives other components the value in the context
export const useAuthContext = () => useContext(AuthContext);

/**
 * Basically:
 * context: we have a store that contains some info
 * provider: we authorize some components to use the store
 * useContext: we give the components a way to get the info out of the store
 */

export default AuthProvider;