fetch('https://cyberops-bn.onrender.com/api/v1/comment/getAllComment')
    .then(response => response.json())
    .then(data => {
        const commentsContainer = document.getElementById('comments-container');
        const paginationContainer = document.getElementById('pagination-container');
        const commentsPerPage = 4;
        let currentPage = 1;

        function displayComments(page) {
            commentsContainer.innerHTML = '';

            const startIndex = (page - 1) * commentsPerPage;
            const endIndex = startIndex + commentsPerPage;

            const commentsToShow = data.slice(startIndex, endIndex);

            commentsToShow.forEach(comment => {
                const commentRow = document.createElement('div');
                commentRow.classList.add('d-flex', 'flex-row', 'comment-row', 'p-3');
                const imgDiv = document.createElement('div');
                imgDiv.classList.add('p-0');
                const img = document.createElement('img');
                img.src = `https://i.pravatar.cc/150?u=${comment._id}`;
                img.alt = 'user';
                img.width = 50;
                img.classList.add('rounded-circle');
                imgDiv.appendChild(img);
                const commentTextDiv = document.createElement('div');
                commentTextDiv.classList.add('comment-text', 'ps-2', 'ps-md-3', 'w-100');
                const authorHeader = document.createElement('h5');
                authorHeader.classList.add('font-medium');
                authorHeader.textContent = comment.name;
                const commentContent = document.createElement('span');
                commentContent.classList.add('mb-1', 'd-block');
                commentContent.textContent = comment.text.substring(0, 20) + ' ...' || 'N/A';
                const commentFooter = document.createElement('div');
                commentFooter.classList.add('comment-footer', 'd-md-flex', 'align-items-center');
                const dateDiv = document.createElement('div');
                dateDiv.classList.add('text-muted', 'fs-2', 'ms-auto', 'mt-1', 'mt-md-0');
                dateDiv.textContent = new Date(comment.createdAt).toLocaleDateString();

                commentTextDiv.appendChild(authorHeader);
                commentTextDiv.appendChild(commentContent);
                commentFooter.appendChild(dateDiv);
                commentRow.appendChild(imgDiv);
                commentRow.appendChild(commentTextDiv);
                commentRow.appendChild(commentFooter);

                commentRow.addEventListener('click', () => {
                    showModal(comment);
                });

                commentsContainer.appendChild(commentRow);
            });

            updatePagination();
        }

        function updatePagination() {
            paginationContainer.innerHTML = '';

            const prevButton = document.createElement('button');
            prevButton.innerHTML = '&lt;';
            prevButton.disabled = currentPage === 1;
            prevButton.addEventListener('click', () => {
                currentPage--;
                displayComments(currentPage);
            });

            const nextButton = document.createElement('button');
            nextButton.innerHTML = '&gt;'; 
            nextButton.disabled = (currentPage * commentsPerPage) >= data.length;
            nextButton.addEventListener('click', () => {
                currentPage++;
                displayComments(currentPage);
            });

            const totalPages = Math.ceil(data.length / commentsPerPage);

            if (currentPage !== 1) {
                paginationContainer.appendChild(prevButton);
            }

            for (let i = 1; i <= totalPages; i++) {
                const pageButton = document.createElement('button');
                pageButton.textContent = i;
                pageButton.addEventListener('click', () => {
                    currentPage = i;
                    displayComments(currentPage);
                });
                paginationContainer.appendChild(pageButton);
            }

            if (currentPage !== totalPages) {
                paginationContainer.appendChild(nextButton);
            }
        }

        function showModal(comment) {
            const fullMessage = document.getElementById('full-message');
            const name = document.getElementById('name');
            const avatarContainer = document.getElementById('avatar-container');

            name.textContent = comment.name;
            fullMessage.textContent = comment.text;

            avatarContainer.innerHTML = '';

            const avatarImg = document.createElement('img');
            avatarImg.src = `https://i.pravatar.cc/150?u=${comment._id}`;
            avatarImg.alt = 'User Avatar';
            avatarImg.width = 50;
            avatarImg.classList.add('rounded-circle');
            avatarContainer.appendChild(avatarImg);

            const modal = document.getElementById('modal');
            modal.style.display = 'block';
        }

        const closeButton = document.querySelector('.close');
        closeButton.addEventListener('click', () => {
            const modal = document.getElementById('modal');
            modal.style.display = 'none';
        });

        displayComments(currentPage);
    })
    .catch(error => {
        console.error('Error:', error);
    });
