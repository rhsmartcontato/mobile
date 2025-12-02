import { useSQLiteContext } from "expo-sqlite";
import { initializeDatabase } from './database.js';

export function useUsersDatabase() {
  const database = useSQLiteContext();

  async function authUser({ email, password }) {
    try {
      await initializeDatabase(database);

      const result = await database.getFirstAsync(
        `SELECT id, nome, email, senha, role 
         FROM users 
         WHERE email = ? AND senha = ?`,
        [email, password]
      );

      console.log("Resposta do login:", result);
      return result;
    } catch (error) {
      console.error("useUsersDatabase authUser error:", error);
      throw error;
    }
  }

  return { authUser };
}
