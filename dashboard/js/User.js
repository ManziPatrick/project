


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
       
        const firstName = userInfo.name.split(' ')[0];
        document.querySelector("#Profile-name").innerHTML = firstName;
        const userId = localStorage.getItem('userID');

        fetch(`https://cyberops-bn.onrender.com/api/v1/user/getAdminById/${userId}`)
            .then(response => {

                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }
                return response.json();
            })
            .then(userData => {

                document.getElementById('navpic').src = userData.profilePic || 'plugins/images/large/img1.jpg';
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
