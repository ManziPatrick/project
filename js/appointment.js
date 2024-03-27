
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


var recentAppointments = [
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '1234567890', message: 'Appointment message 1' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '0987654321', message: 'Appointment message 2' },
    { id: 3, name: 'John Doe', email: 'john@example.com', phone: '1234567890', message: 'Appointment message 1' },
    { id: 4, name: 'Jane Smith', email: 'jane@example.com', phone: '0987654321', message: 'Appointment message 2' },
    { id: 5, name: 'John Doe', email: 'john@example.com', phone: '1234567890', message: 'Appointment message 1' },
    { id: 6, name: 'Jane Smith', email: 'jane@example.com', phone: '0987654321', message: 'Appointment message 2' },
    { id: 7, name: 'John Doe', email: 'john@example.com', phone: '1234567890', message: 'Appointment message 1' },
    { id: 8, name: 'Jane Smith', email: 'jane@example.com', phone: '0987654321', message: 'Appointment message 2' },
    { id: 9, name: 'John Doe', email: 'john@example.com', phone: '1234567890', message: 'Appointment message 1' },
    { id: 10, name: 'Jane Smith', email: 'jane@example.com', phone: '0987654321', message: 'Appointment message 2' },
    { id: 11, name: 'John Doe', email: 'john@example.com', phone: '1234567890', message: 'Appointment message 1' },
    { id: 12, name: 'Jane Smith', email: 'jane@example.com', phone: '0987654321', message: 'Appointment message 2' },
];


var contactMessages = [
    { name: 'Alice', email: 'alice@example.com', phone: '111222333', message: 'Hello, I have a question.' },
    { name: 'Bob', email: 'bob@example.com', phone: '444555666', message: 'Hi, I need assistance.' },
    { name: 'Alice', email: 'alice@example.com', phone: '111222333', message: 'Hello, I have a question.' },
    { name: 'Bob', email: 'bob@example.com', phone: '444555666', message: 'Hi, I need assistance.' },
    { name: 'Alice', email: 'alice@example.com', phone: '111222333', message: 'Hello, I have a question.' },
    { name: 'Bob', email: 'bob@example.com', phone: '444555666', message: 'Hi, I need assistance.' },
    { name: 'Alice', email: 'alice@example.com', phone: '111222333', message: 'Hello, I have a question.' },
    { name: 'Bob', email: 'bob@example.com', phone: '444555666', message: 'Hi, I need assistance.' },
];

var currentPage = 1;
var itemsPerPage = 3;


function displayAppointments(page) {
    currentPage = page || 1;
    var startIndex = (currentPage - 1) * itemsPerPage;
    var endIndex = startIndex + itemsPerPage;
    var appointmentsSubset = recentAppointments.slice(startIndex, endIndex);
    populateTable(appointmentsSubset);
}

function displayContactMessages(page) {
    currentPage = page || 1;
    var startIndex = (currentPage - 1) * itemsPerPage;
    var endIndex = startIndex + itemsPerPage;
    var messagesSubset = contactMessages.slice(startIndex, endIndex);
    populateTable(messagesSubset);
}

function populateTable(data) {
    var tableBody = document.getElementById('tableBody');
    if (!tableBody) {
        console.error('Table body element not found.');
        return;
    }
    tableBody.innerHTML = '';

    for (var i = 0; i < data.length; i++) {
        var item = data[i];
        var row = tableBody.insertRow();
        row.insertCell(0).textContent = item.id || '';
        row.insertCell(1).textContent = item.name || '';
        row.insertCell(2).textContent = item.email || '';
        row.insertCell(3).textContent = item.phone || '';
        row.insertCell(4).textContent = item.message || '';
    }
}

function previousPage() {
    if (currentPage > 1) {
        currentPage--;
        displayAppointments(currentPage);
    }
}

function nextPage() {
    var totalPages = Math.ceil(recentAppointments.length / itemsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        displayAppointments(currentPage);
    }
}

displayAppointments();