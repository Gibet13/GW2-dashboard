from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("account", views.show_account, name="show_account")
]