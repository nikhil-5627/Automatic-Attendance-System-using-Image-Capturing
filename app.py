import os
import csv
from flask import Flask, request, jsonify, send_file
from flask_cors import CORS  # Import CORS

app = Flask(__name__)

# Enable CORS for all routes
CORS(app)

# Define the folder to store uploaded images and the path to the CSV file
UPLOAD_FOLDER = r'C:\saii\uploads'  # Update this path as necessary
ATTENDANCE_FILE = r'C:\saii\predicted.csv'  # Path to your CSV file
os.makedirs(UPLOAD_FOLDER, exist_ok=True)  # Ensure the folder exists
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/')
def home():
    return "Hello, welcome to the file upload API!"

# Define the folder to store images and metadata
BASE_UPLOAD_FOLDER = "C:/saii"
os.makedirs(BASE_UPLOAD_FOLDER, exist_ok=True)

# Define the path for the metadata file
METADATA_FILE = os.path.join(BASE_UPLOAD_FOLDER, "path.txt")

@app.route('/upload', methods=['POST'])
def upload():
    # Debugging: Log incoming form data
    print(f"Form Data: {request.form}")

    # Get metadata
    facultyID = request.form.get('facultyID', 'Unknown')
    subjectID = request.form.get('subjectID', 'Unknown')
    timestamp = request.form.get('timestamp', 'Unknown')

    # Debugging: Log extracted metadata
    print(f"Extracted Metadata - FacultyID: {facultyID},  SubjectID: {subjectID}, timestamp: {timestamp}")

    # Save the uploaded file
    uploaded_file = request.files.get('file')
    if uploaded_file:
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], uploaded_file.filename)
        uploaded_file.save(file_path)

        # Save metadata to `path.txt`
        with open(METADATA_FILE, 'a') as f:
            f.write(f"{timestamp} {subjectID} {facultyID}\n")

        return jsonify({"message": f"File '{uploaded_file.filename}' uploaded successfully!"}), 200
    else:
        return jsonify({"error": "No file uploaded."}), 400

course_files = {
    "CSL410": r"C:\saii\predicted_AI.csv",
    "CSL422": r"C:\saii\predicted_ML.csv",
    "CSL312": r"C:\saii\predicted_CN.csv",
    "CSL301": r"C:\saii\predicted_DBMS.csv",
    "CSL311": r"C:\saii\predicted_DPS.csv"
}
import csv

@app.route('/api/view-attendance', methods=['GET'])
def view_attendance():
    course_id = request.args.get('course_id')
    if course_id in course_files:
        file_path = course_files[course_id]
        try:
            with open(file_path, 'r') as file:
                reader = csv.DictReader(file)
                rows = list(reader)  # Parse CSV into a list of dictionaries
            return jsonify(rows)  # Send structured JSON
        except FileNotFoundError:
            return {"error": "Attendance file not found."}, 404
        except Exception as e:
            return {"error": str(e)}, 500
    else:
        return {"error": "Invalid course ID."}, 400



@app.route('/download-attendance', methods=['GET'])
def download_attendance():
    course_id = request.args.get('course_id')  # Extracting course_id from the query
    print(f"Received course_id: {course_id}")
    
    # Check if the course_id exists in the course_files dictionary
    if course_id in course_files:
        file_path = course_files[course_id]
        try:
            return send_file(file_path, as_attachment=True, download_name=f"predicted_{course_id}.csv", mimetype="text/csv")
        except FileNotFoundError:
            print(f"File not found: {file_path}")
            return {"error": "Attendance file not found."}, 404
        except Exception as e:
            print(f"Error: {str(e)}")
            return {"error": str(e)}, 500
    else:
        return {"error": "Invalid course ID."}, 400
    

@app.route('/api/view-student-attendance', methods=['GET'])
def view_student_attendance():
    course_id = request.args.get('course_id')
    student_email = request.args.get('student_email')

    if not course_id or not student_email:
        return {"error": "Missing course_id or student_email."}, 400

    if course_id in course_files:
        file_path = course_files[course_id]
        try:
            with open(file_path, 'r') as file:
                reader = csv.DictReader(file)
                rows = list(reader)

                # Filter attendance data for the specific student email
                student_attendance = [
                    row for row in rows if row.get('student_email') == student_email
                ]
                
                if not student_attendance:
                    return {"error": "No attendance data found for this student."}, 404

            return jsonify(student_attendance)  # Send structured JSON of student-specific attendance data
        except FileNotFoundError:
            return {"error": "Attendance file not found."}, 404
        except Exception as e:
            return {"error": str(e)}, 500
    else:
        return {"error": "Invalid course ID."}, 400


if __name__ == '__main__':
    # Run the app on port 5000 (or update port if necessary)
    app.run(debug=True, port=5000)
