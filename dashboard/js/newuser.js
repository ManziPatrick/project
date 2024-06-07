function registerAdmin() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const role = document.getElementById('role').value;
    
    const profilePic = document.getElementById('profilePic').value;

    const agreeCheckbox = document.getElementById('agreeCheckbox').checked;

    if (!name || !email || !profilePic) {
      
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

   
    if (!agreeCheckbox) {
      alert('Please agree to the terms of service');
      return;
    }

    const data = {
      name: name,
      email: email,
      role:role,
      profilePic: profilePic,
     
    };

    fetch('https://cyberops-bn.onrender.com/api/v1/admin/registerUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then(async response => {
        if (!response.ok) {
          const errorData = await response.json();
          throw { message: errorData.message };
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