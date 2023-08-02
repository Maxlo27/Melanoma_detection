import React, { useState, useEffect } from 'react';
import styles from './test.module.css'; // Assurez-vous d'importer correctement les styles
import axios from 'axios';
const imageTypeRegex = /image\/(png|jpg|jpeg)/gm;

function Test2() {




    



    const [open, setOpen] = useState(false);
    const [predictions, setPredictions] = useState(null);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [imageFiles, setImageFiles] = useState([]);
    const [images, setImages] = useState([]);
    const [diagnostic, setDiagnostic] = useState(null);
    const [features, setFeatures] = useState(null);
    const [id, setId] = useState("");
    const [age, setAge] = useState("");
    const [sex, setSex] = useState("");
    const [localisation, setLocalisation] = useState("");

    const handleClick = () => {
        if (imageFiles.length != 0) {
            const formData = new FormData();
            formData.append('image', imageFiles[0]);

            axios.post('http://127.0.0.1:5001/predict', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then((response) => {
                    console.log(response)
                    setPredictions(response.data.features[0])
                    // Update the state with the predictions received from the server
                    // setFeatures(response.data.features[0]);
                    // setDiagnostic(response.data.diagnostic[0]);
                })
                .catch((error) => {
                    console.error(error);
                });
        } else {
            console.log('No image selected.');
        }
    };
    useEffect(() => {
        const images = [], fileReaders = [];
        let isCancel = false;
        if (imageFiles.length) {
            imageFiles.forEach((file) => {
                const fileReader = new FileReader();
                fileReaders.push(fileReader);
                fileReader.onload = (e) => {
                    const { result } = e.target;
                    if (result) {
                        images.push(result)
                    }
                    if (images.length === imageFiles.length && !isCancel) {
                        setImages(images);
                    }
                }
                fileReader.readAsDataURL(file);
            })
        };
        return () => {
            isCancel = true;
            fileReaders.forEach(fileReader => {
                if (fileReader.readyState === 1) {
                    fileReader.abort()
                }
            })
        }
    }, [imageFiles]);
    const changeHandler = (e) => {
        const { files } = e.target;
        const validImageFiles = [];
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            if (file.type.match(imageTypeRegex)) {
                validImageFiles.push(file);
            }
        }
        if (validImageFiles.length) {
            setImageFiles(validImageFiles);
            return;
        }
        alert("Selected images are not of valid type!");
    };
    return (
        <div className={styles.container}>
            <div className={styles.imageContainer}>
                {
                    images.length > 0 ?
                        <div>
                            {
                                images.map((image, idx) => {
                                    return <p key={idx}> <img src={image} alt="" className={styles.image} /> </p>
                                })
                            }
                        </div> : <div className={styles.placeholder}>Aucune image sélectionnée</div>
                }
                <label htmlFor="fileInput" className={styles.button}>
                    Sélectionner un fichier
                </label>
                <input
                    type="file"
                    id="fileInput"
                    onChange={changeHandler}
                    accept="image/png, image/jpg, image/jpeg"
                    style={{ display: 'none' }}
                />
                <button class="button-41" role="button" onClick={handleClick}>Detect Melanome</button>
            </div>
            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nom de l'image</th>
                            <th>Résultat de prédiction</th>
                            <th>Pourcentage</th>
                        </tr>
                    </thead>
                    <tbody>
                        {predictions ?
                            <tr>

                                <td>correlation": {predictions.correlation}</td>
                                <td>Homogeneity; {predictions.homogeneity}</td>
                                <td>energy; {predictions.energy}</td>
                                
                           



                            </tr>
                            : null}
                    </tbody>
                </table>
            </div>
        </div>
    );

}



export default Test2;