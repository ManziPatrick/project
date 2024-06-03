function signIn() {
    var emailInput = document.getElementById('email');
    var email = emailInput.value.trim();

    if (email === '') {
      
    } else {
        var formData = {
            email: email,
            password: document.getElementById('password').value.trim()
        };

        fetch('https://cyberops-bn.onrender.com/api/v1/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (!response.ok) {
                Toastify({
                    text: 'Login failed. check your email or password',
                    duration: 3000, 
                    close: true,
                    backgroundColor: 'red',
                    style: {
                        'maxWidth': '400px',
                        'font-size': '14px',
                        'padding': '8px',
                        'text-align': 'center',
                        
                    },
                    
                }).showToast();
                // alert("Login failed.")
                throw new Error('Login failed.');
            }
            return response.json(); 
        })
        .then(data => {
           
            localStorage.setItem('token', data.token);
            localStorage.setItem('userID', data._id);
            localStorage.setItem('role', data.role);
            localStorage.setItem('profilePic', data.profilePic);
            Toastify({
                text: 'Login sucessfull' ,
                duration: 3000, 
                close: true,
                backgroundColor: 'green',
                style: {
                    'maxWidth': '400px',
                    'font-size': '14px',
                    'padding': '8px',
                    'text-align': 'center',
                    
                },
                
            }).showToast();
            // alert('Login successful.');

          setTimeout(function() {
        window.location.href = 'dashboard/dashboard.html';
        form.reset(); 
    }, 1000);

        })
        .catch(error => {
            
                Toastify({
                    text: 'Login failed. check your email or password',
                    duration: 3000, 
                    close: true,
                    backgroundColor: 'red',
                    style: {
                        'maxWidth': '400px',
                        'font-size': '14px',
                        'padding': '8px',
                        'text-align': 'center',
                        
                    },
                    
                }).showToast();
            
          
        });
    }
}

var form = document.querySelector('#form');

form.addEventListener('submit', function (event) {
    event.preventDefault();

    signIn();
});


