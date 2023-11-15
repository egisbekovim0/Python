from django.shortcuts import render

from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth import login, logout

from .models import User

def my_view(request):
    data = User.objects.all()
    return render(request, 'myapp/template.html', {'data': data})
# Create your views here.


def profile_view(request):
    return render(request, 'Profile1.html')    

def register_view(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect('profile')  # Replace 'profile' with your desired URL
    else:
        form = UserCreationForm()
    return render(request, 'Register1.html', {'form': form})

def login_view(request):
    if request.method == 'POST':
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            return redirect('profile')  # Replace 'profile' with your desired URL
    else:
        form = AuthenticationForm()
    return render(request, 'Login1.html', {'form': form})