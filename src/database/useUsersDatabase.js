import { useSQLiteContext } from "expo-sqlite";

export function useUsersDatabase() {
    const database = useSQLiteContext();

    // ----------------------------------------
    // FUNÇÃO DE LOGIN (AUTH)
    // ----------------------------------------
    async function authUser({ email, password }) {
        try {
            // 🔎 Verificar se a tabela existe
            const tables = await database.getAllAsync(`
                SELECT name 
                FROM sqlite_master 
                WHERE type='table' AND name='users'
            `);
            console.log("Tabelas encontradas:", tables);

            if (tables.length === 0) {
                console.warn("⚠️ A tabela USERS não existe! initializeDatabase não rodou!");
            }

            // 🔎 Ver tudo que tem na tabela users (apenas para debug)
            const allUsers = await database.getAllAsync(
                "SELECT id, nome, email, senha, role FROM users"
            );
            console.log("📌 Usuários na tabela:", allUsers);

            // 🔐 Agora tenta logar
            const result = await database.getFirstAsync(
                `SELECT id, nome, email, role 
                 FROM users 
                 WHERE email = ? AND senha = ?`,
                [email, password]
            );

            console.log("🔍 Resposta do login:", result);

            return result;

        } catch (error) {
            console.error("❌ useUsersDatabase authUser error:", error);
            throw error;
        }
    }

    return {
        authUser,
    };
}
