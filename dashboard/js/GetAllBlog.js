async function displayBlogPosts() {
    try {
      const response = await fetch('https://cyberops-bn.onrender.com/api/v1/post/getAllPosts');
      if (!response.ok) {
        throw new Error('Failed to fetch blog posts');
      }
      const allPosts = await response.json();
  
      const blogTableBody = document.getElementById('blogTableBody');
  
      blogTableBody.innerHTML = '';
  
      allPosts.forEach((post, index) => {
        const row = blogTableBody.insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);
  
        cell1.textContent = index + 1;
        cell2.textContent = post.title || 'N/A';
        cell3.innerText = post.body || 'N/A';
  
      });
  
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    }
  }