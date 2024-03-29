function signIn() {
    var emailInput = document.getElementById('email');
    var email = emailInput.value.trim();

    if (email === '') {
        showToast('Please enter a valid email address.', 'alert-danger');
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
            showToast('Login successful.', 'alert-success');
            form.reset(); 
            window.location.href = 'dashboard/dashboard.html';
        })
        .catch(error => {
            console.error('Error:', error);
            showToast('Login failed. Please try again.', 'alert-danger');
        });
    }
}

function showToast(message, className) {
    var toastElement = document.createElement('div');
    toastElement.classList.add('toast', className);
    toastElement.setAttribute('role', 'alert');
    toastElement.setAttribute('aria-live', 'assertive');
    toastElement.setAttribute('aria-atomic', 'true');

    var toastBody = document.createElement('div');
    toastBody.classList.add('toast-body');
    toastBody.textContent = message;

    toastElement.appendChild(toastBody);
    document.body.appendChild(toastElement);

    var bootstrapToast = new bootstrap.Toast(toastElement);
    bootstrapToast.show();

    // Remove the toast after 3 seconds
    setTimeout(function() {
        bootstrapToast.hide();
        setTimeout(function() {
            toastElement.remove();
        }, 200); // Delay for the fade transition
    }, 3000);
}

var form = document.querySelector('#form');

form.addEventListener('submit', function (event) {
    event.preventDefault();

    signIn();
});
