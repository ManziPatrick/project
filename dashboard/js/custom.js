$(function() {
    "use strict";

    $(".preloader").fadeOut();
    // this is for close icon when navigation open in mobile view
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

document.addEventListener('DOMContentLoaded', function() {
    var styledInput = document.querySelector('.styled-input');

    function execCommand(command, value) {
        document.execCommand(command, false, value);
    }
    window.insertImage = function() {
        var imageUrl = prompt('Enter the URL of the image:');
        if (imageUrl) {
            execCommand('insertImage', imageUrl);
        }
    }

    window.embedVideo = function() {
        var videoUrl = prompt('Enter the URL of the video (YouTube, Vimeo, etc.):');
        if (videoUrl) {
            execCommand('insertHTML', `<iframe width="560" height="315" src="${videoUrl}" frameborder="0" allowfullscreen></iframe>`);
        }
    }

   
    window.changeTextColor = function() {
        var color = prompt('Enter the color (name, hex, rgb):');
        if (color) {
            execCommand('foreColor', color);
        }
    }
});






function insertImage() {
    const imageUrl = document.getElementById('image').value;
    const editor = document.getElementById('editor');
    const imageTag = `<img src="${imageUrl}" alt="Inserted Image">`;
    editor.value += imageTag;
}


  


function toggleForm() {
    const fixedForm = document.querySelector('.fixed-form');
    fixedForm.style.display = fixedForm.style.display === 'none' ? 'block' : 'none';
}
function openForm() {
    document.getElementById('formPopup').style.display = 'block';
}

function closeForm() {
    document.getElementById('formPopup').style.display = 'none';
}







function savePost() {
    
    var title = document.getElementById('title').value;
    var content = document.getElementById('editor').value;

    if (title.trim() === '' || content.trim() === '') {
        alert('Please provide both title and content.');
    } else {
     

    console.log('Post Data:', postData);
    localStorage.setItem('Post Data:', JSON.stringify(postData));
    closeForm()
    fetch('https://cyberopsrw.cyclic.app/api/v1/post/createPost', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
          
        },
        body: JSON.stringify(postData)
    })
    .then(response => response.json())
    .then(data => {
        
        console.log('Response:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
}


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
        const response = await fetch('https://cyberopsrw.cyclic.app/api/v1/post/getAllPosts');
        if (!response.ok) {
            throw new Error('Failed to fetch blog posts');
        }
        const allPosts = await response.json();

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
            cell2.textContent = post.title || 'N/A';

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
            editButton.addEventListener('click', () => openEditForm(post.id)); // Assuming there's an id property in your post object

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
            deleteButton.addEventListener('click', () => deletePost(post.id)); // Assuming there's an id property in your post object

            cell5.appendChild(editButton);
            cell5.appendChild(deleteButton);
        });

        addPaginationButtons(allPosts.length);
    } catch (error) {
        console.error('Error fetching blog posts:', error);
    }
}

function addPaginationButtons(totalPosts) {
    const totalPages = Math.ceil(totalPosts / postsPerPage);
    const paginationContainer = document.getElementById('paginationContainer');
    paginationContainer.innerHTML = '';

    const maxButtons = 3; 
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

    for (let i = startButton; i <= endButton; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.addEventListener('click', () => {
            currentPage = i;
            displayBlogPosts(currentPage);
        });
        paginationContainer.appendChild(button);
    }

    if (startButton > 1) {
        const gapButton = document.createElement('span');
        gapButton.textContent = '...';
        paginationContainer.insertBefore(gapButton, paginationContainer.firstChild);
    }

    if (endButton < totalPages) {
        const gapButton = document.createElement('span');
        gapButton.textContent = '...';
        paginationContainer.appendChild(gapButton);
    }
}


window.addEventListener('load', () => {
    displayBlogPosts(currentPage);
});





function getTagName(htmlContent) {
    const tagMatch = htmlContent.match(/^<([a-z]+)/i);
    return tagMatch ? tagMatch[1].toLowerCase() : 'div'; 
}

window.addEventListener('load', displayBlogPosts);



