export async function initializeDatabase(database) {
    try {
        await database.execAsync(`
            DROP TABLE IF EXISTS progresso;
            DROP TABLE IF EXISTS licoes;

            DROP TABLE IF EXISTS users;

            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nome TEXT,
                email TEXT NOT NULL UNIQUE,
                senha TEXT NOT NULL DEFAULT 'A123456a!',
                role TEXT NOT NULL DEFAULT 'ALUNO',
                created_at DATE DEFAULT CURRENT_TIMESTAMP,
                update_at DATE
            );

            CREATE TABLE IF NOT EXISTS licoes (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                titulo TEXT NOT NULL,
                descricao TEXT,
                capa TEXT,
                ordem INTEGER,
                created_at DATE DEFAULT CURRENT_TIMESTAMP,
                update_at DATE
            );

            CREATE TABLE IF NOT EXISTS progresso (
               id INTEGER PRIMARY KEY AUTOINCREMENT,
               user_id INTEGER NOT NULL,
               licao_id INTEGER NOT NULL,
               status TEXT NOT NULL DEFAULT 'nao_iniciado',
               progresso_percentual INTEGER DEFAULT 0,
               data_atualizacao DATETIME DEFAULT CURRENT_TIMESTAMP,
               FOREIGN KEY (user_id) REFERENCES users (id),
               FOREIGN KEY (licao_id) REFERENCES licoes (id)
            );

            INSERT OR REPLACE INTO users (nome, email, senha, role)
            VALUES ('Aluno', 'aluno@email.com', 'A123456a!', 'ALUNO');
        `);

        console.log("Banco criado com sucesso!");

    } catch (error) {
        console.log("Erro ao criar banco: ", error);
    }
}
