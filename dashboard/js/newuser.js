function registerAdmin() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const agreeCheckbox = document.getElementById('agreeCheckbox').checked;

    if (!name || !email || !password || !confirmPassword) {
      
      Toastify({
        text:'Please fill in all fields',
        duration: 3000, 
        close: true,
        backgroundColor: 'error',
        style: {
            'maxWidth': '400px',
            'font-size': '14px',
            'padding': '8px',
            'text-align': 'center',
    
        },
        
    }).showToast();
      return;
    }

    if (password !== confirmPassword) {
      Toastify({
        text:'Passwords do not match',
        duration: 3000, 
        close: true,
        backgroundColor: 'error',
        style: {
            'maxWidth': '400px',
            'font-size': '14px',
            'padding': '8px',
            'text-align': 'center',
    
        },
        
    }).showToast();
      // alert('Passwords do not match');
      return;
    }

    if (!agreeCheckbox) {
      alert('Please agree to the terms of service');
      return;
    }

    const data = {
      name: name,
      email: email,
      password: password
    };

    fetch('https://cyberopsrw.cyclic.app/api/v1/user/registerAdmin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then(response => {
        if (!response.ok) {
          return response.json().then(errorData => {
            throw { message: errorData.message || 'Network response was not ok', error: errorData };
          });
        }
        return response.json();
      })
      .then(data => {

        Toastify({
          text: 'Admin registered successfully',
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
 
        
      })
      .catch(error => {
        console.error('There was an error registering the admin:', error);
        Toastify({
          text: 'An error occurred: ' + error.message,
          duration: 3000, 
          close: true,
          backgroundColor: 'error',
          style: {
              'maxWidth': '400px',
              'font-size': '14px',
              'padding': '8px',
              'text-align': 'center',
      
          },
          
      }).showToast();
 
        // alert('An error occurred: ' + error.message);
      });
      
  }