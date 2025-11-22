import { SQLiteProvider } from "expo-sqlite";
import { initializeDatabase } from "../database/initializeDatabase";
import { AuthProvider } from "./Auth";

export function AppProvider({ children }) {
    return (
        <SQLiteProvider databaseName="app.db" onInit={initializeDatabase}>
            <AuthProvider>
                {children}
            </AuthProvider>
        </SQLiteProvider>
    );
}
