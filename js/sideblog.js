function displayLatestBlogPosts() {
    fetch('https://cyberopsrw.cyclic.app/api/v1/post/getAllPosts')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch blog posts');
            }
            return response.json();
        })
        .then(posts => {
            const widgetArea = document.getElementById('secondary');
            const recentPostWidget = widgetArea.querySelector('.widget_recent_data');

            if (recentPostWidget) {
                const recentPostContainer = recentPostWidget.querySelector('.single-widget-item');
                recentPostContainer.innerHTML = ''; 

                // Get only the latest five posts
                posts.slice(0, 5).forEach(post => {
                    const postItem = document.createElement('div');
                    postItem.classList.add('recent-post-item');

                    const postImage = document.createElement('div');
                    postImage.classList.add('recent-post-image');
                    postImage.innerHTML = `<a href="singleblogpage.html?id=${post._id}"><img width="80" height="80" src="${post.image}" class="attachment-cyber-recent-image size-cyber-recent-image wp-post-image" alt="" decoding="async"></a>`;
                    
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
                    recentPostContainer.appendChild(postItem);
                });

               
                const nextPostLink = recentPostWidget.querySelector('.nav-next a');
                const prevPostLink = recentPostWidget.querySelector('.nav-previous a');
                
                if (nextPostLink && prevPostLink) {
                    nextPostLink.addEventListener('click', () => {
                        const nextPostUrl = nextPostLink.getAttribute('href');
                        window.location.href = nextPostUrl;
                    });
                    
                    prevPostLink.addEventListener('click', () => {
                        const prevPostUrl = prevPostLink.getAttribute('href');
                        window.location.href = prevPostUrl;
                    });
                }
            } else {
                console.log('Recent post widget not found.');
            }
        })
        .catch(error => console.error('Error fetching blog posts:', error));
}

displayLatestBlogPosts();
