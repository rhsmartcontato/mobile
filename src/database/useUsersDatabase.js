import { useSQLiteContext } from "expo-sqlite";


export function useUsersDatabase() {
    const database = useSQLiteContext();

    async function authUser({ email, password }) {
        try {
            // 🔥 Debug: ver tudo que tem na tabela users
            const all = await database.getAllAsync("SELECT id, nome, email, senha, role FROM users");
            console.log(" USERS NA TABELA:", all);

            // Agora tenta logar
            const result = await database.getFirstAsync(
                `SELECT id, nome, email, role 
                 FROM users 
                 WHERE email = ? AND senha = ?`,
                [email, password]
            );

            console.log("🔍 Resposta do banco:", result);

            return result;

        } catch (error) {
            console.error("useUsersDatabase authUser error: ", error);
            throw error;
        }
    }  

    return {
        authUser,
    };
}
