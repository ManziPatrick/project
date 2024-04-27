const parseJwt = (token) => {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        return null;
    }
};




var token = localStorage.getItem('token');
if (token) {
    var userInfo = parseJwt(token);
    if (userInfo) {
        console.log(userInfo.name);
      
        const firstName = userInfo.name.split(' ')[0];
        document.querySelector("#Profile-name").innerHTML=firstName;
    } else {
        console.error('Invalid token:', token);
    }
} else {
    console.error('Token not found in localStorage');
}

document.addEventListener('DOMContentLoaded', function() {
   
    const userId = localStorage.getItem('userID');
console.log("userId ",userId )
console.log('Fetching user data for user ID:', userId);
fetch(`https://cyberopsrw.cyclic.app/api/v1/user/getAdminById/${userId}`)
    .then(response => {
        console.log('Response status:', response.status);
        if (!response.ok) {
            throw new Error('Failed to fetch user data');
        }
        return response.json(); 
    })
    .then(userData => {
        console.log('User data received:', userData);
        console.log('Element:', document.querySelector('.img-circle'));
        document.getElementById('navpic').src = userData.profilePic || 'plugins/images/large/img1.jpg';
    })
    .catch(error => {
        console.error('Error:', error);
    });

})
