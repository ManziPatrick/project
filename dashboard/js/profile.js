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
});



   



document.addEventListener('DOMContentLoaded', function() {
    // Add event listener for the "Update Profile" button
    document.getElementById('updateButto').addEventListener('click', function(event) {
        // Prevent the default form submission behavior
        event.preventDefault();
        // Call the updateProfile function
        updateProfile(); 
    });

    
    const userId = localStorage.getItem('userID');

    if (userId) {
       
        fetch(`https://cyberopsrw.cyclic.app/api/v1/user/getAdminById/${userId}`)
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
                document.getElementById('profile').src = userData.profilePic|| 'plugins/images/large/img1.jpg';
                document.getElementById('profileImage').src = userData.profilePic|| 'plugins/images/large/img1.jpg';
                console.log("hhhhhhhhhh",userData.email)
            
            document.querySelector('#email-display').innerHTML = userData.email;
                document.querySelector('input[type="password"]').value = ''; 
     
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
        const name = document.getElementById('fullName').value; // Use value directly for input fields
        const image = document.getElementById('profileImageInput'); // Assuming you have an input with ID 'profileImage'
        const imageFile = image.files[0];
        if (!email || !name ||  !imageFile) {
            console.error('Please fill in all required fields.');
            return;
        }

        const formData = new FormData();
        formData.append('email', email);
        formData.append('name', name);
       formData.append('images', imageFile);
       

        const userId = localStorage.getItem('userID');
        const response = await fetch(`https://cyberopsrw.cyclic.app/api/v1/user/updateAdminById/${userId}`, {
            method: 'PUT',
            body: formData
        });

        if (!response.ok) {
            throw new Error('Failed to update user profile.');
        }

        alert('Profile updated successfully');
        // ... other success logic (e.g., update UI)

    } catch (error) {
        console.error('Error updating profile:', error);
        // Handle errors appropriately (e.g., display error message to user)
    }
}
