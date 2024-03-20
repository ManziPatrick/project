
document.addEventListener('DOMContentLoaded', function () {
    var form = document.querySelector('.wpcf7-form.init');

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
});


document.addEventListener('DOMContentLoaded', function() {
    // Example data (replace this with your actual data)
    var contactData = [
        { id: 1, name: 'Elite admin', email: 'munyeshurimanzi@gmail.com', phone: '0790706170', message: 'Example message' },
       
    ];

    function populateTable(data) {
        var tableBody = document.querySelector('.table tbody');
        
        if (!tableBody) {
            console.error('Table body element not found.');
            return;
        }

        for (var i = 0; i < data.length; i++) {
            var row = tableBody.insertRow(i);
            row.insertCell(0).textContent = data[i].id;
            row.insertCell(1).textContent = data[i].name;
            row.insertCell(2).textContent = data[i].email;
            row.insertCell(3).textContent = data[i].phone;
            row.insertCell(4).textContent = data[i].message;
        }
    }

    populateTable(contactData);
});

