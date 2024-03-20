function displayBlogPostData() {
    const postData = JSON.parse(localStorage.getItem('blogPost'));
    console.log("hhhhhhhhc",postData )
    if (postData) {
        document.querySelector('.entry-title').textContent = postData.title;
        document.querySelector('.entry-content').textContent = postData.content;
        document.querySelector('.author').textContent = 'Author: ' + postData.author;
        document.querySelector('.date').textContent = 'Date: ' + postData.date;
        document.querySelector('.post-views-count').textContent = postData.views;
    } else {
        console.log('No blog post data found.');
    }
}


displayBlogPostData();

