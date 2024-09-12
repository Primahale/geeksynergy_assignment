document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/api/users');
        const users = await response.json();

        const usersList = document.getElementById('usersList');
        usersList.innerHTML = users.map(user => `
            <tr>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.phone}</td>
                <td>${user.profession}</td>
                <td>
                    <button onclick="editUser('${user._id}')" class="btn btn-warning btn-sm">Edit</button>
                    <button onclick="deleteUser('${user._id}')" class="btn btn-danger btn-sm">Delete</button>
                </td>
            </tr>
        `).join('');
    } catch (error) {
        console.error('Error fetching users:', error);
    }
});

async function editUser(id) {
    const name = prompt('Enter new name:');
    const phone = prompt('Enter new phone:');

    if (!name || !phone) {
        alert('Name and phone are required.');
        return;
    }

    try {
        const response = await fetch(`/api/users/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, phone })
        });

        const data = await response.json();
        if (response.ok) {
            alert('User updated successfully');
            window.location.reload(); // Refresh the page to show updated user data
        } else {
            alert('Update failed: ' + data.msg);
        }
    } catch (error) {
        console.error('Error updating user:', error);
    }
}

async function deleteUser(id) {
    if (!confirm('Are you sure you want to delete this user?')) {
        return;
    }

    try {
        const response = await fetch(`/api/users/${id}`, {
            method: 'DELETE'
        });

        const data = await response.json();
        if (response.ok) {
            alert('User deleted successfully');
            window.location.reload(); // Refresh the page to remove deleted user
        } else {
            alert('Delete failed: ' + data.msg);
        }
    } catch (error) {
        console.error('Error deleting user:', error);
    }
}
