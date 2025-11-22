import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    function signIn(userData) {
        setUser({
            ...userData,
            authenticated: true,
        });
    }

    function signOut() {
        console.log("Saindo..."); // 👈 aparece no terminal?
        setUser(null); // 👈 ESSENCIAL
    }

    return (
        <AuthContext.Provider value={{ user, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
