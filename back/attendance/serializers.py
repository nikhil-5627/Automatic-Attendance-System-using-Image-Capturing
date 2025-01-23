from typing import Iterable, List, Dict, Any

# serializers.py
from rest_framework import serializers
from .models import Apple


class AppleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Apple
        fields = ['id', 'name', 'color', 'photo_url']
        
        
from rest_framework import serializers
from .models import Course, class_section, Student, CourseCoordinator, Attendance ,Photo

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ['course_id', 'course_name']

class SectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = class_section
        fields = ['section_id', 'section_name']


class StudentSerializer(serializers.ModelSerializer):
    courses = serializers.PrimaryKeyRelatedField(
        many=True, queryset=Course.objects.all()
    )
    photos = serializers.PrimaryKeyRelatedField(
        many=True, queryset=Photo.objects.all()
    )

    class Meta:
        model = Student
        fields = ['full_name', 'student_id', 'year', 'class_section', 'courses', 'email', 'password', 'photos']
        extra_kwargs = {'password': {'write_only': True}}

class CourseCoordinatorSerializer(serializers.ModelSerializer):
    courses = serializers.PrimaryKeyRelatedField(
        many=True, queryset=Course.objects.all()
    )

    class Meta:
        model = CourseCoordinator
        fields = ['coordinator_id', 'full_name', 'email', 'courses', 'class_section']


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'
        

class AttendanceSerializer(serializers.ModelSerializer):
    course = serializers.PrimaryKeyRelatedField(queryset=Course.objects.all())
    section = serializers.PrimaryKeyRelatedField(queryset=class_section.objects.all())
    teacher = serializers.StringRelatedField()

    class Meta:
        model = Attendance
        fields = ['teacher', 'course', 'section', 'image', 'timestamp']

# backend/app/serializers.py

from rest_framework import serializers
from .models import StudentPhoto

class StudentPhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentPhoto
        fields = ['image']
