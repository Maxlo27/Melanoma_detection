import React, { useState } from 'react';
import styles from"../pages/detailPatient.module.css"

const PatientSearchInterface1 = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const changeHandler = (e) => {
    const { files } = e.target;
    if (files && files.length > 0) {
      const imageFile = files[0];
      if (imageFile.type.startsWith('image/')) {
        setSelectedImage(URL.createObjectURL(imageFile));
      } else {
        alert('Le fichier sélectionné n\'est pas une image valide.');
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        {selectedImage && <img src={selectedImage} alt="Image sélectionnée" />}
      </div>
      <div className={styles.uploadContainer}>
        <form>
          <label>
            Sélectionnez une image :
            <input type="file" accept="image/*" onChange={changeHandler} />
          </label>
        </form>
      </div>
    </div>
  );
};

export default PatientSearchInterface1;
