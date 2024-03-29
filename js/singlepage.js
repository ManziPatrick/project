function displayBlogPostData() {
    // Retrieve the ID from the query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');

    
    fetch(`https://cyberopsrw.cyclic.app/api/v1/post/getPostById/${postId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch post data');
            }
            return response.json();
        })
        .then(postData => {
            console.log("hhhhhhhhc",postData );
            console.clear();
            
            if (postData) {
                document.querySelector('.entry-title').textContent = postData.title;
                document.querySelector('.entry-content').textContent = postData.content;
                document.querySelector('.author').textContent = 'Author: ' + postData.author;
                document.querySelector('.date').textContent = 'Date: ' + postData.date;
                document.querySelector('.post-views-count').textContent = postData.views;
            } else {
                console.log('No blog post data found.');
            }
        })
        .catch(error => console.error('Error fetching post data:', error));
}


displayBlogPostData();
