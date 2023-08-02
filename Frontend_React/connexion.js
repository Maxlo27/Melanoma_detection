import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import fs from 'fs/promises';

/**
 * Ouvre la base de données SQLite. Si le fichier de base de données n'existe 
 * pas, il sera automatiquement créé.
 * @returns Une promesse de connexion à la base de données.
 */
const createOrOpenDatabase = () => {
    return open({
        filename: process.env.DB_FILE,
        driver: sqlite3.Database
    });
}

// On regarde si le fichier de base de données existe
const connectionPromise = fs.access(process.env.DB_FILE)
    .then(() => {
        // Si le fichier de base de données existe, on ouvre simplement la base 
        // de données.
        return createOrOpenDatabase();
    })
    .catch(() => {
        // Si le fichier de base de données n'existe pas, on crée la base de 
        // données après avoir créé et ouvert la base de données
        return createOrOpenDatabase().then((connection) => {
            connection.exec(
                `CREATE TABLE Patient (
                    id_type_utilisateur INTEGER PRIMARY KEY,
                    nom VARCHAR(255),
                    age INTEGER
                  );
                
                  INSERT INTO votes (nom, age)
                  VALUES ('John Doe', 30
                );`
            );

            return connection;
        })
    })

export default connectionPromise;

