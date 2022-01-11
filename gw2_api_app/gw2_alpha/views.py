from django.shortcuts import render

# Create your views here.

def index(request):
    return render(request, "gw2_alpha\index.html")