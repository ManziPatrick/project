function signIn() {
    // Validate email (simple check for non-empty)
    var emailInput = document.getElementById('email');
    var email = emailInput.value.trim();

    if (email === '') {
        alert('Please enter a valid email address.');
    } else {
        // Redirect to the dashboard (replace this with your actual dashboard URL)
        window.location.href = 'dashboard/dashboard.html';
    }
}

var form = document.querySelector('#form');

form.addEventListener('submit', function (event) {
    event.preventDefault();

    var formData = {};
    var formElements = form.elements;

    for (var i = 0; i < formElements.length; i++) {
        var field = formElements[i];
        if (field.name) {
            formData[field.name] = field.value;
        }
    }
    localStorage.setItem('formData', JSON.stringify(formData));

    alert("You can also submit the form to the server if needed")
 

    fetch('https://cyberopsrw.cyclic.app/api/v1/post/email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to send form data to the backend.');
        }
    
        alert('Form data has been sent to the backend successfully.');
        
        form.reset();
    })
    .catch(error => {
        console.error('Error:', error);
     
    });
  
 
    
});