const postContainer = document.getElementById('post-container');
const paginationContainer = document.getElementById('paginationContainer');

let currentPage = 1;
const postsPerPage = 3; 
let postsArray = [];
let intervalId;

fetch('https://cyberops-bn.onrender.com/api/v1/post/getAllPosts')
    .then(response => response.json())
    .then(data => {
        postsArray = Array.isArray(data) ? data : [data];
        displayPosts(currentPage);
        addPaginationDots(postsArray.length);
        startSlideshow();
    })
    .catch(error => console.error('Error fetching data:', error));

function displayPosts(page) {
    const startIndex = (page - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const paginatedPosts = postsArray.slice(startIndex, endIndex);

    postContainer.innerHTML = '';

    paginatedPosts.forEach(post => {
        const card = document.createElement('div');
        card.classList.add('card');
        const createdAtString = post.createdAt;
        const createdAtDate = new Date(createdAtString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedCreatedAt = createdAtDate.toLocaleDateString('en-US', options);
        const imageUrl = post.images[0] ? post.images[0] : "/images/11-penetration-testing-tools-the-pros-use.webp";
        card.innerHTML = `
            <div class="blogimage">
                <img src="${imageUrl}" alt="${post.title}">
                <div class="category-tag">
                    <li><a href="singleblogpage.html?id=${post._id}" rel="category tag">CyberSecurity</a></li>
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

function addPaginationDots(totalPosts) {
    const totalPages = Math.ceil(totalPosts / postsPerPage);
    paginationContainer.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (i === currentPage) {
            dot.classList.add('active');
        }
        dot.addEventListener('click', () => {
            currentPage = i;
            displayPosts(currentPage);
            updateActiveDot();
            resetInterval();
        });
        paginationContainer.appendChild(dot);
    }
}

function updateActiveDot() {
    const dots = paginationContainer.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        if (index + 1 === currentPage) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

function startSlideshow() {
    intervalId = setInterval(() => {
        currentPage++;
        if (currentPage > Math.ceil(postsArray.length / postsPerPage)) {
            currentPage = 1;
        }
        displayPosts(currentPage);
        updateActiveDot();
    }, 3000);
}

function resetInterval() {
    clearInterval(intervalId);
    startSlideshow();
}
