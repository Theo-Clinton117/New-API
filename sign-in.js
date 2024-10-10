function toggleForm(form) {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const formTitle = document.getElementById('form-title');
    const errorMessage = document.getElementById('error-message');

    errorMessage.innerHTML = ''; 

    if (form === 'signup') {
        loginForm.style.display = 'none';
        signupForm.style.display = 'block';
        formTitle.textContent = 'Sign Up';
    } else {
        loginForm.style.display = 'block';
        signupForm.style.display = 'none';
        formTitle.textContent = 'Log In';
      }
    }

function login() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const errorMessage = document.getElementById('error-message');

    if (email === '' || password === '') {
        errorMessage.innerHTML = 'Please fill in all fields.';
    } else {
        alert('Logged in successfully!');
      }
    }

function signup() {
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-confirm-password').value;
    const errorMessage = document.getElementById('error-message');

    if (email === '' || password === '' || confirmPassword === '') {
        errorMessage.innerHTML = 'Please fill in all fields.';
    } else if (password !== confirmPassword) {
        errorMessage.innerHTML = 'Passwords do not match.';
    } else {
        alert('Signed up successfully!');
      }
    }  