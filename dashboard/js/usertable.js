document.addEventListener('DOMContentLoaded', function () {
    async function displayUsers() {
        try {
            const response = await fetch('https://cyberops-bn.onrender.com/api/v1/admin/getUsers');
            if (!response.ok) {
                throw new Error("Failed to fetch user data");
            }
            const users = await response.json();
            populateTable(users);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    function populateTable(users) {
        const tableBody = document.querySelector('#userTable tbody');
        tableBody.innerHTML = '';

        users.forEach(user => {
            const row = document.createElement('tr');
            row.setAttribute('data-id', user._id); // Add data attribute for user ID
            row.setAttribute('data-original-role', user.role);
            row.innerHTML = `
                <td>${user._id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>
                    <select class="form-control role-select">
                        <option value="ADMIN" ${user.role === 'ADMIN' ? 'selected' : ''}>Admin</option>
                        <option value="USER" ${user.role === 'USER' ? 'selected' : ''}>Author</option>
                        <option value="GUEST" ${user.role === 'GUEST' ? 'selected' : ''}>Guest</option>
                    </select>
                </td>
                <td>
                    <button class="btn btn-danger delete-user">Delete</button>
                </td>
            `;
            tableBody.appendChild(row);
        });

        addEventListeners();
    }

    function addEventListeners() {
        const roleSelects = document.querySelectorAll('.role-select');
        roleSelects.forEach(select => {
            select.addEventListener('change', function () {
                const row = select.closest('tr');
                const userId = row.getAttribute('data-id');
                const selectedRole = select.value;

                updateUser(userId, { role: selectedRole }).then(success => {
                    if (success) {
                        row.setAttribute('data-original-role', selectedRole);
                        showToast('User role updated successfully!', 'success');
                    }
                });
            });
        });
    }

    async function updateUser(userId, updatedUser) {
        try {
            const response = await fetch(`https://cyberops-bn.onrender.com/api/v1/user/update/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedUser),
            });

            if (!response.ok) {
                throw new Error("Failed to update user data");
            }

            const data = await response.json();
            if (data.success) {
                return true;
            } else {
                showToast('Failed to update user role: ' + data.message, 'error');
                return false;
            }
        } catch (error) {
            console.error('Error:', error);
            showToast('An error occurred. Please try again.', 'error');
            return false;
        }
    }

    function showToast(message, type) {
        const toastContainer = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerText = message;
        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.remove();
        }, 3000);
    }

    displayUsers();
});
