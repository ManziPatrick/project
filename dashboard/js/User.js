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
