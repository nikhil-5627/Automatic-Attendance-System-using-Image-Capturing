# import numpy as np
# from tensorflow import keras
# from tensorflow.keras.models import model_from_json
# from PIL import Image

# # File paths for model architecture and weights

# MODEL_JSON_FILE = "back/attendance/ml_models/vggface_resnet50_model_59.json"

# MODEL_WEIGHTS_FILE = 'back/attendance/ml_models/vggface_resnet50_weights_59.h5'

# # Function to load the model
# def load_ml_model():
#     with open(MODEL_JSON_FILE, 'r') as json_file:
#         model_architecture = json_file.read()
#     model = model_from_json(model_architecture)
#     model.load_weights(MODEL_WEIGHTS_FILE)
#     print("Model loaded successfully!")
#     return model

# # Load the model once during initialization
# attendance_model = load_ml_model()

# def predict_from_image(image_path):
#     """
#     Preprocess the image and get predictions from the model.
#     :param image_path: Path to the image file.
#     :return: List of predicted roll numbers or attendance results.
#     """
#     # Load the image
#     img = Image.open(image_path).convert('RGB')
#     img = img.resize((224, 224))  # Resize to the input size expected by the model
#     img_array = np.array(img) / 255.0  # Normalize pixel values
#     img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension

#     # Get predictions
#     predictions = attendance_model.predict(img_array)
    
#     # Process predictions into roll numbers or IDs
#     # Assuming your model returns a list directly
#     return list(predictions[0])  # Adjust based on model's output shape
