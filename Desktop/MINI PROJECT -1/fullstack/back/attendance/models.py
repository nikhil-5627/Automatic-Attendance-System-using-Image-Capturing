from django.db import models
from django.utils import timezone
# Create your models here.


class Apple(models.Model):
    name = models.CharField(max_length=100)
    color = models.CharField(max_length=100)
    photo_url = models.URLField()

    def __str__(self):
        return self.name
    
# from django.db import models


# class Course(models.Model):
#     course_id = models.CharField(max_length=10, primary_key=True)  # Example: CSL-301
#     course_name = models.CharField(max_length=100)
    
#     def __str__(self):
#         return self.course_name

# class class_section(models.Model):
#     section_id = models.AutoField(primary_key=True)  # Auto-increment ID
#     section_name = models.CharField(max_length=100, unique=True)

#     def __str__(self):
#         return self.section_name


# class Student(models.Model):
#     full_name = models.CharField(max_length=100)
#     student_id = models.CharField(max_length=100)
#     year = models.CharField(max_length=20)
#     class_section = models.CharField(max_length=100)
#     email = models.EmailField()
#     password = models.CharField(max_length=100)
#     courses = models.ManyToManyField(Course, related_name="enrolled_students")  # Fixed related_name
#     photos = models.ManyToManyField('Photo', related_name="student_photos")  # Ensure 'Photo' model exists

# class CourseCoordinator(models.Model):
#     coordinator_id = models.AutoField(primary_key=True)
#     full_name = models.CharField(max_length=100)
#     email = models.EmailField(unique=True)
#     class_section = models.CharField(max_length=100)
#     courses = models.ManyToManyField(Course, related_name="coordinators")  # Fixed related_name
#     def __str__(self):
#         return self.name 

# from django.db import models
# from django.contrib.auth.models import User  # Assuming teachers are part of the User model

# class Attendance(models.Model):
#     teacher = models.ForeignKey(User, on_delete=models.CASCADE, related_name="attendances")
#     course = models.ForeignKey('Course', on_delete=models.CASCADE, related_name="attendances")
#     section = models.ForeignKey('class_section', on_delete=models.CASCADE, related_name="attendances")
#     image = models.ImageField(upload_to='attendance_photos/')  # Saves uploaded images
#     timestamp = models.DateTimeField(auto_now_add=True)  # Automatically saves the upload date and time

#     def __str__(self):
#         return f"{self.teacher.username} - {self.course.course_id} ({self.timestamp})"
#     # Saves images in MEDIA_ROOT/student_photos/
#     # here teacher can upload the photo in the upload portal
#     #then in the database i need who upload this and what course and section time and date

class Photo(models.Model):
    image = models.ImageField(upload_to='student_photos/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

from django.db import models





class class_section(models.Model):
    section_id = models.AutoField(primary_key=True)
    section_name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.section_name



from django.contrib.auth.hashers import make_password
from django.core.validators import MinValueValidator, MaxValueValidator

class Student(models.Model):
    full_name = models.CharField(max_length=100)
    student_id = models.CharField(max_length=20, unique=True)  # Adjusted max_length
    year = models.PositiveIntegerField(validators=[
        MinValueValidator(2000), MaxValueValidator(2100)
    ])  # Year validation
    class_section = models.CharField(max_length=100)
    courses = models.ManyToManyField('Course', related_name="enrolled_students")
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)  # Adjusted for hashed password
    photos = models.ManyToManyField('Photo', related_name="student_photos")

    def save(self, *args, **kwargs):
        # Hash the password before saving
        self.password = make_password(self.password)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.full_name} ({self.student_id})"

class Course(models.Model):
    course_id = models.CharField(max_length=10, primary_key=True)
    course_name = models.CharField(max_length=100)

    def __str__(self):
        return self.course_name
    
class CourseCoordinator(models.Model):
    coordinator_id = models.AutoField(primary_key=True)
    full_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    courses = models.ManyToManyField(Course, related_name="coordinators")
    class_section = models.CharField(max_length=100)


class Attendance(models.Model):
    teacher = models.ForeignKey('auth.User', on_delete=models.CASCADE, related_name="attendances")
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name="attendances")
    section = models.ForeignKey(class_section, on_delete=models.CASCADE, related_name="attendances")
    image = models.ImageField(upload_to='attendance_photos/')
    timestamp = models.DateTimeField(auto_now_add=True)


# backend/app/models.py

class StudentPhoto(models.Model):
    image = models.ImageField(upload_to='student_photos/')  # Specify the path for image storage
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Photo uploaded at {self.uploaded_at}"
