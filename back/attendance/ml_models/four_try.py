import face_recognition
import cv2
import os
import sys

import warnings
warnings.filterwarnings('ignore')
def extract_faces(image_path, padding=20):
    """
    Extract faces from an image with additional padding around each face.

    Args:
        image_path (str): Path to the image file.
        padding (int): Number of pixels to expand each edge of the face bounding box.
    """
    # Load the image into memory
    image = face_recognition.load_image_file(image_path)
    
    # Find all face locations in the image
    face_locations = face_recognition.face_locations(image)
    
    # Get the base name of the image for folder naming
    image_name = os.path.splitext(os.path.basename(image_path))[0]
    extracted_folder = f"{image_name}_extracted_combined_2"
    
    # Create a folder to save extracted faces if it doesn't exist
    if not os.path.exists(extracted_folder):
        os.makedirs(extracted_folder)
    
    # Initialize OpenCV for saving the cropped faces
    original_image = cv2.imread(image_path)
    image_height, image_width, _ = original_image.shape
    
    # Extract and save each face with increased cropping edges
    for i, (top, right, bottom, left) in enumerate(face_locations):
        # Increase the crop boundaries with padding
        top = max(0, top - padding)
        right = min(image_width, right + padding)
        bottom = min(image_height, bottom + padding)
        left = max(0, left - padding)
        
        # Crop the face from the original image using the adjusted coordinates
        face_image = original_image[top:bottom, left:right]
        
        # Save the cropped face in the folder
        face_filename = os.path.join(extracted_folder, f"face_{i+1}.jpg")
        cv2.imwrite(face_filename, face_image)
    
    print(f"Extracted faces saved in folder: {extracted_folder}")


image_path = "C:\saii\group\grp_img_1.jpg" 
extract_faces(image_path)

sys.stderr = open(os.devnull, 'w')

sys.stderr = open(os.devnull, 'w')

sys.stderr = open(os.devnull, 'w')

sys.stderr = open(os.devnull, 'w')

sys.stderr = open(os.devnull, 'w')


