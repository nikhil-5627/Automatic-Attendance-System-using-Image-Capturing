from django.test import TestCase

# Create your tests here.
from django.db import models


from django.test import TestCase
from .models import Apple  # Import the Apple model from models.py

class AppleModelTestCase(TestCase):
    def setUp(self):
        # Create a test Apple instance
        self.apple = Apple.objects.create(
            name="Golden Delicious",
            color="Yellow",
            photo_url="http://example.com/apple.jpg"
        )

    def test_apple_creation(self):
        """Test if an Apple object is created successfully."""
        self.assertEqual(self.apple.name, "Golden Delicious")
        self.assertEqual(self.apple.color, "Yellow")
        self.assertEqual(self.apple.photo_url, "http://example.com/apple.jpg")

    def test_apple_string_representation(self):
        """Test the string representation of the Apple model."""
        self.assertEqual(str(self.apple), "Golden Delicious")

from django.test import TestCase
from django.core.exceptions import ValidationError
from .models import Student, Course, Photo
from django.test import TestCase
from .models import Apple  # Import the Apple model from models.py


class StudentModelTestCase(TestCase):
    def setUp(self):
        # Create a test course
        self.course = Course.objects.create(
            course_id="CSL-301",
            course_name="Data Structures"
        )
        
        # Create a test photo
        self.photo = Photo.objects.create(
            url="http://example.com/photo1.jpg"
        )
        
        # Create a test student
        self.student = Student.objects.create(
            full_name="John Doe",
            student_id="BT22CSD001",
            year=2022,
            class_section="CSE-A",
            email="john.doe@example.com",
            password="securepassword123"  # Assuming it's hashed in the model
        )
        self.student.courses.add(self.course)
        self.student.photos.add(self.photo)

    def test_student_creation(self):
        """Test if a Student object is created successfully."""
        self.assertEqual(self.student.full_name, "John Doe")
        self.assertEqual(self.student.student_id, "BT22CSD001")
        self.assertEqual(self.student.year, 2022)
        self.assertEqual(self.student.class_section, "CSE-A")
        self.assertEqual(self.student.email, "john.doe@example.com")

    def test_student_string_representation(self):
        """Test the string representation of the Student model."""
        self.assertEqual(str(self.student), "John Doe (BT22CSD001)")

    def test_course_relationship(self):
        """Test the Many-to-Many relationship with courses."""
        self.assertIn(self.course, self.student.courses.all())

    def test_photo_relationship(self):
        """Test the Many-to-Many relationship with photos."""
        self.assertIn(self.photo, self.student.photos.all())

    def test_invalid_email(self):
        """Test email field validation."""
        self.student.email = "invalidemail"
        with self.assertRaises(ValidationError):
            self.student.full_clean()  # Triggers model field validation

    def test_password_hashed(self):
        """Ensure the password is hashed before saving."""
        # The password should not be stored in plain text
        self.assertNotEqual(self.student.password, "securepassword123")
        self.assertTrue(self.student.password.startswith("pbkdf2_sha256"))  # Example of Django's default hashing

    def test_unique_email(self):
        """Test that the email field enforces uniqueness."""
        with self.assertRaises(Exception):
            Student.objects.create(
                full_name="Jane Doe",
                student_id="BT22CSD002",
                year=2022,
                class_section="CSE-A",
                email="john.doe@example.com",  # Duplicate email
                password="anotherpassword"
            )
