// Aller chercher les configurations de l'application
import 'dotenv/config';

// Importer les fichiers et librairies
import express, { json, urlencoded } from 'express';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import cspOption from './csp-options.js'

import { getPatient, addPatient, getPatientByImageName } from './model/patient.js';

// Création du serveur
const app = express();

// Ajout de middlewares
app.use(helmet(cspOption));
app.use(compression());
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(express.static('public'));

// Ajouter les routes ici ...
let p = await getPatientByImageName()
console.log(p)
// route pour récupérer le parametre
app.get('/patient', async (request, response, next) => {
    try {
        let patient = await getPatient();
        response.status(200).json(patient);
    }

    catch (error) {
        if (error.code === 'SQL_CONSTRAINT') {
            response.sendStatus(409);
        }
        else {
            next(error);
        }
    }
});

// Route pour ajouter un nouveau patient dans la base de données
app.post('/patient', async (request, response, next) => {
    try {
        // Récupérez les données du corps de la requête (assurez-vous d'avoir le body-parser middleware configuré)
        const {
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
        } = request.body;

        // Effectuez ici la validation des données avant de les envoyer dans le serveur.
        // Assurez-vous que les valeurs sont correctes et ne sont pas vides, par exemple.

        // Appelez la fonction addPatient qui va insérer le nouveau patient dans la base de données.
        const id = await addPatient(
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
        );

        // Répondez avec un code de statut 200 (OK) et renvoyez l'ID du nouveau patient ajouté.
        response.status(200).json({ id: id });
    } catch (error) {
        // Si une erreur se produit lors de l'ajout du patient, passez à l'erreur suivante pour la gestion appropriée.
        next(error);
    }
});

//route pour avoir un étudiant ou une liste d'etudiants avec son ID
// Route pour chercher un patient par son ID (image_name)
app.get('/patient/:idpatient', async (request, response, next) => {
    try {
        let patient = await getPatientByImageName(request.params.idpatient); // 
        response.status(200).json(patient); //
    } catch (error) {
        next(error);
    }
});


// Renvoyer une erreur 404 pour les routes non définies
app.use(function (request, response) {
    // Renvoyer simplement une chaîne de caractère indiquant que la page n'existe pas
    response.status(404).send(request.originalUrl + ' not found.');
});

// Démarrage du serveur
app.listen(process.env.PORT);
console.info(`Serveurs démarré:`);
console.info(`http://localhost:${process.env.PORT}`);
