from flask import Flask, request, jsonify
import base64

from flask_cors import CORS
import numpy as np
import cv2
import tensorflow as tf
from keras import backend as K


import tensorflow as tf
import cv2
import numpy as np
import tensorflow.keras.backend as K


# In[3]:


# Fonction pour calculer le f1-score
def get_f1(y_true, y_pred):
    true_positives = K.sum(K.round(K.clip(y_true * y_pred, 0, 1)))
    possible_positives = K.sum(K.round(K.clip(y_true, 0, 1)))
    predicted_positives = K.sum(K.round(K.clip(y_pred, 0, 1)))
    precision = true_positives / (predicted_positives + K.epsilon())
    recall = true_positives / (possible_positives + K.epsilon())
    f1_val = 2 * (precision * recall) / (precision + recall + K.epsilon())
    return f1_val


model1 = tf.keras.models.load_model(
    "/melanome-workspace/hassan/hassan_projet_melanome/hassan_Traitement_test/Model/sauvegarder/model1_2EPOCHS_Xception_im_belin_reduit.h5",
    custom_objects={"get_f1": get_f1},
)
# model1.summary()


# In[4]:


def predict_img(img_path):
    image_Malin = cv2.imread(img_path)
    ts_res = cv2.resize(image_Malin, (480, 480))
    ts_res = cv2.cvtColor(ts_res, cv2.COLOR_BGR2GRAY)
    ts_norm = np.asarray(ts_res).astype(np.float32) / 255.0
    ts_exp = np.expand_dims(ts_norm, axis=0)
    pred = model1.predict(ts_exp)
    return pred.tolist()


#!/usr/bin/env python
# coding: utf-8

# In[3]:


import cv2
from matplotlib import pyplot as plt
import numpy as np
import pandas as pd
from skimage import feature, img_as_ubyte
import albumentations as A


# In[4]:


def reduce_img(img_path):
    image = cv2.imread(img_path)
    transform = A.Compose([A.Resize(width=300, height=200)])
    transformed_image = transform(image=image)["image"]

    return transformed_image


# In[5]:


def preprocess_img(img_path, display_result):
    img = reduce_img(img_path)
    img_gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    kernel = cv2.getStructuringElement(1, (15, 15))
    blackhat = cv2.morphologyEx(img_gray, cv2.MORPH_BLACKHAT, kernel)
    _, thresh2 = cv2.threshold(blackhat, 10, 255, cv2.THRESH_BINARY)
    dst = cv2.inpaint(img, thresh2, 1, cv2.INPAINT_TELEA)
    if display_result == True:
        compare = np.concatenate((img, dst), axis=1)
        plt.figure(figsize=(15, 15))
        plt.imshow(cv2.cvtColor(compare, cv2.COLOR_BGR2RGB))
        plt.title("Original image VS Removed hair image")
    return dst


# In[6]:


criteria = (cv2.TERM_CRITERIA_EPS + cv2.TERM_CRITERIA_MAX_ITER, 10, 1.0)
K = 2
attempts = 20
invalid_image = []


def segment_lesion_2(img_path, display_result):
    img = preprocess_img(img_path, False)[10:190, 40:260]
    twoDimage = img.reshape((-1, 3))
    twoDimage = np.float32(twoDimage)
    _, label, center = cv2.kmeans(
        twoDimage, K, None, criteria, attempts, cv2.KMEANS_PP_CENTERS
    )
    center = np.uint8(center)
    res = center[label.flatten()]
    res = res.reshape((img.shape))
    gray = cv2.cvtColor(res, cv2.COLOR_BGR2GRAY)
    ret, thresh = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)
    contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    mask = np.zeros(img.shape, np.uint8)
    cnts = []
    for c in contours:
        area = cv2.contourArea(c)
        if area > 200:
            cnts.append(c)
    selected_cnt = max(cnts, key=cv2.contourArea)
    for c in cnts:
        # compute the center of the contour
        M = cv2.moments(c)
        cX = int(M["m10"] / M["m00"])
        cY = int(M["m01"] / M["m00"])
        if (75 < cX < 150) and (40 < cY < 140):
            selected_cnt = c

    try:
        cv2.drawContours(mask, [selected_cnt], -1, (255, 255, 255), -1)
        # mask = cv2.cvtColor(mask, cv2.COLOR_BGR2GRAY)
    except:
        invalid_image.append(img_path)
    segmented = cv2.bitwise_and(img, mask)
    if display_result == True:
        compare = np.concatenate((img, segmented), axis=1)
        plt.figure(figsize=(15, 15))
        plt.imshow(cv2.cvtColor(compare, cv2.COLOR_BGR2RGB))
        plt.title("Original image VS Segmented image")
    return img, mask, selected_cnt, segmented


# In[7]:


