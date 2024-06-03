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
        tableBody.innerHTML = ''; // Clear existing rows

        users.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user._id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.role}</td>
                <td>
                    <button class="btn btn-primary edit-user">Edit</button>
                    <button class="btn btn-danger delete-user">Delete</button>
                </td>
            `;
            tableBody.appendChild(row);
        });

        addEventListeners();
    }

    function addEventListeners() {
        const editButtons = document.querySelectorAll('.edit-user');
        editButtons.forEach(button => {
            button.addEventListener('click', function () {
                const row = button.closest('tr');
                const cells = row.querySelectorAll('td');

                if (button.classList.contains('edit-user')) {
                    for (let i = 1; i < cells.length - 1; i++) {
                        const cell = cells[i];
                        if (i === 3) {
                            // Create a dropdown for the role field
                            const currentRole = cell.textContent.trim();
                            cell.innerHTML = `
                                <select class="form-control">
                                    <option value="admin" ${currentRole === 'admin' ? 'selected' : ''}>Admin</option>
                                    <option value="author" ${currentRole === 'Author' ? 'selected' : ''}>Author</option>
                                   
                                </select>
                            `;
                        } else {
                            const text = cell.textContent.trim();
                            cell.innerHTML = `<input type="text" class="form-control" value="${text}">`;
                        }
                    }
                    button.textContent = 'Save';
                    button.classList.remove('btn-primary');
                    button.classList.add('btn-success');
                    button.classList.add('save-user');
                } else if (button.classList.contains('save-user')) {
                    for (let i = 1; i < cells.length - 1; i++) {
                        const cell = cells[i];
                        if (i === 3) {
                            const select = cell.querySelector('select');
                            const selectedRole = select.value.trim();
                            cell.textContent = selectedRole;
                        } else {
                            const input = cell.querySelector('input');
                            const text = input.value.trim();
                            cell.textContent = text;
                        }
                    }
                    button.textContent = 'Edit';
                    button.classList.remove('btn-success');
                    button.classList.add('btn-primary');
                    button.classList.remove('save-user');
                }

                const deleteButton = row.querySelector('.delete-user');
                deleteButton.disabled = !deleteButton.disabled;
            });
        });
    }

    displayUsers();
});
