import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../components/com.module.css';

export default function DatasetTable() {
    const [dataset, setDataset] = useState([{}]);
    const [newId, setNewId] = useState('');
    const [newImageName, setNewImageName] = useState('');
    const [newSexe, setNewSexe] = useState('');
    const [newLocalisation, setNewLocalisation] = useState('');
    const [newAge, setNewAge] = useState('');
    const [newBordure, setNewBordure] = useState('');
    const [newDiametre, setNewDiametre] = useState('');
    const [newSymetrie, setNewSymetrie] = useState('');
    const [newContrast, setNewContrast] = useState('');
    const [newHomogeneity, setNewHomogeneity] = useState('');
    const [newEnergy, setNewEnergy] = useState('');
    const [newCorrelation, setNewCorrelation] = useState('');
    const [newPourcentageMalin, setNewPourcentageMalin] = useState('');
    const [newPourcentageBenin, setNewPourcentageBenin] = useState('');

    useEffect(() => {
        // Effectuer une requête GET pour récupérer les données existantes du patient depuis le backend
        axios.get('http://localhost:5000/patient')
            .then(response => {
                setDataset(response.data); // Mettre à jour l'état avec les données reçues
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const handleAddData = () => {
        if (newId && newImageName && newSexe && newLocalisation && newAge && newBordure && newDiametre && newSymetrie && newContrast && newHomogeneity && newEnergy && newCorrelation && newPourcentageMalin && newPourcentageBenin) {
            const newPatient = {
                id: newId,
                image_name: newImageName,
                sexe: newSexe,
                localisation: newLocalisation,
                age: newAge,
                bordure: newBordure,
                diametre: newDiametre,
                symetrie: newSymetrie,
                contrast: newContrast,
                homogeneity: newHomogeneity,
                energy: newEnergy,
                correlation: newCorrelation,
                pourcentage_malin: newPourcentageMalin,
                pourcentage_benin: newPourcentageBenin
            };

            // Effectuer une requête POST pour envoyer les nouvelles données du patient au backend
            axios.post('http://localhost:5000/patient', newPatient)
                .then(response => {
                    setDataset([...dataset, newPatient]); // Mettre à jour l'état avec les nouvelles données ajoutées
                })
                .catch(error => {
                    console.error(error);
                });

            // Réinitialiser les valeurs des champs de saisie
            setNewId('');
            setNewImageName('');
            setNewSexe('');
            setNewLocalisation('');
            setNewAge('');
            setNewBordure('');
            setNewDiametre('');
            setNewSymetrie('');
            setNewContrast('');
            setNewHomogeneity('');
            setNewEnergy('');
            setNewCorrelation('');
            setNewPourcentageMalin('');
            setNewPourcentageBenin('');
        }
    };

    return (
        <div className={styles.tablecontainer}>
           
            <h2>Dataset </h2>
            <table className={styles.datasettable}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Id Patient</th>
                        <th>Image Name</th>
                        <th>Sexe</th>
                        <th>Localisation</th>
                        <th>Âge</th>
                        <th>Bordure</th>
                        <th>Diamètre</th>
                        <th>Symétrie</th>
                        <th>Contrast</th>
                        <th>Homogeneity</th>
                        <th>Energy</th>
                        <th>Correlation</th>
                        <th>Pourcentage Malin</th>
                        <th>Pourcentage Benin</th>
                    </tr>
                </thead>
                <tbody>
                    {dataset.map((data) => (
                        <tr key={data.id}>
                            <td>{data.id}</td>
                            <td>{data.Id_patient}</td>
                            <td>{data.image_name}</td>
                            <td>{data.sexe}</td>
                            <td>{data.localisation}</td>
                            <td>{data.age}</td>
                            <td>{data.bordure}</td>
                            <td>{data.diametre}</td>
                            <td>{data.symetrie}</td>
                            <td>{data.contrast}</td>
                            <td>{data.homogeneity}</td>
                            <td>{data.energy}</td>
                            <td>{data.correlation}</td>
                            <td>{data.pourcentage_malin}</td>
                            <td>{data.pourcentage_benin}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
