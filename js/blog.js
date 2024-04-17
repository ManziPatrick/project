const postContainer = document.getElementById('post-container');
const paginationContainer = document.getElementById('paginationContainer');

let currentPage = 1;
const postsPerPage = 5;
let postsArray = [];

fetch('https://cyberopsrw.cyclic.app/api/v1/post/getAllPosts')
    .then(response => response.json())
    .then(data => {
        postsArray = Array.isArray(data) ? data : [data];
        displayPosts(currentPage);
        addPaginationButtons(postsArray.length);
    })
    .catch(error => console.error('Error fetching data:', error));

function displayPosts(page) {
    const startIndex = (page - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const paginatedPosts = postsArray.slice(startIndex, endIndex);

    postContainer.innerHTML = ''; // Clear previous posts

    paginatedPosts.forEach(post => {
        const card = document.createElement('div');
        card.classList.add('col-md-6', 'card');
        const createdAtString = post.createdAt;
        const createdAtDate = new Date(createdAtString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedCreatedAt = createdAtDate.toLocaleDateString('en-US', options);
        const imageUrl = post.image ? post.image : "/images/11-penetration-testing-tools-the-pros-use.webp";
        card.innerHTML = `
            <div>
                <img src="${imageUrl}" alt="${post.title}">
                <div class="category-tag">
                    <li><a href="" rel="category tag">CyberSecurity</a></li>
                </div>
                <div class="card-body">
                    <h2 class="card-title">${post.title}</h2>
                    <p class="card-meta">Posted by ${post.author} on ${formattedCreatedAt}</p>
                </div>
            </div>
        `;
        card.addEventListener('click', () => {
            window.location.href = `singleblogpage.html?id=${post._id}`;
        });
        postContainer.appendChild(card);
    });
}

function addPaginationButtons(totalPosts) {
    const totalPages = Math.ceil(totalPosts / postsPerPage);
    paginationContainer.innerHTML = '';

    const maxButtons = 4;
    const gap = 1;

    let startButton = currentPage - gap;
    let endButton = currentPage + gap;

    if (startButton < 1) {
        startButton = 1;
        endButton = Math.min(totalPages, maxButtons);
    }

    if (endButton > totalPages) {
        endButton = totalPages;
        startButton = Math.max(1, endButton - maxButtons + 1);
    }

    if (currentPage > 1) {
        const prevButton = document.createElement('button');
        prevButton.textContent = '<';
        prevButton.addEventListener('click', () => {
            currentPage--;
            displayPosts(currentPage);
        });
        paginationContainer.appendChild(prevButton);
    }

    for (let i = startButton; i <= endButton; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        if (i === currentPage) {
            button.classList.add('active');
        }
        button.addEventListener('click', () => {
            currentPage = i;
            displayPosts(currentPage);
        });
        paginationContainer.appendChild(button);
    }

    if (currentPage < totalPages) {
        const nextButton = document.createElement('button');
        nextButton.textContent = '>';
        nextButton.addEventListener('click', () => {
            currentPage++;
            displayPosts(currentPage);
        });
        paginationContainer.appendChild(nextButton);
    }
}
