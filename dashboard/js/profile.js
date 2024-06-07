document.addEventListener('DOMContentLoaded', function() {
    var profileImageInput = document.getElementById('profileImageInput');
    var profileImages = document.querySelectorAll('.profile-image');

    profileImageInput.addEventListener('change', function(event) {
        var file = event.target.files[0];
        if (file) {
            var reader = new FileReader();
            reader.onload = function(e) {
                profileImages.forEach(function(img) {
                    img.src = e.target.result;
                });
            };
            reader.readAsDataURL(file);
        }
    });

    document.getElementById('updateButto').addEventListener('click', function(event) {
        event.preventDefault();
        updateProfile(); 
    });

    const userId = localStorage.getItem('userID');

    if (userId) {
        fetch(`https://cyberops-bn.onrender.com/api/v1/admin/getAdminById/${userId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }
                return response.json(); 
            })
            .then(userData => {
                const firstName = userData.name.split(' ')[0];
                document.querySelector('#Username').innerHTML = firstName;
                document.querySelector('#Profile-name').innerHTML = firstName;
                document.querySelector('input[name="excyberopsnetworks-email"]').value = userData.email;
                document.getElementById('profile').src = userData.profilePic || 'plugins/images/large/img1.jpg';
                document.getElementById('profileImage').src = userData.profilePic || 'plugins/images/large/img1.jpg';
                localStorage.setItem('profilePic', userData.profilePic);
                document.querySelector('#email-display').innerHTML = userData.email;
                document.querySelector('#fullName').value = userData.name;
            })
            .catch(error => {
                console.error('Error:', error);
            });
    } else {
        console.error('User ID not found in local storage');
    }
});

async function updateProfile() {
    try {
        const email = document.getElementById('excyberopsnetworks-email').value;
        const name = document.getElementById('fullName').value; 
        const image = document.getElementById('profileImageInput'); 
        const password = document.getElementById('password'); 
        const imageFile = image.files[0];
        if (!email || !name || !imageFile) {
            console.error('Please fill in all required fields.');
            return;
        }

        const formData = new FormData();
        formData.append('email', email);
        formData.append('name', name);
        formData.append('images', imageFile);
        formData.append('password', password.value); 
        const userId = localStorage.getItem('userID');
        const response = await fetch(`https://cyberops-bn.onrender.com/api/v1/admin/updateAdminById/${userId}`, {
            method: 'PUT',
            body: formData
        });

        if (!response.ok) {
            throw new Error('Failed to update user profile.');
        }

        const updatedResponse = await fetch(`https://cyberops-bn.onrender.com/api/v1/admin/getAdminById/${userId}`);
        if (!updatedResponse.ok) {
            throw new Error('Failed to fetch updated user data.');
        }

        const userData = await updatedResponse.json();
        const firstName = userData.name.split(' ')[0];

        document.querySelector('#Username').innerHTML = firstName;
        document.querySelector('#Profile-name').innerHTML = firstName;
        document.querySelector('input[name="excyberopsnetworks-email"]').value = userData.email;
        document.getElementById('profile').src = userData.profilePic || 'plugins/images/large/img1.jpg';
        document.getElementById('profileImage').src = userData.profilePic || 'plugins/images/large/img1.jpg';
        localStorage.setItem('profilePic', userData.profilePic || '');

        document.querySelector('#email-display').innerHTML = userData.email;
        password.value = ''; // Clear password field
        document.querySelector('#fullName').value = userData.name;

        alert('Profile updated successfully');

    } catch (error) {
        console.error('Error updating profile:', error);
    }
}

document.getElementById('showPassword').addEventListener('click', function() {
    const passwordField = document.getElementById('password');
    passwordField.type = 'text';
});

document.getElementById('hidePassword').addEventListener('click', function() {
    const passwordField = document.getElementById('password');
    passwordField.type = 'password';
});
