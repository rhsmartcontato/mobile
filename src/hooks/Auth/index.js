import { createContext, useContext, useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { useUsersDatabase } from "../../database/useUsersDatabase";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext({});

export const Role = {
    ALUNO: "ALUNO"
};

export function AuthProvider({ children }) {
    const [user, setUser] = useState({
        autenticated: null,
        user: null,
        role: null,
    });

    const { authUser, deleteUser } = useUsersDatabase();

    useEffect(() => {
        const loadStorageData = async () => {
            const storageUser = await AsyncStorage.getItem("@payment:user");

            if (storageUser) {
                const parsed = JSON.parse(storageUser);
                setUser({
                    autenticated: true,
                    user: parsed,
                    role: parsed.role,
                });
            } else {
                setUser({
                    autenticated: false,
                    user: null,
                    role: null,
                });
            }
        };

        loadStorageData();
    }, []);

    const signIn = async ({ email, password }) => {
        const response = await authUser({ email, password });

        if (!response) {
            throw new Error("Usuário ou senha inválidos");
        }

        await AsyncStorage.setItem("@payment:user", JSON.stringify(response));

        setUser({
            autenticated: true,
            user: response,
            role: response.role,
        });
    };

    const signOut = async () => {
        await AsyncStorage.removeItem("@payment:user");
        setUser({
            autenticated: false,
            user: null,
            role: null
        });
    };

    const deleteAccount = async () => {
        if (!user.user?.id) return;

        await deleteUser(user.user.id);   // remove no BD
        await AsyncStorage.removeItem("@payment:user");

        setUser({
            autenticated: false,
            user: null,
            role: null
        });
    };

    if (user?.autenticated === null) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text style={{ fontSize: 28, marginTop: 15 }}>Carregando...</Text>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                signIn,
                signOut,
                deleteAccount,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
