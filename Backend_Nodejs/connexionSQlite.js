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
      connection.exec(`
                  CREATE TABLE patient1(
                    id INTEGER PRIMARY KEY,
                    Id_patient TEXT,
                    image_name TEXT,
                    sexe TEXT,
                    localisation TEXT,
                    age INTEGER,
                    bordure INTEGER,
                    diametre INTEGER,
                    symetrie INTEGER,
                    contrast INTEGER,
                    homogeneity INTEGER,
                    energy INTEGER,
                    correlation INTEGER,
                    pourcentage_malin REAL,
                    pourcentage_benin REAL
                  );
              
                  INSERT INTO patient1(
                    Id_patient,
                    image_name, 
                    sexe, 
                    localisation, 
                    age, 
                    bordure, 
                    diametre, 
                    symetrie, 
                    contrast, 
                    homogeneity, 
                    energy, 
                    correlation, 
                    pourcentage_malin, 
                    pourcentage_benin
                  )
                  VALUES(
                    '14444',
                    'example.jpg', 
                    'Masculin', 
                    'Localisation', 
                    30, 
                    5, 
                    10, 
                    8, 
                    15, 
                    20, 
                    25, 
                    0.85, 
                    75.0, 
                    25.0
                  );
                `);

      return connection;
    })
  })

export default connectionPromise;




