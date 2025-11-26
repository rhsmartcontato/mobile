import { useSQLiteContext } from "expo-sqlite";

export function useUsersDatabase() {
    const database = useSQLiteContext();

    // ----------------------------------------
    // LOGIN (AUTH)
    // ----------------------------------------
    async function authUser({ email, password }) {
        try {
            // Verificar se a tabela existe
            const tables = await database.getAllAsync(`
                SELECT name 
                FROM sqlite_master 
                WHERE type='table' AND name='users'
            `);

            console.log("Tabelas encontradas:", tables);

            if (tables.length === 0) {
                console.warn("⚠️ A tabela USERS não existe! initializeDatabase não rodou!");
            }

            // Debug: listar todos usuários
            const allUsers = await database.getAllAsync(`
                SELECT id, name, email, password, role FROM users
            `);
            console.log("Usuários na tabela:", allUsers);

            // Login
            const result = await database.getFirstAsync(
                `SELECT 
                    id, 
                    name AS nome, 
                    email, 
                    password,
                    role 
                FROM users 
                WHERE email = ? AND password = ?`,
                [email, password]
            );

            console.log("🔍 Resposta do login:", result);

            return result;

        } catch (error) {
            console.error("❌ useUsersDatabase authUser error:", error);
            throw error;
        }
    }

    // ----------------------------------------
    // DELETAR USUÁRIO
    // ----------------------------------------
    async function deleteUser(id) {
        try {
            await database.runAsync(
                "DELETE FROM users WHERE id = ?",
                [id]
            );

            console.log("🗑️ Usuário deletado com sucesso:", id);

        } catch (error) {
            console.error("❌ Erro ao deletar usuário:", error);
            throw error;
        }
    }

    return {
        authUser,
        deleteUser,
    };
}
