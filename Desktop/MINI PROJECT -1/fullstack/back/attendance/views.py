from django.http import JsonResponse
from .serializers import AppleSerializer ,StudentSerializer, AttendanceSerializer ,CourseCoordinatorSerializer ,CourseSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Apple ,Photo ,Course ,CourseCoordinator ,class_section ,Student, Attendance

def index(request):
    return JsonResponse({"message": "Welcome to Attendify!"})

def attendance(request):
    # Example: Fetching the attendance data
    # You can replace this with your actual attendance logic
    return JsonResponse({"message": "Attendance section"})

def get_apples(request):
    apples = Apple.objects.all().values('id', 'name', 'color', 'photo_url')  # Fetch data from Apple model
    return JsonResponse(list(apples), safe=False)

def get_students(request):
    students = Student.objects.all().values('id', 'name', 'email', 'roll_number', 'courses__id', 'courses__name', 'photos__id', 'photos__url')
    return JsonResponse(list(students), safe=False)

class StudentListView(APIView):
    def get(self, request):
        students = Student.objects.all()  # Fetch all students
        serializer = StudentSerializer(students, many=True)  # Serialize the data
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class AppleListView(APIView):
    def get(self, request):
        apples = Apple.objects.all()  # Fetch all apples from the database
        serializer = AppleSerializer(apples, many=True)  # Serialize the data
        return Response(serializer.data, status=status.HTTP_200_OK)

class AddStudentAPI(APIView):
    def post(self, request):
        serializer = StudentSerializer(data=request.data)
        
        if serializer.is_valid():
            # Save the Student instance
            student = serializer.save()

            # Handle ManyToMany fields separately
            courses = request.data.get('courses', [])
            photos = request.data.get('photos', [])
            
            if courses:
                course_objects = Course.objects.filter(id__in=courses)
                student.courses.set(course_objects)  # Set ManyToMany relationship
            
            if photos:
                photo_objects = Photo.objects.filter(id__in=photos)
                student.photos.set(photo_objects)  # Set ManyToMany relationship
            
            student.save()  # Save changes
            
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CoordinatorListView(APIView):
    def get(self, request):
        coordinators = CourseCoordinator.objects.all()  # Fetch all coordinators from the database
        serializer = CourseCoordinatorSerializer(coordinators, many=True)  # Serialize the data
        return Response(serializer.data, status=status.HTTP_200_OK)

class AttendanceView(APIView):
    def post(self, request):
        serializer = AttendanceSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(teacher=request.user)  # Ensure teacher is the logged-in user
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CourseListView(APIView):
    def get(self, request):
        courses = Course.objects.all()
        serializer = CourseSerializer(courses, many=True)
        return Response(serializer.data)

class CourseCreateView(APIView):
    # This will handle the POST request to create a new course
    def post(self, request):
        serializer = CourseSerializer(data=request.data)  # Pass data from request to serializer
        
        if serializer.is_valid():  # Check if the data is valid
            serializer.save()  # Save the course in the database
            return Response(serializer.data, status=status.HTTP_201_CREATED)  # Return the created course
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  # If data is invalid, return errors
    
# backend/app/views.py

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import FileSystemStorage

@csrf_exempt
def upload_photo(request):
    if request.method == 'POST' and request.FILES.get('file'):
        uploaded_file = request.FILES['file']
        fs = FileSystemStorage()
        filename = fs.save(uploaded_file.name, uploaded_file)
        file_url = fs.url(filename)
        return JsonResponse({'status': 'success', 'file_url': file_url})
    return JsonResponse({'status': 'error', 'message': 'No file uploaded'}, status=400)


class AddCoordinatorAPI(APIView):
    def post(self, request):
        serializer = CourseCoordinatorSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


from django.contrib.auth.models import User
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def register_faculty(request):
    if request.method == "POST":
        data = json.loads(request.body)
        full_name = data.get("full_name")
        email = data.get("email")
        password = data.get("password")
        subject_groups = data.get("subject_groups", [])
        
        # Validate fields here...
        
        # Create User and save details
        try:
            user = User.objects.create_user(username=email, password=password)
            user.first_name = full_name
            user.save()

            # Process subject_groups if needed
            # Save subject_groups to the database here...
            
            return JsonResponse({"message": "Faculty registered successfully."})
        except Exception as e:
            return JsonResponse({"error": f"Error: {str(e)}"}, status=500)
    return JsonResponse({"error": "Invalid request method."}, status=405)

