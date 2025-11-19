import { AuthProvider } from "./Auth";
import { DataProvider } from "./Data";
import { FontProvider } from "./Font";
import { SQLiteProvider } from "expo-sqlite";

export function AppProvider({ children }) {
    return (
        <SQLiteProvider databaseName="data.db">
            <FontProvider>
            <DataProvider>
                <AuthProvider>{children}</AuthProvider>
            </DataProvider>
           
        </FontProvider>
        </SQLiteProvider>
        
    );
};