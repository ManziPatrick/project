fetch('https://cyberopsrw.cyclic.app/api/v1/post/getAllPosts')
    .then(response => response.json())
    .then(data => {
        console.log('Fetched data:', data); 

        const postContainer = document.getElementById('post-container');
        let postsArray = [];

        if (!Array.isArray(data)) {
            postsArray.push(data);
        } else {
            postsArray = data;
        }

        postsArray.forEach(post => {
            const card = document.createElement('div');
            card.classList.add('col-md-6', 'card');
            const createdAtString = post.createdAt;
            const createdAtDate = new Date(createdAtString);
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            const formattedCreatedAt = createdAtDate.toLocaleDateString('en-US', options);
            card.innerHTML = `
                <div>
                    <img src="${post.image}" alt="${post.title}">
                    <div class="card-body">
                        <h2 class="card-title">${post.title}</h2>
                        <p class="card-meta">Posted by ${post.author} on ${formattedCreatedAt}</p>
                        <p>${post.body}</p>
                    </div>
                </div>
            `;
            card.addEventListener('click', () => {
                window.location.href = `singleblogpage.html?id=${post._id}`;
            });
            postContainer.appendChild(card);
        });
    })
    .catch(error => console.error('Error fetching data:', error));
