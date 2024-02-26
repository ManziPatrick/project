// script.js
document.addEventListener('DOMContentLoaded', function () {
    var form = document.querySelector('.wpcf7-form.init');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        var formData = new FormData(form);
        var formObject = {};

        formData.forEach(function (value, key) {
            formObject[key] = value;
        });

        // Store form data in local storage
        localStorage.setItem('formData', JSON.stringify(formObject));

        alert("You can also submit the form to the server if needed")
        // form.submit();
    });
});
