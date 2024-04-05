
    $(function() {
        "use strict";

        $(".preloader").fadeOut();
        $(".nav-toggler").on('click', function() {
            $("#main-wrapper").toggleClass("show-sidebar");
            $(".nav-toggler i").toggleClass("ti-menu");
        });
        $(".search-box a, .search-box .app-search .srh-btn").on('click', function() {
            $(".app-search").toggle(200);
            $(".app-search input").focus();
        });

        
        $("body, .page-wrapper").trigger("resize");
        $(".page-wrapper").delay(20).show();
        
        var setsidebartype = function() {
            var width = (window.innerWidth > 0) ? window.innerWidth : this.screen.width;
            if (width < 1170) {
                $("#main-wrapper").attr("data-sidebartype", "mini-sidebar");
            } else {
                $("#main-wrapper").attr("data-sidebartype", "full");
            }
        };
        $(window).ready(setsidebartype);
        $(window).on("resize", setsidebartype);

    });

    function showLoader() {
        console.log("Showing loader...");
        $(".preloader").fadeIn();
    }
    
    function hideLoader() {
        console.log("Hiding loader...");
        $(".preloader").fadeOut();
    }






    function insertImage() {
        const imageUrl = document.getElementById('image').value;
        const editor = document.getElementById('editor');
        const imageTag = `<img src="${imageUrl}" alt="Inserted Image">`;
        editor.value += imageTag;
    }


    



    function toggleForm() {
        const fixedForm = document.querySelector('.fixed-form');
        if (fixedForm.style.display === 'block') {
            fixedForm.style.display = 'none';
        } else {
            fixedForm.style.display = 'block';
        }
    }
    
    function openForm() {
        document.getElementById('formPopup').style.display = 'block';
    }

    function closeForm() {
        document.getElementById('formPopup').style.display = 'none';
    }



    document.addEventListener('DOMContentLoaded', function() {
        closeForm(); 
    });





    document.getElementById('blogForm').addEventListener('submit', savePost);



    function deletePost(postId) {
        if (confirm('Are you sure you want to delete this post?')) {
            
           
            
            fetch(`https://cyberopsrw.cyclic.app/api/v1/post/deletePost/${postId}`, {
                method: 'DELETE'
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to delete post');
                }
                
                console.log('Post deleted successfully');
                
                displayBlogPosts();
            })
            .catch(error => {
                console.error('Error deleting post:', error);
            });
        }
    }


    document.addEventListener('trix-before-paste', async function (e) {
        if (e.paste.hasOwnProperty('html')) {

            e.paste.html = e.paste.html.replace(/<\/?[^>]+(>|$)/g, '');

            await displayBlogPosts();
        }
    });


    function insertImage() {
        const imageUrl = document.getElementById('image').value;
        const editor = document.getElementById('editor');
        const imageTag = `<img src="${imageUrl}" alt="Inserted Image">`;
        editor.value += imageTag;
    }

    document.addEventListener('trix-attachment-add', function(event) {
        if (event.attachment.file) {
            uploadFile(event.attachment.file);
            console.log("hhhhhhhhh",event.attachment.file)
        }

    });

    function uploadFile(file) {
        var formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'your_upload_preset_name');

        fetch('https://api.cloudinary.com/v1_1/daoqhvblq/image/upload', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log('Upload response:', data); 
            const imageUrl = data.secure_url;
        })
        .catch(error => {
            console.error('Error uploading file:', error);
        });
    }




    const postsPerPage = 5;
    let currentPage = 1;

    async function displayBlogPosts(pageNumber) {
        try {
            showLoader();
            const response = await fetch('https://cyberopsrw.cyclic.app/api/v1/post/getAllPosts');
            if (!response.ok) {
                throw new Error('Failed to fetch blog posts');
            }
            const allPosts = await response.json();
            console.log("hhhhhh",allPosts)
            closeForm()

            const startIndex = (pageNumber - 1) * postsPerPage;
            const endIndex = startIndex + postsPerPage;
            const paginatedPosts = allPosts.slice(startIndex, endIndex);

            const blogTableBody = document.getElementById('blogTableBody');
            blogTableBody.innerHTML = '';

            paginatedPosts.forEach((post, index) => {
                const row = blogTableBody.insertRow();
                const cell1 = row.insertCell(0);
                const cell2 = row.insertCell(1);
                const cell3 = row.insertCell(2);
                const cell4 = row.insertCell(3);
                const cell5 = row.insertCell(4);

                cell1.textContent = startIndex + index + 1;
                cell2.textContent = post.title || 'N/A' ;

                const tempElement = document.createElement('div');
                tempElement.innerHTML = post.body || '';

                const imgElement = tempElement.querySelector('img');

                if (imgElement) {
                    const clonedImg = imgElement.cloneNode(true);
                    cell3.appendChild(clonedImg);
                } else {
                    cell3.innerHTML = post.body.substring(0, 20) + '...' || 'N/A';
                }


                cell4.innerHTML = `<img src="${post.image}" alt="Blog Image" style="max-width: 100px; max-height: 100px;">`;

                const editButton = document.createElement('button');
                editButton.textContent = 'Edit';
                editButton.classList.add('btn', 'btn-primary', 'btn-sm');
                editButton.addEventListener('click', () => openEditForm(post._id)); // Pass post object to openForm

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
                deleteButton.addEventListener('click', () => deletePost(post._id));

                cell5.appendChild(editButton);
                cell5.appendChild(deleteButton);
                
            });

            addPaginationButtons(allPosts.length);
        } catch (error) {
            console.error('Error fetching blog posts:', error);
        }finally {
            hideLoader();
        }
    }
    window.addEventListener('load', () => {
        displayBlogPosts(currentPage);
    });

    function addPaginationButtons(totalPosts) {
        const totalPages = Math.ceil(totalPosts / postsPerPage);
        const paginationContainer = document.getElementById('paginationContainer');
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

        // Add previous arrow if not on first page
        if (currentPage > 1) {
            const prevButton = document.createElement('button');
            prevButton.textContent = '<';
            prevButton.addEventListener('click', () => {
                currentPage--;
                displayBlogPosts(currentPage);
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
                displayBlogPosts(currentPage);
            });
            paginationContainer.appendChild(button);
        }

        // Add next arrow if not on last page
        if (currentPage < totalPages) {
            const nextButton = document.createElement('button');
            nextButton.textContent = '>';
            nextButton.addEventListener('click', () => {
                currentPage++;
                displayBlogPosts(currentPage);
            });
            paginationContainer.appendChild(nextButton);
        }
    }




    window.addEventListener('load', () => {
        displayBlogPosts(currentPage);
    });

    document.addEventListener('DOMContentLoaded', function() {
       
        openEditForm('65f132b8270b5f025159f5a9');
    });
    let currentPostId; 

    document.addEventListener('DOMContentLoaded', function() {
        openEditForm('65f132b8270b5f025159f5a9');
    });
    
    async function openEditForm(postId) {
        openForm(); 
    
        try {
            const response = await fetch(`https://cyberopsrw.cyclic.app/api/v1/post/getPostById/${postId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch post data');
            }
            const editedPost = await response.json();
    
           
            currentPostId = postId;
    
           
            document.getElementById('title').value = editedPost.title || '';
            document.getElementById('author').value = editedPost.author || '';
            document.getElementById('image').value = editedPost.image || '';
    
            const editor = document.getElementById('editor').editor;
            if (editedPost.body) {
                editor.loadHTML(editedPost.body);
            } else {
                console.log('No body content found in the response.');
            }
        } catch (error) {
            console.error('Error fetching post data:', error);
        }
    }
    
    function getEditorContent() {
      
        const editor = document.getElementById('editor');
        return editor.value;
    }
    
    async function updatePost() {
        try {

            const title = document.getElementById('title').value;
            const author = document.getElementById('author').value;
            const image = document.getElementById('image').value;
    
           
            const postId = currentPostId;
    
            const editorContent = getEditorContent();
    
          
            const postData = {
                title: title,
                author: author,
                image: image,
                body: editorContent 
            };
    
          
            const response = await fetch(`https://cyberopsrw.cyclic.app/api/v1/post/updatePost/${postId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postData)
            });
    
           
            if (!response.ok) {
                throw new Error(`Failed to update post ${postId}`);
            }
    
            alert('Post updated successfully');
    closeForm()
        } catch (error) {
            
            console.error(error);
            
            setTimeout(() => {
                alert(`Error updating post ${currentPostId}: ${error.message}`);
            }, 100); // Delay the alert to ensure it is displayed
        }
    }
    






    
    
    
    function savePost() {
        
        var titleElement = document.getElementById('title');
        var editorElement = document.getElementById('editor');
        

        if (!titleElement || !editorElement) {
            console.error('One or more elements not found.');
            return;
        }

        var title = titleElement.value;
        var content = editorElement.value;
        

        if (title.trim() === '' || content.trim() === '') {
            alert('Please provide both title and content.');
        } else {
            const postData = {
                title: title,
                body: content
            };

            let url = 'https://cyberopsrw.cyclic.app/api/v1/post/createPost';
            let method = 'POST';

          
            fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postData)
            })
            .then(response => response.json())
            .then(data => {
                console.log('Response:', data);
                // closeForm();
               
                currentPage = 1; 
                displayBlogPosts(currentPage);
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Failed to save post. Please try again later.');
            });
        }
    }


