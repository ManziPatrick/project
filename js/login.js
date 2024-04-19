function signIn() {
    var emailInput = document.getElementById('email');
    var email = emailInput.value.trim();

    if (email === '') {
      
    } else {
        var formData = {
            email: email,
            password: document.getElementById('password').value.trim()
        };

        fetch('https://cyberopsrw.cyclic.app/api/v1/user/loginAdmin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Login failed.');
            }
            return response.json(); 
        })
        .then(data => {
            
            localStorage.setItem('token', data.token);
            localStorage.setItem('userID', data._id);

            alert('Login successful.');
            window.location.href = 'dashboard/dashboard.html';
            form.reset(); 

        })
        .catch(error => {
            console.error('Error:', error);
          
        });
    }
}

var form = document.querySelector('#form');

form.addEventListener('submit', function (event) {
    event.preventDefault();

    signIn();
});


// function getUserInfoFromToken() {

//     var token = localStorage.getItem('token');

//     var userInfo = {
//         name: "John Doe" 
//     };

//     return userInfo;
// }
// var userInfo = getUserInfoFromToken();
// document.getElementById('Username').innerText = userInfo.name;