def extract_GLSM(seg_img):
    gray_img = cv2.cvtColor(seg_img, cv2.COLOR_BGR2GRAY)
    glcm = feature.graycomatrix(
        image=img_as_ubyte(gray_img),
        distances=[1],
        angles=[0, np.pi / 4, np.pi / 2, np.pi * 3 / 2],
        symmetric=True,
        normed=True,
    )

    correlation = np.mean(feature.graycoprops(glcm, prop="correlation"))
    homogeneity = np.mean(feature.graycoprops(glcm, prop="homogeneity"))
    energy = np.mean(feature.graycoprops(glcm, prop="energy"))
    contrast = np.mean(feature.graycoprops(glcm, prop="contrast"))
    return {
        "correlation": correlation,
        "homogeneity": homogeneity,
        "energy": energy,
        "contrast": contrast,
    }


# In[8]:


def create_mask(image, num_clusters, melanoma_label):
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

    # Convertir l'image en un tableau unidimensionnel de pixels
    pixels = image.reshape(
        -1, 3
    )  # -1 signifie que la taille est calculée automatiquement

    # Appliquer K-means sur les pixels
    criteria = (cv2.TERM_CRITERIA_EPS + cv2.TERM_CRITERIA_MAX_ITER, 10, 1.0)
    _, labels, centers = cv2.kmeans(
        pixels.astype(np.float32),
        num_clusters,
        None,
        criteria,
        10,
        cv2.KMEANS_RANDOM_CENTERS,
    )

    # Obtenir les étiquettes de cluster pour chaque pixel
    labels = labels.flatten()

    # Créer le masque de mélanome en fonction des étiquettes
    mask = (labels == melanoma_label).reshape(image.shape[0], image.shape[1]).astype(
        np.uint8
    ) * 255

    return mask


def refine_mask(mask):
    # Appliquer une opération d'ouverture pour éliminer le bruit et les petites régions
    kernel = np.ones((5, 5), np.uint8)
    opening = cv2.morphologyEx(mask, cv2.MORPH_OPEN, kernel)

    # Appliquer une opération de fermeture pour remplir les trous et lisser les contours
    closing = cv2.morphologyEx(opening, cv2.MORPH_CLOSE, kernel)

    return closing


# In[9]:


abcd_features = []
num_clusters = 2  # Nombre de clusters (par exemple, 2 pour le mélanome et le fond)
melanoma_label = 1  # Étiquette du cluster correspondant au mélanome


# In[10]:


def extract_ABCD(image):
    image_read = cv2.imread(f"{image}")
    mask = create_mask(image_read, num_clusters, melanoma_label)
    # Masks.append(mask)
    gray = cv2.cvtColor(image_read, cv2.COLOR_BGR2GRAY)
    # Calcul de la symétrie
    asymmetry = np.sum(np.abs(gray - np.mean(gray))) / (gray.shape[0] * gray.shape[1])
    # Appliquer une opération d'ouverture pour éliminer le bruit et les petites régions du masque
    kernel = np.ones((5, 5), np.uint8)
    opening = cv2.morphologyEx(mask, cv2.MORPH_OPEN, kernel)

    # Trouver le contour du mélanome avec la plus grande superficie
    contours, _ = cv2.findContours(opening, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    max_area = 0
    melanoma_contour = None

    for contour in contours:
        area = cv2.contourArea(contour)
        if area > max_area:
            max_area = area
            melanoma_contour = contour

    # Calcul du diamètre
    (_, _), (width, height), _ = cv2.minAreaRect(melanoma_contour)
    diameter = max(width, height)

    # Calcul de la bordure
    border = cv2.Canny(gray, 100, 200)
    border_length = cv2.arcLength(melanoma_contour, True)

    # border = cv2.Canny(melanoma_contour, 100, 200)
    border_length = cv2.arcLength(melanoma_contour, True)
    return {
        "asymmetry": asymmetry,
        "diameter": diameter,
        "border_length": border_length,
    }


# In[11]:


def extract(image):
    features = []
    img, mask, cnt, segmented = segment_lesion_2(image, True)
    x, y, w, h = cv2.boundingRect(cnt)
    segmented_img = cv2.bitwise_and(img, mask)
    segmented_img = segmented_img[y : y + h, x : x + w]
    features.append(extract_GLSM(segmented_img))
    features.append(extract_ABCD(image))
    # print(image.split('/'))
    cv2.imwrite(f"/melanome-workspace/hassan/mask/{image.split('/')[1]}", segmented)
    return features


# In[12]:


# extract('/melanome-workspace/hassan/hassan_projet_melanome/image/train/ISIC_0052212.jpg')


app = Flask(__name__)
CORS(app)


# Route pour gérer les requêtes POST de prédiction du frontend
@app.route("/predict", methods=["POST"])
def predict():
    if "image" in request.files:
        image_file = request.files["image"]
        # Save the image to a folder or process it as needed
        image_file.save("uploaded_images/" + image_file.filename)
        extraction = extract("uploaded_images/" + image_file.filename)
        prediction = predict_img("uploaded_images/" + image_file.filename)
        resultat = {"features": extraction, "diagnostic": prediction}
        filename = "mask/" + image_file.filename
        # Encode the image to base64
        with open(filename, "rb") as f:
            image_data = base64.b64encode(f.read()).decode("utf-8")
        resultat = {
            "features": extraction,
            "diagnostic": prediction,
            "image": image_data,
        }
        # return send_file(filename, mimetype='image/jpg')
        # return jsonify({'image': image_data})

        return jsonify(resultat)
    else:
        return "No image received."


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001)
