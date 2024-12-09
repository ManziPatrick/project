


document.addEventListener('DOMContentLoaded', function() {
    const isAdmin = () => {
        const role = localStorage.getItem('role');
        return role && role === 'ADMIN';
    };

    const redirectToDashboard = () => {
        window.location.href = '/dashboard.html'; 
    };

    const protectedRoutes = ['DashbordUsers.html', 'newUser.html'];
    const currentPath = window.location.pathname;
    const role = localStorage.getItem('role');

    if (protectedRoutes.includes(currentPath) && !isAdmin()) {
        redirectToDashboard();
    }
    if (role === 'admin') {
        document.getElementById('usersLink').style.display = 'block';
        document.getElementById('newUserLink').style.display = 'block';
        document.getElementById('appointment').style.display = 'block';
    } else {
        document.getElementById('usersLink').style.display = 'none';
        document.getElementById('newUserLink').style.display = 'none';
        document.getElementById('appointment').style.display = 'none';
    }

});


document.addEventListener("DOMContentLoaded", function() {
 
    var profilePic = document.getElementById("navpic");

    profilePic.addEventListener("click", function() {
  
        var dropdown = profilePic.closest("details.dropdown");

        if (dropdown.hasAttribute("open")) {
            dropdown.removeAttribute("open");
        } else {
            dropdown.setAttribute("open", "");
        }
    });
});


const parseJwt = (token) => {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        return null;
    }
};


const token = localStorage.getItem('token');

const redirectToLogin = () => {
    window.location.href = '/sign_in.html'; 
};

if (!token) {
    console.error('Token not found in localStorage');
    redirectToLogin();
} else {
    const userInfo = parseJwt(token);
    if (userInfo) {
        const profilePicElement = document.getElementById('navpic');
        profilePicElement.src = localStorage.getItem('profilePic');

        const firstName = userInfo.name.split(' ')[0];
        document.querySelector("#Profile-name").innerHTML = firstName;
        const userId = localStorage.getItem('userID');
        

        fetch(`https://cyberops-bn.onrender.com/api/v1/admin/getAdminById/${userId}`)
            .then(response => {

                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }
                return response.json();
            })
            .then(userData => {
                
            
                console.log("ghggggggggghgh",userData)
                
            })
            .catch(error => {
                console.error('Error:', error);
            });
    } else {
        console.error('Invalid token:', token);
        redirectToLogin(); 
    }
}


document.addEventListener("DOMContentLoaded", function() {
    var logoutBtn = document.getElementById('logoutBtn');
    
    logoutBtn.addEventListener('click', function() {
      
        localStorage.removeItem('token');
       
        window.location.href = '/sign_in.html'; 
    });
});


const authenticatedRoutes = ['dashboard/dashboard.html', 'profile.html', 'DashbordUsers.html', 'newUser.html', 'map-google.html', 'DashboardBlog.html', 'appointment.html'];

const currentPath = window.location.pathname;

const requiresAuthentication = (route) => {
    return authenticatedRoutes.includes(route);
};

if (requiresAuthentication(currentPath)) {
  
    if (!token) {
        redirectToLogin();
    }
}
