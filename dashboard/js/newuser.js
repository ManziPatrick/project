function registerAdmin() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const agreeCheckbox = document.getElementById('agreeCheckbox').checked;

    if (!name || !email || !password || !confirmPassword) {
      alert('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match');
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
        alert('Admin registered successfully');
        
      })
      .catch(error => {
        console.error('There was an error registering the admin:', error);
        alert('An error occurred: ' + error.message);
      });
      
  }