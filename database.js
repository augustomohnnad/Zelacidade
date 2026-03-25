const sqlite3 = require("sqlite3");
const {open} = require("sqlite");

criarBanco = async () => {
    const db = await open({
        filename: "./database.db",
        driver: sqlite3.Database
    });

    await db.exec(`
        CREATE TABLE IF NOT EXISTS incidentes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            tipo_problema TEXT,
            localizacao TEXT,
            descricao TEXT,
            prioridade TEXT,
            nome_solicitante TEXT,
            data_registro TEXT,
            hora_registro TEXT,
            status_resolucao TEXT DEFAULT 'Pendente'
        )
        
    `); 
    return db;
   
}

module.exports = { criarBanco }