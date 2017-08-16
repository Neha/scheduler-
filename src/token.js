const Token = () => {
    const user = JSON.parse(window.sessionStorage.getItem("user")); 
    if (user.token) {
        return user.token;
    } else {
        return null;
    }
}

export default Token;