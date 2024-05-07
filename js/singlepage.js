function displayBlogPostData() {
    const titleElement = document.querySelector('.entry-title');
    const contentElement = document.querySelector('.entry-content');
    const authorElement = document.querySelector('.author');
    const dateElement = document.querySelector('.date');
    const viewsCountElement = document.querySelector('.post-views-count');
const headerBlog = document.querySelector(".headBlog")
const titleBlog = document.querySelector("title")

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
                headerBlog.textContent=postData.title;
                titleBlog.textContent=postData.title
            } else {
                console.log('One or more elements not found.');
            }
          
        })
        .catch(error => console.error('Error fetching post data:', error) );
        
  
       
  
}
 
displayBlogPostData();
