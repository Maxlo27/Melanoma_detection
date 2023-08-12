import React, { useState } from 'react';
import axios from 'axios';
import styles from "../pages/detailPatient.module.css";
import PatientSearchInterface1 from '../components/p';

const PatientSearchInterface = () => {
  const [idPatient, setIdPatient] = useState('');
  const [patientData, setPatientData] = useState([]);
  const [message, setMessage] = useState('');

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(`http://localhost:5000/patient/${idPatient}`);
      setPatientData(response.data);
      setMessage(''); // Réinitialiser le message
    } catch (error) {
      console.error('Erreur lors de la recherche du patient :', error);
    }
  };

  const handleEmptyPatient = () => {
    axios.delete('http://localhost:5000/patient')
      .then(response => {
        setMessage(response.data);
        setPatientData([]); // Vider les données du patient affichées
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div className={styles.conteneur}>
      <div className={styles.conteneur2}>
        <form onSubmit={handleSearchSubmit}>
          <label>
            Entrez l'ID du patient :
            <input type="text" value={idPatient} onChange={(e) => setIdPatient(e.target.value)} />
          </label>
          <button type="submit">Exécuter</button>
        </form>
      </div>
      <div className={styles.resultat}>
        {patientData && (
          <table className={styles.tableau}>
              <thead>
              <tr>
                <th>ID</th>

                <th>Image</th>
                <th>ID Patient</th>
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
                {/* Ajoutez d'autres en-têtes en fonction des données que vous récupérez */}
              </tr>
            </thead>
            <tbody>
              {patientData.map((data, index) => (
                <tr key={data.id}>
                  <td>{data.id}</td>
                  <td><img src={data.chemin} alt="Image" /></td>
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
        )}
        {patientData && patientData.length === 0 && <p>Aucun patient trouvé.</p>}
        <div>
          <button onClick={handleEmptyPatient}>Vider les données des pateints </button>
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
};

export default PatientSearchInterface;
