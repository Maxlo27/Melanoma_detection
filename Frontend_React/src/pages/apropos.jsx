
import React, { useState } from "react";
import Header from "../components/Header";
import styles from "../pages/apro.module.css"
import image from "../images/R.jpg"
import Footer from "../components/Footer";
import axios from 'axios';

const DefaultImageSrc = image;

export default function Accueil() {
    const [imageSrc, setImageSrc] = useState(image);
    const [selectedSexe, setSelectedSexe] = useState('male');
    const [selectedLocalisation, setSelectedLocalisation] = useState('upper extremity');
    const [newAge, setNewAge] = useState('');
    const [predictionResult, setPredictionResult] = useState(null);
    const [data, setData] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);



    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setSelectedFile(reader.result); // Set the image data URL in the state
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAddData = () => {
        // Vérifiez d'abord si un fichier a été sélectionné
        if (!selectedFile) {
            console.error('Veuillez sélectionner une image.');
            return;
        }

        // Créez un objet FormData pour envoyer le fichier image
        const formData = new FormData();
        formData.append('file', selectedFile);

        // Effectuez une requête POST au backend Flask pour envoyer le fichier image
        axios.post('/predict', formData)
            .then(response => {
                // Mettez à jour l'état avec les résultats de prédiction renvoyés par le backend
                setPredictionResult(response.data.predictions);
            })
            .catch(error => {
                console.error(error);
            });
    }




    return <body>


        <div className={styles.conteneurAccueil}>


            <h1 ><span>D</span>étection de mélanome basée sur une analyse d’images de la Peau </h1>
            <div className={styles.gridcontainer}>

                {/* Affichez les résultats de prédiction */}
                <div className={styles.item1}>
                    <div className={styles.divGlob}>
                        <div className={styles.preduct}>Prédiction :</div>
                        {/* Utilisez l'état predictionResult pour afficher les résultats de prédiction */}
                        {predictionResult && predictionResult.length > 0 ? (
                            predictionResult.map((result, index) => (
                                <div key={index} className={styles.resultPreduc}>
                                    {result}% {index === 0 ? 'Benin' : 'Malin'}
                                </div>
                            ))
                        ) : (
                            <div className={styles.resultPreduc}>Aucun résultat de prédiction</div>
                        )}
                    </div>
                </div>
                

                    <div className={styles.item2}>

                        <label htmlFor="age">Âge:</label>
                        <input
                            type="number"
                            id="age"
                            value={newAge}
                            onChange={(e) => setNewAge(e.target.value)}
                        />

                        <label htmlFor="sexe">Sexe:</label>
                        <select
                            id="sexe"
                            value={selectedSexe}
                            onChange={(e) => setSelectedSexe(e.target.value)}
                        >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>

                        <label htmlFor="localisation">Localisation:</label>
                        <select
                            id="localisation"
                            value={selectedLocalisation}
                            onChange={(e) => setSelectedLocalisation(e.target.value)}
                        >
                            <option value="upper extremity">Upper Extremity</option>
                            <option value="torso">Torso</option>
                            <option value="lower extremity">Lower Extremity</option>
                            <option value="head/neck">Head/Neck</option>
                        </select>







                        {/* Utilisation du bouton personnalisé pour sélectionner une image */}
                        <label htmlFor="upload-image" className={styles.button}>
                            Sélectionner une image
                        </label>
                        <input
                            type="file"
                            id="upload-image"
                            accept="image/*"

                            onChange={handleFileChange}
                            style={{ display: 'none' }}
                        />
                        <button className={styles.button}>Faire une préduction</button>
                        <button className={styles.button}>Observer le détail de l'individu</button>
                        <button className={styles.button}>Quitter</button>

                    </div>
                


                <div className={styles.item3} >
                    {/* Display the image */}
                    {selectedFile ? <img src={selectedFile} alt="image" /> : <img src={DefaultImageSrc} alt="image par défaut" />}





                </div>
                <div className={styles.item4}>
                    <img src={image} alt="image" />

                </div>


                <div className={styles.item5}>
                    <span>Résultat</span>
                    <div className={styles.column}>

                        {/* Mettez ici les informations que vous voulez afficher dans la première colonne */}
                        <p>Sexe: Masculin</p>
                        <p>Localisation: trouc</p>
                        <p>Âge: 254</p>
                        <p>Bordure: 254</p>
                    </div>
                    <div className={styles.column}>
                        {/* Mettez ici les informations que vous voulez afficher dans la deuxième colonne */}
                        <p>Diamètre: 254 mm</p>
                        <p>Symétrie: {14}</p>
                        <p>Contrast: 25</p>
                        <p>Homogeneity: 54</p>
                    </div>
                    <div className={styles.column}>
                        {/* Mettez ici les informations que vous voulez afficher dans la troisième colonne */}
                        <p>Energy: 14</p>
                        <p>Correlation: 255</p>
                        {/* Ajoutez les autres informations ici */}
                    </div>
                </div>
            </div >



        </div >




    </body >
}