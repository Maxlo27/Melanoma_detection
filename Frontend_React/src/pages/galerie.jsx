import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';


import styles from "../pages/gal.module.css"


const CsvViewer = () => {
  const [csvData, setCsvData] = useState([]); // Initialise csvData avec un tableau vide

  useEffect(() => {
    // Remplacez l'URL ci-dessous par l'URL de votre fichier CSV
    const csvFileUrl = '/df_malignan.csv';

    fetch(csvFileUrl)
      .then((response) => response.text())
      .then((csv) => {
        // Parse the CSV data using papaparse
        const parsedData = Papa.parse(csv, { header: true });

        // Check if parsedData.data is not null or undefined before setting the state
        if (parsedData.data) {
          setCsvData(parsedData.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching or parsing CSV file:', error);
      });
  }, []); // Laissez le tableau de dépendances vide pour s'assurer que le code s'exécute une seule fois au montage

  // ... (le reste du code pour afficher le tableau)    

  return (
    <div>
      {csvData.length > 0 && (
        <div className={styles.tablecontainer}> {/* Utilisez une classe pour styliser le conteneur du tableau */}
         
          <h2><span>C</span>ontenu des 14 premières lignes du dataset :</h2>
          <table className={styles.csvtable}> {/* Utilisez une classe pour styliser le tableau */}
            <thead>
              <tr>
                {Object.keys(csvData[0]).map((header, index) => (
                  <th key={index}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {csvData.slice(0, 14).map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {Object.values(row).map((cell, cellIndex) => (
                    <td key={cellIndex}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CsvViewer;
