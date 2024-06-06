function displayBlogPostData() {
    const titleElement = document.querySelector('.entry-title');
    const contentElement = document.querySelector('.entry-content');
    const authorElement = document.querySelector('.author');
    const dateElement = document.querySelector('.date');
    const viewsCountElement = document.querySelector('.post-views-count');
    const headerBlog = document.querySelector(".headBlog");
    const titleBlog = document.querySelector("title");

    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');

    fetch(`https://cyberops-bn.onrender.com/api/v1/post/getPostById/${postId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch post data');
            }
            return response.json();
        })
        .then(postData => {
            if (titleElement && contentElement && authorElement && dateElement && viewsCountElement) {
                titleElement.textContent = postData.title;
                contentElement.innerHTML = postData.body;
                authorElement.textContent = 'Author: ' + postData.author;
                const imageUrl = postData.images[0] ? postData.images[0] : '../images/11-penetration-testing-tools-the-pros-use-1024x683.webp';
                const imageElement = document.getElementById('post-image');
                imageElement.src = imageUrl;
                const createdAtString = postData.createdAt;
                const createdAtDate = new Date(createdAtString);
                const options = { year: 'numeric', month: 'long', day: 'numeric' };
                const formattedCreatedAt = createdAtDate.toLocaleDateString('en-US', options);
                dateElement.textContent = 'Date: ' + formattedCreatedAt;
                viewsCountElement.textContent = postData.views;
                headerBlog.textContent = postData.title;
                titleBlog.textContent = postData.title;
            } else {
                alert('One or more elements not found.');
            }
        })
        .catch(error => console.error('Error fetching post data:', error));
}

function fetchComments() {
    const commentsContainer = document.getElementById('comments-container');
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');

    fetch(`https://cyberops-bn.onrender.com/api/v1/comment/getComment/${postId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch comments');
            }
            return response.json();
        })
        .then(commentsData => {
            commentsContainer.innerHTML = ''; 
            commentsData.forEach(comment => {
                const createdAt = new Date(comment.createdAt);
                const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
                const formattedCreatedAt = createdAt.toLocaleString('en-US', options);
                const commentElement = document.createElement('div');
                commentElement.className = 'commentbody';
                commentElement.innerHTML = `
                
                    <div class="commentheader">

                        <div class="usercomment">
                        <div class="leftcomment">
                            <img src="../dashboard/plugins/images/user.png" alt="" width="48px">
                            <div class="names">${comment.name}</div>
                            </div>
                         <div class="time">${formattedCreatedAt}</div>
                        </div>
                        <div>
                        <button type="button" name="reply" class="replybtn" onclick="replyToComment('${comment.id}')">Reply</button>
                    </div>
                    </div>
                    <div class="paragraph">${comment.text}</div>
                `;
                commentsContainer.appendChild(commentElement);
            });
        })
        .catch(error => console.error('Error fetching comments:', error));
}

function replyToComment(commentId) {
   
    console.log(`Reply to comment ${commentId}`);
}

function autoUpdateComments() {
    fetchComments();
    setInterval(fetchComments, 60000); // Update every minut
}

document.addEventListener('DOMContentLoaded', () => {
    displayBlogPostData();
    autoUpdateComments();
});
