document.getElementById('registerForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const profession = document.getElementById('profession').value.trim();
  const password = document.getElementById('password').value;

  if (!name || !email || !password) {
      alert('Name, email, and password are required.');
      return;
  }

  try {
      const response = await fetch('/api/register', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name, email, phone, profession, password })
      });

      const data = await response.json();

      if (response.ok) {
          alert('Registration successful');
          window.location.href = '/login.html'; // Redirect to login page
      } else {
          alert('Registration failed: ' + data.msg);
      }
  } catch (error) {
      console.error('Error registering user:', error);
      alert('An error occurred. Please try again later.');
  }
});
