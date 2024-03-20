document.addEventListener('DOMContentLoaded', function() {
    var form = document.querySelector('.wpcf7-form');

    form.addEventListener('submit', function(event) {
        // Prevent the default form submission
        event.preventDefault();

        // Get form data
        var formData = {};
        var formElements = form.elements;

        for (var i = 0; i < formElements.length; i++) {
            var field = formElements[i];
            if (field.name) {
                formData[field.name] = field.value;
            }
        }

        // Save form data to localStorage
        localStorage.setItem('formData', JSON.stringify(formData));

       
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
});





var commentData = {
    author: 'Johnathan Doeting',
    content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. It has survived not only five centuries.',
    phoneNumber: '123-456-7890',
    date: 'April 14, 2021'
};


function setCommentData(data) {
    document.getElementById('commentAuthor').textContent = data.author;
    document.getElementById('commentContent').textContent = data.content;
    document.getElementById('phoneNumber').textContent = data.phoneNumber;
    document.getElementById('commentDate').textContent = data.date;
}

function togglePhoneNumber() {
    var phoneNumberElement = document.getElementById('phoneNumber');
    var callButton = document.getElementById('callButton');

    if (phoneNumberElement.classList.contains('hidden')) {
        phoneNumberElement.classList.remove('hidden');
        callButton.textContent = 'Hide Call';
    } else {
        phoneNumberElement.classList.add('hidden');
        callButton.textContent = 'Call';
    }
}


setCommentData(commentData);

function showName(button) {
    var name = button.closest('li').getAttribute('data-name');
    alert('Call ' + name);
}

function hideEmail(button) {
    var email = button.closest('li').getAttribute('data-email');
    var confirmation = confirm('Redirect to send email to ' + email + '?');
    if (confirmation) {
        window.location.href = 'mailto:' + email;
    }
}