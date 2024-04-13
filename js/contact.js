document.addEventListener('DOMContentLoaded', function() {
    var form = document.querySelector('.form-inner');

    form.addEventListener('submit', async function(event) {
        event.preventDefault();

        try {

            var formData = {
                Name: document.getElementById('nameInput').value,
                Email: document.getElementById('emailInput').value,
                Phone: document.getElementById('phoneInput').value,
                Website: document.getElementById('websiteInput').value,
                Message: document.getElementById('messageInput').value
            };

     
            const response = await fetch('https://cyberopsrw.cyclic.app/api/v1/post/email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Failed to send form data to the backend.');
            }

            const res = await response.json();
            alert('Form data has been sent to the backend successfully.');
            form.reset();
            return res;
        } catch (error) {
            console.error('Error:', error);
            
        }
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

function redirectToPhoneCall(phoneNumber) {
    window.location.href = "tel:" + phoneNumber;
}

function redirectToEmail(email) {
    window.location.href = "mailto:" + email;
}

setCommentData(commentData);