import { createContext, useContext, useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { useUsersDatabase } from "../../database/useUsersDatabase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import api from '../../services/api'; 

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
        try {
            const response = await api.post('/login', { email, password }); 

            if (!response || !response.data || !response.data.token) {
                throw new Error("Usuário ou senha inválidos");
            }
            
            const userData = response.data; 

            await AsyncStorage.setItem("@payment:user", JSON.stringify(userData));

            setUser({
                autenticated: true,
                user: userData,
                role: userData.role, 
            });

        } catch (error) {

            console.error('Erro na autenticação:', error);

            if (error.response && error.response.status === 401) {
                throw new Error("Usuário ou senha inválidos");
            } 
            else if (error.message.includes("Usuário ou senha inválidos")) {
                throw error; 
            } 
            else {
                throw new Error("Falha na conexão. Verifique sua rede e tente novamente.");
            }
        }
    };
    const updateProfile = async (data) => {
        
        const updatedUser = { 
            ...user.user, 
            ...data 
        };

        await AsyncStorage.setItem("@payment:user", JSON.stringify(updatedUser));
        
        setUser({
            ...user,
            user: updatedUser,
        });
        return updatedUser;
    };


    const signOut = async () => {
        await AsyncStorage.removeItem("@payment:user");
        
        setUser({
            autenticated: false,
            user: null,
            role: null
        });
        
        router.replace("/");
    };

    const deleteAccount = async () => {
        if (!user.user?.id) return;

        await deleteUser(user.user.id);
        await AsyncStorage.removeItem("@payment:user");

        setUser({
            autenticated: false,
            user: null,
            role: null
        });
        
        router.replace("/");
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
                updateProfile,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}