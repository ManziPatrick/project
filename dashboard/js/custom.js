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

    // ============================================================== 
    // Resize all elements
    // ============================================================== 
    $("body, .page-wrapper").trigger("resize");
    $(".page-wrapper").delay(20).show();
    
    //****************************
    /* This is for the mini-sidebar if width is less then 1170*/
    //**************************** 
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

    // Function to execute a command on the content-editable div
    function execCommand(command, value) {
        document.execCommand(command, false, value);
    }

    // Function to insert an image
    window.insertImage = function() {
        var imageUrl = prompt('Enter the URL of the image:');
        if (imageUrl) {
            execCommand('insertImage', imageUrl);
        }
    }

    // Function to embed a video
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




// function savePost() {
//     const authorName = document.getElementById('author').value;
//     const blogName = document.getElementById('blogName').value;
//     const blogContent = document.getElementById('editor').value;
//     const imageUrl = document.getElementById('image').value; 

//     const savedPosts = JSON.parse(localStorage.getItem('blogPosts')) || [];

//     const post = {
//         author: authorName,
//         blogName: blogName, 
//         content: blogContent,
//         image: imageUrl, 
//         timestamp: new Date().toLocaleString(),
//     };

//     savedPosts.push(post);
//     localStorage.setItem('blogPosts', JSON.stringify(savedPosts));
   
//     displayBlogPosts();
// }


// function displayBlogPosts() {
//     const savedPosts = JSON.parse(localStorage.getItem('blogPosts')) || [];
//     const blogContent = document.getElementById('blog-content');

//     blogContent.innerHTML = '';

//     savedPosts.forEach(post => {
//         const postElement = document.createElement('div');
//         postElement.innerHTML = `
//             <h3>${post.author}</h3>
//             <p>${post.content}</p>
//             <small>${post.timestamp}</small>
//             <hr>
//         `;
//         blogContent.appendChild(postElement);
//     });
// }

function insertImage() {
    const imageUrl = document.getElementById('image').value;
    const editor = document.getElementById('editor');
    const imageTag = `<img src="${imageUrl}" alt="Inserted Image">`;
    editor.value += imageTag;
}

// function insertVideo() {
//     const videoUrl = document.getElementById('video').value;
//     const editor = document.getElementById('editor');
//     const videoTag = `<iframe src="${videoUrl}" frameborder="0" allowfullscreen></iframe>`;
//     editor.value += videoTag;
// }

// document.addEventListener('DOMContentLoaded', () => {
//     displayBlogPosts();
// });

// function displayBlogPosts() {
//     const savedPosts = JSON.parse(localStorage.getItem('blogPosts')) || [];
//     const blogContent = document.getElementById('blog-content');

//     blogContent.innerHTML = '';

//     savedPosts.forEach((post, index) => {
//         const postElement = document.createElement('div');
//         postElement.innerHTML = `
//             <div class="edit-options">
//             <button onclick="editPost(${index})">Edit</button>
//                 <button onclick="deletePost(${index})">Delete</button>
//             </div>
//             <h3>${post.author}</h3>
//             <p>${post.content}</p>
//             <small>${post.timestamp}</small>
//             <hr>
//         `;
//         blogContent.appendChild(postElement);
//     });
// }

// function saveEdit() {
//     const index = parseInt(document.getElementById('editIndex').value);
//     const savedPosts = JSON.parse(localStorage.getItem('blogPosts')) || [];

    // Create a new post object with the edited values
//     const editedPost = {
//         author: document.getElementById('author').value,
//         blogName: document.getElementById('blogName').value,
//         image: document.getElementById('image').value,
//         content: document.getElementById('editor').value,
//         timestamp: new Date().toLocaleString(),
//     };

//     savedPosts[index] = editedPost;

//     localStorage.setItem('blogPosts', JSON.stringify(savedPosts));
//     displayBlogPosts();

    
//     closeForm();
// }


// function deletePost(index) {
//     const savedPosts = JSON.parse(localStorage.getItem('blogPosts')) || [];
//     savedPosts.splice(index, 1);
//     localStorage.setItem('blogPosts', JSON.stringify(savedPosts));
//     displayBlogPosts();
// }
// const postsPerPage = 5;
// let currentPage = 1;

// function displayBlogPosts() {
//     const savedPosts = JSON.parse(localStorage.getItem('blogPosts')) || [];
//     const blogTableBody = document.getElementById('blogTableBody');

//     blogTableBody.innerHTML = '';

//     const startIndex = (currentPage - 1) * postsPerPage;
//     const endIndex = startIndex + postsPerPage;

//     const paginatedPosts = savedPosts.slice(startIndex, endIndex);

//     paginatedPosts.forEach((post, index) => {
//         const row = blogTableBody.insertRow();
//         const cell1 = row.insertCell(0);
//         const cell2 = row.insertCell(1);
//         const cell3 = row.insertCell(2);
//         const cell4 = row.insertCell(3);
//         const cell5 = row.insertCell(4);

