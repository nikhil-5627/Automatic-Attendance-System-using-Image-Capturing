
# admin.py

from django.contrib import admin

# Register the Course model to the Django admin site
from .models import Course, Student, CourseCoordinator, Attendance, Photo

admin.site.register(Course)
admin.site.register(Student)
admin.site.register(CourseCoordinator)
admin.site.register(Attendance)
admin.site.register(Photo)