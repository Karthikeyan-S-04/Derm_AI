from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
import tensorflow
import numpy as np
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
model = tensorflow.keras.models.load_model('model_2.h5')


@app.route("/", methods=['POST'])
def predictFromApi():
    file = request.files['image']
    filename = secure_filename(file.filename)
    filepath = os.path.join('uploads', filename)

    if not os.path.exists('uploads'):
        os.makedirs('uploads')

    file.save(filepath)

    img = tensorflow.keras.utils.load_img(filepath, target_size=(224, 224))
    img = tensorflow.keras.utils.img_to_array(img)
    img = np.expand_dims(img, axis=0)
    img = img.reshape(-1, 224, 224, 3)
    img /= 255.0

    prediction = model.predict(img)

    class_labels = ['Enfeksiyonel', 'Ekzama', 'Akne', 'Pigment', 'Benign', 'Malign', 'unidentified']  # List of class labels

    predicted_label_index = np.argmax(prediction)
    if np.max(prediction) > 0.5:  # Assuming predictions for a single sample
        predicted_label = class_labels[predicted_label_index]
    else:
        predicted_label = class_labels[6]

    response = jsonify({"predicted": predicted_label})
    response.headers.add("Access-Control-Allow-Origin", "*")

    # Clean up uploaded file
    os.remove(filepath)

    return response


if __name__ == '__main__':
    app.run(debug=False, port=2000)