from rest_framework.decorators import api_view
from rest_framework.response import Response
from attendance.models import Student, Course, CourseCoordinator

@api_view(['GET'])
def get_student_subjects(request):
    email = request.GET.get('email')  # Get the student email from the query parameters
    if not email:
        return Response({"error": "Email parameter is required"}, status=400)

    try:
        # Get the student instance by email
        student = Student.objects.get(email=email)

        # Fetch all related courses
        subjects = student.courses.all()

        # Prepare the dynamic response with course coordinator details
        subject_data = []
        for course in subjects:
            # Fetch the course coordinator for the course
            coordinators = CourseCoordinator.objects.filter(courses=course)
            coordinator_details = [
                {"name": coordinator.full_name, "section": coordinator.class_section}
                for coordinator in coordinators
            ]

            subject_data.append({
                "id": course.course_id,
                "name": course.course_name,
                "year": student.year,  # Example: dynamic field based on student
                "section": student.class_section,  # Example: adding student's section
                "coordinators": coordinator_details  # List of course coordinators for the course
            })

        return Response(subject_data, status=200)
    except Student.DoesNotExist:
        return Response({"error": "Student not found"}, status=404)


from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import CourseCoordinator, Course  # Adjust model imports according to your app structure

@api_view(['GET'])
def get_coordinator_courses(request):
    email = request.GET.get('email')
    if not email:
        return Response({"error": "Email parameter is required"}, status=400)

    try:
        # Try to get the coordinator by email
        coordinator = CourseCoordinator.objects.get(email=email)
        print(f"Coordinator Found: {coordinator.full_name}")  # Debugging output
        
        # Fetch all courses assigned to the coordinator
        courses = coordinator.courses.all()
        print(f"Courses: {courses}")  # Debugging output

        if courses.exists():  # Ensure that courses are assigned
            course_data = [
                {
                    "course_id": course.course_id,
                    "course_name": course.course_name,
                    "section": coordinator.class_section
                }
                for course in courses
            ]
            return Response(course_data, status=200)
        else:
            print("No courses assigned to this coordinator.")  # Debugging output
            return Response({"message": "No courses assigned to this coordinator."}, status=404)

    except CourseCoordinator.DoesNotExist:
        print(f"Coordinator not found with email: {email}")  # Debugging output
        return Response({"error": "Coordinator not found"}, status=404)


import csv
from django.http import JsonResponse

def get_csv_file(request):
    file_path = "C:/saii/attendance.csv"  # Path to your CSV file
    data = []

    try:
        with open(file_path, newline='', encoding='utf-8') as csvfile:
            reader = csv.DictReader(csvfile)  # Reads as a list of dictionaries
            for row in reader:
                data.append(row)
        return JsonResponse(data, safe=False)
    except FileNotFoundError:
        return JsonResponse({"error": "File not found"}, status=404)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
    
from django.http import JsonResponse, FileResponse # type: ignore
from django.shortcuts import render # type: ignore
from django.conf import settings
import os

# Mapping of subjectID to CSV files
course_files = {
    "CSL410": r"C:\saii\predicted_AI.csv",
    "CSL422": r"C:\saii\predicted_ML.csv",
    "CSL312": r"C:\saii\predicted_CN.csv",
    "CSL301": r"C:\saii\predicted_DBMS.csv",
    "CSL311": r"C:\saii\predicted_DPS.csv"
}

# View Attendance
def view_attendance(request):
    course_id = request.GET.get('course_id')
    
    if course_id in course_files:
        file_path = course_files[course_id]
        try:
            # Read the file content (or implement logic to process file content if needed)
            with open(file_path, 'r') as file:
                data = file.read()  # You can return the data as JSON or process it further
            return JsonResponse({"data": data})
        except FileNotFoundError:
            return JsonResponse({"error": "Attendance file not found."}, status=404)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    else:
        return JsonResponse({"error": "Invalid course ID."}, status=400)

# Download Attendance
def download_attendance(request):
    course_id = request.GET.get('course_id')

    if course_id in course_files:
        file_path = course_files[course_id]
        try:
            return FileResponse(open(file_path, 'rb'), as_attachment=True, filename=f"attendance_{course_id}.csv", content_type="text/csv")
        except FileNotFoundError:
            return JsonResponse({"error": "Attendance file not found."}, status=404)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    else:
        return JsonResponse({"error": "Invalid course ID."}, status=400)