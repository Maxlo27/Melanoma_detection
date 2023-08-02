import connectionPromise from "../connexion.js";


export const getPatient = async () => {
    let connection = await connectionPromise;
    let results = await connection.get(
        'SELECT * FROM Patient'
    );
    return results;
}
