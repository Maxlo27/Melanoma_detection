import styles from './test.module.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Test() {
    // Expression régulière pour le type d'image
    const imageTypeRegex = /image\/(png|jpg|jpeg)/gm;

    // Variables d'état
    const [predictions, setPredictions] = useState(null); // État pour les prédictions
    const [fileImag, setFileImag] = useState(null); // État pour le fichier sélectionné
    const [imageSrc, setImageSrc] = useState(null); // État pour l'aperçu de l'image
    const [selectedFileNames, setSelectedFileNames] = useState([]); // État pour les noms de fichiers sélectionnés
    const [nextId, setNextId] = useState(1); // État pour générer des ID uniques
    const [imageFilePath, setImageFilePath] = useState(''); // État pour le chemin du fichier image sélectionné
    const [tab, setTab] = useState([]); // État pour stocker les chemins de fichiers image dans l'array 'tab'

    // Fonction pour gérer la sélection d'un fichier
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setFileImag(file);

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageSrc(reader.result);
            };
            reader.readAsDataURL(file);

            // Récupérer le nom du fichier et l'ajouter au tableau selectedFileNames avec un nouvel identifiant
            const newFileName = file.name;
            setSelectedFileNames((prevFileNames) => [...prevFileNames, { id: nextId, name: newFileName }]);
            setNextId((prevId) => prevId + 1);

            // Stocker le chemin du fichier
            const filePath = URL.createObjectURL(file);
            setImageFilePath(filePath);
            console.log("ggg", filePath)

            // Ajouter le chemin du fichier à l'array 'tab'
            setTab((prevTab) => [...prevTab, filePath]);

        }
    }
    console.log("tabjjj", tab)

    const [message, setMessage] = useState('');

  const handleEmptyPatient = () => {
    axios.delete('http://localhost:5000/patient')
      .then(response => {
        setMessage(response.data);
      })
      .catch(error => {
        console.error(error);
      });
    };

    return (
        <div>
            <div className={styles.imageContainer}>
                {/* Afficher l'image sélectionnée si elle est disponible, sinon afficher un espace réservé */}
                {imageFilePath ? (
                    <img src={imageFilePath} alt="Téléchargée" className={styles.image} />
                ) : (
                    <div className={styles.placeholder}>Aucune image sélectionnée</div>
                )}
                <p>Chemin de l'image sélectionnée : {imageFilePath}</p> {/* Afficher le chemin du fichier de l'image sélectionnée */}
                <label htmlFor="fileInput" className={styles.button}>
                    Sélectionner un fichier
                </label>
                <input
                    id="fileInput"
                    type="file"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                />
                {/* Affichage de toutes les images de l'array 'tab' */}
                <div className={styles.imageContainer}>
                    {tab.map((imageURL, index) => (
                        <img key={index} src={imageURL} alt={`Image ${index + 1}`} className={styles.image} />
                    ))}
                </div>
                <img src={tab[0]} className={styles.image} />
            </div>
            <div>
                <button onClick={handleEmptyPatient}>Vider le panier</button>
                <p>{message}</p>
            </div>
        </div>
    );
}

export default Test;
