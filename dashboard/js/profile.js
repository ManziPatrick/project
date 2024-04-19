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


function updateProfile(userData) {

    document.getElementById('fullName').value = userData.name;
    document.getElementById('excyberopsnetworks-email').value = userData.email;
    document.querySelector('#fullNameDisplay').textContent = userData.name;
    document.querySelector('#email-display').textContent = userData.email;
   
    document.getElementById('profileImage').src = userData.profilePic || 'plugins/images/large/img1.jpg';

    var updatedData = {
        name: document.getElementById('fullName').value,
        email: document.getElementById('excyberopsnetworks-email').value,
      
    };

    var userId = localStorage.getItem('userID');
    fetch(`https://cyberopsrw.cyclic.app/api/v1/user/api/v1/user/updateAdminById/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to update user data.');
        }
        return response.json();
    })
    .then(updatedUserData => {
       
        alret('Profile updated successfully.', 'alert-success');
    })
    .catch(error => {
        console.error('Error:', error);
        showToast('Failed to update profile. Please try again.', 'alert-danger');
    });
}

function handleImageUpload(imageFile) {
    var reader = new FileReader();
    reader.onload = function(e) {
        var profileImage = document.getElementById('profileImage');
        profileImage.src = e.target.result;
    };
    reader.readAsDataURL(imageFile);
}