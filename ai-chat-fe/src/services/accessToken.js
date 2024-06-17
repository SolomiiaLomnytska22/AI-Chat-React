export const getAccessToken = () => {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith('accessToken=')) {
            return cookie.substring('accessToken='.length, cookie.length);
        }
    }
    return null; 
};

export const getUser = () => {
    let jwt = getAccessToken();
    if (jwt) {
        let jwtParts = jwt.split('.');
        if (jwtParts.length >= 2) {
            let jwtData = jwtParts[1];
            try {
                let decodedJwtJsonData = window.atob(jwtData);
                let decodedJwtData = JSON.parse(decodedJwtJsonData);
                return decodedJwtData.UserInfo;
            } catch (e) {
                console.error('Error decoding JWT:', e);
            }
        }
    }
    return null;
}