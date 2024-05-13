
document.addEventListener('DOMContentLoaded', function () {
    var editButtons = document.querySelectorAll('.edit-user');
    editButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            var row = button.closest('tr');
            var cells = row.querySelectorAll('td');

            // Loop through each cell except the last one (which contains the buttons)
            for (var i = 1; i < cells.length - 1; i++) {
                var cell = cells[i];
                var text = cell.textContent.trim();

                // Replace the text with an input field containing the current text
                cell.innerHTML = '<input type="text" class="form-control" value="' + text + '">';
            }

            // Change edit button to save button
            button.textContent = 'Save';
            button.classList.remove('btn-primary');
            button.classList.add('btn-success');
            button.classList.add('save-user');

    
            var deleteButton = row.querySelector('.delete-user');
            deleteButton.disabled = true;
        });
    });

    var saveButtons = document.querySelectorAll('.save-user');
    saveButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            var row = button.closest('tr');
            var cells = row.querySelectorAll('td');

          
            for (var i = 1; i < cells.length - 1; i++) {
                var cell = cells[i];
                var input = cell.querySelector('input');
                var text = input.value.trim();


                cell.textContent = text;
            }

        
            button.textContent = 'Edit';
            button.classList.remove('btn-success');
            button.classList.add('btn-primary');
            button.classList.remove('save-user');

          
            var deleteButton = row.querySelector('.delete-user');
            deleteButton.disabled = false;
        });
    });
});

