# Skin Disease  Prediction using CNN Model

*This project involves using a Convolutional Neural Network (CNN) model to predict skin diseases based on image data. The model is trained to identify various skin conditions, aiding in early diagnosis and treatment.*

### Dataset

The dataset which is used to Train, Test and Validate the model is available at [Kaggle](https://www.kaggle.com/datasets/ascanipek/skin-diseases).

### Model

The model I used to train the data is VGG16 for better accuracy, along with some custom layers for better recognition of the images in the dataset.

### Training Process

The training process involves pre-processing the image data, including resizing, normalization, and augmentation to improve the model's robustness using ImageDataGenerator. The dataset is split into training, validation, and test sets to evaluate the model's performance accurately.

### Evaluation

The model's performance is evaluated using metrics such as accuracy, precision, recall, and the F1 score. These metrics provide insights into the model's ability to correctly identify different skin conditions.

### Results

The trained model showed promising results, with high accuracy and satisfactory precision and recall rates. Further tuning and experimentation with different architectures and hyperparameters could potentially improve the model's performance.

The Accuracy that I got when I evaluated the model is ***65%** to **75%***.

## Environment in which the model is Trained

- ***Operating System** - Ubuntu 22.04.4 LTS on Windows using WSL*
- ***Environment Manager** - MiniConda3*
- ***IDE** - PyCharm, Jupyter-Lab*

## Technologies Used To Develop this Project

- ***Flask** - For it’s minimal code and built-in development server and debugger.*
- ***React** - For building the user interface and handling client-side operations.*
- ***TensorFlow/Keras** - For model building and training.*