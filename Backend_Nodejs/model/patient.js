import connectionPromise from "../connexionSQlite.js"

export const getPatient = async () => {
  let connection = await connectionPromise;
  let results = await connection.all(
    'SELECT * FROM patient1'
  );
  return results;
}


// Assurez-vous d'importer le module SQLite approprié et d'initialiser la promesse connectionPromise.

export const addPatient = async (
  Id_patient,
  chemin,
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
) => {
  try {
    let connection = await connectionPromise;
    let results = await connection.run(
      `INSERT INTO patient1(
        Id_patient,
        chemin,
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
      VALUES (?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?);`,
      [
        Id_patient,
        chemin,
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
        pourcentage_benin,
      ]
    );

    return results.lastID;
  } catch (error) {
    console.error('Erreur lors de l\'ajout du patient :', error);
    throw error;
  }
};


// Fonction pour chercher un patient par son ID (image_name)
export const getPatientByImageName = async (idpatient) => {
  let connection = await connectionPromise;
  let result = await connection.all(
    `SELECT * FROM patient1 WHERE Id_patient= ?;`,
    [idpatient]
  );

  return result;
};