//         cell1.innerHTML = startIndex + index + 1; 
//         cell2.innerHTML = post.author;
//         cell3.innerHTML = post.blogName || 'N/A';
//         cell4.innerHTML = `<img src="${post.image}" alt="Blog Image" style="max-width: 100px; max-height: 100px;">`;

//         cell5.innerHTML = `
//         <button onclick="openEditForm(${startIndex + index})" class="btn btn-primary btn-sm">Edit</button>
//             <button onclick="deletePost(${startIndex + index})" class="btn btn-danger btn-sm">Delete</button>
//         `;
//     });

//     addPaginationButtons(savedPosts.length);
// }

// function addPaginationButtons(totalPosts) {
//     const totalPages = Math.ceil(totalPosts / postsPerPage);

//     const paginationContainer = document.getElementById('paginationContainer');
//     paginationContainer.innerHTML = '';

//     if (totalPages > 1) {
//         for (let i = 1; i <= totalPages; i++) {
//             const button = document.createElement('button');
//             button.textContent = i;
//             button.addEventListener('click', () => {
//                 currentPage = i;
//                 displayBlogPosts();
//             });
//             paginationContainer.appendChild(button);
//         }
//     }
// }

// document.addEventListener('DOMContentLoaded', () => {
//     displayBlogPosts();
// });



// $(function() {
//     $(".bcontent").wysihtml5({
//       toolbar: {
//         "image": false
//       }
//     });
  
//     $(document).on('change', '.btn-file :file', function() {
//       var input = $(this);
//       var numFiles = input.get(0).files ? input.get(0).files.length : 1;
//       console.log(input.get(0).files);
//       var label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
//       input.trigger('fileselect', [numFiles, label]);
//     });
  
//     $('.btn-file :file').on('fileselect', function(event, numFiles, label) {
//       var input = $(this).parents('.input-group').find(':text');
//       var log = numFiles > 1 ? numFiles + ' files selected' : label;
  
//       if (input.length) {
//         input.val(log);
//       } else {
//         if (log) {
//           alert(log);
//         }
//       }
//     });
//   });
  


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
function openEditForm(index) {
    openForm();
    const savedPosts = JSON.parse(localStorage.getItem('blogPosts')) || [];
    const editedPost = savedPosts[index];
    document.getElementById('author').value = editedPost.author;
    document.getElementById('blogName').value = editedPost.blogName;
    document.getElementById('image').value = editedPost.image;
    document.getElementById('editor').value = editedPost.content;

    document.getElementById('editIndex').value = index;
}






function savePost() {
    
    var title = document.getElementById('title').value;
    var content = document.getElementById('editor').value;

    
    var postData = {
        "title": title,
        "body": content
    };

    console.log('Post Data:', postData);
    localStorage.setItem('Post Data:', JSON.stringify(postData));
    
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


document.getElementById('blogForm').addEventListener('submit', savePost);



// async function displayBlogPosts() {
//     try {
//         const response = await fetch('https://cyberopsrw.cyclic.app/api/v1/post/getAllPosts');
//         if (!response.ok) {
//             throw new Error('Failed to fetch blog posts');
//         }
//         const allPosts = await response.json();

//         const blogTableBody = document.getElementById('blogTableBody');

//         blogTableBody.innerHTML = '';

//         allPosts.forEach((post, index) => {
//             const row = blogTableBody.insertRow();
//             const cell1 = row.insertCell(0);
//             const cell2 = row.insertCell(1);
//             const cell3 = row.insertCell(2);

//             cell1.textContent = index + 1; 
//             cell2.textContent = post.title || 'N/A'; 
//             cell3.textContent = post.body || 'N/A'; 
//         });

//         // If you have other fields like createdAt, updatedAt, etc., you can add more cells and populate them similarly.

//         // Assuming you have a function to handle pagination, you can call it here
//         // addPaginationButtons(allPosts.length);
//     } catch (error) {
//         console.error('Error fetching blog posts:', error);
//     }
// }
document.addEventListener('trix-before-paste', async function (e) {
    if (e.paste.hasOwnProperty('html')) {

        e.paste.html = e.paste.html.replace(/<\/?[^>]+(>|$)/g, '');

        await displayBlogPosts();
    }
});

async function displayBlogPosts() {
    try {
        const response = await fetch('https://cyberopsrw.cyclic.app/api/v1/post/getAllPosts');
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

            const bodyElement = document.createElement(getTagName(post.body));
            bodyElement.innerHTML = post.body || 'N/A';
            cell3.appendChild(bodyElement);
        });
    } catch (error) {
        console.error('Error fetching blog posts:', error);
    }
}

function getTagName(htmlContent) {
    const tagMatch = htmlContent.match(/^<([a-z]+)/i);
    return tagMatch ? tagMatch[1].toLowerCase() : 'div'; 
}

  
  
  



window.addEventListener('load', displayBlogPosts);



