document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    if (!email || !password) {
        alert('Please fill in both email and password.');
        return;
    }

    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            window.location.href = '/home.html'; // Redirect to home page
        } else {
            alert('Login failed: ' + data.msg);
        }
    } catch (error) {
        console.error('Error logging in:', error);
        alert('An error occurred. Please try again later.');
    }
});
