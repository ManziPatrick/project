// formScript.js
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

        // Store form data in localStorage
        localStorage.setItem('formData', JSON.stringify(formData));

        // You can optionally display a success message or redirect the user
        alert('Form data has been stored in localStorage. You can now handle it as needed.');

        // Clear the form if needed
        form.reset();
    });
});
