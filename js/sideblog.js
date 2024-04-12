async function displayLatestBlogPosts(searchQuery = '') {
    try {
        const response = await fetch('https://cyberopsrw.cyclic.app/api/v1/post/getAllPosts');
        if (!response.ok) {
            throw new Error('Failed to fetch blog posts');
        }
        const posts = await response.json();
        
        const filteredPosts = searchQuery ? posts.filter(post => post.title.toLowerCase().includes(searchQuery.toLowerCase())) : posts;

        const widgetArea = document.getElementById('secondary');
        const recentPostWidget = widgetArea.querySelector('.widget_recent_data');

        if (recentPostWidget) {
            const recentPostContainer = recentPostWidget.querySelector('.single-widget-item');
            recentPostContainer.innerHTML = ''; 

            if (filteredPosts.length === 0) {
                const noPostsMessage = document.createElement('div');
                noPostsMessage.textContent = 'No matching posts found.';
                recentPostContainer.appendChild(noPostsMessage);
            } else {
                filteredPosts.slice(0, 5).forEach(post => {
                    const postItem = createPostItem(post);
                    recentPostContainer.appendChild(postItem);
                });

                if (filteredPosts.length > 5) {
                    const seeMoreButton = document.createElement('button');
                    seeMoreButton.textContent = 'See More';
                    seeMoreButton.classList.add('see-more-button');
                    seeMoreButton.addEventListener('click', () => {
                        recentPostContainer.innerHTML = ''; // Clear previous posts
                        filteredPosts.forEach(post => {
                            const postItem = createPostItem(post);
                            recentPostContainer.appendChild(postItem);
                        });
                        seeMoreButton.style.display = 'none'; // Hide the "See More" button
                    });
                    recentPostContainer.appendChild(seeMoreButton);
                }
            }
        } else {
            console.log('Recent post widget not found.');
        }
    } catch (error) {
        console.error('Error fetching blog posts:', error);
    }
}

function createPostItem(post) {
    const postItem = document.createElement('div');
    postItem.classList.add('recent-post-item');

    const postImage = document.createElement('div');
    postImage.classList.add('recent-post-image');
    const imageUrl = post.image ? post.image : '../images/11-penetration-testing-tools-the-pros-use-1024x683.webp';
    postImage.innerHTML = `<a href="singleblogpage.html?id=${post._id}"><img width="80" height="80" src="${imageUrl}" class="attachment-cyber-recent-image size-cyber-recent-image wp-post-image" alt="" decoding="async"></a>`;
    
    const postText = document.createElement('div');
    postText.classList.add('recent-post-text');
    const createdAtString = post.createdAt;
    const createdAtDate = new Date(createdAtString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedCreatedAt = createdAtDate.toLocaleDateString('en-US', options);
    postText.innerHTML = `
        <h4><a href="singleblogpage.html?id=${post._id}">${post.title}</a></h4>
        <span class="rcomment">${formattedCreatedAt}</span>
    `;

    postItem.appendChild(postImage);
    postItem.appendChild(postText);

    return postItem;
}

function handleSearch(event) {
    event.preventDefault();
    const searchInput = document.getElementById('searchInput');
    const searchQuery = searchInput.value.trim();
    displayLatestBlogPosts(searchQuery);
}

displayLatestBlogPosts();
