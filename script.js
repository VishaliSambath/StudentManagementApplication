// Store and retrieve user data from Local Storage
function saveUser(user) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const existingUserIndex = users.findIndex(u => u.username === user.username);

    if (existingUserIndex >= 0) {
        users[existingUserIndex] = user; // Update existing user
    } else {
        users.push(user); // Add new user
    }

    localStorage.setItem('users', JSON.stringify(users));
}

function getUsers() {
    return JSON.parse(localStorage.getItem('users')) || [];
}

// Show the Register Form
function showRegister() {
    document.getElementById('home').style.display = 'none';
    document.getElementById('login').style.display = 'none';
    document.getElementById('register').style.display = 'block';
}

// Show the Login Form
function showLogin() {
    document.getElementById('home').style.display = 'none';
    document.getElementById('register').style.display = 'none';
    document.getElementById('login').style.display = 'block';
}

// Go back to the Home Page
function goToHome() {
    document.getElementById('register').style.display = 'none';
    document.getElementById('login').style.display = 'none';
    document.getElementById('home').style.display = 'block';
}

// Register User
document.getElementById('register-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('reg-username').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;

    // Save user data
    const users = getUsers();
    if (users.some(user => user.username === username || user.email === email)) {
        alert('Username or Email already exists.');
        return;
    }

    saveUser({ username, email, password, enrolledCourse: null });
    alert('Registration Successful! Please Login.');
    goToHome();
});

// Login User
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    const users = getUsers();
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        showDashboard(user);
    } else {
        alert('Invalid Username or Password');
    }
});

// Show User Dashboard
function showDashboard(user) {
    document.getElementById('home').style.display = 'none';
    document.getElementById('login').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
    document.getElementById('dashboard-username').innerText = user.username;
    document.getElementById('dashboard-email').innerText = user.email;

    if (user.enrolledCourse) {
        document.getElementById('notification-message').innerText = `You are enrolled in ${user.enrolledCourse}.`;
        document.getElementById('notification').style.display = 'block';
    } else {
        document.getElementById('notification').style.display = 'none';
    }
}

// Logout User
function logout() {
    alert("you are logged out"); 
}

document.getElementById('logoutButton').addEventListener('click', () => {
    // Clear user data from local storage or session storage
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    localStorage.removeItem('enrolledCourse');

    // Redirect to the home page
    window.location.href = '/';
});


// Show Course Enrollment
function showCourseEnrollment() {
    document.getElementById('dashboard').style.display = 'none';
    document.getElementById('course-enrollment').style.display = 'block';
}

// Back to Dashboard
function goToDashboard() {
    document.getElementById('course-enrollment').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
}

// Enroll in Course
function enrollCourse() {
    const course = document.getElementById('course-select').value;
    const username = document.getElementById('dashboard-username').innerText;

    // Update user enrollment
    const users = getUsers();
    const userIndex = users.findIndex(u => u.username === username);

    if (userIndex >= 0) {
        users[userIndex].enrolledCourse = course;
        saveUser(users[userIndex]);

        // Show Notification
        const notificationMessage = `You have successfully enrolled in ${course}.`;
        document.getElementById('notification-message').innerText = notificationMessage;
        document.getElementById('notification').style.display = 'block';

        alert('Enrollment Successful!');
        goToDashboard();
    }
}
