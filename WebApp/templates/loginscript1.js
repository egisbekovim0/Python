function validateForm() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var email = document.getElementById("email").value;
    var isValid = true;

    if (username === "") {
        displayError("username-error", "Username is required.");
        isValid = false;
    } else {
        clearError("username-error");
    }

    if (!isValidPassword(password)) {
        displayError("password-error", "Password must be at least 8 characters with at least one letter and one number.");
        isValid = false;
    } else {
        clearError("password-error");
    }

    if (!isValidEmail(email)) {
        displayError("email-error", "Please enter a valid email address.");
        isValid = false;
    } else {
        clearError("email-error");
    }

    return isValid;
}

function isValidPassword(password) {
    var passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
}

function isValidEmail(email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function displayError(elementId, message) {
    var errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
}

function clearError(elementId) {
    var errorElement = document.getElementById(elementId);
    errorElement.textContent = "";
}

// Login
const loginButton = document.getElementById("login-button");

if (loginButton) {
    loginButton.addEventListener("click", async (event) => {
        event.preventDefault(); // Prevent the default form submission
        console.log("Login button clicked");
        await loginUser();
    });
}

async function loginUser() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (!validateForm()) {
        return false; // Return false to prevent form submission
    }

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const result = await response.json();

        console.log('Login API Response:', result);

        if (response.ok) {
            alert('Login successful!');            
            window.location.href = "index.html";
        } else {
            alert(`Login failed. ${result.message}`);
        }
    } catch (error) {
        console.error(error);
        alert('An unexpected error occurred.');
    }

    return false; // Prevent form submission
}

// Registration
const registerButton = document.getElementById("register-button");

if (registerButton) {
    registerButton.addEventListener("click", async (event) => {
        event.preventDefault(); // Prevent the default form submission
        console.log("Register button clicked");
        await registerUser();
    });
}

async function registerUser() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const email = document.getElementById("email").value;

    if (!validateForm()) {
        return false; // Return false to prevent form submission
    }
    

    try {
        const response = await fetch('/register/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, email }),
    });


        if (!response.ok) {
            // Handle non-JSON response
            console.log('Registration failed with status:', response.status);
            alert('Registration failed. An unexpected error occurred.');
            return;
        }

        const result = await response.json();

        console.log('Registration API Response:', result);

        if (response.ok) {
            alert('Registration successful!');
            window.location.href = "Login.html";
        } else {
            alert(`Registration failed. ${result.message}`);
        }

        } catch (error) {
            console.error(error);
            alert('An unexpected error occurred.');
        }
};

