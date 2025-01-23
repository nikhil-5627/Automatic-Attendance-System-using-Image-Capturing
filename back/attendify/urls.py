from django.contrib import admin
from django.urls import path, include
from django.shortcuts import redirect
from attendance import views , urls 
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('attendance/', include('attendance.urls')),
    path('', views.index, name='index'),
    # path('register/', views.register_student, name='register_student'),
    path('', include('attendance.urls')),
    path('api/' , include('attendance.urls') ,)
    
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)