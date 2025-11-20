export async function initializeDatabase(database) {
    try {
        await database.execAsync(`
            DROP TABLE IF EXISTS users;

            CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT,
            email TEXT NOT NULL UNIQUE,
            senha TEXT NOT NULL DEFAULT 'A123456a!',
            role TEXT NOT NULL DEFAULT 'USER',
            created_at DATE DEFAULT CURRENT_TIMESTAMP,
            update_at DATE
            );

            INSERT OR REPLACE INTO users (nome, email, senha, role) VALUES ('Aluno', 'aluno@email.com', 'A123456a!', 'ALUNO');
            `);
    } catch (error) {
        console.log(error);
    }
}