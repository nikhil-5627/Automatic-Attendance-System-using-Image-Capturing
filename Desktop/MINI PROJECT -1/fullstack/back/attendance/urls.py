from django.urls import path
from attendance import views
from .views import AttendanceView
from .views import AddStudentAPI ,StudentListView ,CoordinatorListView ,get_student_subjects ,get_coordinator_courses ,AddCoordinatorAPI ,CourseListView ,CourseCreateView 

from .views import upload_photo  # If the function name is 'upload_file'


urlpatterns = [
    path('', views.index, name='home'),
    path('get-apples/', views.get_apples, name='get_apples'),  # Add this path for apple data
    path('api/apples/', views.AppleListView.as_view(), name='apple-list'),
    # path('api/mark-attendance/', AttendanceView, name='AttendanceView'),
    path('api/add-student/', AddStudentAPI.as_view(), name='add-student'),
    path('api/student-veiw/', StudentListView.as_view(), name='student-veiw'),
    path("api/add-coordinator/", views.AddCoordinatorAPI.as_view(), name="add-coordinator"),
    path('api/coordinator-veiw/', CoordinatorListView.as_view(), name='coordinator-veiw'),
    path('api/courses/', views.CourseListView.as_view(), name='course-list'),# Add a new course
    path('api/courses/add/', views.CourseCreateView.as_view(), name='course-create'),
    path('api/upload-photo/', views.upload_photo, name='upload_photo'),
    path('api/student-subjects/', get_student_subjects, name='student-subjects'),
    # path('api/download-attendance', get_downolad_attendance, name='student-subjects')
    # path('api/coordinator-courses/', get_coordinator_courses, name='coordinator-courses'),
    path('api/coordinator-courses', get_coordinator_courses, name='coordinator-courses'),
    # path('api/view-attendance/', views.get_csv_file, name='view_attendance'),
    path('api/view-attendance', views.view_attendance, name='view_attendance'),
    path('download-attendance', views.download_attendance, name='download_attendance'),
]
